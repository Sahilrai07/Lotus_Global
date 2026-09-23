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
    if (import.meta.env.DEV) {
      fetchFreshData().then((fresh) => {
        if (fresh) setData(fresh);
      });
    }

    const unsubscribe = subscribeSiteData((updated) => {
      setData({ ...updated });
    });
    return unsubscribe;
  }, []);

  return { siteData: data, setSiteData: setData };
};

/**
 * Fetch fresh data from local dev server API if running in DEV mode
 */
export const fetchFreshData = async (): Promise<SiteData> => {
  if (!import.meta.env.DEV) {
    return currentData;
  }

  try {
    const res = await fetch('/api/admin/data');
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
 * Save updated data to disk through local dev API (only works in local dev)
 */
export const saveSiteData = async (updatedData: SiteData): Promise<{ success: boolean; message?: string }> => {
  currentData = updatedData;
  notifyListeners();

  if (!import.meta.env.DEV) {
    return { success: false, message: 'Editing is only available in local development mode.' };
  }

  try {
    const res = await fetch('/api/admin/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData, null, 2),
    });

    if (res.ok) {
      const result = await res.json();
      return { success: true, message: result.message || 'Saved successfully.' };
    }
    return { success: false, message: 'Failed to write to local data file.' };
  } catch (err: unknown) {
    return { success: false, message: err instanceof Error ? err.message : 'Network error' };
  }
};

/**
 * Upload file to local disk (public/uploads/) via Vite dev API (only in DEV mode)
 */
export const uploadFile = async (
  file: File,
  folder: 'images' | 'documents' | 'gallery'
): Promise<{ success: boolean; url?: string; fileName?: string; fileSize?: string; message?: string }> => {
  if (!import.meta.env.DEV) {
    return { success: false, message: 'Uploads are only available in local development mode.' };
  }

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
    return { success: false, message: 'Server failed to save file' };
  } catch (err: unknown) {
    return { success: false, message: err instanceof Error ? err.message : 'Upload error' };
  }
};
