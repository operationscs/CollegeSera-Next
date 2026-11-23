"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useBooking } from "@/components/shared/BookingProvider";
import type { DatabaseArticle } from "@/types/database";
import { EXAM_FILTER_CATEGORIES } from "@/data/search";

interface ExamsClientProps {
  articles: DatabaseArticle[];
  examSlug?: string;
}

export default function ExamsClient({ articles, examSlug }: ExamsClientProps) {
  const { openBooking } = useBooking();
  const router = useRouter();

  const filteredArticles = useMemo(() => {
    if (!examSlug) return articles;
    const term = examSlug.toLowerCase().replace(/-/g, " ");
    const matched = articles.filter(
      (a) =>
        a.title.toLowerCase().includes(term) ||
        (a.slug && a.slug.toLowerCase().includes(examSlug.toLowerCase())) ||
        (a.content && a.content.toLowerCase().includes(term))
    );
    return matched.length > 0 ? matched : articles;
  }, [articles, examSlug]);

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm">
            <Link href="/" className="text-blue-600 hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Exams</span>
          </nav>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-orange-100 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-orange-600 mb-2">
            {examSlug
              ? `${examSlug.replace(/-/g, " ").toUpperCase()} Exam Guide & Details`
              : "Top Exams - Admission, Courses and Fees"}
          </h1>
          {examSlug && (
            <p className="text-sm text-slate-600">
              Complete notification, syllabus, eligibility, and preparation updates.
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filter
                </h3>
                <Button variant="ghost" onClick={() => router.push("/exams")} className="text-orange-500 text-sm">
                  Reset
                </Button>
              </div>

              {EXAM_FILTER_CATEGORIES.map((category) => (
                <Collapsible key={category.name} defaultOpen className="mb-6">
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-medium py-2">
                    <span>{category.name}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 space-y-2">
                    {category.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center space-x-2">
                        <Checkbox id={option.value} />
                        <label htmlFor={option.value} className="text-sm text-gray-600">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                Exams <span className="text-gray-500 font-normal">({filteredArticles.length} results)</span>
              </h2>
            </div>

            {/* Exam Cards */}
            <div className="space-y-6">
              {filteredArticles.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-dashed">
                  <p className="text-gray-500">No exams found for this selection.</p>
                  <Button variant="outline" onClick={() => router.push("/exams")} className="mt-4">
                    View All Exams
                  </Button>
                </div>
              ) : (
                filteredArticles.map((article) => (
                  <Card key={article.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                            {article.featured_image ? (
                              <img src={article.featured_image} alt={article.title} className="w-full h-full object-cover" />
                            ) : (
                              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            )}
                          </div>

                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-blue-900 mb-2">{article.title}</h3>
                            <p className="text-gray-600 mb-4 line-clamp-2">
                              {article.excerpt || (article.content ? article.content.substring(0, 150) : "")}...
                            </p>

                            <div className="text-sm text-gray-500 mb-4">
                              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs mr-2">
                                {article.status === "published" ? "Active" : "Upcoming"}
                              </span>
                              <span>Updated: {new Date(article.updated_at).toLocaleDateString()}</span>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-4">
                              <Link href={`/articles/${article.slug}`}>
                                <Button variant="outline" size="sm" className="text-blue-600 border-blue-600">
                                  View Details
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2 ml-4">
                          <Button className="bg-orange-500 hover:bg-orange-600" onClick={openBooking}>
                            Enquire Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
