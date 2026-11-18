import React from "react";
import { BookingProvider } from "@/components/shared/BookingProvider";
import { SearchCollegesProvider } from "@/features/search/SearchCollegesContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getColleges } from "@/services/collegeService";
import { getArticlesByLabel } from "@/services/articleService";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [colleges, exams] = await Promise.all([
    getColleges().catch(() => []),
    getArticlesByLabel("Exam").catch(() => []),
  ]);

  return (
    <BookingProvider>
      <SearchCollegesProvider initialColleges={colleges}>
        <Header colleges={colleges} />
        {children}
        <Footer initialExams={exams} />
      </SearchCollegesProvider>
    </BookingProvider>
  );
}
