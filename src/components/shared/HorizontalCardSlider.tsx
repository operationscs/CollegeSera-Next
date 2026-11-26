"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface HorizontalCardSliderProps {
  children: React.ReactNode;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  onScrollPrev: () => void;
  onScrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  prevButtonLabel: string;
  nextButtonLabel: string;
  trackClassName?: string;
}

export const HorizontalCardSlider: React.FC<HorizontalCardSliderProps> = ({
  children,
  scrollContainerRef,
  onScrollPrev,
  onScrollNext,
  canScrollPrev,
  canScrollNext,
  prevButtonLabel,
  nextButtonLabel,
  trackClassName,
}) => {
  return (
    <div className="relative">
      {/* Left Arrow Button */}
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label={prevButtonLabel}
        disabled={!canScrollPrev}
        onClick={onScrollPrev}
        className="absolute -left-2 top-1/2 z-20 inline-flex h-9 w-9 -translate-y-1/2 rounded-full border-slate-200 bg-white text-[#065893] shadow-lg transition-all duration-200 hover:border-[#ff861c] hover:bg-[#ff861c] hover:text-white disabled:pointer-events-none disabled:opacity-0 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-[#ff861c] dark:hover:bg-[#ff861c] dark:hover:text-white sm:-left-3 sm:h-11 sm:w-11 lg:-left-5"
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>

      {/* Scrollable Slider Track */}
      <div
        ref={scrollContainerRef}
        className={cn(
          "flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-5",
          trackClassName
        )}
      >
        {children}
      </div>

      {/* Right Arrow Button */}
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label={nextButtonLabel}
        disabled={!canScrollNext}
        onClick={onScrollNext}
        className="absolute -right-2 top-1/2 z-20 inline-flex h-9 w-9 -translate-y-1/2 rounded-full border-slate-200 bg-white text-[#065893] shadow-lg transition-all duration-200 hover:border-[#ff861c] hover:bg-[#ff861c] hover:text-white disabled:pointer-events-none disabled:opacity-0 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-[#ff861c] dark:hover:bg-[#ff861c] dark:hover:text-white sm:-right-3 sm:h-11 sm:w-11 lg:-right-5"
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    </div>
  );
};

export default HorizontalCardSlider;
