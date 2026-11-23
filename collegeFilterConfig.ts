import { INDIAN_STATES } from "@/data/constants";

export interface TrendingTitleEntry {
    title: string;
    h2?: string;
    category?: string;
    state?: string;
    district?: string;
    course?: string;
    isAutonomous?: boolean;
    isNirf?: boolean;
    limit?: number;
    desc?: string;
    institutionType?: string;
}

export interface OwnershipOption {
    value: string;
    id: string;
    label: string;
}

export interface SortOption {
    value: string;
    label: string;
}

export const KNOWN_CATEGORIES = [
    "engineering", "universities", "university", "arts", "arts-&-science",
    "arts-and-science", "mba", "paramedical", "medical", "pharmacy",
    "nursing", "law", "polytechnic", "management", "dental",
    "architecture", "agriculture", "design", "hotel-management", "aviation",
    "commerce", "science", "online",
];

export const KNOWN_CITIES = [
    "salem", "coimbatore", "chennai", "madurai", "trichy", "tiruchirappalli",
    "erode", "tirunelveli", "vellore", "thanjavur", "dindigul", "kanchipuram",
    "tiruppur", "namakkal", "bangalore", "bengaluru", "kochi", "hyderabad",
    "mumbai", "delhi", "pune",
];

export const GENERIC_SEO_TOKENS = new Set([
    "top", "best", "10", "20", "5", "top10", "colleges", "college",
    "universities", "university", "institutes", "institutions", "in", "at",
    "of", "for", "and", "the", "list", "autonomous", "nirf", "ranked",
    "featured", "scholarship", "occupational", "therapy", "tamil", "nadu",
    "tamilnadu", "kerala", "karnataka", "india", "hotel",
    ...KNOWN_CATEGORIES,
    ...KNOWN_CITIES,
    ...INDIAN_STATES.flatMap((s) => s.toLowerCase().split(/[\s-]+/)),
]);

export const TRENDING_TITLE_MAP: Record<string, TrendingTitleEntry> = {
    "top-mba-colleges-in-coimbatore": {
        title: "Top MBA Colleges in Coimbatore",
        h2: "Best MBA Colleges in Coimbatore - Rankings, Fees & Placements",
        category: "mba",
        district: "Coimbatore",
        institutionType: "MBA",
        desc: "Explore the top MBA colleges in Coimbatore, including rankings, fees, courses, placements, eligibility and admission details.",
    },
    "top-10-mba-colleges-in-coimbatore": {
        title: "Top 10 MBA Colleges in Coimbatore",
        h2: "Best MBA Colleges in Coimbatore - Rankings, Fees & Placements",
        category: "mba",
        district: "Coimbatore",
        institutionType: "MBA",
        limit: 10,
        desc: "Explore the top 10 MBA colleges in Coimbatore, including rankings, fees, courses, placements, eligibility and admission details.",
    },
    "top-engineering-colleges-in-coimbatore": {
        title: "Top Engineering Colleges in Coimbatore",
        h2: "Best Engineering Colleges in Coimbatore - Rankings, Fees & Placements",
        category: "engineering",
        district: "Coimbatore",
        institutionType: "Engineering",
        desc: "Explore the top engineering colleges in Coimbatore, including rankings, fees, courses, placements, eligibility and admission details.",
    },
    "autonomous-engineering-colleges-in-coimbatore": {
        title: "Autonomous Engineering Colleges in Coimbatore",
        h2: "Best Autonomous Engineering Colleges in Coimbatore - Rankings, Fees & Placements",
        category: "engineering",
        district: "Coimbatore",
        institutionType: "Autonomous Engineering",
        isAutonomous: true,
        desc: "Explore autonomous engineering colleges in Coimbatore, including rankings, fees, courses, placements, eligibility and admission details.",
    },
    "top-engineering-colleges-in-salem": {
        title: "Top Engineering Colleges in Salem",
        h2: "Best Engineering Colleges in Salem - Rankings, Fees & Placements",
        category: "engineering",
        district: "Salem",
        institutionType: "Engineering",
        desc: "Explore the top engineering colleges in Salem, including rankings, fees, courses, placements, eligibility and admission details.",
    },
    "nirf-ranked-engineering-colleges-in-coimbatore": {
        title: "NIRF Ranked Engineering Colleges in Coimbatore",
        h2: "Best NIRF Ranked Engineering Colleges in Coimbatore - Rankings, Fees & Placements",
        category: "engineering",
        district: "Coimbatore",
        institutionType: "NIRF Ranked Engineering",
        isNirf: true,
        desc: "Explore NIRF ranked engineering colleges in Coimbatore, including national rankings, fees, courses, placements, and admission details.",
    },
    "top-paramedical-colleges-in-coimbatore": {
        title: "Top Paramedical Colleges in Coimbatore",
        h2: "Best Paramedical Colleges in Coimbatore - Rankings, Fees & Placements",
        category: "paramedical",
        district: "Coimbatore",
        institutionType: "Paramedical",
        desc: "Explore the top paramedical colleges in Coimbatore, including rankings, fees, courses, placements, eligibility and admission details.",
    },
    "top-occupational-therapy-colleges-in-coimbatore": {
        title: "Top Occupational Therapy Colleges in Coimbatore",
        h2: "Best Occupational Therapy Colleges in Coimbatore - Rankings, Fees & Placements",
        category: "paramedical",
        district: "Coimbatore",
        institutionType: "Occupational Therapy",
        course: "occupational therapy",
        desc: "Explore top occupational therapy colleges in Coimbatore, including BOT course details, fees, placements, eligibility and admission details.",
    },
    "scholarship-for-mba-in-coimbatore": {
        title: "Scholarship for MBA in Coimbatore",
        h2: "Scholarship for MBA in Coimbatore - Eligibility & Grants",
        category: "mba",
        district: "Coimbatore",
        institutionType: "MBA",
    },
    "top-engineering-colleges": {
        title: "Top Engineering Colleges",
        h2: "Top Engineering Colleges in Tamilnadu - Rankings, Fees & Placements",
        category: "engineering",
        institutionType: "Engineering",
        state: "Tamil Nadu",
    },
    "mba-colleges-in-tamil-nadu": {
        title: "MBA Colleges in Tamil Nadu",
        h2: "Top MBA Colleges in Tamilnadu - Rankings, Fees & Placements",
        category: "mba",
        institutionType: "MBA",
        state: "Tamil Nadu",
    },
    "top-college-in-mba": {
        title: "Top Colleges in MBA",
        h2: "Top MBA Colleges in Tamilnadu - Rankings, Fees & Placements",
        category: "mba",
        institutionType: "MBA",
    },
    "top-colleges-in-mba": {
        title: "Top Colleges in MBA",
        h2: "Top MBA Colleges in Tamilnadu - Rankings, Fees & Placements",
        category: "mba",
        institutionType: "MBA",
    },
    "top-arts-science-colleges": {
        title: "Top Arts & Science Colleges",
        h2: "Top Arts & Science Colleges in Tamilnadu - Rankings, Fees & Placements",
        category: "arts",
        institutionType: "Arts & Science",
    },
    "colleges-in-coimbatore": {
        title: "Colleges in Coimbatore",
        h2: "Top Colleges in Coimbatore - Rankings, Fees & Placements",
        district: "Coimbatore",
    },
    "paramedical-colleges": {
        title: "Paramedical Colleges",
        h2: "Top Paramedical Colleges in Tamilnadu - Rankings, Fees & Placements",
        category: "paramedical",
        institutionType: "Paramedical",
    },
};

export const COURSE_DISPLAY_NAMES: Record<string, string> = {
    "bsc-nursing": "B.Sc Nursing",
    "b-pharm": "B.Pharm",
    bpt: "BPT (Physiotherapy)",
    dmlt: "DMLT",
    bot: "BOT (Occupational Therapy)",
    "bsc-radiology": "B.Sc Radiology",
    "bsc-cardiac-technology": "B.Sc Cardiac Technology",
    "bsc-optometry": "B.Sc Optometry",
    "bsc-renal-dialysis": "B.Sc Renal Dialysis",
    "bsc-anaesthesia": "B.Sc Anaesthesia Technology",
    "bsc-respiratory": "B.Sc Respiratory Therapy",
    "bsc-emergency-medicine": "B.Sc Emergency Medicine",
};

export const FIELD_PARAM_MAP: Record<string, string> = {
    cs: "Computer Science",
    mechanical: "Mechanical",
    electronics: "Electronics",
    civil: "Civil",
    mbbs: "MBBS",
    bds: "BDS",
    nursing: "Nursing",
    pharmacy: "Pharmacy",
    fashion: "Fashion Design",
    interior: "Interior Design",
    graphic: "Graphic Design",
};

export const TAMIL_NADU_TERMS = [
    "tamilnadu",
    "chennai",
    "coimbatore",
    "salem",
    "erode",
    "madurai",
    "trichy",
    "vellore",
    "tirunelveli",
    "namakkal",
    "thanjavur",
    "dindigul",
    "kanchipuram",
    "tiruppur",
];

export const TOP_CITIES = [
    "chennai",
    "coimbatore",
    "bangalore",
    "kochi",
    "salem",
    "erode",
    "madurai",
    "trichy",
    "bengaluru",
    "hyderabad",
];

export const OWNERSHIP_OPTIONS: readonly OwnershipOption[] = [
    { value: "all", id: "ownership-all", label: "All Types" },
    { value: "Government", id: "ownership-govt", label: "Government" },
    { value: "Private", id: "ownership-pvt", label: "Private" },
];

export const MOBILE_SORT_OPTIONS: readonly SortOption[] = [
    { value: "relevance", label: "Relevance" },
    { value: "rating", label: "Highest Rated" },
    { value: "fees_low", label: "Fees: Low to High" },
];

export const DESKTOP_SORT_OPTIONS: readonly SortOption[] = [
    { value: "relevance", label: "Relevance" },
    { value: "rating", label: "Highest Rated" },
    { value: "fees_low", label: "Lowest Fees" },
];
