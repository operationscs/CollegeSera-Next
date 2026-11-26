"use client";

import React from "react";
import { HorizontalCardSlider } from "@/components/shared/HorizontalCardSlider";
import { ExamCard } from "./ExamCard";
import type { ExamsSectionContent, HomeExam } from "@/types/home";

export interface ExamsSliderProps {
  exams: HomeExam[];
  content: ExamsSectionContent;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  onScrollPrev: () => void;
  onScrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  onApplyGuidance: () => void;
}

export const ExamsSlider: React.FC<ExamsSliderProps> = ({
  exams,
  content,
  scrollContainerRef,
  onScrollPrev,
  onScrollNext,
  canScrollPrev,
  canScrollNext,
  onApplyGuidance,
}) => {
  if (exams.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 py-12 text-center font-jakarta text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
        {content.emptyMessage}
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
      {exams.map((exam) => (
        <div
          key={exam.id}
          data-exam-card
          className="w-[86%] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
        >
          <ExamCard
            exam={exam}
            content={content}
            onApplyGuidance={onApplyGuidance}
          />
        </div>
      ))}
    </HorizontalCardSlider>
  );
};

export default ExamsSlider;
