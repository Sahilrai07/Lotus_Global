export interface FacilityItem {
  id: string;
  name: string;
  category: "Learn" | "Explore" | "Create" | "Perform";
  tagline: string;
  description: string;
  features: string[];
  image: string;
}

export interface DocumentItem {
  name: string;
  description: string;
  required: boolean;
}

export interface AdmissionStep {
  step: string;
  title: string;
  summary: string;
  details: string;
}

export const SCHOOL_INFO = {
  name: "Lotus Global School",
  affiliationStatus: "Proposed CBSE Institution",
  curriculum: "NCERT Curriculum Framework",
  grades: "Nursery to Grade 10",
  location: "Vatar, Vapi, Gujarat",
  address: "Lotus Global School, 1836/1 TO 1836/3, Near Vatar PHC, Vatar, Vapi, Gujarat 396191",
  phone: "9054592424",
  email: "lotusglobalschool@gmail.com",
  whatsapp: "9054592424",
  instagramUrl: "https://www.instagram.com/lotus.global.school",
  motto: "Dedication · Diligence · Discipline",
  mottoValues: {
    dedication: {
      title: "Dedication",
      short: "Commitment, Community & Purpose",
      full: "Cultivating steadfast commitment to personal growth, ethical responsibility, and the wider community. We inspire students to approach their learning journey with unwavering purpose.",
    },
    diligence: {
      title: "Diligence",
      short: "Curiosity, Rigor & Intellectual Development",
      full: "Fostering sustained intellectual curiosity, critical inquiry, and the perseverance required to master complex challenges through active discovery rather than passive instruction.",
    },
    discipline: {
      title: "Discipline",
      short: "Character, Consistency & Resilience",
      full: "Instilling internal discipline, emotional maturity, and mutual respect. Consistency of character empowers young learners to adapt and lead in a rapidly shifting world.",
    },
  },
  narrative: {
    heroTagline: "A New Generation of Learning Begins Here",
    heroSubtext: "An ambitious institution rising in Vatar, Vapi, designed to rethink modern education. Bridging academic innovation with enduring values from Nursery to Grade 10.",
    leadParagraph: "Welcome to Lotus Global School, an ambitious CBSE institution rising in Vatar, Vapi, designed to rethink modern education. Built on the belief that learning should inspire rather than instruct, our campus bridges cutting-edge academic innovation with deep-rooted values to shape the leaders, thinkers, and changemakers of tomorrow.",
    pedagogy: "At Lotus Global School, we replace passive learning with active discovery. Through immersive STEM programs, experiential arts, tech-enabled smart classrooms, and dynamic sports infrastructure, we create an ecosystem where curiosity drives excellence.",
    outlook: "Our forward-thinking curriculum fosters critical inquiry, emotional intelligence, and global perspectives, ensuring every student acquires the agility and resilience needed to thrive in a rapidly shifting world.",
    closing: "Here, innovation meets purpose—empowering young minds to explore limitlessly and lead with impact.",
  },
};

export const ACADEMIC_STAGES = [
  {
    phase: "Foundation Stage",
    levels: "Nursery, LKG, UKG",
    focus: "Early Literacy, Motor Coordination & Joy of Play",
    description: "Nurturing early childhood curiosity through hands-on sensory exploration, storycraft, rhythm, and cooperative play in a safe, stimulating environment.",
  },
  {
    phase: "Preparatory Stage",
    levels: "Grade 1 to Grade 3",
    focus: "Foundational Numeracy, Language & Activity-Based Inquiry",
    description: "Building confident literacy, logical thinking, and foundational sciences through interactive visual learning and structured inquiry.",
  },
  {
    phase: "Middle Stage",
    levels: "Grade 4 to Grade 7",
    focus: "Critical Inquiry, Scientific Method & Experiential Arts",
    description: "Transitioning to specialized disciplines across STEM, humanities, and creative expressions with rigorous laboratory work and collaborative projects.",
  },
  {
    phase: "Secondary Stage",
    levels: "Grade 8 to Grade 10",
    focus: "Analytical Rigor, Board Preparation & Leadership Agility",
    description: "Synthesizing deep conceptual comprehension, independent research, board-examination readiness, and strategic problem-solving.",
  },
];

export const ASSESSMENT_STRUCTURE = {
  scholastic: {
    title: "Scholastic Assessment",
    summary: "Rigorous academic appraisal evaluating conceptual mastery, analytical reasoning, and subject competencies.",
    components: [
      { name: "Periodic Examination", note: "Regular diagnostic milestones tracking formative understanding across terms" },
      { name: "Term Examination", note: "Comprehensive summative evaluation synthesizing curriculum standards" },
    ],
  },
  coScholastic: {
    title: "Co-Scholastic Assessment",
    summary: "Comprehensive evaluation of character, collaboration, physical development, and creative expression.",
    components: [
      { name: "Holistic Development", note: "Observation of values, discipline, peer collaboration, and emotional quotient" },
      { name: "Sports & Wellness", note: "Physical stamina, sportsmanship, and personal wellness" },
      { name: "Creative & Performing Arts", note: "Aesthetic appreciation, visual design, and musical expression" },
    ],
  },
};

export const FACILITIES_DATA: FacilityItem[] = [
  {
    id: "chemistry-lab",
    name: "Chemistry Lab",
    category: "Explore",
    tagline: "Precision Apparatus & Hands-on Chemical Inquiry",
    description: "Engineered with modern ventilation, individual reagent stations, and safety showers. Enables students to safely conduct empirical experiments, molecular modeling, and qualitative analysis.",
    features: ["Safety Fume Hood & Eyewash Station", "Analytical Balances & Glassware", "Strict Chemical Storage Protocols"],
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "physics-lab",
    name: "Physics Lab",
    category: "Explore",
    tagline: "Mechanics, Optics & Applied Thermodynamics",
    description: "Dedicated optical benches, electrodynamics testing apparatus, and kinematic setups that transform theoretical formulas into tangible physical observations.",
    features: ["Optical Dark Bench Section", "Precision Circuit Analysis Stations", "Mechanics & Wave Dynamic Kits"],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "biology-lab",
    name: "Biology Lab",
    category: "Explore",
    tagline: "Microscopy, Botany & Anatomical Specimens",
    description: "Equipped with high-resolution compound microscopes, specimen collections, and plant physiology apparatus to explore the living world in granular detail.",
    features: ["High-Resolution Binocular Microscopes", "Botanical & Zoological Preserved Specimens", "Dissection & Cell-Culture Modeling"],
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "composite-lab",
    name: "Composite Science Lab",
    category: "Explore",
    tagline: "Integrated STEM Discovery & Interdisciplinary Prototyping",
    description: "A flexible experimental space uniting physical sciences with computational thinking, encouraging middle school learners to bridge disciplines.",
    features: ["Multi-Discipline Workstations", "Sensory Data Loggers", "Collaborative Discovery Islands"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "computer-lab",
    name: "Computer Lab",
    category: "Learn",
    tagline: "Digital Literacy, Coding & Algorithmic Foundations",
    description: "Ergonomically planned digital lab with high-speed network infrastructure, secure web access, modern computing stations, and programming toolkits.",
    features: ["Individual High-Performance Terminals", "Curated Coding & Logic Environments", "Strict Child-Safe Cyber Firewall"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "library",
    name: "Central Library",
    category: "Learn",
    tagline: "Curated Knowledge Sanctum & Silent Inquiry",
    description: "An extensive collection of NCERT curriculum reference texts, global classical literature, contemporary junior fiction, and quiet reading alcoves.",
    features: ["Expansive Academic Reference Sections", "Quiet Reading Zones & Group Study Nooks", "Periodicals & Scientific Journals"],
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "music-room",
    name: "Music Room",
    category: "Create",
    tagline: "Acoustic Expression, Rhythm & Harmonic Discovery",
    description: "A dedicated acoustic space fitted with Indian classical and western musical instruments, fostering melodic appreciation and emotional intelligence.",
    features: ["Acoustically Treated Studio Space", "Keyboards, Percussions & String Instruments", "Vocal Training & Choir Arrangement Area"],
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "sports-room",
    name: "Outdoor Sports & Playgrounds",
    category: "Perform",
    tagline: "Track, Outfield, Turf Pitches & Court Games",
    description: "Expansive outdoor athletic grounds, full-size football field, 200m track, volleyball courts, and turf cricket practice nets.",
    features: ["Turf Cricket Practice Nets", "Full-Size Football Ground & 200m Track", "Volleyball & Basketball Courts"],
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "indoor-games",
    name: "Indoor Games & Sports Arena",
    category: "Perform",
    tagline: "Table Tennis, Chess, Carrom & Semi-Indoor Badminton",
    description: "Dedicated climate-controlled indoor arena with tournament table tennis setups, chess & carrom strategy tables, and yoga/fitness studios.",
    features: ["Tournament Table Tennis Tables", "Chess & Carrom Strategy Stations", "Covered Badminton & Yoga Studio"],
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "infirmary",
    name: "Campus Infirmary",
    category: "Learn",
    tagline: "First-Aid, Health Monitoring & Student Wellness",
    description: "A tranquil healthcare bay staffed during school hours, prepared for immediate medical attention, minor injuries, routine health screenings, and wellness care.",
    features: ["First-Aid & Emergency Response Kits", "Dedicated Recovery Beds", "Emergency Physician On-Call Protocol"],
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
  },
];

export const FACULTY_PILLARS = [
  {
    title: "Qualified Educators",
    icon: "Award",
    description: "Highly trained professionals versed in modern pedagogy, child psychology, and interactive teaching techniques.",
  },
  {
    title: "Continuous Professional Development",
    icon: "TrendingUp",
    description: "Regular training workshops to keep faculty updated on CBSE guidelines, NEP practices, and educational technology.",
  },
  {
    title: "Low Teacher-Student Ratio",
    icon: "HeartHandshake",
    description: "Ensures personalized attention, tailored guidance, and close mentoring for every child.",
  },
];

export const ADMISSION_STEPS: AdmissionStep[] = [
  {
    step: "01",
    title: "Inquiry",
    summary: "Submit an online inquiry or contact the school admissions office.",
    details: "Initiate dialogue by submitting our online inquiry form or contacting our campus admissions team via phone or WhatsApp to register your child's profile.",
  },
  {
    step: "02",
    title: "Interaction & Guidance",
    summary: "Connect with the admissions team and understand the school's academic approach.",
    details: "An institutional interaction session to align educational goals, review developmental readiness, and introduce the school's pedagogical philosophy.",
  },
  {
    step: "03",
    title: "Application",
    summary: "Complete the registration/application process and provide required documents.",
    details: "Submit the formal registration dossier alongside the mandatory verification documents specified by the institution.",
  },
  {
    step: "04",
    title: "Enrollment",
    summary: "Admission confirmation based on seat availability and the school's admission process.",
    details: "Formal offer of admission and seat allocation upon completion of document verification and registration formalities.",
  },
];

export const REQUIRED_DOCUMENTS: DocumentItem[] = [
  {
    name: "Birth Certificate",
    description: "Official municipal / government issued birth certificate confirming date of birth and parentage.",
    required: true,
  },
  {
    name: "Transfer Certificate (TC)",
    description: "Original transfer certificate countersigned from the previous recognized institution (applicable for Grade 1 and above).",
    required: true,
  },
  {
    name: "Previous Report Cards",
    description: "Academic progress report and marks transcripts from the previous two academic terms.",
    required: true,
  },
  {
    name: "Passport Photographs",
    description: "Recent passport-sized colour photographs of the student and both parents/guardians.",
    required: true,
  },
];

export const VISION_MISSION_DATA = {
  vision: {
    title: "Our Vision",
    subtitle: "Preparing Tomorrow's Innovators & Leaders",
    statement:
      "The vision of Lotus Global School is to be a leading institution that prepares today’s children to become tomorrow’s innovators and leaders. Known for our exceptional educational programs, talented teams and community relationships, we provide a unique blend of fun and learning in a safe and nurturing environment.",
    pillars: [
      {
        title: "Tomorrow's Innovators & Leaders",
        description:
          "Fostering creative problem-solving, critical inquiry, and fearless curiosity so every student steps forward ready to shape the future with integrity.",
      },
      {
        title: "Exceptional Programs & Talented Teams",
        description:
          "Empowering an inspired faculty and modern curriculum tailored to nurture diverse aptitudes, academic rigor, and creative excellence.",
      },
      {
        title: "Fun & Learning in a Safe Haven",
        description:
          "Creating an inspiring ecosystem where playful discovery meets structured rigor inside a secure, inclusive, and joyful environment.",
      },
    ],
  },
  mission: {
    title: "Our Mission",
    subtitle: "Excellence in Education & Child-First Care",
    statement:
      "The mission of Lotus Global School is to provide the best education and care for children. We believe that if a child cannot learn the way we teach him, we must teach him the way he can learn.",
    goldenRule:
      "If a child cannot learn the way we teach him, we must teach him the way he can learn.",
    commitments: [
      {
        title: "Adaptive, Child-Centric Pedagogy",
        description:
          "Understanding that every child possesses a unique learning wavelength. We tailor our teaching strategies to meet the child where they learn best.",
      },
      {
        title: "Uncompromising Care & Emotional Safety",
        description:
          "Prioritizing emotional well-being, personal safety, and individual encouragement alongside academic achievement.",
      },
      {
        title: "Strong Community Relationships",
        description:
          "Forging meaningful, transparent partnerships between parents, educators, and the community to surround every student with constant support.",
      },
    ],
  },
  principles: [
    {
      badge: "Inquiry Driven",
      title: "Active Discovery",
      desc: "Replacing passive instruction with experiential science labs, interactive questioning, and hands-on projects.",
    },
    {
      badge: "Personalized Care",
      title: "Individual Attention",
      desc: "Low teacher-student ratios ensuring every child’s cognitive, emotional, and creative needs are addressed.",
    },
    {
      badge: "Character First",
      title: "Enduring Values",
      desc: "Instilling Dedication, Diligence, and Discipline as lifelong anchors for leadership and moral clarity.",
    },
    {
      badge: "Global Outlook",
      title: "Holistic Development",
      desc: "Blending CBSE academic excellence with arts, athletics, music, and digital literacy.",
    },
  ],
};
