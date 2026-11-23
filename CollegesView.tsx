import type { Metadata } from "next";
import AdBanner from "@/components/shared/AdBanner";
import JsonLd from "@/components/shared/JsonLd";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import { SITE_URL } from "@/lib/site";
import { getCollegesPageData, getSeoOverrideForPath } from "@/features/colleges/collegesData";
import {
  parseCollegeUrlFilters,
  type RouteFilterInput,
} from "@/features/colleges/collegeFilterUtils";
import { resolveCollegesSeoMeta } from "@/features/colleges/utils/seoHelpers";
import CollegesClient from "@/features/colleges/CollegesClient";

export async function generateCollegesMetadata(opts: {
  routeInput: RouteFilterInput;
  pathname: string;
  hasQueryParams: boolean;
}): Promise<Metadata> {
  const urlFilters = parseCollegeUrlFilters(opts.routeInput);
  const cleanPath = opts.pathname.toLowerCase().replace(/\/+$/, "") || "/colleges";
  const seoOverride = await getSeoOverrideForPath(cleanPath);
  const { title, description } = resolveCollegesSeoMeta(urlFilters, seoOverride);

  return buildSeoMetadata({
    title,
    description,
    path: cleanPath,
    hasQueryParams: opts.hasQueryParams,
  });
}

export default async function CollegesView({
  routeInput,
  pathname,
}: {
  routeInput: RouteFilterInput;
  pathname: string;
}) {
  const cleanPath = pathname.toLowerCase().replace(/\/+$/, "") || "/colleges";
  const [{ colleges, branches, collegeTypes, locations, states, topAds, feedAds }, seoOverride] =
    await Promise.all([getCollegesPageData(), getSeoOverrideForPath(cleanPath)]);

  const urlFilters = parseCollegeUrlFilters(routeInput);
  const { title, description, categoryPath, categoryName } = resolveCollegesSeoMeta(
    urlFilters,
    seoOverride
  );

  const pageCanonicalUrl = `${SITE_URL}${cleanPath}`;
  const pageDisplayName =
    urlFilters.h1Title || (title ? title.split("|")[0].trim() : "Colleges");

  const landingSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: pageDisplayName,
        url: pageCanonicalUrl,
        description,
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
            name: categoryName,
            item: `${SITE_URL}${categoryPath}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: pageDisplayName,
            item: pageCanonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={landingSchema} />
      <CollegesClient
        colleges={colleges}
        branches={branches}
        collegeTypes={collegeTypes}
        locations={locations}
        states={states}
        topAds={topAds}
        feedAds={feedAds}
        urlFilters={urlFilters}
        seoOverride={seoOverride}
        routeCategory={routeInput.category}
        routeLocation={routeInput.location}
        seoSlug={routeInput.seoSlug}
        sidebarAdSlot={
          <AdBanner
            placement="sidebar"
            className="w-full rounded-xl overflow-hidden shadow-sm bg-slate-100 min-h-[300px] flex items-center justify-center border border-slate-200 border-dashed"
          >
            <span className="text-sm font-medium text-slate-400">Advertisement Space</span>
          </AdBanner>
        }
        topAdSlot={
          <AdBanner
            placement="college_top"
            className="w-full rounded-xl overflow-hidden shadow-sm h-[100px] sm:h-[120px]"
          />
        }
        rightSidebarAdSlot={
          <AdBanner
            placement="sidebar_right"
            className="w-full rounded-xl overflow-hidden shadow-sm bg-slate-100 min-h-[600px] flex flex-col items-center justify-center border border-slate-200 border-dashed"
          >
            <span className="text-sm font-medium text-slate-400 rotate-90 whitespace-nowrap opacity-50">
              Right Sidebar Ad Space
            </span>
          </AdBanner>
        }
      />
    </>
  );
}

