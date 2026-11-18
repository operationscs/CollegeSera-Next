import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import { getArticlesByLabel } from "@/services/articleService";
import ExamsClient from "@/features/exams/ExamsClient";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ examSlug: string }>;
}): Promise<Metadata> {
  const { examSlug } = await params;
  const label = examSlug.replace(/-/g, " ").toUpperCase();
  return buildSeoMetadata({
    title: `${label} Exam Guide & Details`,
    description: `Complete notification, syllabus, eligibility, and preparation updates for ${label}.`,
    path: `/exams/${examSlug}`,
  });
}

export default async function ExamDetailPage({
  params,
}: {
  params: Promise<{ examSlug: string }>;
}) {
  const { examSlug } = await params;
  const articles = await getArticlesByLabel("Exam").catch(() => []);
  return <ExamsClient articles={articles} examSlug={examSlug} />;
}
