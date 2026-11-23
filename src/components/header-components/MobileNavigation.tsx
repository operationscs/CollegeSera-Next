"use client";

import type { FocusEventHandler, RefObject } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import SearchDropdown from "@/features/search/SearchDropdown";
import type { useSearchLogic } from "@/features/search/useSearchLogic";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { menuContent } from "./menu-content";
import type { HeaderNavItem } from "@/types/navigation";

type SearchState = Pick<
  ReturnType<typeof useSearchLogic>,
  | "query"
  | "setQuery"
  | "isOpen"
  | "selectedIndex"
  | "suggestions"
  | "isLoading"
  | "handleInputChange"
  | "handleKeyDown"
  | "handleSuggestionClick"
  | "handleSubmit"
  | "handleFocus"
>;

interface MobileNavigationProps {
  isOpen: boolean;
  isMobile: boolean;
  items: HeaderNavItem[];
  search: SearchState;
  dropdownRef: RefObject<HTMLDivElement | null>;
  onBlur: FocusEventHandler<HTMLInputElement>;
  onClose: () => void;
  onMenuContentClick: () => void;
}

export function MobileNavigation({
  isOpen,
  isMobile,
  items,
  search,
  dropdownRef,
  onBlur,
  onClose,
  onMenuContentClick,
}: MobileNavigationProps) {
  if (!isOpen || !isMobile) {
    return null;
  }

  return (
    <div
      id="mobile-navigation"
      className="absolute left-0 top-full z-50 h-[calc(100dvh-62px)] w-full overflow-y-auto border-t border-slate-100 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950 xl:hidden"
    >
      <div className="space-y-2 p-4">
        <form onSubmit={search.handleSubmit} className="relative mb-4">
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-100 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-900">
            <Search aria-hidden="true" size={18} className="mr-2 shrink-0 text-slate-400" />
            <Input
              type="text"
              value={search.query}
              onChange={search.handleInputChange}
              onKeyDown={search.handleKeyDown}
              onFocus={search.handleFocus}
              onBlur={onBlur}
              placeholder="Search colleges, courses, cities..."
              aria-label="Search colleges, courses, and exams"
              className="h-9 w-full !border-0 !bg-transparent px-0 text-sm text-slate-800 shadow-none placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-slate-100 dark:placeholder:text-slate-500"
            />
            {search.query && (
              <button
                type="button"
                onClick={() => search.setQuery("")}
                className="shrink-0 px-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            )}
            <button
              type="submit"
              className="ml-2 shrink-0 rounded-lg bg-orange-600 px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-orange-700"
            >
              Search
            </button>
          </div>
          <SearchDropdown
            ref={dropdownRef}
            isOpen={
              search.isOpen &&
              (search.query.trim().length >= 1 || search.suggestions.length > 0)
            }
            query={search.query}
            suggestions={search.suggestions}
            isLoading={search.isLoading}
            selectedIndex={search.selectedIndex}
            onSuggestionClick={search.handleSuggestionClick}
          />
        </form>

        <Accordion type="single" collapsible className="w-full">
          {items.map((item) => (
            <AccordionItem
              key={item.key}
              value={item.key}
              className="border-slate-100 dark:border-slate-800"
            >
              <AccordionTrigger className="py-3 text-left text-base font-semibold text-slate-800 hover:no-underline dark:text-slate-100">
                {item.label}
              </AccordionTrigger>
              <AccordionContent className="pb-2">
                <div onClick={onMenuContentClick}>
                  {menuContent[item.key]}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="flex flex-col gap-4 pt-6">
          <Link
            href="/articles"
            onClick={onClose}
            className="font-medium text-slate-600 dark:text-slate-300"
          >
            Articles
          </Link>
          <a
            href="https://chat.collegesera.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white"
            style={{
              background: "linear-gradient(135deg,#f97316,#ef4444)",
              boxShadow: "0 4px 14px rgba(249,115,22,0.4)",
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M12 2a2 2 0 0 1 2 2v3H10V4a2 2 0 0 1 2-2z" />
              <circle
                cx="9"
                cy="16"
                r="1"
                fill="currentColor"
                stroke="none"
              />
              <circle
                cx="15"
                cy="16"
                r="1"
                fill="currentColor"
                stroke="none"
              />
            </svg>
            Ask Sera
          </a>
        </div>
      </div>
    </div>
  );
}
