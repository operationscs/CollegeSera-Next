import "server-only";
import { cache } from "react";
import type { Metadata } from "next";
import { getCollegeBySlug } from "@/services/collegeService";
import { getCleanCollegeSlug } from "@/utils/collegeUrl";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import { SITE_URL } from "@/lib/site";
import type { DatabaseCollege } from "@/types/database";
import { COLLEGE_TABS, type CollegeTabId } from "./constants";

export { COLLEGE_TABS, type CollegeTabId } from "./constants";

export function isValidCollegeSlug(slug: string): boolean {
  return Boolean(slug && slug.length >= 1 && slug.length <= 100 && /^[a-z0-9-]+$/.test(slug));
}

export function isValidCollegeSubpath(subpath: string): boolean {
  return Boolean(
    subpath && subpath.length >= 1 && subpath.length <= 50 && /^[a-z0-9-]+$/.test(subpath)
  );
}

export function resolveCollegeTab(tabParam: string) {
  if (!isValidCollegeSubpath(tabParam)) return null;
  for (const tab of COLLEGE_TABS) {
    if (tab.id === tabParam || (tab.aliases as readonly string[]).includes(tabParam)) {
      return tab;
    }
  }
  return null;
}

/**
 * Request-scoped cached college lookup shared across layout, page, and generateMetadata.
 */
export const getCachedCollegeBySlug = cache(
  async (slug: string): Promise<DatabaseCollege | null> => {
    if (!isValidCollegeSlug(slug)) return null;
    return getCollegeBySlug(slug);
  }
);

export function buildCollegeSchema(college: DatabaseCollege, cleanSlug: string) {
  const seoTitle = (college as any).seo_title as string | undefined;
  const seoDesc = (college as any).seo_description as string | undefined;

  const pageTitle = seoTitle || `${college.name} – Courses, Fees and Admission`;
  const pageDesc =
    seoDesc ||
    `Get full details about ${college.name} – courses offered, fees, admission process and placement information. Explore MBA, PGDM and more.`;
  const canonicalUrl = `${SITE_URL}/college/${cleanSlug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: pageTitle,
        url: canonicalUrl,
        description: pageDesc,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Colleges",
            item: `${SITE_URL}/colleges`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: college.name,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "CollegeOrUniversity",
        name: college.name,
        description: college.description || pageDesc,
        url: canonicalUrl,
        ...(college.location || college.district
          ? {
              address: {
                "@type": "PostalAddress",
                ...(college.location ? { addressLocality: college.location } : {}),
                ...(college.district ? { addressRegion: college.district } : {}),
                addressCountry: "IN",
              },
            }
          : {}),
        ...(college.college_logo ? { logo: college.college_logo } : {}),
        ...(college.image_url ? { image: college.image_url } : {}),
      },
    ],
  };
}

export async function buildCollegeTabMetadata(
  college: DatabaseCollege,
  slugParam: string,
  tabId: CollegeTabId = "overview",
  hasQueryParams = false
): Promise<Metadata> {
  const cleanSlug = getCleanCollegeSlug(slugParam || college.slug);
  const seoTitle = (college as any).seo_title as string | undefined;
  const seoDesc = (college as any).seo_description as string | undefined;
  const ogImage = (college as any).og_image as string | undefined;

  const socialImage =
    ogImage || college.image_url || "https://collegesera.com/path-to-college-image.jpg";

  if (tabId === "overview") {
    const pageTitle = seoTitle || `${college.name} – Courses, Fees and Admission`;
    const pageDesc =
      seoDesc ||
      `Get full details about ${college.name} – courses offered, fees, admission process and placement information. Explore MBA, PGDM and more.`;
    const socialTitle = seoTitle || `${college.name} – Courses, Fees and Admission | CollegeSera`;
    const socialDesc =
      seoDesc ||
      `Discover ${college.name}: courses, fees, admissions, placements and more. A complete guide for prospective students.`;

    return buildSeoMetadata({
      title: pageTitle,
      description: pageDesc,
      image: socialImage,
      path: `/college/${cleanSlug}`,
      ogTitle: socialTitle,
      ogDescription: socialDesc,
      twitterTitle: socialTitle,
      twitterDescription: `Complete information on ${college.name}: courses, fees, admissions, placements — perfect for future MBA/PGDM students.`,
      hasQueryParams,
    });
  }

  switch (tabId) {
    case "courses-fees":
      return buildSeoMetadata({
        title: `${college.name} Courses & Fees`,
        description: `Check out the complete list of courses, fees, eligibility and fee breakdown for ${college.name}.`,
        image: socialImage,
        path: `/college/${cleanSlug}/courses-fees`,
        hasQueryParams,
      });
    case "admission":
      return buildSeoMetadata({
        title: `${college.name} Admission`,
        description: `Get complete details on the admission process, important dates, and eligibility for ${college.name}.`,
        image: socialImage,
        path: `/college/${cleanSlug}/admission`,
        hasQueryParams,
      });
    case "placements":
      return buildSeoMetadata({
        title: `${college.name} Placements: Highest Package, Top Recruiters`,
        description: `Explore the latest placement statistics, average package, and top companies visiting ${college.name}.`,
        image: socialImage,
        path: `/college/${cleanSlug}/placements`,
        hasQueryParams,
      });
    case "rankings":
      return buildSeoMetadata({
        title: `${college.name} Rankings & Awards`,
        description: `Check the latest national and international rankings and accreditations for ${college.name}.`,
        image: socialImage,
        path: `/college/${cleanSlug}/rankings`,
        hasQueryParams,
      });
    case "facilities":
      return buildSeoMetadata({
        title: `${college.name} Campus Facilities & Infrastructure`,
        description: `Discover the campus life, hostels, library, and other facilities offered at ${college.name}.`,
        image: socialImage,
        path: `/college/${cleanSlug}/facilities`,
        hasQueryParams,
      });
    case "news-articles":
      return buildSeoMetadata({
        title: `${college.name} News, Events & Articles`,
        description: `Stay updated with the latest news, events, and important announcements from ${college.name}.`,
        image: socialImage,
        path: `/college/${cleanSlug}/news-articles`,
        hasQueryParams,
      });
  }
}
