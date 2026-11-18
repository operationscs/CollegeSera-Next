import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import { getArticlesByLabel } from "@/services/articleService";
import ExamsClient from "@/features/exams/ExamsClient";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata({
    title: "Top Exams - Admission, Courses and Fees",
    description:
      "Explore top entrance and board exams in India with notifications, syllabus, eligibility, and preparation updates.",
    path: "/exams",
  });
}

export default async function ExamsPage() {
  const articles = await getArticlesByLabel("Exam").catch(() => []);
  return <ExamsClient articles={articles} />;
}
