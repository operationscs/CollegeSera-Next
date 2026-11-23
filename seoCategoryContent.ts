export interface CategoryInfo {
    programDescription: string;
    eligibility: string;
    entranceExams: string;
    topRecruiters: string;
}

interface CategoryContentRule {
    matches: (sanitizedKey: string) => boolean;
    info: CategoryInfo;
}

const CATEGORY_CONTENT_RULES: readonly CategoryContentRule[] = [
    // 1. Occupational Therapy
    {
        matches: (key) =>
            key.includes("occupational therapy") ||
            key.includes("occupational") ||
            /\bbot\b/i.test(key) ||
            /\bmot\b/i.test(key),
        info: {
            programDescription:
                "These colleges offer Bachelor of Occupational Therapy (BOT) and Master of Occupational Therapy (MOT) programs. Admissions are conducted through Tamil Nadu Paramedical Counselling and institutional merit quotas.",
            eligibility:
                "10+2 with minimum 50% aggregate in Physics, Chemistry & Biology (PCB)",
            entranceExams: "TN Paramedical Counselling, Merit-Based",
            topRecruiters:
                "KMCH, Ganga Hospital, Apollo Hospitals, Manipal Hospitals, Rehabilitation Centers",
        },
    },
    // 2. Paramedical / Nursing / Physiotherapy / Allied Health
    {
        matches: (key) =>
            key.includes("paramedical") ||
            key.includes("nursing") ||
            key.includes("physiotherapy") ||
            /\bbpt\b/i.test(key) ||
            key.includes("allied health"),
        info: {
            programDescription:
                "These colleges offer B.Sc Nursing, Bachelor of Physiotherapy (BPT), B.Sc Allied Health Sciences, and specialized paramedical diploma courses. Admissions are conducted through Tamil Nadu Paramedical Counselling and merit-based selection.",
            eligibility:
                "10+2 with minimum 45-50% aggregate in Physics, Chemistry & Biology (PCB)",
            entranceExams: "TN Paramedical Counselling, AIIMS Paramedical, Merit-Based",
            topRecruiters:
                "Apollo Hospitals, KMCH, Ganga Hospital, Manipal Hospitals, Fortis Healthcare",
        },
    },
    // 3. Autonomous Colleges / Autonomous Engineering
    {
        matches: (key) => key.includes("autonomous"),
        info: {
            programDescription:
                "These autonomous engineering and technology institutions have academic freedom to design industry-aligned curricula, conduct independent examinations, and introduce cutting-edge B.E. / B.Tech degree programs. Admissions are primarily conducted through TNEA counselling and JEE Main.",
            eligibility:
                "10+2 with minimum 45% aggregate in Physics, Chemistry & Mathematics (PCM) (40% for reserved categories)",
            entranceExams: "TNEA, JEE Main",
            topRecruiters:
                "TCS, Infosys, Cognizant, Wipro, Zoho, HCL, Amazon, Bosch, Microsoft, L&T",
        },
    },
    // 4. NIRF Ranked Colleges / NIRF Ranked Engineering
    {
        matches: (key) => key.includes("nirf"),
        info: {
            programDescription:
                "These top NIRF-ranked institutions are recognized by the Ministry of Education, Government of India, for academic excellence, research output, and top-tier placements. Admissions to technical programs are conducted through TNEA counselling and JEE Main.",
            eligibility:
                "10+2 with minimum 45-50% aggregate in Physics, Chemistry & Mathematics (PCM)",
            entranceExams: "TNEA, JEE Main",
            topRecruiters:
                "Google, Microsoft, Amazon, TCS, Infosys, Cognizant, L&T, Zoho, Deloitte",
        },
    },
    // 5. Engineering / Technology / B.E / B.Tech
    {
        matches: (key) =>
            key.includes("engineering") ||
            key.includes("technology") ||
            key.includes("b.tech") ||
            key.includes("btech") ||
            key.includes("b.e") ||
            /\bbe\b/i.test(key),
        info: {
            programDescription:
                "These colleges offer B.E. / B.Tech, M.E. / M.Tech, and specialized technical degree programs. Admissions to these colleges are primarily conducted through TNEA counseling and JEE Main.",
            eligibility:
                "10+2 with minimum 45% aggregate in Physics, Chemistry & Mathematics (PCM) (40% for reserved categories)",
            entranceExams: "TNEA, JEE Main",
            topRecruiters:
                "TCS, Infosys, Cognizant, Wipro, Zoho, HCL, Amazon, Bosch",
        },
    },
    // 6. Medical / Dental / MBBS / BDS
    {
        matches: (key) =>
            key.includes("medical") ||
            key.includes("dental") ||
            /\bmbbs\b/i.test(key) ||
            /\bbds\b/i.test(key),
        info: {
            programDescription:
                "These premier institutions offer MBBS, BDS, and postgraduate medical degree programs approved by NMC and DCI. Admissions are strictly conducted through national entrance examinations and state quota counselling.",
            eligibility:
                "10+2 with minimum 50% aggregate in PCB and English + Valid NEET Score",
            entranceExams: "NEET UG, NEET PG",
            topRecruiters:
                "Apollo Hospitals, Fortis Healthcare, Christian Medical College, AIIMS, Government Medical Services",
        },
    },
    // 7. Pharmacy
    {
        matches: (key) => key.includes("pharmacy") || key.includes("pharm"),
        info: {
            programDescription:
                "These colleges offer B.Pharm, M.Pharm, and Pharm.D degree programs approved by the Pharmacy Council of India (PCI). Admissions are primarily conducted through TN Paramedical Counselling and merit.",
            eligibility:
                "10+2 with minimum 50% aggregate in Physics, Chemistry & Biology/Mathematics (PCB/PCM)",
            entranceExams: "TN Paramedical Counselling, GPAT, Merit-Based",
            topRecruiters:
                "Sun Pharma, Cipla, Dr. Reddy's Laboratories, Biocon, Pfizer, Apollo Pharmacy",
        },
    },
    // 8. Architecture
    {
        matches: (key) =>
            key.includes("architecture") ||
            key.includes("b.arch") ||
            key.includes("barch"),
        info: {
            programDescription:
                "These institutions offer Bachelor of Architecture (B.Arch) and M.Arch programs approved by the Council of Architecture (COA). Admissions are conducted through national aptitude tests and centralized state counselling.",
            eligibility:
                "10+2 with minimum 50% in PCM or 10+3 Diploma with Mathematics + Valid NATA Score",
            entranceExams: "NATA, JEE Main Paper 2, TNEA Architecture Counselling",
            topRecruiters:
                "L&T Construction, Hafeez Contractor, Urban Development Authorities, Architectural Design Studios",
        },
    },
    // 9. Law
    {
        matches: (key) =>
            key.includes("law") || /\bllb\b/i.test(key) || /\bllm\b/i.test(key),
        info: {
            programDescription:
                "These law colleges offer 5-Year Integrated Law (BA LLB, BBA LLB), 3-Year LLB, and LLM programs approved by the Bar Council of India (BCI). Admissions are conducted through national law entrance exams and TNDALU counselling.",
            eligibility:
                "10+2 with minimum 45% aggregate for 5-Year Integrated LLB; Graduation for 3-Year LLB",
            entranceExams: "CLAT, AILET, LSAT India, TNDALU Counselling, Merit-Based",
            topRecruiters:
                "Corporate Legal Teams, Top Law Firms, Judicial Services, Legal Consultancies",
        },
    },
    // 10. MBA / Management / PGDM
    {
        matches: (key) =>
            /\bmba\b/i.test(key) ||
            key.includes("management") ||
            key.includes("pgdm") ||
            /\bbusiness\b/i.test(key),
        info: {
            programDescription:
                "These colleges offer Master of Business Administration (MBA), PGDM, and executive management programs. Admissions to these colleges are primarily conducted through entrance exams such as TANCET, MAT, CAT, CMAT, and XAT.",
            eligibility:
                "Graduation with minimum 50% aggregate (45% for reserved categories)",
            entranceExams: "TANCET, MAT, CAT, CMAT, XAT",
            topRecruiters:
                "Amazon, Cognizant, TCS, Wipro, Infosys, Deloitte, HDFC Bank, Zoho",
        },
    },
    // 11. Polytechnic / Diploma
    {
        matches: (key) =>
            key.includes("polytechnic") || key.includes("diploma"),
        info: {
            programDescription:
                "These polytechnic institutes offer technical diploma programs across engineering and vocational fields. Admissions are conducted through DOTE Tamil Nadu counselling and merit basis.",
            eligibility:
                "10th Standard (SSLC) pass with minimum 35% marks; 10+2/ITI for lateral entry",
            entranceExams: "Merit-Based / DOTE Tamil Nadu Counselling",
            topRecruiters:
                "L&T, Ashok Leyland, TVS Motors, Hyundai, Tata Motors, Bosch",
        },
    },
    // 12. Arts & Science / Commerce
    {
        matches: (key) =>
            key.includes("art") ||
            key.includes("science") ||
            key.includes("commerce") ||
            /\bbba\b/i.test(key) ||
            /\bbca\b/i.test(key),
        info: {
            programDescription:
                "These colleges offer undergraduate and postgraduate programs in Arts, Science, Commerce, Management, and Computer Applications. Admissions are primarily based on 10+2 merit marks and university-level admission criteria.",
            eligibility:
                "10+2 in relevant stream with minimum 50% aggregate from a recognized board",
            entranceExams: "Merit-Based / University Level Entrance Test",
            topRecruiters:
                "TCS, Infosys, Cognizant, Wipro, Amazon, Deloitte, Zoho, EY",
        },
    },
];

// 13. Default / Multidisciplinary
const DEFAULT_CATEGORY_INFO: CategoryInfo = {
    programDescription:
        "These colleges offer a diverse range of undergraduate and postgraduate degree programs. Admissions are conducted through respective state counselling systems, national entrance exams, and institutional merit quotas.",
    eligibility:
        "10+2 for UG programs; Bachelor's Degree with minimum 50% for PG programs",
    entranceExams: "TNEA, TANCET, NEET, Merit-Based",
    topRecruiters: "TCS, Infosys, Cognizant, Wipro, Amazon, HCL, Zoho",
};

export function getCategoryInfo(
    subjectName?: string,
    category?: string,
    h2Title?: string
): CategoryInfo {
    const rawKey = `${subjectName || ""} ${category || ""} ${h2Title || ""}`.toLowerCase();
    // Sanitize to prevent city names like "coimbatore" from falsely matching "mba"
    const sanitizedKey = rawKey.replace(/coimbatore/gi, " ").replace(/-/g, " ");

    const matched = CATEGORY_CONTENT_RULES.find((rule) => rule.matches(sanitizedKey));
    return matched ? matched.info : DEFAULT_CATEGORY_INFO;
}
