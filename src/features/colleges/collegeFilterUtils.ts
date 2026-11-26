import { INDIAN_STATES } from "@/data/constants";
import type { DatabaseCollege } from "@/types/database";
import { findMatchingColleges } from "@/utils/collegeSearch";

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

const CITY_FILTER_ALIASES: Record<string, string[]> = {
  bangalore: ["bengaluru"],
  bengaluru: ["bangalore"],
  tiruchirappalli: ["trichy"],
  trichy: ["tiruchirappalli"],
  kochi: ["ernakulam"],
  ernakulam: ["kochi"],
};

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

export interface RouteFilterInput {
  type?: string;
  location?: string;
  category?: string;
  subSlug?: string;
  courseSlug?: string;
  seoSlug?: string;
  state?: string;
  param1?: string;
  param2?: string;
  section?: string;
  slug?: string;
}

export interface ParsedCollegeFilters {
  resolvedCategory: string;
  resolvedDistrict: string;
  resolvedState: string;
  isCountryIndia: boolean;
  resolvedTopCities: boolean;
  resolvedCourse: string;
  resolvedFeatured: boolean;
  resolvedAutonomous: boolean;
  resolvedNirf: boolean;
  resolvedLimit: number | null;
  resolvedInstitutionType?: string;
  h1Title: string;
  h2Title: string;
  seoDesc?: string;
}

export const TRENDING_TITLE_MAP: Record<
  string,
  {
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
> = {
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

/**
 * Maps `/colleges/[[...segments]]` to the original React Router param shape.
 * Returns `null` if segments exceed 3 parts (invalid route -> 404).
 */
export function segmentsToCollegesRouteInput(segments?: string[]): RouteFilterInput | null {
  if (!segments || segments.length === 0) return {};
  if (segments.length > 3) return null;

  if (segments.length === 1) {
    return { type: segments[0] };
  }
  if (segments.length === 2) {
    if (segments[0].toLowerCase() === "location") return { location: segments[1] };
    if (segments[0].toLowerCase() === "state") return { state: segments[1] };
    return { param1: segments[0], param2: segments[1] };
  }
  // 3 segments: /colleges/:category/:section/:slug or /colleges/:param1/:param2/:courseSlug
  return {
    category: segments[0],
    section: segments[1],
    slug: segments[2],
    param1: segments[0],
    param2: segments[1],
    courseSlug: segments[2],
  };
}

export function isPureSeoSlugString(seoSlug: string): boolean {
  const seoLower = seoSlug.toLowerCase();
  const seoTokens = seoLower.split("-").filter(Boolean);
  return (
    Boolean(TRENDING_TITLE_MAP[seoLower]) ||
    (seoTokens.some((t) =>
      ["colleges", "universities", "institutes", "institutions", "scholarship"].includes(t)
    ) &&
      seoTokens.every((t) => GENERIC_SEO_TOKENS.has(t)))
  );
}

export function parseCollegeUrlFilters(params: RouteFilterInput): ParsedCollegeFilters {
  const { type, location, category, subSlug, courseSlug, seoSlug, state, param1, param2, section, slug } = params;

  let resolvedCategory = "all";
  let resolvedDistrict = "all";
  let resolvedState = "all";
  let isCountryIndia = false;
  let resolvedTopCities = false;
  let resolvedCourse = "";
  let resolvedFeatured = false;
  let resolvedAutonomous = false;
  let resolvedNirf = false;
  let resolvedLimit: number | null = null;
  let resolvedInstitutionType: string | undefined = undefined;
  let h1Title = "";
  let h2Title = "";
  let seoDesc: string | undefined = undefined;

  const allTokens = [type, location, category, subSlug, courseSlug, seoSlug, state, param1, param2, section, slug]
    .filter(Boolean)
    .map((s) => s!.toLowerCase());

  const isIndiaTarget = allTokens.some(
    (t) =>
      t === "universities-india" ||
      t === "engineering-india" ||
      t === "engineering-colleges-india" ||
      t === "mba-india" ||
      t === "mba-colleges-india" ||
      t === "arts-india" ||
      t === "arts-and-science-india" ||
      t === "arts-and-science-colleges-india" ||
      t === "paramedical-india" ||
      t === "paramedical-colleges-india" ||
      ((!seoSlug || t.split("-").every((tok) => GENERIC_SEO_TOKENS.has(tok))) &&
        (t.endsWith("-india") || t === "india"))
  );

  if (isIndiaTarget) {
    isCountryIndia = true;
    resolvedState = "all";
    resolvedDistrict = "all";

    if (allTokens.some((t) => t.includes("universit"))) {
      resolvedCategory = "university";
      h1Title = "Top Universities In India";
      h2Title = "Top Universities in India - Rankings, Admissions & Fees";
    } else if (allTokens.some((t) => t.includes("engineering"))) {
      resolvedCategory = "engineering";
      h1Title = "Top Engineering Colleges In India";
      h2Title = "Top Engineering Colleges in India - Rankings, Fees & Placements";
    } else if (
      allTokens.some((t) => {
        const safeT = t.replace(/coimbatore/gi, "");
        return /\bmba\b/i.test(safeT) || safeT.includes("management");
      })
    ) {
      resolvedCategory = "mba";
      h1Title = "Top MBA Colleges In India";
      h2Title = "Top MBA Colleges in India - Rankings, Fees & Placements";
    } else if (allTokens.some((t) => t.includes("arts"))) {
      resolvedCategory = "arts";
      h1Title = "Top Arts & Science Colleges In India";
      h2Title = "Top Arts & Science Colleges in India - Rankings, Fees & Placements";
    } else if (allTokens.some((t) => t.includes("paramedical") || t.includes("medical"))) {
      resolvedCategory = "paramedical";
      h1Title = "Top Paramedical Colleges In India";
      h2Title = "Top Paramedical Colleges in India - Rankings, Fees & Placements";
    } else {
      h1Title = "Top Colleges In India";
      h2Title = "Top Colleges in India - Rankings, Admissions & Fees";
    }

    if (!resolvedInstitutionType && resolvedCategory && resolvedCategory !== "all") {
      resolvedInstitutionType = resolvedCategory.charAt(0).toUpperCase() + resolvedCategory.slice(1);
    }

    return {
      resolvedCategory,
      resolvedDistrict,
      resolvedState,
      isCountryIndia,
      resolvedTopCities,
      resolvedCourse,
      resolvedFeatured,
      resolvedAutonomous,
      resolvedNirf,
      resolvedLimit,
      resolvedInstitutionType,
      h1Title,
      h2Title,
    };
  }

  // 2. Check 3-part route: /colleges/:category/:section/:slug
  const raw3Category = category || (section && slug ? param1 : undefined);
  const raw3Section = section || (param1 && param2 && courseSlug ? param2 : undefined);
  const raw3Slug = slug || (param1 && param2 && courseSlug ? courseSlug : undefined);

  if (raw3Category && raw3Section && raw3Slug) {
    const catLower = raw3Category.toLowerCase();
    if (catLower.includes("universit")) {
      resolvedCategory = "university";
    } else if (catLower === "arts" || catLower.includes("arts")) {
      resolvedCategory = "arts";
    } else {
      resolvedCategory = raw3Category.replace(/-/g, " ");
    }

    const secLower = raw3Section.toLowerCase();
    const slugLower = raw3Slug.toLowerCase();
    const catDisplayName =
      resolvedCategory === "university"
        ? "Universities"
        : resolvedCategory === "arts"
          ? "Arts & Science"
          : resolvedCategory.toUpperCase() === "MBA"
            ? "MBA"
            : resolvedCategory.charAt(0).toUpperCase() + resolvedCategory.slice(1);

    if (secLower === "by-state" || secLower.includes("-in") || secLower.includes("state")) {
      if (slugLower.includes("tamilnadu") || slugLower.includes("tamil-nadu")) {
        resolvedState = "Tamil Nadu";
        if (catLower.includes("universit")) {
          h1Title = "Universities in Tamilnadu";
          h2Title = "Top Universities in Tamilnadu - Rankings, Courses & Admissions 2026";
        } else if (catLower === "engineering") {
          h1Title = "Engineering Colleges in Tamilnadu";
          h2Title = "Top Engineering Colleges in Tamilnadu - Rankings, Fees & Placements";
        } else if (catLower === "arts" || catLower.includes("arts")) {
          h1Title = "Arts & Science Colleges in Tamilnadu";
          h2Title = "Top Arts & Science Colleges in Tamilnadu - Rankings, Fees & Placements";
        } else if (catLower === "mba") {
          h1Title = "MBA Colleges in Tamilnadu";
          h2Title = "Top MBA Colleges in Tamilnadu - Rankings, Fees & Placements";
        } else if (catLower === "paramedical") {
          h1Title = "Paramedical Colleges in Tamilnadu";
          h2Title = "Top Paramedical Colleges in Tamilnadu - Rankings, Fees & Placements";
        } else {
          h1Title = `${catDisplayName} Colleges in Tamilnadu`;
          h2Title = `Top ${catDisplayName} Colleges in Tamilnadu - Rankings, Fees & Placements`;
        }
      } else if (slugLower.includes("kerala")) {
        resolvedState = "Kerala";
        if (catLower.includes("universit")) {
          h1Title = "Kerala Universities";
          h2Title = "Top Universities in Kerala - Rankings, Courses & Admissions 2026";
        } else {
          h1Title = `Top ${catDisplayName} Colleges in Kerala`;
          h2Title = `Top ${catDisplayName} in Kerala - Rankings, Fees & Placements`;
        }
      } else if (slugLower.includes("karnataka")) {
        resolvedState = "Karnataka";
        if (catLower.includes("universit")) {
          h1Title = "Karnataka Universities";
          h2Title = "Top Universities in Karnataka - Rankings, Courses & Admissions 2026";
        } else {
          h1Title = `Top ${catDisplayName} Colleges in Karnataka`;
          h2Title = `Top ${catDisplayName} in Karnataka - Rankings, Fees & Placements`;
        }
      } else {
        const matchState = INDIAN_STATES.find((s) =>
          slugLower.includes(s.toLowerCase().replace(/[^a-z0-9]/g, ""))
        );
        if (matchState) {
          resolvedState = matchState;
          h1Title = `Top ${catDisplayName} Colleges in ${matchState}`;
          h2Title = `Top ${catDisplayName} Colleges in ${matchState} - Rankings, Fees & Placements`;
        } else {
          h1Title = raw3Slug.replace(/-/g, " ");
          h2Title = `Top ${h1Title} - Rankings, Fees & Placements`;
        }
      }
    } else if (secLower === "popular") {
      resolvedFeatured = true;
      if (slugLower.includes("top-ranked")) {
        h1Title = "Top Ranked Universities";
        h2Title = "Top Ranked Universities - Admissions, Rankings & Reviews";
      } else if (slugLower.includes("featured")) {
        h1Title = "Featured Universities";
        h2Title = "Featured Universities - Admissions, Rankings & Reviews";
      } else {
        h1Title = raw3Slug
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
        h2Title = `Top ${h1Title} - Rankings, Fees & Placements`;
      }
    } else if (secLower === "trending-searches") {
      if (slugLower.includes("tamil-nadu") || slugLower.includes("tamilnadu")) {
        resolvedState = "Tamil Nadu";
        h1Title = "Top Universities in Tamil Nadu";
        h2Title = "Top Universities in Tamil Nadu - Rankings, Courses & Admissions 2026";
      } else if (slugLower.includes("kerala")) {
        resolvedState = "Kerala";
        h1Title = "Top Universities in Kerala";
        h2Title = "Top Universities in Kerala - Rankings, Courses & Admissions 2026";
      } else if (slugLower.includes("karnataka")) {
        resolvedState = "Karnataka";
        h1Title = "Top Universities in Karnataka";
        h2Title = "Top Universities in Karnataka - Rankings, Courses & Admissions 2026";
      } else {
        h1Title = raw3Slug
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
        h2Title = `Top ${h1Title} - Rankings, Fees & Placements`;
      }
    } else if (secLower === "top-cities" || secLower === "by-city") {
      const cityCapitalized = raw3Slug.charAt(0).toUpperCase() + raw3Slug.slice(1);
      resolvedDistrict = cityCapitalized;
      h1Title = `${catDisplayName} Colleges in ${cityCapitalized}`;
      h2Title = `Top ${catDisplayName} Colleges in ${cityCapitalized} - Rankings, Fees & Placements`;
    } else if (secLower === "popular-courses" || secLower === "more-courses") {
      resolvedCourse = raw3Slug.replace(/-/g, " ");
      const courseDisplayNames: Record<string, string> = {
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
      const cName =
        courseDisplayNames[raw3Slug] ||
        raw3Slug
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
      h1Title = `Top ${cName} Colleges`;
      h2Title = `Top ${cName} Colleges - Rankings, Fees & Placements`;
    }

    if (!resolvedInstitutionType) {
      if (resolvedCategory === "mba") resolvedInstitutionType = "MBA";
      else if (resolvedCategory === "engineering")
        resolvedInstitutionType = resolvedAutonomous
          ? "Autonomous Engineering"
          : resolvedNirf
            ? "NIRF Ranked Engineering"
            : "Engineering";
      else if (resolvedCourse?.includes("occupational")) resolvedInstitutionType = "Occupational Therapy";
      else if (resolvedCategory === "paramedical") resolvedInstitutionType = "Paramedical";
      else if (resolvedCategory && resolvedCategory !== "all") {
        resolvedInstitutionType = resolvedCategory.charAt(0).toUpperCase() + resolvedCategory.slice(1);
      }
    }

    return {
      resolvedCategory,
      resolvedDistrict,
      resolvedState,
      isCountryIndia,
      resolvedTopCities,
      resolvedCourse,
      resolvedFeatured,
      resolvedAutonomous,
      resolvedNirf,
      resolvedLimit,
      resolvedInstitutionType,
      h1Title,
      h2Title,
    };
  }

  // 3. Check SEO Slugs: /top-10-mba-colleges-in-coimbatore, /mba-colleges-in-salem, etc.
  if (seoSlug) {
    const seoLower = seoSlug.toLowerCase();
    const isPureSeoSlug = isPureSeoSlugString(seoSlug);

    if (TRENDING_TITLE_MAP[seoLower]) {
      const item = TRENDING_TITLE_MAP[seoLower];
      h1Title = item.title;
      h2Title = item.h2 || `Best ${item.title} - Rankings, Fees & Placements`;
      if (item.category) resolvedCategory = item.category;
      if (item.state) resolvedState = item.state;
      if (item.district) resolvedDistrict = item.district;
      if (item.course) resolvedCourse = item.course;
      if (item.isAutonomous) resolvedAutonomous = true;
      if (item.isNirf) resolvedNirf = true;
      if (item.limit) resolvedLimit = item.limit;
      if (item.desc) seoDesc = item.desc;
      if (item.institutionType) resolvedInstitutionType = item.institutionType;
    } else if (isPureSeoSlug) {
      const safeSeo = seoLower.replace(/coimbatore/gi, " ");
      if (safeSeo.includes("tamil-nadu") || safeSeo.includes("tamilnadu")) resolvedState = "Tamil Nadu";
      if (safeSeo.includes("engineering")) resolvedCategory = "engineering";
      if (/\bmba\b/i.test(safeSeo.replace(/-/g, " "))) resolvedCategory = "mba";
      if (safeSeo.includes("paramedical")) resolvedCategory = "paramedical";
      if (safeSeo.includes("arts")) resolvedCategory = "arts";
      if (safeSeo.includes("universit")) resolvedCategory = "university";

      const matchedCity = KNOWN_CITIES.find((c) => seoLower.includes(c));
      if (matchedCity) {
        resolvedDistrict = matchedCity.charAt(0).toUpperCase() + matchedCity.slice(1);
      }

      if (seoLower.includes("autonomous")) resolvedAutonomous = true;
      if (seoLower.includes("nirf")) resolvedNirf = true;
      if (seoLower.includes("occupational")) resolvedCourse = "occupational therapy";
      if (seoLower.includes("top-10") || seoLower.includes("top10")) resolvedLimit = 10;

      const catDisplay =
        resolvedCategory === "arts"
          ? "Arts & Science"
          : resolvedCategory.toUpperCase() === "MBA"
            ? "MBA"
            : resolvedCategory === "university"
              ? "Universities"
              : resolvedCategory.charAt(0).toUpperCase() + resolvedCategory.slice(1);

      const isTopQuery =
        seoLower.startsWith("top-") || seoLower.startsWith("top10-") || seoLower.startsWith("top-10-");
      const prefix = isTopQuery ? "Top " : "";

      if (resolvedDistrict !== "all" && resolvedCategory !== "all") {
        if (resolvedCategory === "mba" && resolvedDistrict === "Salem") {
          h1Title = "MBA Colleges in Salem";
          h2Title = "Top MBA Colleges In Salem - Rankings, Fees & Placements";
        } else {
          h1Title = `${prefix}${catDisplay} Colleges in ${resolvedDistrict}`;
          h2Title = `Best ${catDisplay} Colleges in ${resolvedDistrict} - Rankings, Fees & Placements`;
        }
      } else if (resolvedDistrict !== "all") {
        h1Title = `${prefix}Colleges in ${resolvedDistrict}`;
        h2Title = `Top Colleges in ${resolvedDistrict} - Rankings, Fees & Placements`;
      } else if (resolvedState !== "all" && resolvedCategory !== "all") {
        h1Title = `${prefix}${catDisplay} Colleges in ${resolvedState}`;
        h2Title = `Top ${catDisplay} Colleges in ${resolvedState} - Rankings, Fees & Placements`;
      } else {
        h1Title = seoSlug
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
        h2Title = `Top ${h1Title} - Rankings, Fees & Placements`;
      }
    } else {
      h1Title = seoSlug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      h2Title = `Top ${h1Title} - Rankings, Fees & Placements`;
    }

    if (!resolvedInstitutionType) {
      if (resolvedCategory === "mba") resolvedInstitutionType = "MBA";
      else if (resolvedCategory === "engineering")
        resolvedInstitutionType = resolvedAutonomous
          ? "Autonomous Engineering"
          : resolvedNirf
            ? "NIRF Ranked Engineering"
            : "Engineering";
      else if (resolvedCourse?.includes("occupational")) resolvedInstitutionType = "Occupational Therapy";
      else if (resolvedCategory === "paramedical") resolvedInstitutionType = "Paramedical";
      else if (resolvedCategory && resolvedCategory !== "all") {
        resolvedInstitutionType = resolvedCategory.charAt(0).toUpperCase() + resolvedCategory.slice(1);
      }
    }

    return {
      resolvedCategory,
      resolvedDistrict,
      resolvedState,
      isCountryIndia,
      resolvedTopCities,
      resolvedCourse,
      resolvedFeatured,
      resolvedAutonomous,
      resolvedNirf,
      resolvedLimit,
      resolvedInstitutionType,
      h1Title,
      h2Title,
      seoDesc,
    };
  }

  // 4. Fallback to 1-part and 2-part routes
  if (state) {
    const matchState = INDIAN_STATES.find(
      (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "") === state.toLowerCase().replace(/[^a-z0-9]/g, "")
    );
    if (matchState) {
      resolvedState = matchState;
      h1Title = `Top Colleges in ${matchState}`;
      h2Title = `Top Colleges in ${matchState} - Rankings, Fees & Placements`;
    }
  }

  if (location) {
    resolvedDistrict = location.charAt(0).toUpperCase() + location.slice(1);
    h1Title = `Top Colleges in ${resolvedDistrict}`;
    h2Title = `Top Colleges in ${resolvedDistrict} - Rankings, Fees & Placements`;
  }

  let rawCat = category || type || "";
  let rawSub = subSlug || "";

  if (param1 && param2) {
    const p1Norm = param1.toLowerCase();
    const p2Norm = param2.toLowerCase();
    if (KNOWN_CATEGORIES.some((k) => p1Norm.includes(k) || k.includes(p1Norm))) {
      rawCat = param1;
      rawSub = param2;
    } else if (KNOWN_CATEGORIES.some((k) => p2Norm.includes(k) || k.includes(p2Norm))) {
      rawCat = param2;
      rawSub = param1;
    } else {
      rawCat = param1;
      rawSub = param2;
    }
  } else if (param1 && !rawCat) {
    const p1Norm = param1.toLowerCase();
    if (KNOWN_CATEGORIES.some((k) => p1Norm.includes(k) || k.includes(p1Norm))) {
      rawCat = param1;
    } else {
      rawSub = param1;
    }
  }

  if (rawCat && !rawSub) {
    const catNorm = rawCat.toLowerCase().replace(/[^a-z0-9]/g, "");
    const isKnownCategory = KNOWN_CATEGORIES.some((k) => {
      const kNorm = k.toLowerCase().replace(/[^a-z0-9]/g, "");
      return catNorm.includes(kNorm) || kNorm.includes(catNorm);
    });

    if (isKnownCategory) {
      resolvedCategory = rawCat.replace(/-/g, " ");
      resolvedState = "Tamil Nadu";
      if (catNorm.includes("universit")) {
        resolvedCategory = "university";
        h1Title = "Universities in Tamilnadu";
        h2Title = "Top Universities in Tamilnadu - Rankings, Courses & Admissions 2026";
      } else if (catNorm.includes("engineering")) {
        resolvedCategory = "engineering";
        h1Title = "Engineering Colleges in Tamilnadu";
        h2Title = "Top Engineering Colleges in Tamilnadu - Rankings, Fees & Placements";
      } else if (catNorm.includes("arts")) {
        resolvedCategory = "arts";
        h1Title = "Arts & Science Colleges in Tamilnadu";
        h2Title = "Top Arts & Science Colleges in Tamilnadu - Rankings, Fees & Placements";
      } else if (/\bmba\b/i.test(catNorm.replace(/coimbatore/gi, " "))) {
        resolvedCategory = "mba";
        h1Title = "MBA Colleges in Tamilnadu";
        h2Title = "Top MBA Colleges in Tamilnadu - Rankings, Fees & Placements";
      } else if (catNorm.includes("paramedical")) {
        resolvedCategory = "paramedical";
        h1Title = "Paramedical Colleges in Tamilnadu";
        h2Title = "Top Paramedical Colleges in Tamilnadu - Rankings, Fees & Placements";
      } else {
        const cName = resolvedCategory.charAt(0).toUpperCase() + resolvedCategory.slice(1);
        h1Title = `${cName} Colleges in Tamilnadu`;
        h2Title = `Top ${cName} Colleges in Tamilnadu - Rankings, Fees & Placements`;
      }
    } else {
      if (catNorm === "topcities" || catNorm === "top-cities") {
        resolvedTopCities = true;
        h1Title = "Top Colleges in Top Cities";
        h2Title = "Top Colleges in Top Cities - Rankings, Fees & Placements";
      } else {
        const matchState = INDIAN_STATES.find(
          (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "") === catNorm
        );
        if (matchState) {
          resolvedState = matchState;
          h1Title = `Top Colleges in ${matchState}`;
          h2Title = `Top Colleges in ${matchState} - Rankings, Fees & Placements`;
        } else {
          resolvedDistrict = rawCat.charAt(0).toUpperCase() + rawCat.slice(1);
          h1Title = `Top Colleges in ${resolvedDistrict}`;
          h2Title = `Top Colleges in ${resolvedDistrict} - Rankings, Fees & Placements`;
        }
      }
    }
  } else if (rawCat) {
    resolvedCategory = rawCat.replace(/-/g, " ");
  }

  if (rawSub) {
    const subLower = rawSub.toLowerCase();
    const subNorm = subLower.replace(/[^a-z0-9]/g, "");

    if (subLower === "topcities" || subLower === "top-cities") {
      resolvedTopCities = true;
      const cName =
        resolvedCategory === "arts"
          ? "Arts & Science"
          : resolvedCategory.charAt(0).toUpperCase() + resolvedCategory.slice(1);
      h1Title = `Top ${cName} Colleges in Top Cities`;
      h2Title = `Top ${cName} Colleges in Top Cities - Rankings, Fees & Placements`;
    } else if (subLower === "top-ranked") {
      resolvedFeatured = true;
      h1Title = "Top Ranked Universities";
      h2Title = "Top Ranked Universities - Admissions, Rankings & Reviews";
    } else if (subLower === "featured") {
      resolvedFeatured = true;
      h1Title = "Featured Universities";
      h2Title = "Featured Universities - Admissions, Rankings & Reviews";
    } else {
      const matchState = INDIAN_STATES.find(
        (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "") === subNorm
      );
      if (matchState) {
        resolvedState = matchState;
        const cName =
          resolvedCategory === "arts"
            ? "Arts & Science"
            : resolvedCategory !== "all"
              ? resolvedCategory.charAt(0).toUpperCase() + resolvedCategory.slice(1)
              : "";
        h1Title = cName ? `Top ${cName} Colleges in ${matchState}` : `Top Colleges in ${matchState}`;
        h2Title = `Top ${cName || "Colleges"} in ${matchState} - Rankings, Fees & Placements`;
      } else {
        resolvedDistrict = rawSub.charAt(0).toUpperCase() + rawSub.slice(1);
        const cName =
          resolvedCategory === "arts"
            ? "Arts & Science"
            : resolvedCategory !== "all"
              ? resolvedCategory.charAt(0).toUpperCase() + resolvedCategory.slice(1)
              : "";
        h1Title = cName
          ? `Top ${cName} Colleges in ${resolvedDistrict}`
          : `Top Colleges in ${resolvedDistrict}`;
        h2Title = `Top ${cName || "Colleges"} in ${resolvedDistrict} - Rankings, Fees & Placements`;
      }
    }
  }

  if (courseSlug) {
    resolvedCourse = courseSlug.replace(/-/g, " ");
    h1Title = `Top ${resolvedCourse.charAt(0).toUpperCase() + resolvedCourse.slice(1)} Colleges`;
    h2Title = `Top ${resolvedCourse.charAt(0).toUpperCase() + resolvedCourse.slice(1)} Colleges - Rankings, Fees & Placements`;
  }

  if (!h1Title) {
    h1Title = "Explore Top Colleges";
    h2Title =
      "Discover top-rated institutions, compare fees and placements, and find the perfect match for your future.";
  }

  if (!resolvedInstitutionType) {
    if (resolvedCategory === "mba") resolvedInstitutionType = "MBA";
    else if (resolvedCategory === "engineering")
      resolvedInstitutionType = resolvedAutonomous
        ? "Autonomous Engineering"
        : resolvedNirf
          ? "NIRF Ranked Engineering"
          : "Engineering";
    else if (resolvedCourse?.includes("occupational")) resolvedInstitutionType = "Occupational Therapy";
    else if (resolvedCategory === "paramedical") resolvedInstitutionType = "Paramedical";
    else if (resolvedCategory && resolvedCategory !== "all") {
      resolvedInstitutionType = resolvedCategory.charAt(0).toUpperCase() + resolvedCategory.slice(1);
    }
  }

  return {
    resolvedCategory,
    resolvedDistrict,
    resolvedState,
    isCountryIndia,
    resolvedTopCities,
    resolvedCourse,
    resolvedFeatured,
    resolvedAutonomous,
    resolvedNirf,
    resolvedLimit,
    resolvedInstitutionType,
    h1Title,
    h2Title,
    seoDesc,
  };
}

export interface CollegeFilterCriteria {
  selectedCategory: string;
  selectedDistrict: string;
  selectedState: string;
  selectedDegree: string;
  selectedOwnership: string;
  isTopCities: boolean;
  courseSlugFilter: string;
  isFeaturedOnly: boolean;
  isAutonomousOnly: boolean;
  isNirfOnly: boolean;
  searchQuery: string;
  fieldParam: string;
  programParam: string;
}

export function filterCollegesList(
  colleges: DatabaseCollege[],
  criteria: CollegeFilterCriteria
): DatabaseCollege[] {
  const {
    selectedCategory,
    selectedDistrict,
    selectedState,
    selectedDegree,
    selectedOwnership,
    isTopCities,
    courseSlugFilter,
    isFeaturedOnly,
    isAutonomousOnly,
    isNirfOnly,
    searchQuery,
    fieldParam,
    programParam,
  } = criteria;

  const baseFiltered = colleges.filter((college) => {
    if (selectedCategory !== "all") {
      const typeLower = `${college.type_collwge || ""} ${college.type || ""}`.toLowerCase().trim();
      const catLower = selectedCategory.toLowerCase().trim();
      const nameLower = (college.name || "").toLowerCase();
      if (catLower.includes("universit")) {
        if (!typeLower.includes("universit") && !nameLower.includes("universit")) return false;
      } else if (catLower === "arts" || catLower.includes("arts")) {
        if (!typeLower.includes("art") && !nameLower.includes("art") && !nameLower.includes("science"))
          return false;
      } else if (catLower === "engineering" || catLower.includes("engineering")) {
        const coursesText = (college.courses || [])
          .map((course) => `${course.name || ""} ${course.specialization || ""}`)
          .join(" ")
          .toLowerCase();
        const hasEngineeringProgram =
          /engineering|technology|\bb\.?\s*e\.?\b|\bb\.?\s*tech\b|\bm\.?\s*e\.?\b|\bm\.?\s*tech\b/.test(
            coursesText
          );
        const hasEngineeringTypeOrName =
          /engineering|technology|technical/.test(typeLower) ||
          /engineering|technology|technical/.test(nameLower) ||
          /engineering|technology|technical/.test((college.description || "").toLowerCase());
        if (!hasEngineeringTypeOrName && !hasEngineeringProgram) return false;
      } else if (catLower === "medical") {
        const coursesText = (college.courses || [])
          .map((course) => `${course.name || ""} ${course.specialization || ""}`)
          .join(" ")
          .toLowerCase();
        const hasMedicalOrDental =
          typeLower.includes("medical") ||
          nameLower.includes("medical") ||
          typeLower.includes("dental") ||
          nameLower.includes("dental") ||
          typeLower.includes("paramedical") ||
          nameLower.includes("paramedical") ||
          typeLower.includes("nursing") ||
          nameLower.includes("nursing") ||
          typeLower.includes("pharmacy") ||
          nameLower.includes("pharmacy") ||
          typeLower.includes("health") ||
          nameLower.includes("health") ||
          /\bmbbs\b|\bbds\b|\bmd\b|\bms\b|\bb\.?\s*pharm\b|\bnursing\b|\bbpt\b|\bdmlt\b/.test(
            coursesText
          );
        if (!hasMedicalOrDental) return false;
      } else if (
        catLower === "mba" ||
        /\bmba\b/i.test(catLower.replace(/coimbatore/gi, " ")) ||
        catLower.includes("management")
      ) {
        const hasMbaCourse =
          college.courses &&
          college.courses.some((c) => {
            const cName = (c.name || "").toLowerCase().replace(/coimbatore/gi, " ");
            const cSpec = (c.specialization || "").toLowerCase().replace(/coimbatore/gi, " ");
            return (
              /\bmba\b/i.test(cName) ||
              cName.includes("pgdm") ||
              cName.includes("management") ||
              /\bmba\b/i.test(cSpec) ||
              cSpec.includes("pgdm") ||
              cSpec.includes("management")
            );
          });
        const safeTypeLower = typeLower.replace(/coimbatore/gi, " ");
        const safeNameLower = nameLower.replace(/coimbatore/gi, " ");
        const hasMbaInType = /\bmba\b/i.test(safeTypeLower) || safeTypeLower.includes("management");
        const hasMbaInName =
          /\bmba\b/i.test(safeNameLower) ||
          safeNameLower.includes("management") ||
          safeNameLower.includes("business");
        if (!hasMbaCourse && !hasMbaInType && !hasMbaInName) return false;
      } else {
        if (!typeLower.includes(catLower) && !catLower.includes(typeLower) && !nameLower.includes(catLower))
          return false;
      }
    }

    if (selectedDegree !== "all") {
      const degLower = selectedDegree.toLowerCase();
      if (!college.courses || !college.courses.some((c) => c.name.toLowerCase().startsWith(degLower)))
        return false;
    }

    if (selectedOwnership !== "all") {
      const typeLower = (college.type || "").toLowerCase();
      const searchLower = selectedOwnership.toLowerCase();
      if (searchLower === "government") {
        if (!typeLower.includes("govt") && !typeLower.includes("government")) return false;
      } else if (searchLower === "private") {
        if (!typeLower.includes("private")) return false;
      }
    }

    if (fieldParam) {
      const map: Record<string, string> = {
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
      const target = map[fieldParam];
      if (target && college.courses && !college.courses.some((c) => c.name.includes(target))) return false;
    }

    if (programParam) {
      if (
        college.courses &&
        !college.courses.some((c) => c.name.toLowerCase().includes(programParam.toLowerCase()))
      )
        return false;
    }

    if (selectedDistrict !== "all") {
      const selectedLower = selectedDistrict.toLowerCase().trim();
      const distFirstPart = (college.district || "").split(",")[0].trim().toLowerCase();
      const locFirstPart = (college.location || "").split(",")[0].trim().toLowerCase();
      const fullDist = (college.district || "").toLowerCase();
      const fullLoc = (college.location || "").toLowerCase();

      const cityTerms = [selectedLower, ...(CITY_FILTER_ALIASES[selectedLower] || [])];
      const matchesDistrict = cityTerms.some(
        (city) =>
          distFirstPart === city ||
          locFirstPart === city ||
          fullDist.includes(city) ||
          fullLoc.includes(city)
      );
      if (!matchesDistrict) return false;
    }

    if (selectedState !== "all") {
      if (!college.location && !college.district) return false;
      const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, "");
      const collegeLocSafe = normalize(college.location || "");
      const collegeDistSafe = normalize(college.district || "");
      const selectedStateSafe = normalize(selectedState);

      const isTN = selectedStateSafe.includes("tamilnadu");
      if (isTN) {
        const tnTerms = [
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
        const matchesTN = tnTerms.some((t) => collegeLocSafe.includes(t) || collegeDistSafe.includes(t));
        if (!matchesTN) return false;
      } else {
        if (!collegeLocSafe.includes(selectedStateSafe) && !collegeDistSafe.includes(selectedStateSafe))
          return false;
      }
    }

    if (isAutonomousOnly) {
      const checkAuto = (str?: string | null) => (str || "").toLowerCase().includes("autonomous");
      const isAuto =
        checkAuto(college.name) ||
        checkAuto(college.slug) ||
        checkAuto(college.type) ||
        checkAuto(college.type_collwge) ||
        checkAuto(college.description) ||
        (college.highlights &&
          college.highlights.some((h) => checkAuto(typeof h === "string" ? h : JSON.stringify(h))));
      if (!isAuto) return false;
    }

    if (isNirfOnly) {
      const hasNirf =
        (college.rankings &&
          college.rankings.some(
            (r) => (r.agency || "").toUpperCase().includes("NIRF") || (r.rank && r.rank !== "-" && r.rank !== "0")
          )) ||
        (college.ranking && college.ranking > 0) ||
        (college.description || "").toLowerCase().includes("nirf") ||
        (college.highlights &&
          college.highlights.some((h) => JSON.stringify(h).toLowerCase().includes("nirf")));
      if (!hasNirf) return false;
    }

    if (isTopCities) {
      const topCities = [
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
      const dist = (college.district || "").toLowerCase();
      const loc = (college.location || "").toLowerCase();
      const inTopCity = topCities.some((c) => dist.includes(c) || loc.includes(c));
      if (!inTopCity) return false;
    }

    if (courseSlugFilter) {
      const cLower = courseSlugFilter.toLowerCase();
      const matchesCourse =
        (college.courses &&
          college.courses.some(
            (c) =>
              (c.name && c.name.toLowerCase().includes(cLower)) ||
              (c.specialization && c.specialization.toLowerCase().includes(cLower)) ||
              (cLower.includes("occupational") &&
                ((c.name &&
                  (c.name.toLowerCase().includes("occupational") || c.name.toLowerCase().includes("bot"))) ||
                  (c.specialization &&
                    (c.specialization.toLowerCase().includes("occupational") ||
                      c.specialization.toLowerCase().includes("bot")))))
          )) ||
        (cLower.includes("occupational") &&
          ((college.name || "").toLowerCase().includes("occupational") ||
            (college.description || "").toLowerCase().includes("occupational")));
      if (!matchesCourse) return false;
    }

    if (isFeaturedOnly && !college.featured) return false;

    return true;
  });

  let result = baseFiltered;
  if (searchQuery && searchQuery.trim()) {
    result = findMatchingColleges(baseFiltered, searchQuery).matchedColleges;
  }

  if (isNirfOnly) {
    result = [...result].sort((a, b) => {
      const getRank = (c: DatabaseCollege) => {
        const nirf = c.rankings?.find((r) => (r.agency || "").toUpperCase().includes("NIRF"));
        if (nirf && nirf.rank) {
          const num = parseInt(nirf.rank, 10);
          if (!isNaN(num) && num > 0) return num;
        }
        if (c.ranking && c.ranking > 0) return c.ranking;
        return 9999;
      };
      return getRank(a) - getRank(b);
    });
  }

  return result;
}
