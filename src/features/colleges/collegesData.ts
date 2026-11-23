import "server-only";
import { cache } from "react";
import { supabase } from "@/lib/supabase/client";
import {
  getAds,
  getBranches,
  getCollegeLocations,
  getColleges,
  getCollegeStates,
  getCollegeTypes,
} from "@/services/collegeService";

export interface SeoOverrideEntry {
  college_name?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  notes?: string | null;
  og_image?: string | null;
}

export const getCollegesPageData = cache(async () => {
  const [colleges, branches, collegeTypes, locations, states, topAds, bottomAds, feedAds] =
    await Promise.all([
      getColleges().catch(() => []),
      getBranches().catch(() => []),
      getCollegeTypes().catch(() => []),
      getCollegeLocations().catch(() => []),
      getCollegeStates().catch(() => []),
      getAds("college_top").catch(() => []),
      getAds("college_bottom").catch(() => []),
      getAds("college_feed").catch(() => []),
    ]);

  return {
    colleges,
    branches,
    collegeTypes,
    locations,
    states,
    topAds,
    bottomAds,
    feedAds,
  };
});

export const getSeoOverrideForPath = cache(async (cleanPath: string): Promise<SeoOverrideEntry | null> => {
  try {
    const { data } = await supabase
      .from("sitemap_entries")
      .select("college_name, seo_title, seo_description, notes, og_image")
      .eq("loc", cleanPath)
      .maybeSingle();
    return data;
  } catch {
    return null;
  }
});

export const getSeoSearchLocs = cache(async (): Promise<Set<string>> => {
  try {
    const { data } = await supabase
      .from("sitemap_entries")
      .select("loc")
      .eq("type", "seo_search")
      .eq("exclude", false);
    return new Set((data || []).map((row) => String(row.loc || "").toLowerCase()));
  } catch {
    return new Set();
  }
});
