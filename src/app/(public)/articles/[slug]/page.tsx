import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import JsonLd from "@/components/shared/JsonLd";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import { processArticleContent } from "@/lib/security/sanitize";
import { getArticleBySlug, getArticles } from "@/services/articleService";
import {
  ArticleBackButton,
  ArticleConsultCard,
  ArticleShareButtons,
  ArticleToc,
} from "@/features/articles/ArticleDetailClient";

export const revalidate = 300;

const fetchArticle = cache(async (slug: string) => {
  try {
    return await getArticleBySlug(slug);
  } catch {
    return null;
  }
});

export async function generateStaticParams() {
  try {
    const articles = await getArticles();
    return articles
      .filter((a) => a.status === "published" && a.slug)
      .map((a) => ({ slug: a.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticle(slug);
  if (!article) {
    return buildSeoMetadata({
      title: "Article Not Found",
      path: `/articles/${slug}`,
    });
  }

  return buildSeoMetadata({
    title: `${article.title} | CollegeSera`,
    description: article.meta_description || article.excerpt || "Read more on CollegeSera",
    keywords: article.tags?.join(", ") || "college, education, article",
    image: article.featured_image,
    path: `/articles/${slug}`,
    type: "article",
  });
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await fetchArticle(slug);
  if (!article) {
    notFound();
  }

  const { processedContent, toc } = processArticleContent(article.content);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    image: article.featured_image,
    datePublished: article.created_at,
    dateModified: article.updated_at,
    author: {
      "@type": "Organization",
      name: "CollegeSera",
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <JsonLd data={articleSchema} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <ArticleBackButton />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Content */}
          <article className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {article.featured_image && (
              <div className="w-full aspect-video relative">
                <img
                  src={article.featured_image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-6 md:p-10">
              {/* Header Info */}
              <div className="mb-8 border-b border-slate-100 pb-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-none px-3 py-1">
                    {article.article_label || "Article"}
                  </Badge>
                  <span className="text-slate-400 text-sm flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1" />
                    {new Date(article.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  {article.views !== undefined && (
                    <span className="text-slate-400 text-sm flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {article.views} reads
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
                  {article.title}
                </h1>

                <ArticleShareButtons title={article.title} />
              </div>

              {/* Mobile TOC */}
              <ArticleToc toc={toc} variant="mobile" />

              {/* Article Body */}
              <div
                className="prose prose-lg prose-slate max-w-none 
                  prose-h2:text-2xl prose-h2:font-bold prose-h2:text-slate-900 prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-xl prose-h3:font-semibold prose-h3:text-slate-800 prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-slate-700 prose-p:leading-loose prose-p:mb-6
                  prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-6 prose-li:text-slate-700 prose-li:mb-2
                  prose-strong:text-slate-900 prose-strong:font-bold"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-4 space-y-8">
            <div className="sticky top-24">
              <ArticleToc toc={toc} variant="desktop" />
              <ArticleConsultCard />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
