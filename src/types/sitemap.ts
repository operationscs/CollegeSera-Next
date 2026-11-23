export type SitemapEntryType = "static" | "college" | "seo_search" | "article";
export type SitemapTab = "seo_search" | "articles" | "static" | "college";
export type SitemapChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export interface SitemapEntry {
  id: number;
  type: SitemapEntryType;
  loc: string;
  slug: string | null;
  college_name: string | null;
  priority: string;
  changefreq: string;
  lastmod: string | null;
  exclude: boolean;
  notes: string | null;
  sort_order: number;
  seo_title: string | null;
  seo_description: string | null;
  og_image: string | null;
}

export type SitemapEntryEdits = Record<number, Partial<SitemapEntry>>;
