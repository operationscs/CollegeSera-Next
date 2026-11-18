import "server-only";
import type { Metadata } from "next";
import { supabase } from "@/lib/supabase/client";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

export interface SeoInput {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  /** Pathname used for canonical + SEO-override lookup, e.g. "/colleges/top-mba". */
  path: string;
  type?: "website" | "article";
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  /** true when the request carries query params → `noindex, follow` (original SEO.tsx rule) */
  hasQueryParams?: boolean;
}

/** Port of src/components/SEO.tsx (Helmet) to the Metadata API. */
export async function buildSeoMetadata(input: SeoInput): Promise<Metadata> {
  const cleanPath = input.path.toLowerCase().replace(/\/+$/, "") || "/";
  const canonicalUrl = `${SITE_URL}${cleanPath}`;

  // sitemap_entries doubles as the admin-editable SEO override table (seo_title/description/og_image/notes)
  let override: {
    seo_title?: string | null;
    seo_description?: string | null;
    og_image?: string | null;
    notes?: string | null;
  } | null = null;
  try {
    const { data } = await supabase
      .from("sitemap_entries")
      .select("seo_title, seo_description, og_image, notes")
      .eq("loc", cleanPath)
      .maybeSingle();
    override = data;
  } catch {
    override = null;
  }

  const description = override?.seo_description || input.description || DEFAULT_DESCRIPTION;
  const rawKeywords = override?.notes || input.keywords || DEFAULT_KEYWORDS;
  const keywords =
    rawKeywords
      .replace(/\blanding\s*page\b/gi, "")
      .replace(/\s{2,}/g, " ")
      .replace(/,\s*,/g, ",")
      .replace(/^\s*,\s*|\s*,\s*$/g, "")
      .trim() || DEFAULT_KEYWORDS;
  const rawImage = override?.og_image || input.image || DEFAULT_OG_IMAGE;
  const image = rawImage.startsWith("http")
    ? rawImage
    : `${SITE_URL}${rawImage.startsWith("/") ? "" : "/"}${rawImage}`;

  const activeTitle = override?.seo_title || input.title;
  const fullTitle = activeTitle.includes("|") ? activeTitle : `${activeTitle} | ${SITE_NAME}`;
  const ogTitle = override?.seo_title || input.ogTitle || fullTitle;
  const ogDescription = override?.seo_description || input.ogDescription || description;
  const twTitle = override?.seo_title || input.twitterTitle || fullTitle;
  const twDescription = override?.seo_description || input.twitterDescription || description;

  return {
    title: { absolute: fullTitle },
    description,
    keywords,
    alternates: { canonical: canonicalUrl },
    robots: input.hasQueryParams ? { index: false, follow: true } : undefined,
    openGraph: {
      type: input.type ?? "website",
      url: canonicalUrl,
      title: ogTitle,
      description: ogDescription,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: twTitle,
      description: twDescription,
      images: [image],
    },
  };
}
