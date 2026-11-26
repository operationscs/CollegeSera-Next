'use client';

import { forwardRef } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchSuggestion } from "./types";

export interface SearchDropdownProps {
  isOpen: boolean;
  query: string;
  suggestions: SearchSuggestion[];
  isLoading: boolean;
  selectedIndex: number;
  onSuggestionClick: (suggestion: SearchSuggestion) => void;
  className?: string;
  variant?: "default" | "compact";
}

export const SearchDropdown = forwardRef<HTMLDivElement, SearchDropdownProps>(
  ({ isOpen, query, suggestions, isLoading, selectedIndex, onSuggestionClick, className, variant = "default" }, ref) => {
    const trimmed = query.trim();
    if (!isOpen || trimmed.length < 1) {
      return null;
    }

    const isCompact = variant === "compact";

    return (
      <div
        ref={ref}
        onMouseDown={(e) => e.preventDefault()}
        className={cn(
          "absolute left-0 right-0 top-full z-50 mt-1.5 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900",
          isCompact ? "max-h-52" : "max-h-64",
          className
        )}
      >
        {isLoading ? (
          <div className={cn("text-center text-gray-500 dark:text-slate-400", isCompact ? "p-2.5 text-xs" : "p-4")}>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3.5 h-3.5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              <span>Searching...</span>
            </div>
          </div>
        ) : suggestions.length > 0 ? (
          <div className={isCompact ? "py-1" : "py-1.5"}>
            {suggestions.map((suggestion, index) => (
              <button
                key={`${suggestion.type}-${suggestion.id}-${index}`}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onSuggestionClick(suggestion)}
                className={cn(
                  "flex w-full items-center border-b border-gray-50 text-left transition-colors hover:bg-orange-50/70 last:border-0 dark:border-slate-800 dark:hover:bg-slate-800",
                  isCompact ? "space-x-2.5 px-3 py-1.5" : "space-x-3 px-4 py-2.5",
                  selectedIndex === index && "border-l-4 border-l-orange-500 bg-orange-50 dark:bg-slate-800"
                )}
              >
                <span className={cn("shrink-0", isCompact && "[&_svg]:h-3.5 [&_svg]:w-3.5")}>
                  {suggestion.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className={cn("truncate font-medium text-gray-900 dark:text-slate-100", isCompact ? "text-xs" : "text-sm")}>
                    {suggestion.text}
                  </div>
                  <div className={cn("capitalize text-gray-500 dark:text-slate-400", isCompact ? "text-[10px] leading-tight" : "text-xs")}>
                    {suggestion.type}
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : trimmed.length >= 1 ? (
          <div className={cn("text-center text-gray-500 dark:text-slate-400", isCompact ? "p-3" : "p-4")}>
            <div className="flex flex-col items-center space-y-1">
              <Search className={cn("text-gray-300 dark:text-slate-600", isCompact ? "h-5 w-5" : "h-7 w-7")} />
              <span className={isCompact ? "text-xs" : "text-sm"}>No colleges found for &ldquo;{trimmed}&rdquo;</span>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
);

SearchDropdown.displayName = "SearchDropdown";

export default SearchDropdown;
