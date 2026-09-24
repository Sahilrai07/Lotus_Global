import { useState, useEffect } from 'react';
import defaultSiteData from './siteData.json';

export type SiteData = typeof defaultSiteData;

export type SchoolInfo = SiteData['schoolInfo'];
export type HeroSlide = SiteData['heroSlides'][number];
export type QuickFeature = SiteData['quickFeatures'][number];
export type LeadershipMember = SiteData['leadership']['president'];
export type Facility = SiteData['facilities'][number];
export type AcademicStage = SiteData['academicStages'][number];
export type FacultyMember = SiteData['faculty'][number];
export type GalleryItem = SiteData['gallery'][number];
export type NoticeItem = SiteData['notices'][number];
export type EventItem = SiteData['events'][number];
export type NewsItem = SiteData['news'][number];
export type DocumentItem = SiteData['documents'][number];
export type PageBanners = SiteData['pageBanners'];
export type AboutPageData = SiteData['aboutPage'];
export type VisionMissionPageData = SiteData['visionMissionPage'];
export type LocationPageData = SiteData['locationPage'];
export type AcademicsPageData = SiteData['academicsPage'];
export type AssessmentSchemeData = SiteData['assessmentScheme'];
export type SchoolTimingsData = SiteData['schoolTimings'];
export type FacultyStandardsData = SiteData['facultyStandards'];
export type AdmissionsPathwayData = SiteData['admissionsPathway'];
export type CoCurricularData = SiteData['coCurricular'];
export type MandatoryDisclosureData = SiteData['mandatoryDisclosure'];

// Cache in memory for quick reactive updates in SPA
let currentData: SiteData = defaultSiteData;
const listeners: Array<(data: SiteData) => void> = [];

export const getSiteData = (): SiteData => {
  return currentData;
};

export const subscribeSiteData = (listener: (data: SiteData) => void): (() => void) => {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
};

const notifyListeners = () => {
  listeners.forEach((fn) => fn(currentData));
};

export const useSiteData = () => {
  const [data, setData] = useState<SiteData>(currentData);

  useEffect(() => {
    // Always fetch latest live site data from Neon PostgreSQL API
    fetchFreshData().then((fresh) => {
      if (fresh) setData(fresh);
    });

    const unsubscribe = subscribeSiteData((updated) => {
      setData({ ...updated });
    });
    return unsubscribe;
  }, []);

  return { siteData: data, setSiteData: setData };
};

/**
 * Fetch fresh data from Neon PostgreSQL API (works in both dev and production)
 */
export const fetchFreshData = async (): Promise<SiteData> => {
  try {
    const res = await fetch('/api/site-data');
    if (res.ok) {
      const data = await res.json();
      currentData = data;
      notifyListeners();
      return data;
    }
  } catch {
    // Fallback to in-memory/JSON data
  }
  return currentData;
};

/**
 * Save updated data to Neon PostgreSQL (works in both dev and production with JWT)
 */
export const saveSiteData = async (updatedData: SiteData): Promise<{ success: boolean; message?: string }> => {
  currentData = updatedData;
  notifyListeners();

  const token = localStorage.getItem('lotus_admin_token') || sessionStorage.getItem('lotus_admin_token');

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch('/api/site-data', {
      method: 'POST',
      headers,
      body: JSON.stringify(updatedData),
    });

    if (res.ok) {
      const result = await res.json();
      return { success: true, message: result.message || 'Saved successfully to database!' };
    }

    // If unauthorized
    if (res.status === 401) {
      return { success: false, message: 'Authentication required or session expired. Please log in.' };
    }

    // Try fallback dev endpoint if local dev
    if (import.meta.env.DEV) {
      const devRes = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData, null, 2),
      });
      if (devRes.ok) {
        return { success: true, message: 'Saved successfully to local disk.' };
      }
    }

    return { success: false, message: 'Failed to write to database.' };
  } catch (err: unknown) {
    return { success: false, message: err instanceof Error ? err.message : 'Network error' };
  }
};

/**
 * Upload file or convert to Data URL for instant live cloud persistence
 */
export const uploadFile = async (
  file: File,
  folder: 'images' | 'documents' | 'gallery'
): Promise<{ success: boolean; url?: string; fileName?: string; fileSize?: string; message?: string }> => {
  // If in local DEV mode, try the local file server first
  if (import.meta.env.DEV) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        return {
          success: true,
          url: data.url,
          fileName: data.fileName,
          fileSize: data.fileSize,
          message: 'File uploaded successfully',
        };
      }
    } catch {
      // Fallback to base64 below
    }
  }

  // Convert to Base64 Data URL (guarantees images work 100% on Vercel without cloud bucket dependencies)
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Url = reader.result as string;
      const sizeKb = Math.round(file.size / 1024);
      resolve({
        success: true,
        url: base64Url,
        fileName: file.name,
        fileSize: sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`,
        message: 'File converted and stored successfully',
      });
    };
    reader.onerror = () => {
      resolve({
        success: false,
        message: 'Failed to read file',
      });
    };
    reader.readAsDataURL(file);
  });
};
