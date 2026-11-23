'use client';

import React, { useMemo } from "react";
import { MapPin, Building2, GraduationCap } from "lucide-react";
import { SearchSuggestion } from "./types";
import { findMatchingColleges, normalizeSearchText } from "@/utils/collegeSearch";
import type { DatabaseCollege } from "@/types/database";

// Helper function to format slug
const formatSlug = (slug: string): string => {
  if (!slug) return "";
  return slug
    .toLowerCase()
    .replace(/^\d+-/, "")        // Strip leading numeric identifiers (e.g. 2011-)
    .replace(/[^a-z0-9-]/g, "-") // Replace invalid characters with hyphens
    .replace(/-+/g, "-")         // Collapse consecutive hyphens
    .replace(/^-+|-+$/g, "");    // Trim leading/trailing hyphens
};

const matchesCollegeQuery = (college: DatabaseCollege, normalizedQuery: string): boolean => {
  const courseText =
    college.courses?.map((course) => `${course.name} ${course.specialization || ""}`).join(" ") ||
    "";
  const searchableText = normalizeSearchText(
    [
      college.name,
      college.slug,
      college.location,
      college.district,
      college.address,
      college.type,
      college.type_collwge,
      courseText,
    ]
      .filter(Boolean)
      .join(" ")
  );
  const searchableWords = searchableText.split(" ");
  const queryTokens = normalizedQuery.split(" ").filter(Boolean);
  const nameWords = normalizeSearchText(`${college.name || ""} ${college.slug || ""}`)
    .split(" ")
    .filter((word) => !["of", "and", "the", "for", "to", "in", "at"].includes(word));
  const acronym = nameWords.map((word) => word[0]).join("");

  return (
    searchableText.includes(normalizedQuery) ||
    queryTokens.every((token) =>
      searchableWords.some((word) => word.startsWith(token))
    ) ||
    (queryTokens.length === 1 && acronym.startsWith(normalizedQuery))
  );
};

export const useSuggestionGenerator = (colleges: DatabaseCollege[]) => {
  return useMemo(() => {
    const generateSuggestions = (searchQuery: string): SearchSuggestion[] => {
      const trimmed = (searchQuery || "").trim();
      if (!trimmed) return [];

      const normQuery = normalizeSearchText(trimmed);
      if (!normQuery) return [];

      const suggestions: SearchSuggestion[] = [];
      const seen = new Set<string>();

      // 1. College names (letter-by-letter & word-by-word progressive matching)
      const { matchedColleges } = findMatchingColleges(colleges, trimmed);
      matchedColleges.forEach(college => {
        if (
          !college?.name ||
          seen.has(college.name) ||
          !matchesCollegeQuery(college, normQuery)
        ) return;
        const formattedSlug = formatSlug(college.slug);
        if (formattedSlug) {
          suggestions.push({
            id: formattedSlug,
            text: college.name,
            type: "college",
            icon: <Building2 className="w-4 h-4 text-blue-500 shrink-0" />,
          });
          seen.add(college.name);
        }
      });

      // 2. Locations
      const locations = [...new Set(colleges.map(c => c?.location).filter(Boolean))];
      locations.forEach(location => {
        const normLoc = normalizeSearchText(location);
        if (normLoc && normLoc.includes(normQuery) && !seen.has(location)) {
          suggestions.push({
            id: `location-${location}`,
            text: location,
            type: "location",
            icon: <MapPin className="w-4 h-4 text-green-500 shrink-0" />,
          });
          seen.add(location);
        }
      });

      // 3. Districts
      const districts = [...new Set(colleges.map(c => c?.district).filter(Boolean))];
      districts.forEach(district => {
        const normDist = normalizeSearchText(district);
        if (normDist && normDist.includes(normQuery) && !seen.has(district)) {
          suggestions.push({
            id: `district-${district}`,
            text: district,
            type: "district",
            icon: <MapPin className="w-4 h-4 text-orange-500 shrink-0" />,
          });
          seen.add(district);
        }
      });

      // 4. Course / Stream types
      const courseTypes = [
        ...new Set(
          colleges
            .flatMap(c => [c?.type_collwge, c?.type])
            .filter(Boolean)
        ),
      ];
      courseTypes.forEach(type => {
        const normType = normalizeSearchText(type);
        if (normType && normType.includes(normQuery) && !seen.has(type)) {
          suggestions.push({
            id: `course-${type}`,
            text: type,
            type: "course",
            icon: <GraduationCap className="w-4 h-4 text-purple-500 shrink-0" />,
          });
          seen.add(type);
        }
      });

      return suggestions.slice(0, 10);
    };

    return generateSuggestions;
  }, [colleges]);
};
