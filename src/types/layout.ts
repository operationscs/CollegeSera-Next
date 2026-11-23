import type { DatabaseArticle, DatabaseCollege } from "@/types/database";

export interface HeaderProps {
  onBookingClick?: () => void;
  colleges?: DatabaseCollege[];
}

export interface FooterProps {
  initialExams?: DatabaseArticle[];
}
