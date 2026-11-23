import type { LucideIcon } from "lucide-react";

export type MenuKey =
  | "universities"
  | "engineering"
  | "arts"
  | "paramedical"
  | "mba"
  | "exams";

export interface HeaderNavItem {
  label: string;
  key: MenuKey;
  path: string;
}

export interface AdminNavItem {
  name: string;
  path: string;
  icon: LucideIcon;
}
