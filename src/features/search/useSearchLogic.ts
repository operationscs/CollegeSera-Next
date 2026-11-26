'use client';

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { SearchSuggestion } from "./types";
import { getCleanCollegeSlug } from "@/utils/collegeUrl";

export const useSearchLogic = (
  generateSuggestions: (query: string) => SearchSuggestion[],
  onSearch?: (query: string) => void,
  searchPathBuilder?: (query: string) => string,
  options?: { showSuggestionsOnEmptyFocus?: boolean; onEmptySubmit?: () => void }
) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const showSuggestionsOnEmptyFocus = options?.showSuggestionsOnEmptyFocus ?? false;
  const onEmptySubmit = options?.onEmptySubmit;

  const router = useRouter();

  // Compute suggestions synchronously letter-by-letter as the user types
  const suggestions = useMemo(() => {
    if (query.trim().length < 1 && !showSuggestionsOnEmptyFocus) {
      return [];
    }
    return generateSuggestions(query);
  }, [query, generateSuggestions, showSuggestionsOnEmptyFocus]);

  const isLoading = false;

  const handleSearch = (searchQuery: string) => {
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      if (onEmptySubmit) {
        onEmptySubmit();
        setIsOpen(false);
        setSelectedIndex(-1);
      }
      return;
    }

    const slug = trimmed
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!slug) return;

    router.push(searchPathBuilder ? searchPathBuilder(trimmed) : `/${slug}`);
    setIsOpen(false);
    setSelectedIndex(-1);
    setQuery(searchQuery);
    if (onSearch) {
      onSearch(trimmed);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);
    setIsOpen(value.trim().length >= 1 || showSuggestionsOnEmptyFocus);
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setIsOpen(false);
    setSelectedIndex(-1);
    setQuery(suggestion.text);

    if (suggestion.type === "college") {
      router.push(`/college/${getCleanCollegeSlug(suggestion.id)}`);
      if (onSearch) {
        onSearch(suggestion.text);
      }
      return;
    }

    if (suggestion.type === "district" || suggestion.type === "location") {
      const firstPart = suggestion.text.split(",")[0].trim();
      const locSlug = firstPart
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      if (locSlug) {
        router.push(`/colleges/location/${locSlug}`);
        if (onSearch) {
          onSearch(suggestion.text);
        }
        return;
      }
    }

    if (suggestion.type === "course") {
      const rawLower = suggestion.text.toLowerCase().trim();
      let catSlug = rawLower.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      if (rawLower.includes("universit")) catSlug = "universities";
      else if (rawLower.includes("art")) catSlug = "arts";
      else if (rawLower.includes("engineer")) catSlug = "engineering";
      else if (rawLower.includes("mba") || rawLower.includes("manage") || rawLower.includes("business")) catSlug = "mba";
      else if (rawLower.includes("paramed")) catSlug = "paramedical";
      else if (rawLower.includes("medical")) catSlug = "medical";

      router.push(`/colleges/${catSlug}`);
      if (onSearch) {
        onSearch(suggestion.text);
      }
      return;
    }

    handleSearch(suggestion.text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen && suggestions.length > 0) {
          setIsOpen(true);
        }
        setSelectedIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (isOpen && selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleSearch(query);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isOpen && selectedIndex >= 0 && suggestions[selectedIndex]) {
      handleSuggestionClick(suggestions[selectedIndex]);
    } else {
      handleSearch(query);
    }
  };

  const handleFocus = () => {
    if (
      query.trim().length >= 1 ||
      suggestions.length > 0 ||
      showSuggestionsOnEmptyFocus
    ) {
      setIsOpen(true);
    }
  };

  const handleBlur = () => {
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  return {
    query,
    setQuery,
    isOpen,
    selectedIndex,
    suggestions,
    isLoading,
    handleInputChange,
    handleKeyDown,
    handleSuggestionClick,
    handleSubmit,
    handleFocus,
    handleBlur,
    setIsOpen,
    setSelectedIndex,
  };
};
