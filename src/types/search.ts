import type { DatabaseCollege } from "@/types/database";

export interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  colleges?: DatabaseCollege[];
}

export interface SearchCollegesProviderProps {
  initialColleges: DatabaseCollege[];
  children: React.ReactNode;
}

export interface PopularSearch {
  label: string;
  slug: string;
}

export interface ExamFilterOption {
  label: string;
  value: string;
}

export interface ExamFilterCategory {
  name: string;
  options: ExamFilterOption[];
}
