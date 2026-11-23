import type { DatabaseCollege } from "@/types/database";

export interface CollegeHighlight {
  label?: string;
  value?: string | number;
}

export interface RelatedCollegeLanding {
  href: string;
  title: string;
  description: string;
}

export interface CollegeDetailViewProps {
  college: DatabaseCollege;
}

export interface CoursesAndFeesProps extends CollegeDetailViewProps {
  onApplyClick?: () => void;
}

export interface CollegeCardHorizontalProps extends CollegeDetailViewProps {}

export type CollegeTabId =
  | "overview"
  | "courses-fees"
  | "admission"
  | "placements"
  | "rankings"
  | "facilities"
  | "news-articles";

export type CollegeProgramLevel =
  | "UG Programs"
  | "PG Programs"
  | "Diploma"
  | "Ph.D / M.Phil"
  | "Other Programs";
