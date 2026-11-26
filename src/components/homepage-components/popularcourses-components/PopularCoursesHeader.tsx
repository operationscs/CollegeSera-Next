"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import type {
  PopularCoursesSectionContent,
  PopularCourseTabId,
} from "@/types/home";

export interface PopularCoursesHeaderProps {
  content: PopularCoursesSectionContent;
  activeTab: PopularCourseTabId;
  onTabChange: (tabId: PopularCourseTabId) => void;
}

export const PopularCoursesHeader: React.FC<PopularCoursesHeaderProps> = ({
  content,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="mb-8 md:mb-10">
      {/* Centered Eyebrow, Heading & Subtitle */}
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-2 font-jakarta text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#ff861c] dark:text-[#ff861c] sm:text-xs">
          {content.eyebrow}
        </p>

        <h2 className="font-jakarta text-2xl font-extrabold tracking-tight text-[#065893] dark:text-slate-100 sm:text-3xl md:text-4xl">
          {content.title}
        </h2>

        <p className="mt-2.5 font-jakarta text-xs leading-relaxed text-[#64748B] dark:text-slate-400 sm:text-sm md:text-base">
          {content.description}
        </p>
      </div>

      {/* Centered Filter Pills */}
      <div className="mt-6 flex items-center justify-center sm:mt-8">
        <div
          role="group"
          aria-label={content.tabsAriaLabel}
          className="flex min-w-0 items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:justify-center sm:pb-0"
        >
          {content.tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <Button
                key={tab.id}
                type="button"
                variant={isActive ? "default" : "outline"}
                size="sm"
                aria-pressed={isActive}
                onClick={() => onTabChange(tab.id)}
                className={`h-9 shrink-0 rounded-full px-4 font-jakarta text-xs font-bold transition-colors ${
                  isActive
                    ? "border-transparent bg-[#ff861c] text-white shadow-sm hover:bg-[#e67310] dark:bg-[#ff861c] dark:text-white dark:hover:bg-[#e67310]"
                    : "border-slate-200/80 bg-white text-[#065893] shadow-sm hover:border-slate-200 hover:bg-slate-100 hover:text-[#065893] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCoursesHeader;
