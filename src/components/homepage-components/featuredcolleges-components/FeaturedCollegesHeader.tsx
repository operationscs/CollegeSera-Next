"use client";

import React from "react";
import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import type {
  FeaturedCollegesFilterId,
  FeaturedCollegesSectionContent,
  FeaturedCollegesViewMode,
} from "@/types/home";

export interface FeaturedCollegesHeaderProps {
  content: FeaturedCollegesSectionContent;
  activeFilter: FeaturedCollegesFilterId;
  onFilterChange: (filterId: FeaturedCollegesFilterId) => void;
  viewMode: FeaturedCollegesViewMode;
  onViewModeChange: (viewMode: FeaturedCollegesViewMode) => void;
}

export const FeaturedCollegesHeader: React.FC<FeaturedCollegesHeaderProps> = ({
  content,
  activeFilter,
  onFilterChange,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="mb-8 md:mb-10">
      {/* Centered Eyebrow, Heading & Subtitle */}
      <div className="mx-auto max-w-3xl text-center">
        <span className="mb-2 block font-jakarta text-xs font-extrabold uppercase tracking-wider text-[#ff861c] dark:text-[#ff861c]">
          {content.eyebrow}
        </span>

        <h2 className="font-jakarta text-2xl font-extrabold tracking-tight text-[#065893] dark:text-slate-100 sm:text-3xl md:text-4xl">
          {content.title}
        </h2>

        <p className="mt-2.5 font-jakarta text-sm leading-relaxed text-[#4B5563] dark:text-slate-400 sm:text-base">
          {content.description}
        </p>
      </div>

      {/* Controls Bar: Centered Filter Pills + Right Grid/List View Toggle */}
      <div className="relative mt-6 flex flex-col items-center justify-between gap-4 sm:mt-8 lg:flex-row lg:justify-center">
        {/* Filter Pills (Centered) */}
        <div
          role="group"
          aria-label={content.title}
          className="flex w-full items-center justify-start gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:justify-center lg:w-auto lg:pb-0"
        >
          {content.filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <Button
                key={filter.id}
                type="button"
                variant={isActive ? "default" : "outline"}
                size="sm"
                aria-pressed={isActive}
                onClick={() => onFilterChange(filter.id)}
                className={`h-9 shrink-0 rounded-full px-4 font-jakarta text-xs font-bold transition-colors ${
                  isActive
                    ? "border-transparent bg-[#ff861c] text-white shadow-sm hover:bg-[#e67310] dark:bg-[#ff861c] dark:text-white dark:hover:bg-[#e67310]"
                    : "border-slate-200/80 bg-white text-[#065893] shadow-sm hover:border-slate-200 hover:bg-slate-100 hover:text-[#065893] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-white"
                }`}
              >
                {filter.label}
              </Button>
            );
          })}
        </div>

        {/* Right Controls: Grid / List View Switcher Only */}
        <div className="flex w-full items-center justify-end sm:w-auto lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2">
          <div className="inline-flex items-center gap-1 rounded-xl border border-slate-200/80 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={content.gridViewAriaLabel}
              aria-pressed={viewMode === "grid"}
              onClick={() => onViewModeChange("grid")}
              className={`h-7 w-7 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-[#FFF3E8] text-[#ff861c] hover:bg-[#FFF3E8] hover:text-[#ff861c] dark:bg-orange-950/70 dark:text-[#ff861c]"
                  : "text-slate-600 hover:bg-slate-100 hover:text-[#065893] dark:text-slate-400 dark:hover:bg-slate-800"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={content.listViewAriaLabel}
              aria-pressed={viewMode === "list"}
              onClick={() => onViewModeChange("list")}
              className={`h-7 w-7 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-[#FFF3E8] text-[#ff861c] hover:bg-[#FFF3E8] hover:text-[#ff861c] dark:bg-orange-950/70 dark:text-[#ff861c]"
                  : "text-slate-600 hover:bg-slate-100 hover:text-[#065893] dark:text-slate-400 dark:hover:bg-slate-800"
              }`}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
