import { getSiteData, SiteData } from "./siteDataService";

export interface FacilityItem {
  id: string;
  name: string;
  category: "Learn" | "Explore" | "Create" | "Perform" | string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
}

export interface DocumentItem {
  name: string;
  description: string;
  required: boolean;
  category?: string;
  spec?: string;
  grades?: string;
}

export interface AdmissionStep {
  step: string;
  title: string;
  summary: string;
  details: string;
}

export type SchoolInfo = SiteData["schoolInfo"];
export type AcademicStage = SiteData["academicStages"][number];
export type AssessmentStructure = SiteData["assessmentScheme"];
export type FacultyPillar = SiteData["facultyStandards"]["pillars"][number];
export type VisionMission = {
  vision: {
    title: string;
    subtitle: string;
    statement: string;
    pillars: Array<{ title: string; description: string }>;
  };
  mission: {
    title: string;
    subtitle: string;
    statement: string;
    goldenRule: string;
    commitments: Array<{ title: string; description: string }>;
  };
  principles: Array<{ badge: string; title: string; desc: string }>;
};

// Strongly-typed proxies to ensure all legacy exports read directly from reactive siteData
export const SCHOOL_INFO: SchoolInfo = new Proxy({} as SchoolInfo, {
  get: (_, prop) => (getSiteData().schoolInfo as any)[prop],
});

export const ACADEMIC_STAGES: AcademicStage[] = new Proxy([] as AcademicStage[], {
  get: (_, prop) => {
    const arr = getSiteData().academicStages;
    const val = (arr as any)[prop];
    return typeof val === "function" ? val.bind(arr) : val;
  },
});

export const ASSESSMENT_STRUCTURE: AssessmentStructure = new Proxy({} as AssessmentStructure, {
  get: (_, prop) => (getSiteData().assessmentScheme as any)[prop],
});

export const FACILITIES_DATA: FacilityItem[] = new Proxy([] as FacilityItem[], {
  get: (_, prop) => {
    const arr = getSiteData().facilities;
    const val = (arr as any)[prop];
    return typeof val === "function" ? val.bind(arr) : val;
  },
});

export const FACULTY_PILLARS: FacultyPillar[] = new Proxy([] as FacultyPillar[], {
  get: (_, prop) => {
    const arr = getSiteData().facultyStandards.pillars;
    const val = (arr as any)[prop];
    return typeof val === "function" ? val.bind(arr) : val;
  },
});

export const ADMISSION_STEPS: AdmissionStep[] = new Proxy([] as AdmissionStep[], {
  get: (_, prop) => {
    const arr = getSiteData().admissionsPathway.steps;
    const val = (arr as any)[prop];
    return typeof val === "function" ? val.bind(arr) : val;
  },
});

export const REQUIRED_DOCUMENTS: DocumentItem[] = new Proxy([] as DocumentItem[], {
  get: (_, prop) => {
    const arr = getSiteData().admissionsPathway.requiredDocuments;
    const val = (arr as any)[prop];
    return typeof val === "function" ? val.bind(arr) : val;
  },
});

export const VISION_MISSION_DATA: VisionMission = new Proxy({} as VisionMission, {
  get: (_, prop) => {
    const data = getSiteData().visionMissionPage;
    if (prop === "vision") {
      return {
        title: data.visionTitle,
        subtitle: data.visionSubtitle,
        statement: data.visionStatement,
        pillars: data.visionPillars,
      };
    }
    if (prop === "mission") {
      return {
        title: data.missionTitle,
        subtitle: data.missionSubtitle,
        statement: data.missionStatement,
        goldenRule: data.goldenRule,
        commitments: data.missionCommitments,
      };
    }
    if (prop === "principles") {
      return data.corePrinciples;
    }
    return (data as any)[prop];
  },
});
