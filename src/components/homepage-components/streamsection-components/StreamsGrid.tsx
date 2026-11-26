"use client";

import React from "react";
import { HorizontalCardSlider } from "@/components/shared/HorizontalCardSlider";
import { StreamCard } from "./StreamCard";
import type { HomeStream } from "@/types/home";

export interface StreamsGridProps {
  streams: HomeStream[];
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  onScrollPrev: () => void;
  onScrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  prevButtonLabel: string;
  nextButtonLabel: string;
}

export const StreamsGrid: React.FC<StreamsGridProps> = ({
  streams,
  scrollContainerRef,
  onScrollPrev,
  onScrollNext,
  canScrollPrev,
  canScrollNext,
  prevButtonLabel,
  nextButtonLabel,
}) => {
  return (
    <HorizontalCardSlider
      scrollContainerRef={scrollContainerRef}
      onScrollPrev={onScrollPrev}
      onScrollNext={onScrollNext}
      canScrollPrev={canScrollPrev}
      canScrollNext={canScrollNext}
      prevButtonLabel={prevButtonLabel}
      nextButtonLabel={nextButtonLabel}
    >
      {streams.map((stream) => (
        <div
          key={stream.name}
          data-stream-card
          className="w-[86%] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] xl:w-[calc(25%-15px)]"
        >
          <StreamCard stream={stream} />
        </div>
      ))}
    </HorizontalCardSlider>
  );
};
