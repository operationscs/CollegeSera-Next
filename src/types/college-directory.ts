import type { ReactNode } from "react";

export interface CollegeDirectoryData {
  id: string;
  college_id: string;
  slug: string;
  name: string;
  principalName?: string;
  type?: string;
  address?: string;
  location?: string;
  city?: string;
  college_logo?: string;
  email?: string;
  website?: string;
  phone?: string;
}

export interface CollegeDirectoryClientProps {
  initialColleges: CollegeDirectoryData[];
  adSlot?: ReactNode;
}
