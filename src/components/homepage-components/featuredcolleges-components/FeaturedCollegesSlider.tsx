"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import CollegeCard from "@/components/shared/CollegeGrid";
import { HorizontalCardSlider } from "@/components/shared/HorizontalCardSlider";
import type { DatabaseCollege } from "@/types/database";
import type {
  FeaturedCollegesSectionContent,
  FeaturedCollegesViewMode,
} from "@/types/home";

export interface FeaturedCollegesSliderProps {
  colleges: DatabaseCollege[];
  content: FeaturedCollegesSectionContent;
  viewMode: FeaturedCollegesViewMode;
}

export const FeaturedCollegesSlider: React.FC<FeaturedCollegesSliderProps> = ({
  colleges,
  content,
  viewMode,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = useCallback(() => {
    const element = sliderRef.current;
    if (!element) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }

    setCanScrollLeft(element.scrollLeft > 2);
    setCanScrollRight(
      element.scrollLeft + element.clientWidth < element.scrollWidth - 2
    );
  }, []);

  useEffect(() => {
    if (viewMode !== "grid") return;

    const element = sliderRef.current;
    if (!element) return;

    updateScrollButtons();
    element.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      element.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [colleges, viewMode, updateScrollButtons]);

  const handleSlide = (direction: -1 | 1) => {
    const element = sliderRef.current;
    if (!element) return;

    const firstCard = element.querySelector<HTMLElement>(
      "[data-featured-college-card]"
    );
    const cardWidth = firstCard ? firstCard.offsetWidth + 20 : 310;

    element.scrollBy({
      left: direction * cardWidth,
      behavior: "smooth",
    });
  };

  if (colleges.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 py-12 text-center font-jakarta text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
        {content.emptyFilterMessage}
      </div>
    );
  }

  /* List View: Stacked Vertically One Below Another */
  if (viewMode === "list") {
    return (
      <div className="flex flex-col gap-4 sm:gap-5">
        {colleges.map((college) => (
          <div key={college.id} className="w-full">
            <CollegeCard
              college={college}
              labels={content.cardLabels}
              viewMode="list"
            />
          </div>
        ))}
      </div>
    );
  }

  /* Grid View: Horizontal Carousel with Arrow Buttons at the Left & Right Ends of the Cards */
  return (
    <HorizontalCardSlider
      scrollContainerRef={sliderRef}
      onScrollPrev={() => handleSlide(-1)}
      onScrollNext={() => handleSlide(1)}
      canScrollPrev={canScrollLeft}
      canScrollNext={canScrollRight}
      prevButtonLabel={content.scrollLeftAriaLabel}
      nextButtonLabel={content.scrollRightAriaLabel}
    >
      {colleges.map((college) => (
        <div
          key={college.id}
          data-featured-college-card
          className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] xl:w-[calc(25%-15px)]"
        >
          <CollegeCard
            college={college}
            labels={content.cardLabels}
            viewMode="grid"
          />
        </div>
      ))}
    </HorizontalCardSlider>
  );
};
