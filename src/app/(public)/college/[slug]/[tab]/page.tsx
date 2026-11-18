import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { getCleanCollegeSlug } from "@/utils/collegeUrl";
import {
  buildCollegeTabMetadata,
  getCachedCollegeBySlug,
  isValidCollegeSlug,
  resolveCollegeTab,
} from "@/features/colleges/details/collegeDetailData";
import {
  CollegeAdmissionView,
  CollegeCoursesView,
  CollegeFacilitiesView,
  CollegeNewsView,
  CollegeOverviewView,
  CollegePlacementsView,
  CollegeRankingsView,
} from "@/features/colleges/details/CollegeTabViews";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; tab: string }>;
}): Promise<Metadata> {
  const { slug, tab } = await params;
  if (!isValidCollegeSlug(slug)) {
    return {};
  }

  const resolvedTab = resolveCollegeTab(tab);
  if (!resolvedTab) {
    return {};
  }

  const college = await getCachedCollegeBySlug(slug);
  if (!college) {
    return {};
  }

  return buildCollegeTabMetadata(college, slug, resolvedTab.id);
}

export default async function CollegeTabPage({
  params,
}: {
  params: Promise<{ slug: string; tab: string }>;
}) {
  const { slug, tab } = await params;

  if (!isValidCollegeSlug(slug)) {
    notFound();
  }

  const resolvedTab = resolveCollegeTab(tab);
  if (!resolvedTab) {
    notFound();
  }

  if (/^\d+-/.test(slug)) {
    const clean = getCleanCollegeSlug(slug);
    if (clean && clean !== slug) {
      permanentRedirect(`/college/${clean}/${tab}`);
    }
  }

  const college = await getCachedCollegeBySlug(slug);
  if (!college) {
    notFound();
  }

  switch (resolvedTab.id) {
    case "overview":
      return <CollegeOverviewView college={college} />;
    case "courses-fees":
      return <CollegeCoursesView college={college} />;
    case "admission":
      return <CollegeAdmissionView college={college} />;
    case "placements":
      return <CollegePlacementsView college={college} />;
    case "rankings":
      return <CollegeRankingsView college={college} />;
    case "facilities":
      return <CollegeFacilitiesView college={college} />;
    case "news-articles":
      return <CollegeNewsView college={college} />;
    default:
      notFound();
  }
}
