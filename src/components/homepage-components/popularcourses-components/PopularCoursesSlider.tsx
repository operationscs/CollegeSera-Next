"use client";

import React from "react";
import { HorizontalCardSlider } from "@/components/shared/HorizontalCardSlider";
import { PopularCourseCard } from "./PopularCourseCard";
import type {
  PopularCoursesSectionContent,
  PopularProgram,
} from "@/types/home";

export interface PopularCoursesSliderProps {
  programs: PopularProgram[];
  content: PopularCoursesSectionContent;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  onScrollPrev: () => void;
  onScrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
}

export const PopularCoursesSlider: React.FC<PopularCoursesSliderProps> = ({
  programs,
  content,
  scrollContainerRef,
  onScrollPrev,
  onScrollNext,
  canScrollPrev,
  canScrollNext,
}) => {
  if (programs.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 py-12 text-center font-jakarta text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
        {content.emptyFilterMessage}
      </div>
    );
  }

  return (
    <HorizontalCardSlider
      scrollContainerRef={scrollContainerRef}
      onScrollPrev={onScrollPrev}
      onScrollNext={onScrollNext}
      canScrollPrev={canScrollPrev}
      canScrollNext={canScrollNext}
      prevButtonLabel={content.prevButtonLabel}
      nextButtonLabel={content.nextButtonLabel}
    >
      {programs.map((program) => (
        <div
          key={program.id}
          data-popular-course-card
          className="w-[86%] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] xl:w-[calc(25%-15px)]"
        >
          <PopularCourseCard program={program} labels={content.cardLabels} />
        </div>
      ))}
    </HorizontalCardSlider>
  );
};

export default PopularCoursesSlider;
