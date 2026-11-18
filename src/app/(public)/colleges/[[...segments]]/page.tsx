import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { segmentsToCollegesRouteInput } from "@/features/colleges/collegeFilterUtils";
import CollegesView, { generateCollegesMetadata } from "@/features/colleges/CollegesView";

export const revalidate = 300;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ segments?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const { segments } = await params;
  const sp = await searchParams;
  const routeInput = segmentsToCollegesRouteInput(segments);
  if (!routeInput) {
    return { title: "Not Found | Collegesera" };
  }
  const pathname = segments?.length ? `/colleges/${segments.join("/")}` : "/colleges";
  return generateCollegesMetadata({
    routeInput,
    pathname,
    hasQueryParams: Object.keys(sp).length > 0,
  });
}

export default async function CollegesSegmentsPage({
  params,
}: {
  params: Promise<{ segments?: string[] }>;
}) {
  const { segments } = await params;
  const routeInput = segmentsToCollegesRouteInput(segments);
  if (!routeInput) {
    notFound();
  }
  const pathname = segments?.length ? `/colleges/${segments.join("/")}` : "/colleges";
  return <CollegesView routeInput={routeInput} pathname={pathname} />;
}
