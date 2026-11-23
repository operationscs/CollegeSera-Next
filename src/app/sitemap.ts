import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase/client";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

function toChangeFreq(val?: string | null): ChangeFreq {
  const allowed: ChangeFreq[] = ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"];
  if (val && allowed.includes(val as ChangeFreq)) return val as ChangeFreq;
  return "weekly";
}

function toPriority(val?: string | number | null): number {
  const num = typeof val === "number" ? val : parseFloat(String(val ?? ""));
  if (Number.isFinite(num) && num >= 0 && num <= 1) return num;
  return 0.8;
}

function cleanLoc(loc: string): string {
  return loc.replace(/^\/college\/\d+-/, "/college/");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fallback: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/colleges`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/articles`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/exams`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/courses`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/programs`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/scholarship`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about-us`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact-us`, changeFrequency: "monthly", priority: 0.5 },
  ];

  try {
    const [{ data: entries, error }, { data: articles }] = await Promise.all([
      supabase
        .from("sitemap_entries")
        .select("loc, type, priority, changefreq, lastmod, exclude, slug, college_name")
        .order("sort_order", { ascending: true })
        .order("type", { ascending: true })
        .order("loc", { ascending: true }),
      supabase
        .from("articles")
        .select("slug, updated_at, status")
        .eq("status", "published")
        .not("slug", "is", null),
    ]);

    if (error || !entries) return fallback;

    const entryMap = new Map<string, (typeof entries)[number]>(entries.map((e) => [e.loc, e]));
    const excludedLocs = new Set(entries.filter((e) => e.exclude).map((e) => e.loc));

    const results = new Map<string, MetadataRoute.Sitemap[number]>();

    const addEntry = (
      loc: string,
      opts: { lastmod?: string | null; changefreq?: string | null; priority?: string | number | null }
    ) => {
      const cleaned = cleanLoc(loc);
      const url = `${SITE_URL}${cleaned.startsWith("/") ? "" : "/"}${cleaned}`;
      results.set(url, {
        url,
        lastModified: opts.lastmod || undefined,
        changeFrequency: toChangeFreq(opts.changefreq),
        priority: toPriority(opts.priority),
      });
    };

    // 1. Static, SEO search, and college pages from sitemap_entries
    for (const e of entries) {
      if (e.exclude) continue;
      if (e.type === "static" && !e.loc.startsWith("/articles/")) {
        addEntry(e.loc, e);
      } else if (e.type === "seo_search" || e.type === "college") {
        addEntry(e.loc, e);
      } else if (e.type === "article" || (e.loc.startsWith("/articles/") && e.loc !== "/articles")) {
        addEntry(e.loc, e);
      }
    }

    // 2. Published articles from articles table (deduplicated against sitemap_entries)
    for (const art of articles || []) {
      const slug = art.slug?.trim();
      if (!slug) continue;
      const loc = `/articles/${slug}`;
      if (excludedLocs.has(loc)) continue;

      const existing = entryMap.get(loc);
      addEntry(loc, {
        lastmod: existing?.lastmod || (art.updated_at ? String(art.updated_at).slice(0, 10) : undefined),
        changefreq: existing?.changefreq || "weekly",
        priority: existing?.priority || "0.8",
      });
    }

    return results.size > 0 ? Array.from(results.values()) : fallback;
  } catch {
    return fallback;
  }
}
