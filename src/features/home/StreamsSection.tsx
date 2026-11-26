"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HOME_STREAMS, STREAMS_SECTION_CONTENT } from "@/data/homepage";
import { StreamsSectionHeader } from "@/components/homepage-components/streamsection-components/StreamsSectionHeader";
import { StreamsGrid } from "@/components/homepage-components/streamsection-components/StreamsGrid";
import type {
  HomeStream,
  StreamFilterId,
  StreamsSectionContent,
} from "@/types/home";

export interface StreamsSectionProps {
  content?: StreamsSectionContent;
  streams?: HomeStream[];
}

export const StreamsSection: React.FC<StreamsSectionProps> = ({
  content = STREAMS_SECTION_CONTENT,
  streams = HOME_STREAMS,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<StreamFilterId>("all");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const filteredStreams = useMemo(() => {
    if (selectedFilter === "all") return streams;
    return streams.filter((stream) => stream.category === selectedFilter);
  }, [streams, selectedFilter]);

  const updateScrollState = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

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
  }, [filteredStreams, updateScrollState]);

  const handleSelectFilter = (filterId: StreamFilterId) => {
    setSelectedFilter(filterId);
    scrollContainerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  const handleScroll = (direction: -1 | 1) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const firstCard = container.querySelector<HTMLElement>("[data-stream-card]");
    const step = firstCard ? firstCard.offsetWidth + 20 : 320;

    container.scrollBy({
      left: direction * step,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#FAF8F6] py-8 dark:bg-slate-950 sm:py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <StreamsSectionHeader
          content={content}
          selectedFilter={selectedFilter}
          onSelectFilter={handleSelectFilter}
        />
        <StreamsGrid
          streams={filteredStreams}
          scrollContainerRef={scrollContainerRef}
          onScrollPrev={() => handleScroll(-1)}
          onScrollNext={() => handleScroll(1)}
          canScrollPrev={canScrollPrev}
          canScrollNext={canScrollNext}
          prevButtonLabel={content.prevButtonLabel}
          nextButtonLabel={content.nextButtonLabel}
        />
      </div>
    </section>
  );
};

export default StreamsSection;
