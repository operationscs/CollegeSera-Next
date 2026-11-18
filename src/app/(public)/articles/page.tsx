import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import { getArticles } from "@/services/articleService";
import ArticlesClient from "@/features/articles/ArticlesClient";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata({
    title: "Latest Education Articles | Colleges, Exams, Careers, Courses",
    description:
      "Read the latest education news, exam guides, career advice, and college admission updates across India.",
    path: "/articles",
  });
}

export default async function ArticlesPage() {
  const allArticles = await getArticles().catch(() => []);
  const published = allArticles.filter((a) => a.status === "published");
  return <ArticlesClient initialArticles={published} />;
}
