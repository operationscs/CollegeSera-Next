"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  POPULAR_COURSES_DATA,
  POPULAR_COURSES_SECTION_CONTENT,
} from "@/data/popular-courses";
import { PopularCoursesHeader } from "@/components/homepage-components/popularcourses-components/PopularCoursesHeader";
import { PopularCoursesSlider } from "@/components/homepage-components/popularcourses-components/PopularCoursesSlider";
import type {
  PopularCoursesSectionContent,
  PopularCourseTabId,
  PopularProgram,
} from "@/types/home";

export interface PopularCoursesProps {
  programs?: PopularProgram[];
  content?: PopularCoursesSectionContent;
}

export const PopularCourses: React.FC<PopularCoursesProps> = ({
  programs = POPULAR_COURSES_DATA,
  content = POPULAR_COURSES_SECTION_CONTENT,
}) => {
  const [activeTab, setActiveTab] = useState<PopularCourseTabId>("ug");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const filteredPrograms = useMemo(() => {
    const matched = programs.filter((program) => {
      if (program.category) {
        return program.category === activeTab;
      }
      const levelLower = (program.level || "").toLowerCase();
      if (activeTab === "ug") return levelLower.includes("undergraduate");
      if (activeTab === "pg") return levelLower.includes("postgraduate");
      return (
        levelLower.includes("diploma") ||
        levelLower.includes("certification") ||
        levelLower.includes("associate")
      );
    });

    return matched.length > 0 ? matched : programs;
  }, [programs, activeTab]);

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
  }, [filteredPrograms, updateScrollState]);

  const handleTabChange = (tabId: PopularCourseTabId) => {
    setActiveTab(tabId);
    scrollContainerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  const handleScroll = (direction: -1 | 1) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const firstCard = container.querySelector<HTMLElement>(
      "[data-popular-course-card]"
    );
    const step = firstCard ? firstCard.offsetWidth + 20 : 320;

    container.scrollBy({
      left: direction * step,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#FAF8F6] py-8 dark:bg-slate-950 sm:py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PopularCoursesHeader
          content={content}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        <PopularCoursesSlider
          programs={filteredPrograms}
          content={content}
          scrollContainerRef={scrollContainerRef}
          onScrollPrev={() => handleScroll(-1)}
          onScrollNext={() => handleScroll(1)}
          canScrollPrev={canScrollPrev}
          canScrollNext={canScrollNext}
        />
      </div>
    </section>
  );
};

export default PopularCourses;
