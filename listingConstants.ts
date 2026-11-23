export interface PopularSearchLink {
    href: string;
    label: string;
}

export interface CollegeQuickLink {
    label: string;
    tab: string;
}

export interface FallbackExamRule {
    matches: (cleanTypeStr: string, hasMbaCourse: boolean) => boolean;
    exams: string[];
}

export const FALLBACK_COLLEGE_LOGO =
    "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=100&h=100&fit=crop";

export const POPULAR_SEARCH_LINKS: readonly PopularSearchLink[] = [
    {
        href: "/top-mba-colleges-in-coimbatore",
        label: "Top MBA Colleges in Coimbatore",
    },
    {
        href: "/top-engineering-colleges-in-coimbatore",
        label: "Top Engineering Colleges in Coimbatore",
    },
    {
        href: "/autonomous-engineering-colleges-in-coimbatore",
        label: "Autonomous Engineering Colleges in Coimbatore",
    },
    {
        href: "/top-engineering-colleges-in-salem",
        label: "Top Engineering Colleges in Salem",
    },
    {
        href: "/nirf-ranked-engineering-colleges-in-coimbatore",
        label: "NIRF Ranked Engineering Colleges in Coimbatore",
    },
    {
        href: "/top-paramedical-colleges-in-coimbatore",
        label: "Top Paramedical Colleges in Coimbatore",
    },
    {
        href: "/top-occupational-therapy-colleges-in-coimbatore",
        label: "Top Occupational Therapy Colleges in Coimbatore",
    },
];

export const COLLEGE_CARD_QUICK_LINKS: readonly CollegeQuickLink[] = [
    { label: "Placement", tab: "placements" },
    { label: "Admission", tab: "admission" },
    { label: "Facilities", tab: "facilities" },
];

export const FALLBACK_EXAM_RULES: readonly FallbackExamRule[] = [
    {
        matches: (str) => str.includes("occupational") || str.includes("bot"),
        exams: ["TN Paramedical", "Merit-Based"],
    },
    {
        matches: (str) =>
            str.includes("paramedical") ||
            str.includes("nursing") ||
            str.includes("physiotherapy") ||
            str.includes("allied health"),
        exams: ["TN Paramedical", "Merit-Based"],
    },
    {
        matches: (str) =>
            str.includes("medical") ||
            str.includes("dental") ||
            /\bmbbs\b/i.test(str) ||
            /\bbds\b/i.test(str),
        exams: ["NEET UG"],
    },
    {
        matches: (str) => str.includes("pharmacy") || str.includes("pharm"),
        exams: ["TN Paramedical", "GPAT"],
    },
    {
        matches: (str) =>
            str.includes("engineering") ||
            str.includes("technology") ||
            str.includes("polytechnic") ||
            str.includes("autonomous"),
        exams: ["TNEA", "JEE Main"],
    },
    {
        matches: (str) => str.includes("architecture") || str.includes("b.arch"),
        exams: ["NATA"],
    },
    {
        matches: (str) => str.includes("law") || /\bllb\b/i.test(str),
        exams: ["CLAT"],
    },
    {
        matches: (str, hasMbaCourse) =>
            /\bmba\b/i.test(str) ||
            str.includes("management") ||
            str.includes("pgdm") ||
            hasMbaCourse,
        exams: ["TANCET", "MAT"],
    },
    {
        matches: (str) =>
            str.includes("art") || str.includes("science") || str.includes("commerce"),
        exams: ["Merit-Based"],
    },
];
