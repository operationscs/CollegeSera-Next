import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import CoursesClient from "@/features/courses/CoursesClient";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata({
    title: "Top Courses - Admission, Courses and Fees",
    description:
      "Explore top degree and diploma courses across Engineering, Medical, Management, Design, Arts, and Commerce in India.",
    path: "/courses",
  });
}

export default function CoursesPage() {
  return <CoursesClient />;
}
