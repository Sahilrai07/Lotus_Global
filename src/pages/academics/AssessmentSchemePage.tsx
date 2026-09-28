import React, { useState } from "react";
import { InternalPageLayout } from "../../components/InternalPageLayout";
import { useSiteData } from "../../data/siteDataService";
import {
  Award,
  ClipboardCheck,
  BarChart3,
  Download,
  Eye,
  BookOpen,
  Sparkles,
  CheckCircle2,
  FileText,
  Layers,
  Heart,
  HelpCircle,
} from "lucide-react";
import { PdfViewerModal } from "../../components/PdfViewerModal";

interface AssessmentSchemePageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const AssessmentSchemePage: React.FC<AssessmentSchemePageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  const { siteData } = useSiteData();
  const scheme = siteData.assessmentScheme;
  const bannerImage =
    siteData.pageBanners?.academics ||
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80";

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const docPdfUrl = "/uploads/documents/developmental-stages-assessment-scheme.pdf";

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    try {
      const fileUrl = `/api/files?id=developmental-stages-assessment-scheme.pdf&download=1`;
      const res = await fetch(fileUrl);
      if (!res.ok) throw new Error("Fetch failed");
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = blobUrl;
      a.download = "Lotus_Global_School_Assessment_Scheme_and_Developmental_Stages.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 3000);
    } catch {
      window.open(docPdfUrl, "_blank");
    } finally {
      setTimeout(() => setIsDownloading(false), 800);
    }
  };

  // 1. Developmental Stages Framework Data (from official document)
  const developmentalStages = [
    {
      stage: "Foundational Stage – Early Years",
      classes: "Nursery, LKG, UKG",
      age: "3–6 years",
      focus: "Holistic development, language, early numeracy, physical, creative and socio-emotional development",
      badgeColor: "bg-sky-100 text-sky-800 border-sky-300",
    },
    {
      stage: "Foundational Stage – Primary",
      classes: "Grades 1–2",
      age: "6–8 years",
      focus: "Foundational literacy and numeracy (FLN), communication, curiosity and learning habits",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    },
    {
      stage: "Preparatory Stage",
      classes: "Grades 3–5",
      age: "8–11 years",
      focus: "Conceptual understanding, application, inquiry, problem solving and collaboration",
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
    },
    {
      stage: "Middle Stage",
      classes: "Grades 6–8",
      age: "11–14 years",
      focus: "Subject-specific understanding, critical thinking, application, higher-order thinking and independent learning",
      badgeColor: "bg-indigo-100 text-indigo-900 border-indigo-300",
    },
  ];

  // 2. Early Years Assessment Scheme (Nursery, Jr KG, Sr KG)
  const earlyYearsAssessment = [
    {
      stage: "Nursery",
      age: "Age 3-4 years",
      focus: "Socialization, motor coordination, verbal expression, and sensory play",
      components: [
        "Visual & auditory recognition",
        "Fine & gross motor development",
        "Self-care habits & social interaction",
        "Basic vocabulary & rhyme recitation",
      ],
    },
    {
      stage: "Junior KG",
      age: "Age 4-5 years",
      focus: "Pre-reading, pre-writing, basic numeracy, and environmental awareness",
      components: [
        "Letter-sound recognition (Phonics)",
        "Number identification & counting",
        "Pencil grip, tracing, & colouring skills",
        "Listening comprehension & storytelling",
      ],
    },
    {
      stage: "Senior KG",
      age: "Age 5-6 years",
      focus: "School readiness, simple sentence formation, basic addition/subtraction concepts",
      components: [
        "Sight word reading & sentence tracing",
        "Number sense, patterns, & simple math",
        "Logical thinking & classification",
        "Fine motor control & independent tasks",
      ],
    },
  ];

  // 3. Stage Wise Assessment Scheme (Std 1–8)
  const stageWiseAssessment = [
    {
      stage: "Foundational Stage",
      classes: "Classes 1 & 2",
      focus: "Stress-free learning, foundational literacy & numeracy (FLN)",
      scholastic: [
        "Continuous observation",
        "Oral assessments",
        "Classwork & activity performance",
        "Reading & speaking skills",
      ],
      coScholastic: "3-Point Grading Scale (A–C)",
      coScholasticDetails: "Focus on art, physical activity, personal traits, and habits",
    },
    {
      stage: "Preparatory Stage",
      classes: "Classes 3 to 5",
      focus: "Conceptual understanding, basic writing, and application",
      scholastic: [
        "Periodic / Unit Tests",
        "Term-end Written Assessments",
        "Subject Enrichment (Projects/Labs)",
        "Portfolio & Notebooks",
      ],
      coScholastic: "3-Point Grading Scale (A–C)",
      coScholasticDetails: "Art Education, Health & Physical Education, General Knowledge",
    },
    {
      stage: "Middle Stage",
      classes: "Classes 6 to 8",
      focus: "Higher-order thinking, critical analysis, subject specialization, and exam readiness",
      scholastic: [
        "Periodic Tests (PTs)",
        "Multiple Assessments (Quizzes, Vivas, Debates)",
        "Portfolio & Homework Submissions",
        "Subject Enrichment Activities",
        "Half-Yearly & Annual Examinations",
      ],
      coScholastic: "3-Point Grading Scale (A–C)",
      coScholasticDetails: "Art, Work Education, Physical Education, and Discipline/Attitude",
    },
  ];

  return (
    <InternalPageLayout
      title="Developmental Stages & Assessment Scheme"
      category="ACADEMICS"
      activePageId="academics-assessment"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage={bannerImage}
      breadcrumbs={[
        { label: "Academics", pageId: "academics" },
        { label: "Assessment Scheme" },
      ]}
    >
      <div className="space-y-10">
        {/* Header Title & Actions */}
        <div className="border-b-2 border-[#2F5187] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
              Official Evaluation Architecture
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
              Developmental Stages & Assessment Scheme
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              Progressive, competency-based framework aligned with NEP 2020, NCF, and CBSE guidelines.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsViewerOpen(true)}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#2F5187] font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-2 border border-slate-300"
            >
              <Eye className="w-4 h-4 text-[#2F5187]" />
              <span>View PDF</span>
            </button>
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="px-4 py-2.5 bg-[#E87737] hover:bg-[#D26425] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-2 shadow"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? "Downloading..." : "Download Official PDF"}</span>
            </button>
          </div>
        </div>

        {/* Lead Narrative */}
        <div className="p-5 rounded bg-[#F8FAFC] border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
          <p className="font-semibold text-[#2F5187]">
            Lotus Global School follows a holistic, developmentally appropriate and competency-based assessment framework aligned with the principles of NEP 2020, the National Curriculum Framework and CBSE guidelines.
          </p>
          <p>
            The assessment system is progressively structured according to the developmental stage of learners, moving from holistic developmental reporting in the Foundational Stage to competency-based and structured academic assessment in the Preparatory and Middle Stages. The school uses assessment to monitor learning progress, identify learning needs and support the overall academic and personal development of every learner.
          </p>
        </div>

        {/* 1. DEVELOPMENTAL STAGES TABLE */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <Layers className="w-5 h-5 text-[#2F5187]" />
            <h3 className="font-display font-bold text-xl text-[#2F5187]">
              Developmental Stages Overview
            </h3>
          </div>

          <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#2F5187] text-white uppercase text-[11px] tracking-wider">
                    <th className="p-3 border-r border-[#3d65a3] w-[25%]">Developmental Stage</th>
                    <th className="p-3 border-r border-[#3d65a3] w-[18%]">Classes</th>
                    <th className="p-3 border-r border-[#3d65a3] w-[15%]">Approx. Age</th>
                    <th className="p-3 w-[42%]">Key Developmental Focus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {developmentalStages.map((stage, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-white hover:bg-slate-50" : "bg-[#F8FAFC] hover:bg-slate-50"}
                    >
                      <td className="p-3 font-bold text-[#2F5187] border-r border-slate-200">
                        <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] border ${stage.badgeColor}`}>
                          {stage.stage}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-slate-800 border-r border-slate-200">
                        {stage.classes}
                      </td>
                      <td className="p-3 font-medium text-slate-600 border-r border-slate-200">
                        {stage.age}
                      </td>
                      <td className="p-3 text-slate-700 leading-relaxed">
                        {stage.focus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 2. SECTION A: NURSERY, LKG & UKG – FOUNDATIONAL STAGE */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#E87737]" />
              <h3 className="font-display font-bold text-xl text-[#2F5187]">
                A. Nursery, LKG & UKG – Foundational Stage Assessment
              </h3>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
              Stress-Free & Descriptive
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed italic bg-sky-50/70 p-3 rounded border border-sky-200 font-medium">
            "For the early years, assessment will be developmental, holistic and descriptive, rather than based primarily on marks or formal examinations."
          </p>

          <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#1E375F] text-white uppercase text-[11px] tracking-wider">
                    <th className="p-3 border-r border-[#2F5187] w-[22%]">Class / Stage</th>
                    <th className="p-3 border-r border-[#2F5187] w-[38%]">Primary Focus</th>
                    <th className="p-3 w-[40%]">Key Assessment Components</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {earlyYearsAssessment.map((item, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-white hover:bg-slate-50" : "bg-[#F8FAFC] hover:bg-slate-50"}
                    >
                      <td className="p-3 font-bold text-[#2F5187] border-r border-slate-200 align-top">
                        <div className="text-sm font-bold">{item.stage}</div>
                        <div className="text-[11px] font-normal text-slate-500">{item.age}</div>
                      </td>
                      <td className="p-3 font-medium text-slate-700 border-r border-slate-200 align-top leading-relaxed">
                        {item.focus}
                      </td>
                      <td className="p-3 align-top">
                        <ul className="space-y-1.5">
                          {item.components.map((comp, cIdx) => (
                            <li key={cIdx} className="flex items-start gap-1.5 text-slate-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{comp}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 3. SECTION B: STAGE WISE ASSESSMENT SCHEME: STD 1-8 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-[#2F5187]" />
              <h3 className="font-display font-bold text-xl text-[#2F5187]">
                B. Stage Wise Assessment Scheme: Std 1–8
              </h3>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
              Classes 1 to 8
            </span>
          </div>

          <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#2F5187] text-white uppercase text-[11px] tracking-wider">
                    <th className="p-3 border-r border-[#3d65a3] w-[20%]">Stage / Classes</th>
                    <th className="p-3 border-r border-[#3d65a3] w-[30%]">Primary Focus</th>
                    <th className="p-3 border-r border-[#3d65a3] w-[28%]">Key Assessment Components</th>
                    <th className="p-3 w-[22%]">Co-Scholastic & Skill Assessment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {stageWiseAssessment.map((stage, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-white hover:bg-slate-50" : "bg-[#F8FAFC] hover:bg-slate-50"}
                    >
                      <td className="p-3 font-bold text-[#2F5187] border-r border-slate-200 align-top">
                        <div className="text-xs font-bold">{stage.stage}</div>
                        <div className="text-[11px] font-semibold text-[#E87737]">{stage.classes}</div>
                      </td>
                      <td className="p-3 text-slate-700 border-r border-slate-200 align-top leading-relaxed font-medium">
                        {stage.focus}
                      </td>
                      <td className="p-3 border-r border-slate-200 align-top">
                        <ul className="space-y-1">
                          {stage.scholastic.map((item, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-1.5 text-slate-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#2F5187] shrink-0 mt-1.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="p-3 align-top space-y-1">
                        <span className="inline-block font-bold text-[#E87737] text-[11px] bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                          {stage.coScholastic}
                        </span>
                        <p className="text-[11px] text-slate-600 leading-snug">
                          {stage.coScholasticDetails}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 4. 3-POINT STANDARDIZED GRADING SCALE */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <BarChart3 className="w-5 h-5 text-[#E87737]" />
            <h3 className="font-display font-bold text-xl text-[#2F5187]">
              C. 3-Point Standardized Grading Scale (A–C)
            </h3>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg bg-white shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#1E375F] text-white uppercase text-[11px] tracking-wider">
                  <th className="p-3 border-r border-[#2F5187] w-[18%]">Grading Scale</th>
                  <th className="p-3 border-r border-[#2F5187] w-[22%]">Competency Benchmark</th>
                  <th className="p-3 w-[60%]">Qualitative Pedagogical Remark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {(scheme?.gradingScale || [
                  { grade: "A", marksRange: "Grade A", remark: "Outstanding – Demonstrates exceptional conceptual clarity, initiative, and subject mastery." },
                  { grade: "B", marksRange: "Grade B", remark: "Very Good – Demonstrates solid understanding, consistent effort, and practical application." },
                  { grade: "C", marksRange: "Grade C", remark: "Satisfactory / Developing – Meets basic learning standards with continuous teacher mentoring." },
                ]).map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-slate-50" : "bg-[#F8FAFC] hover:bg-slate-50"}>
                    <td className="p-3 font-extrabold text-[#E87737] text-sm border-r border-slate-200">
                      {row.grade}
                    </td>
                    <td className="p-3 font-semibold text-[#2F5187] border-r border-slate-200">
                      {row.marksRange}
                    </td>
                    <td className="p-3 text-slate-700 leading-relaxed font-medium">
                      {row.remark}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Promotion & Attendance Rules */}
        <div className="p-5 rounded bg-[#FFF5EE] border-l-4 border-[#E87737] space-y-1.5 text-xs text-slate-700">
          <span className="font-bold text-[#2F5187] uppercase block text-sm">
            Promotion Criteria & Attendance Policy
          </span>
          <p>
            Promotion to the subsequent grade requires a qualifying evaluation across foundational and stage-wise competencies along with a minimum 75% attendance across the academic term in accordance with CBSE affiliation norms and state education benchmarks.
          </p>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      <PdfViewerModal
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        title="Developmental Stages and Assessment Scheme"
        subtitle="Lotus Global School, Vata – Official Policy Framework (NEP 2020 Aligned)"
        fileUrl={docPdfUrl}
        onDownload={handleDownloadPdf}
        isDownloading={isDownloading}
      />
    </InternalPageLayout>
  );
};
