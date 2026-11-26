"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  EXAMS_SECTION_CONTENT,
  UPCOMING_EXAMS_DATA,
} from "@/data/upcoming-exams";
import { ExamsHeader } from "@/components/homepage-components/exams-components/ExamsHeader";
import { ExamsSlider } from "@/components/homepage-components/exams-components/ExamsSlider";
import { UserForm } from "@/components/shared/UserForm";
import type { ExamsSectionContent, HomeExam } from "@/types/home";

export interface ExamsSectionProps {
  exams?: HomeExam[];
  content?: ExamsSectionContent;
}

export const ExamsSection: React.FC<ExamsSectionProps> = ({
  exams = UPCOMING_EXAMS_DATA,
  content = EXAMS_SECTION_CONTENT,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isGuidanceOpen, setIsGuidanceOpen] = useState(false);

  const updateScrollState = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) {
      setCanScrollPrev(false);
      setCanScrollNext(false);
      return;
    }

    setCanScrollPrev(container.scrollLeft > 2);
    setCanScrollNext(
      container.scrollLeft + container.clientWidth < container.scrollWidth - 2
    );
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    updateScrollState();
    container.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      container.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [exams, updateScrollState]);

  const handleScroll = (direction: -1 | 1) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const firstCard =
      container.querySelector<HTMLElement>("[data-exam-card]");
    const step = firstCard ? firstCard.offsetWidth + 20 : 360;

    container.scrollBy({
      left: direction * step,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#FAF8F6] py-8 dark:bg-slate-950 sm:py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ExamsHeader content={content} />

        <ExamsSlider
          exams={exams}
          content={content}
          scrollContainerRef={scrollContainerRef}
          onScrollPrev={() => handleScroll(-1)}
          onScrollNext={() => handleScroll(1)}
          canScrollPrev={canScrollPrev}
          canScrollNext={canScrollNext}
          onApplyGuidance={() => setIsGuidanceOpen(true)}
        />
      </div>

      <UserForm
        isOpen={isGuidanceOpen}
        onClose={() => setIsGuidanceOpen(false)}
      />
    </section>
  );
};

export default ExamsSection;
