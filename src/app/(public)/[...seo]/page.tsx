import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import {
  isPureSeoSlugString,
  KNOWN_CATEGORIES,
  TRENDING_TITLE_MAP,
  type RouteFilterInput,
} from "@/features/colleges/collegeFilterUtils";
import { getCollegesPageData, getSeoSearchLocs } from "@/features/colleges/collegesData";
import CollegesView, { generateCollegesMetadata } from "@/features/colleges/CollegesView";
import { findMatchingColleges } from "@/utils/collegeSearch";

export const revalidate = 300;

const RESERVED_PREFIXES = new Set([
  "api",
  "secure-portal",
  "auth",
  "college",
  "colleges",
  "articles",
  "exams",
  "courses",
  "programs",
  "scholarship",
  "about-us",
  "contact-us",
  "privacy-policy",
  "terms-and-conditions",
  "college-directory",
  "seo-admin",
  "_next",
  "sitemap.xml",
  "robots.txt",
]);

/**
 * Strict validation for root-level SEO catch-all (`/:seoSlug` and `/:category/:subSlug`):
 * - Only 1 or 2 segments are valid (original App.tsx had `/:seoSlug` and `/:category/:subSlug`).
 * - Rejects reserved prefixes, file extensions, and non-slug characters.
 * - For 1-segment `/:seoSlug`: valid if in TRENDING_TITLE_MAP, or in sitemap_entries (type='seo_search'),
 *   or passes `isPureSeoSlugString`, or ends with `-india` / `india`, or matches a real college search.
 * - For 2-segment `/:category/:subSlug`: valid if `category` matches KNOWN_CATEGORIES or the full path is
 *   listed in sitemap_entries (type='seo_search').
 * Everything else calls `notFound()` to return HTTP 404.
 */
async function resolveSeoRouteInput(segments: string[]): Promise<RouteFilterInput | null> {
  if (!segments || segments.length === 0 || segments.length > 2) return null;
  if (segments.some((s) => !/^[a-z0-9-]+$/i.test(s))) return null;
  if (RESERVED_PREFIXES.has(segments[0].toLowerCase())) return null;

  const pathname = `/${segments.join("/")}`.toLowerCase();
  const dbSeoLocs = await getSeoSearchLocs();

  if (segments.length === 2) {
    const [category, subSlug] = segments;
    const catLower = category.toLowerCase();
    const isKnownCat = KNOWN_CATEGORIES.some((k) => catLower.includes(k) || k.includes(catLower));
    if (!isKnownCat && !dbSeoLocs.has(pathname)) {
      return null;
    }
    return { category, subSlug };
  }

  const seoSlug = segments[0];
  const seoLower = seoSlug.toLowerCase();

  if (
    TRENDING_TITLE_MAP[seoLower] ||
    dbSeoLocs.has(pathname) ||
    isPureSeoSlugString(seoSlug) ||
    seoLower.endsWith("-india")
  ) {
    return { seoSlug };
  }

  // Allow college-name search slugs only if they match at least one real college
  const { colleges } = await getCollegesPageData();
  const matched = findMatchingColleges(colleges, seoSlug.replace(/-/g, " "));
  if (matched.matchedColleges.length > 0) {
    return { seoSlug };
  }

  return null;
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ seo: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const { seo } = await params;
  const sp = await searchParams;
  const routeInput = await resolveSeoRouteInput(seo);
  if (!routeInput) {
    return { title: "Not Found | Collegesera" };
  }
  const pathname = `/${seo.join("/")}`;
  return generateCollegesMetadata({
    routeInput,
    pathname,
    hasQueryParams: Object.keys(sp).length > 0,
  });
}

export default async function SeoCatchAllPage({
  params,
}: {
  params: Promise<{ seo: string[] }>;
}) {
  const { seo } = await params;

  // Redirect legacy numbered slug to canonical slug without numbers (from original Colleges.tsx)
  if (seo.length === 1 && seo[0] === "top-10-mba-colleges-in-coimbatore") {
    permanentRedirect("/top-mba-colleges-in-coimbatore");
  }

  const routeInput = await resolveSeoRouteInput(seo);
  if (!routeInput) {
    notFound();
  }

  const pathname = `/${seo.join("/")}`;
  return <CollegesView routeInput={routeInput} pathname={pathname} />;
}
