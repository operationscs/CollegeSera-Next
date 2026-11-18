import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { getCleanCollegeSlug } from "@/utils/collegeUrl";
import {
  buildCollegeTabMetadata,
  getCachedCollegeBySlug,
  isValidCollegeSlug,
} from "@/features/colleges/details/collegeDetailData";
import { CollegeOverviewView } from "@/features/colleges/details/CollegeTabViews";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isValidCollegeSlug(slug)) {
    return {};
  }

  const college = await getCachedCollegeBySlug(slug);
  if (!college) {
    return {};
  }

  return buildCollegeTabMetadata(college, slug, "overview");
}

export default async function CollegeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!isValidCollegeSlug(slug)) {
    notFound();
  }

  if (/^\d+-/.test(slug)) {
    const clean = getCleanCollegeSlug(slug);
    if (clean && clean !== slug) {
      permanentRedirect(`/college/${clean}`);
    }
  }

  const college = await getCachedCollegeBySlug(slug);
  if (!college) {
    notFound();
  }

  return <CollegeOverviewView college={college} />;
}
