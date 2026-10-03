import { SiteData } from "../data/siteDataService";

export interface SearchResultItem {
  id: string;
  title: string;
  category: "Admissions" | "Academics" | "Facilities" | "Faculty" | "Documents" | "Notices & News" | "About & Campus" | "Contact";
  categoryBadge: string;
  description: string;
  pageId: string;
  url?: string;
  fileUrl?: string;
  iconType: "book" | "file" | "facility" | "faculty" | "admission" | "calendar" | "phone" | "about" | "activity";
  keywords: string[];
  relevanceScore?: number;
}

export interface PopularSearchSuggestion {
  query: string;
  label: string;
  targetPageId: string;
  category: string;
}

export const POPULAR_SEARCH_SUGGESTIONS: PopularSearchSuggestion[] = [
  { query: "Admissions 2026-27", label: "Admissions 2026-27", targetPageId: "admissions", category: "Admissions" },
  { query: "Fee Structure", label: "Fee Structure (2026-27)", targetPageId: "admissions-fee", category: "Admissions" },
  { query: "Prescribed Books", label: "NCERT Book List", targetPageId: "academics-books", category: "Academics" },
  { query: "Central Library", label: "Central Library", targetPageId: "facility-library", category: "Facilities" },
  { query: "Computer Lab", label: "Computer & Robotics Lab", targetPageId: "facility-computer-lab", category: "Facilities" },
  { query: "Science Labs", label: "Physics & Chemistry Labs", targetPageId: "facility-chem-phys", category: "Facilities" },
  { query: "Mandatory Disclosure", label: "CBSE Mandatory Disclosure", targetPageId: "disclosure", category: "Documents" },
  { query: "School Timings", label: "School Timings & Routine", targetPageId: "academics-timings", category: "Academics" },
  { query: "Faculty Members", label: "Faculty & Educators", targetPageId: "faculty", category: "Faculty" },
  { query: "Contact & Location", label: "Contact Us & Campus Map", targetPageId: "contact", category: "Contact" },
];

/**
 * Common synonyms and intent aliases to provide instant high-precision matches
 */
const QUERY_SYNONYMS: Record<string, string[]> = {
  fee: ["fee", "fees", "cost", "tuition", "charge", "charges", "instalment", "payment", "rupees"],
  fees: ["fee", "fees", "cost", "tuition", "charge", "charges", "instalment", "payment"],
  admission: ["admission", "admissions", "apply", "enrol", "enroll", "enrollment", "registration", "entry", "seat"],
  admissions: ["admission", "admissions", "apply", "enrol", "enroll", "enrollment", "registration", "entry", "seat"],
  book: ["book", "books", "textbook", "textbooks", "ncert", "syllabus", "subject", "curriculum"],
  books: ["book", "books", "textbook", "textbooks", "ncert", "syllabus", "subject", "curriculum"],
  math: ["math", "maths", "mathematics", "arithmetic", "algebra", "geometry", "calculation"],
  maths: ["math", "maths", "mathematics", "arithmetic", "algebra", "geometry", "calculation"],
  mathematics: ["math", "maths", "mathematics", "arithmetic", "algebra", "geometry"],
  science: ["science", "physics", "chemistry", "biology", "stem", "experiments", "scientific"],
  physics: ["physics", "science", "lab", "apparatus"],
  chemistry: ["chemistry", "science", "lab", "chemicals"],
  biology: ["biology", "science", "lab", "microscope", "specimens"],
  library: ["library", "reading", "books", "novels", "literature", "sanctum"],
  computer: ["computer", "computers", "it", "ict", "robotics", "coding", "programming", "software", "digital"],
  robotics: ["robotics", "robot", "computer", "coding", "stem"],
  sports: ["sport", "sports", "football", "cricket", "basketball", "volleyball", "athletics", "playground", "games", "turf"],
  sport: ["sport", "sports", "football", "cricket", "basketball", "volleyball", "athletics", "playground", "games", "turf"],
  indoor: ["indoor", "chess", "carrom", "table tennis", "board games"],
  music: ["music", "dance", "song", "instruments", "performing arts", "theatre"],
  medical: ["medical", "health", "doctor", "nurse", "infirmary", "first aid", "sick room", "clinic"],
  infirmary: ["infirmary", "medical", "health", "doctor", "nurse", "first aid", "clinic"],
  timing: ["timing", "timings", "time", "hours", "routine", "schedule", "bell", "assembly", "recess"],
  timings: ["timing", "timings", "time", "hours", "routine", "schedule", "bell", "assembly", "recess"],
  exam: ["exam", "exams", "examination", "test", "tests", "assessment", "marks", "grading", "evaluation"],
  exams: ["exam", "exams", "examination", "test", "tests", "assessment", "marks", "grading", "evaluation"],
  assessment: ["assessment", "exam", "examination", "evaluation", "grading", "marks", "test"],
  teacher: ["teacher", "teachers", "faculty", "staff", "educator", "educators", "mentor", "mentors"],
  teachers: ["teacher", "teachers", "faculty", "staff", "educator", "educators", "mentor", "mentors"],
  faculty: ["faculty", "teachers", "staff", "educators", "mentors", "sir", "madam"],
  principal: ["principal", "director", "head", "desk", "leadership", "management", "message"],
  director: ["principal", "director", "head", "desk", "leadership", "management", "message"],
  disclosure: ["disclosure", "cbse", "saras", "appendix", "affiliation", "mandatory", "safety", "fire", "building"],
  cbse: ["cbse", "affiliation", "disclosure", "saras", "ncert", "board"],
  document: ["document", "documents", "pdf", "download", "downloads", "prospectus", "certificate", "certificates"],
  documents: ["document", "documents", "pdf", "download", "downloads", "prospectus", "certificate", "certificates"],
  contact: ["contact", "phone", "email", "address", "number", "call", "whatsapp", "location", "map", "vatar", "vapi"],
  gallery: ["gallery", "photo", "photos", "pic", "pics", "picture", "pictures", "image", "images", "videos"],
  photos: ["gallery", "photo", "photos", "pic", "pics", "picture", "pictures", "image", "images"],
  transport: ["transport", "bus", "van", "route", "commute", "travel", "pick up", "drop"],
  bus: ["transport", "bus", "van", "route", "commute", "travel"],
  uniform: ["uniform", "dress", "routine", "rules", "regulations", "guidelines"],
  nursery: ["nursery", "kg", "kindergarten", "pre-primary", "foundational", "early years", "playgroup"],
  grade: ["grade", "grades", "class", "classes", "standard", "std"],
  class: ["grade", "grades", "class", "classes", "standard", "std"],
};

/**
 * Builds a comprehensive search index combining institutional static pages and dynamic CMS content
 */
export const buildSearchIndex = (siteData?: SiteData | null): SearchResultItem[] => {
  const items: SearchResultItem[] = [
    // --- 1. ADMISSIONS PAGES ---
    {
      id: "page-admissions",
      title: "Admissions Pathway (4-Step Process)",
      category: "Admissions",
      categoryBadge: "Admissions",
      description: "Complete guide on online registration, interaction, document verification, and seat confirmation for Nursery to Grade 10.",
      pageId: "admissions",
      iconType: "admission",
      keywords: ["admission", "admissions", "apply", "register", "registration", "pathway", "entry", "steps", "application form", "seats", "academic year 2026-27"],
    },
    {
      id: "page-fee-structure",
      title: "Approved Fee Structure (2026–27)",
      category: "Admissions",
      categoryBadge: "Fees",
      description: "Official schedule of tuition fees, admission fees, term instalments, and transparent fee policies for Pre-Primary to Grade 8.",
      pageId: "admissions-fee",
      iconType: "file",
      keywords: ["fee", "fees", "fee structure", "tuition", "cost", "payment", "instalment", "quarterly", "admission charges", "annual fees"],
    },
    {
      id: "page-admissions-documents",
      title: "Mandatory Document Checklist",
      category: "Admissions",
      categoryBadge: "Documents",
      description: "List of required certificates: Birth Certificate, Transfer Certificate (TC), Aadhaar cards, report cards, and photographs.",
      pageId: "admissions-documents",
      iconType: "file",
      keywords: ["documents required", "document checklist", "certificates", "birth certificate", "transfer certificate", "tc", "aadhaar", "marksheet"],
    },
    {
      id: "page-admissions-eligibility",
      title: "Eligibility & Age Criteria",
      category: "Admissions",
      categoryBadge: "Admissions",
      description: "Grade-wise entry age requirements as on June 1st conforming to National Education Policy (NEP 2020) norms.",
      pageId: "admissions-eligibility",
      iconType: "admission",
      keywords: ["eligibility", "age criteria", "minimum age", "cut off date", "nursery age", "jr kg", "sr kg", "class 1 age", "nep 2020"],
    },
    {
      id: "page-admissions-inquiry",
      title: "Admissions Inquiry & Counselor Desk",
      category: "Admissions",
      categoryBadge: "Inquiry",
      description: "Submit your admission inquiry or schedule a personalized consultation with our admissions team.",
      pageId: "admissions-inquiry",
      iconType: "admission",
      keywords: ["inquiry", "enquiry desk", "apply now", "admission counselor", "schedule visit", "contact admissions", "form"],
    },

    // --- 2. ACADEMICS PAGES ---
    {
      id: "page-academics",
      title: "NCERT Curriculum Framework",
      category: "Academics",
      categoryBadge: "Curriculum",
      description: "Comprehensive NCERT syllabus aligned with CBSE guidelines, focusing on experiential learning, critical thinking, and NEP 2020.",
      pageId: "academics",
      iconType: "book",
      keywords: ["academics", "curriculum", "ncert", "cbse pattern", "syllabus", "subjects", "pedagogy", "nep 2020", "learning framework"],
    },
    {
      id: "page-academics-stages",
      title: "Developmental Stages (Nursery to Grade 10)",
      category: "Academics",
      categoryBadge: "Stages",
      description: "Pedagogical breakdown across Foundational Stage, Preparatory Stage, Middle School, and Secondary School.",
      pageId: "academics-stages",
      iconType: "book",
      keywords: ["developmental stages", "foundational stage", "preparatory stage", "middle stage", "secondary stage", "classes", "grades", "pre-primary", "primary"],
    },
    {
      id: "page-academics-assessment",
      title: "Assessment & Examination Scheme",
      category: "Academics",
      categoryBadge: "Examinations",
      description: "Continuous and Comprehensive Evaluation (CCE), Periodic Assessments (PA1, PA2), Half-Yearly, and Annual Examinations.",
      pageId: "academics-assessment",
      iconType: "book",
      keywords: ["assessment", "exam", "exams", "examination", "scheme", "periodic test", "evaluations", "grading", "marks", "cce", "half yearly", "annual exam", "report card"],
    },
    {
      id: "page-academics-timings",
      title: "Daily School Timings & Routine",
      category: "Academics",
      categoryBadge: "Routine",
      description: "Morning assembly timings, period breakdown, recess/lunch intervals, dismissal times, uniform guidelines, and daily attendance rules.",
      pageId: "academics-timings",
      iconType: "calendar",
      keywords: ["school timings", "timing", "timings", "hours", "daily routine", "schedule", "assembly", "recess", "lunch", "bell", "uniform", "rules", "attendance"],
    },
    {
      id: "page-academics-books",
      title: "Prescribed NCERT Textbook List (Classes VI–VIII)",
      category: "Academics",
      categoryBadge: "Textbooks",
      description: "Complete list of official NCERT textbooks for English (Honeydew/Honeycomb), Mathematics, Science, Social Science, Hindi, and Sanskrit.",
      pageId: "academics-books",
      iconType: "book",
      keywords: ["books", "book list", "textbooks", "ncert books", "class 6", "class 7", "class 8", "mathematics", "science", "english", "hindi", "sanskrit", "social science"],
    },

    // --- 3. CAMPUS FACILITIES PAGES ---
    {
      id: "page-facilities-overview",
      title: "Campus Infrastructure & Laboratories Overview",
      category: "Facilities",
      categoryBadge: "Campus",
      description: "Explore all modern learning amenities, composite labs, athletic zones, and digital infrastructure at Lotus Global School.",
      pageId: "facilities",
      iconType: "facility",
      keywords: ["facilities", "infrastructure", "campus", "amenities", "classrooms", "smart boards", "campus facilities"],
    },
    {
      id: "page-facility-chem-phys",
      title: "Chemistry & Physics Laboratories",
      category: "Facilities",
      categoryBadge: "Laboratories",
      description: "Fully equipped empirical scientific labs with high-grade optical benches, calorimeters, safety stations, and chemical apparatus.",
      pageId: "facility-chem-phys",
      iconType: "facility",
      keywords: ["physics lab", "chemistry lab", "science lab", "experiments", "practical", "apparatus", "scientific inquiry", "stem"],
    },
    {
      id: "page-facility-bio-composite",
      title: "Biology & Composite Science Lab",
      category: "Facilities",
      categoryBadge: "Laboratories",
      description: "Modern biological exploration lab with binocular microscopes, anatomical models, botanical specimens, and experiential observation bays.",
      pageId: "facility-bio-composite",
      iconType: "facility",
      keywords: ["biology lab", "composite lab", "composite science", "microscope", "specimens", "dissection", "botany", "zoology"],
    },
    {
      id: "page-facility-computer-lab",
      title: "Computer & Robotics Laboratory",
      category: "Facilities",
      categoryBadge: "Tech & Coding",
      description: "Digital workstation facility with high-speed child-safe firewall network, coding software, AI modules, and robotics kits.",
      pageId: "facility-computer-lab",
      iconType: "facility",
      keywords: ["computer lab", "computers", "it lab", "robotics", "coding", "programming", "artificial intelligence", "digital literacy", "firewall"],
    },
    {
      id: "page-facility-library",
      title: "Central Library & Reading Sanctum",
      category: "Facilities",
      categoryBadge: "Library",
      description: "Spacious literary haven stocked with curriculum references, classic fiction, journals, encyclopedias, and quiet study alcoves.",
      pageId: "facility-library",
      iconType: "book",
      keywords: ["library", "central library", "reading sanctum", "books", "novels", "periodicals", "encyclopedia", "study room", "reading"],
    },
    {
      id: "page-facility-sports",
      title: "Outdoor Sports Complex & Athletic Grounds",
      category: "Facilities",
      categoryBadge: "Athletics",
      description: "Multi-sport outdoor grounds for football, cricket, basketball, volleyball, athletics tracks, and physical fitness conditioning.",
      pageId: "facility-sports",
      iconType: "activity",
      keywords: ["outdoor sports", "sports complex", "football", "cricket", "basketball", "volleyball", "athletics", "ground", "playground", "sports turf"],
    },
    {
      id: "page-facility-indoor-games",
      title: "Indoor Games & Recreational Arena",
      category: "Facilities",
      categoryBadge: "Indoor Sports",
      description: "Indoor arena equipped with tournament-standard table tennis, carrom boards, chess tables, and tactical strategy games.",
      pageId: "facility-indoor-games",
      iconType: "activity",
      keywords: ["indoor games", "indoor sports", "table tennis", "chess", "carrom", "board games", "recreation", "ping pong"],
    },
    {
      id: "page-facility-music",
      title: "Music & Performing Arts Studio",
      category: "Facilities",
      categoryBadge: "Performing Arts",
      description: "Acoustically treated studio providing vocal instruction, classical and western instruments (keyboards, drums, guitar), and dance.",
      pageId: "facility-music",
      iconType: "activity",
      keywords: ["music studio", "music", "dance", "theatre", "performing arts", "instruments", "singing", "guitar", "keyboard", "drums"],
    },
    {
      id: "page-facility-infirmary",
      title: "Campus Infirmary & Medical Care",
      category: "Facilities",
      categoryBadge: "Healthcare",
      description: "Dedicated healthcare center staffed with a qualified nurse, emergency first-aid station, regular health checkups, and ambulance liaison.",
      pageId: "facility-infirmary",
      iconType: "facility",
      keywords: ["infirmary", "medical care", "health", "first aid", "nurse", "doctor", "health checkup", "emergency", "sick room", "clinic"],
    },

    // --- 4. FACULTY & TEACHING STANDARDS ---
    {
      id: "page-faculty",
      title: "Faculty & Educators Directory",
      category: "Faculty",
      categoryBadge: "Educators",
      description: "Meet our qualified and passionate educators across STEM, Languages, Humanities, Creative Arts, and Physical Education.",
      pageId: "faculty",
      iconType: "faculty",
      keywords: ["faculty", "teachers", "educators", "teaching staff", "mentors", "instructor", "faculty directory"],
    },
    {
      id: "page-faculty-standards",
      title: "Teaching Standards & Qualifications",
      category: "Faculty",
      categoryBadge: "Standards",
      description: "Rigorous educator selection standards, B.Ed/M.Ed credentials, pedagogical empathy, and child-safe background vetting.",
      pageId: "faculty-standards",
      iconType: "faculty",
      keywords: ["teaching standards", "teacher qualifications", "b.ed", "pedagogy", "selection standards", "recruitment"],
    },
    {
      id: "page-faculty-development",
      title: "Faculty Professional Development (CPD)",
      category: "Faculty",
      categoryBadge: "Training",
      description: "Continuous professional development programs, CBSE capacity building workshops, and modern tech integration training.",
      pageId: "faculty-development",
      iconType: "faculty",
      keywords: ["cpd", "professional development", "teacher training", "cbse workshops", "continuous professional development"],
    },
    {
      id: "page-faculty-ratio",
      title: "Student-Teacher Ratio & Mentorship",
      category: "Faculty",
      categoryBadge: "Mentorship",
      description: "Optimal low student-teacher ratio ensuring individual academic tracking, emotional support, and personalized learning pace.",
      pageId: "faculty-ratio",
      iconType: "faculty",
      keywords: ["student teacher ratio", "mentorship", "individual attention", "class size", "tracking", "personal care"],
    },

    // --- 5. ABOUT US & LEADERSHIP ---
    {
      id: "page-about",
      title: "About Lotus Global School",
      category: "About & Campus",
      categoryBadge: "About Us",
      description: "Institutional background, founding philosophy, architectural campus features, and commitment to holistic child development.",
      pageId: "about",
      iconType: "about",
      keywords: ["about", "about us", "overview", "lotus global school", "background", "history", "philosophy", "institution"],
    },
    {
      id: "page-message",
      title: "The Principal's Desk & Leadership Messages",
      category: "About & Campus",
      categoryBadge: "Leadership",
      description: "Inspiring addresses from the Principal and School Management on academic dedication, values, and student growth.",
      pageId: "message",
      iconType: "faculty",
      keywords: ["principal", "director", "principals desk", "leadership", "message", "management", "trustees", "president", "head of school"],
    },
    {
      id: "page-vision-mission",
      title: "Our Vision & Mission",
      category: "About & Campus",
      categoryBadge: "Philosophy",
      description: "Our guiding vision to empower conscientious global citizens, our mission of experiential education, and foundational creed.",
      pageId: "vision-mission",
      iconType: "about",
      keywords: ["vision", "mission", "vision and mission", "motto", "creed", "core purpose", "principles", "educational philosophy"],
    },
    {
      id: "page-about-values",
      title: "Core Values & Institutional Creed",
      category: "About & Campus",
      categoryBadge: "Values",
      description: "The core values shaping student character: Integrity, Diligence, Compassion, Respect, and Global Citizenship.",
      pageId: "about-values",
      iconType: "about",
      keywords: ["core values", "values", "creed", "integrity", "diligence", "discipline", "empathy", "respect", "character"],
    },
    {
      id: "page-about-location",
      title: "Campus Location, Route & Connectivity",
      category: "About & Campus",
      categoryBadge: "Location",
      description: "Directions to the campus at Vatar, Vapi, Gujarat, including nearest highway access, landmarks, and school transport radius.",
      pageId: "about-location",
      iconType: "about",
      keywords: ["location", "campus location", "map", "vatar", "vapi", "gujarat", "address", "directions", "route", "bus route", "transport"],
    },

    // --- 6. ACTIVITIES & CO-CURRICULAR ---
    {
      id: "page-activities",
      title: "Co-Curricular Activities & Student Clubs",
      category: "Academics",
      categoryBadge: "Co-Curricular",
      description: "Student clubs, visual arts, debate society, science fairs, annual cultural events, and the Four-House leadership council.",
      pageId: "activities",
      iconType: "activity",
      keywords: ["activities", "co-curricular", "clubs", "houses", "four houses", "house system", "annual day", "sports day", "debate", "competitions"],
    },
    {
      id: "page-gallery",
      title: "Campus Photo & Video Gallery",
      category: "About & Campus",
      categoryBadge: "Gallery",
      description: "Visual glimpses of campus architecture, academic activities, sports tournaments, cultural performances, and science exhibitions.",
      pageId: "gallery",
      iconType: "about",
      keywords: ["gallery", "photos", "pictures", "images", "videos", "campus life", "annual day photos", "sports photos", "exhibitions"],
    },
    {
      id: "page-virtual-tour",
      title: "Virtual Tour Demo (360° Campus Walk)",
      category: "About & Campus",
      categoryBadge: "Virtual Tour",
      description: "Interactive virtual tour exploring classrooms, scientific laboratories, sports grounds, and the central library.",
      pageId: "virtual-tour-demo",
      iconType: "about",
      keywords: ["virtual tour", "360 tour", "campus tour", "walkthrough", "demo tour", "interactive"],
    },

    // --- 7. OFFICIAL DOCUMENTS & REGULATORY DISCLOSURES ---
    {
      id: "page-disclosure",
      title: "CBSE Mandatory Public Disclosure (Appendix-IX)",
      category: "Documents",
      categoryBadge: "Regulatory",
      description: "Statutory disclosure conforming to CBSE SARAS norms: Building Safety, Fire Safety, Water & Sanitation, Affiliation, and Academic Disclosures.",
      pageId: "disclosure",
      iconType: "file",
      keywords: ["mandatory disclosure", "cbse disclosure", "appendix-ix", "saras", "affiliation", "building safety", "fire safety", "deo certificate", "noc", "sanitation", "water safety", "smc", "pta"],
    },
    {
      id: "page-documents",
      title: "Documents & Downloads Repository",
      category: "Documents",
      categoryBadge: "Downloads",
      description: "Downloadable PDF files including School Prospectus, Admission Registration Dossier, Book Lists, and Official Circulars.",
      pageId: "documents",
      iconType: "file",
      keywords: ["documents", "downloads", "pdf", "prospectus", "admission form", "download pdf", "circulars", "official documents"],
    },

    // --- 8. NEWS, EVENTS & CONTACT ---
    {
      id: "page-news-events",
      title: "Latest News, Circulars & Upcoming Events",
      category: "Notices & News",
      categoryBadge: "Announcements",
      description: "Stay informed with official circulars, parent notices, upcoming academic schedules, and extracurricular announcements.",
      pageId: "news-events",
      iconType: "calendar",
      keywords: ["news", "events", "circulars", "notices", "announcements", "upcoming events", "bulletin", "rte notice"],
    },
    {
      id: "page-contact",
      title: "Contact Us & Campus Visit Helpdesk",
      category: "Contact",
      categoryBadge: "Contact",
      description: "Get in touch via phone, official email, or WhatsApp. Details on school visiting hours and administrative helpdesk.",
      pageId: "contact",
      iconType: "phone",
      keywords: ["contact", "contact us", "phone", "email", "whatsapp", "call", "address", "visit campus", "visiting hours", "office phone"],
    },
  ];

  // Dynamic CMS enhancements from live siteData
  if (siteData) {
    // 1. Dynamic Documents from CMS
    if (Array.isArray(siteData.documents)) {
      siteData.documents.forEach((doc) => {
        if (doc.active === false) return;
        items.push({
          id: `doc-${doc.id}`,
          title: doc.title,
          category: "Documents",
          categoryBadge: doc.category || "Document",
          description: doc.description || `Official downloadable school document: ${doc.title}`,
          pageId: "documents",
          fileUrl: doc.fileUrl,
          iconType: "file",
          keywords: [
            doc.title.toLowerCase(),
            doc.category ? doc.category.toLowerCase() : "document",
            "pdf",
            "download",
            doc.fileName ? doc.fileName.toLowerCase() : "",
          ],
        });
      });
    }

    // 2. Dynamic Faculty Members from CMS
    if (Array.isArray(siteData.faculty)) {
      siteData.faculty.forEach((fac) => {
        if (fac.active === false) return;
        items.push({
          id: `faculty-${fac.id}`,
          title: `${fac.name} (${fac.designation})`,
          category: "Faculty",
          categoryBadge: "Teacher",
          description: `${fac.subject} · ${fac.description || "Educator at Lotus Global School"}`,
          pageId: "faculty",
          iconType: "faculty",
          keywords: [
            fac.name.toLowerCase(),
            fac.designation.toLowerCase(),
            fac.subject ? fac.subject.toLowerCase() : "",
            "teacher",
            "faculty",
          ],
        });
      });
    }

    // 3. Dynamic Notices from CMS
    if (Array.isArray(siteData.notices)) {
      siteData.notices.forEach((notice) => {
        if (notice.active === false) return;
        items.push({
          id: `notice-${notice.id}`,
          title: notice.title,
          category: "Notices & News",
          categoryBadge: "Notice",
          description: notice.summary || "Official school notice and circular.",
          pageId: notice.link || "news-events",
          iconType: "calendar",
          keywords: [
            notice.title.toLowerCase(),
            notice.category ? notice.category.toLowerCase() : "",
            "notice",
            "circular",
            "announcement",
          ],
        });
      });
    }

    // 4. Dynamic News & Events from CMS
    if (Array.isArray(siteData.news)) {
      siteData.news.forEach((newsItem) => {
        items.push({
          id: `news-${newsItem.id}`,
          title: newsItem.title,
          category: "Notices & News",
          categoryBadge: "News",
          description: newsItem.summary || "Latest campus news and achievement update.",
          pageId: "news-events",
          iconType: "calendar",
          keywords: [newsItem.title.toLowerCase(), "news", "update", "article"],
        });
      });
    }

    if (Array.isArray(siteData.events)) {
      siteData.events.forEach((eventItem) => {
        items.push({
          id: `event-${eventItem.id}`,
          title: `${eventItem.title} (${eventItem.date})`,
          category: "Notices & News",
          categoryBadge: "Event",
          description: eventItem.description || `Upcoming event in ${eventItem.category || "Campus Life"}`,
          pageId: "news-events",
          iconType: "calendar",
          keywords: [
            eventItem.title.toLowerCase(),
            eventItem.category ? eventItem.category.toLowerCase() : "",
            "event",
            "upcoming",
            "calendar",
          ],
        });
      });
    }

    // 5. Dynamic Facilities from CMS
    if (Array.isArray(siteData.facilities)) {
      siteData.facilities.forEach((fac) => {
        // Map facility to its specific subpage if applicable
        const pageId =
          fac.id === "fac-physics-chemistry"
            ? "facility-chem-phys"
            : fac.id === "fac-biology-composite"
            ? "facility-bio-composite"
            : fac.id === "fac-computer-robotics"
            ? "facility-computer-lab"
            : fac.id === "fac-central-library"
            ? "facility-library"
            : fac.id === "fac-outdoor-sports"
            ? "facility-sports"
            : fac.id === "fac-indoor-games"
            ? "facility-indoor-games"
            : fac.id === "fac-music-arts"
            ? "facility-music"
            : fac.id === "fac-infirmary"
            ? "facility-infirmary"
            : "facilities";

        items.push({
          id: `facility-${fac.id}`,
          title: fac.name,
          category: "Facilities",
          categoryBadge: fac.category || "Facility",
          description: fac.tagline || fac.description || "State-of-the-art campus learning amenity.",
          pageId: pageId,
          iconType: "facility",
          keywords: [
            fac.name.toLowerCase(),
            fac.tagline ? fac.tagline.toLowerCase() : "",
            ...(Array.isArray(fac.features) ? fac.features.map((f: string) => f.toLowerCase()) : []),
            "facility",
            "lab",
          ],
        });
      });
    }
  }

  return items;
};

/**
 * Searches the compiled index with keyword relevance scoring and intelligent synonym expansion
 */
export const searchSchoolContent = (
  rawQuery: string,
  siteData?: SiteData | null,
  limit: number = 10
): SearchResultItem[] => {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return [];

  const index = buildSearchIndex(siteData);
  const queryTerms = query.split(/\s+/).filter((t) => t.length > 0);

  // Expand query with synonyms
  const expandedTerms = new Set<string>(queryTerms);
  queryTerms.forEach((term) => {
    if (QUERY_SYNONYMS[term]) {
      QUERY_SYNONYMS[term].forEach((syn) => expandedTerms.add(syn));
    }
    // Also check for partial synonym matches
    Object.keys(QUERY_SYNONYMS).forEach((key) => {
      if (term.includes(key) || key.includes(term)) {
        QUERY_SYNONYMS[key].forEach((syn) => expandedTerms.add(syn));
      }
    });
  });

  const termsArray = Array.from(expandedTerms);

  const scoredItems: SearchResultItem[] = [];

  for (const item of index) {
    const titleLower = item.title.toLowerCase();
    const descLower = item.description.toLowerCase();
    const catLower = item.category.toLowerCase();
    const keywordsLower = item.keywords.join(" ").toLowerCase();

    let score = 0;

    // 1. Exact query match in title
    if (titleLower === query) {
      score += 200;
    } else if (titleLower.startsWith(query)) {
      score += 120;
    } else if (titleLower.includes(query)) {
      score += 80;
    }

    // 2. Query in keywords or category
    if (keywordsLower.includes(query)) {
      score += 50;
    }
    if (catLower.includes(query)) {
      score += 30;
    }
    if (descLower.includes(query)) {
      score += 25;
    }

    // 3. Multi-term scoring
    let matchedOriginalTerms = 0;
    for (const term of queryTerms) {
      let termMatched = false;
      if (titleLower.includes(term)) {
        score += 35;
        termMatched = true;
      }
      if (keywordsLower.includes(term)) {
        score += 20;
        termMatched = true;
      }
      if (descLower.includes(term)) {
        score += 10;
        termMatched = true;
      }
      if (termMatched) {
        matchedOriginalTerms++;
      }
    }

    // Bonus if all original user terms matched
    if (queryTerms.length > 1 && matchedOriginalTerms === queryTerms.length) {
      score += 60;
    }

    // 4. Synonym match bonus
    for (const term of termsArray) {
      if (!queryTerms.includes(term)) {
        if (titleLower.includes(term)) score += 25;
        if (keywordsLower.includes(term)) score += 15;
        if (descLower.includes(term)) score += 8;
      }
    }

    // 5. Prefix / Stem match bonus (e.g. math -> mathematics, teach -> teacher, class -> classes)
    for (const term of queryTerms) {
      if (term.length >= 4) {
        const root = term.slice(0, 4);
        if (titleLower.includes(root)) score += 20;
        if (keywordsLower.includes(root)) score += 12;
      }
    }

    if (score > 0) {
      scoredItems.push({
        ...item,
        relevanceScore: score,
      });
    }
  }

  // Sort descending by score, deduplicate by pageId if identical title
  scoredItems.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));

  const seenIds = new Set<string>();
  const uniqueItems: SearchResultItem[] = [];

  for (const item of scoredItems) {
    const key = `${item.pageId}::${item.title}`;
    if (!seenIds.has(key)) {
      seenIds.add(key);
      uniqueItems.push(item);
      if (uniqueItems.length >= limit) break;
    }
  }

  return uniqueItems;
};
