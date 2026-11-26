"use client";

import React from "react";
import { HorizontalCardSlider } from "@/components/shared/HorizontalCardSlider";
import { CityCard } from "./CityCard";
import type { CitiesSectionContent, HomeCity } from "@/types/home";

export interface CitiesSliderProps {
  cities: HomeCity[];
  content: CitiesSectionContent;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  onScrollPrev: () => void;
  onScrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
}

export const CitiesSlider: React.FC<CitiesSliderProps> = ({
  cities,
  content,
  scrollContainerRef,
  onScrollPrev,
  onScrollNext,
  canScrollPrev,
  canScrollNext,
}) => {
  if (cities.length === 0) {
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
      {cities.map((city) => (
        <div
          key={city.id ?? city.name}
          data-city-card
          className="w-[78%] shrink-0 snap-start sm:w-[calc(50%-10px)] md:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)] xl:w-[calc(20%-16px)]"
        >
          <CityCard city={city} />
        </div>
      ))}
    </HorizontalCardSlider>
  );
};

export default CitiesSlider;
