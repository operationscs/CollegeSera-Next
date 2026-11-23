import type { LucideIcon } from "lucide-react";

export type HeroStreamId = "all" | "engineering" | "mba" | "medical" | "arts";
export type HeroCityId =
  | "all"
  | "coimbatore"
  | "chennai"
  | "salem"
  | "madurai"
  | "trichy"
  | "bengaluru"
  | "kochi";

export interface HeroOption<TValue extends string> {
  value: TValue;
  label: string;
}

export interface HeroRoute {
  href: string;
  seoSlug: string;
}

export interface HeroSocialProofItem {
  count: number;
  college: string;
}

export interface HeroStat {
  icon: LucideIcon;
  value: string;
  label: string;
  detail?: string;
  color: string;
}

export interface HomeStream {
  name: string;
  icon: LucideIcon;
  path: string;
  color: string;
  bgColor: string;
  colleges: string;
}

export interface HomeCity {
  name: string;
  colleges: string;
  image: string;
}

export interface HomeStat {
  icon: string;
  label: string;
  bg: string;
  text: string;
}

export interface HomeExam {
  id: number;
  name: string;
  description: string;
  level: string;
  applicationDate: string;
  examDate: string;
  duration: string;
  logo: string;
  type: "Online" | "Computer-based test";
}

export interface PopularProgram {
  id: string;
  name: string;
  level: string | null;
}

export interface StreamOption {
  name: string;
  count: number;
}

export interface CourseGroupOption {
  name: string;
  count: number;
}

export interface CourseCatalogItem {
  id: number;
  name: string;
  type: string;
  level: string;
  collegesAvailable: string;
  mode: string;
}
