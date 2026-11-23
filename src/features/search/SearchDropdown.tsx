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
}

export const SearchDropdown = forwardRef<HTMLDivElement, SearchDropdownProps>(
  ({ isOpen, query, suggestions, isLoading, selectedIndex, onSuggestionClick, className }, ref) => {
    const trimmed = query.trim();
    if (!isOpen || (trimmed.length < 1 && suggestions.length === 0)) {
      return null;
    }

    return (
      <div
        ref={ref}
        onMouseDown={(e) => e.preventDefault()}
        className={cn(
          "absolute left-0 right-0 top-full z-50 mt-1.5 max-h-64 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900",
          className
        )}
      >
        {isLoading ? (
          <div className="p-4 text-center text-gray-500 dark:text-slate-400">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              <span>Searching...</span>
            </div>
          </div>
        ) : suggestions.length > 0 ? (
          <div className="py-1.5">
            {suggestions.map((suggestion, index) => (
              <button
                key={`${suggestion.type}-${suggestion.id}-${index}`}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onSuggestionClick(suggestion)}
                className={cn(
                  "flex w-full items-center space-x-3 border-b border-gray-50 px-4 py-2.5 text-left transition-colors hover:bg-orange-50/70 last:border-0 dark:border-slate-800 dark:hover:bg-slate-800",
                  selectedIndex === index && "border-l-4 border-l-orange-500 bg-orange-50 dark:bg-slate-800"
                )}
              >
                {suggestion.icon}
                <div className="flex-1 min-w-0">
                  <div className="truncate text-sm font-medium text-gray-900 dark:text-slate-100">{suggestion.text}</div>
                  <div className="text-xs capitalize text-gray-500 dark:text-slate-400">
                    {suggestion.type}
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : trimmed.length >= 2 ? (
          <div className="p-4 text-center text-gray-500 dark:text-slate-400">
            <div className="flex flex-col items-center space-y-1.5">
              <Search className="h-7 w-7 text-gray-300 dark:text-slate-600" />
              <span className="text-sm">No suggestions found for &ldquo;{trimmed}&rdquo;</span>
              <span className="text-xs text-gray-400">Press Enter to search anyway</span>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
);

SearchDropdown.displayName = "SearchDropdown";

export default SearchDropdown;
