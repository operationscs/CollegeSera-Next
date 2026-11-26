"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { CITIES_SECTION_CONTENT, TOP_CITIES_DATA } from "@/data/top-cities";
import { CitiesHeader } from "@/components/homepage-components/cities-components/CitiesHeader";
import { CitiesSlider } from "@/components/homepage-components/cities-components/CitiesSlider";
import type { CitiesSectionContent, HomeCity } from "@/types/home";

export interface CitiesSectionProps {
  cities?: HomeCity[];
  content?: CitiesSectionContent;
}

export const CitiesSection: React.FC<CitiesSectionProps> = ({
  cities = TOP_CITIES_DATA,
  content = CITIES_SECTION_CONTENT,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

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
  }, [cities, updateScrollState]);

  const handleScroll = (direction: -1 | 1) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const firstCard =
      container.querySelector<HTMLElement>("[data-city-card]");
    const step = firstCard ? firstCard.offsetWidth + 20 : 280;

    container.scrollBy({
      left: direction * step,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#FAF8F6] py-8 dark:bg-slate-950 sm:py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CitiesHeader content={content} />

        <CitiesSlider
          cities={cities}
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

export default CitiesSection;
