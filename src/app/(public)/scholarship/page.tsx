import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import ScholarshipClient from "@/features/scholarships/ScholarshipClient";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata({
    title: "Scholarship Application | CollegeSera",
    description:
      "Apply for scholarships at top colleges in India. Get financial aid guidance and support.",
    path: "/scholarship",
  });
}

export default function ScholarshipPage() {
  return <ScholarshipClient />;
}
