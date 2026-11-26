"use client";

import React, { useMemo, useState } from "react";
import { FeaturedCollegesHeader } from "./FeaturedCollegesHeader";
import { FeaturedCollegesSlider } from "./FeaturedCollegesSlider";
import { FeaturedCollegesFooter } from "./FeaturedCollegesFooter";
import { useSearchColleges } from "@/features/search/SearchCollegesContext";
import type { DatabaseCollege } from "@/types/database";
import type {
  FeaturedCollegesFilterId,
  FeaturedCollegesSectionContent,
  FeaturedCollegesViewMode,
} from "@/types/home";

export interface FeaturedCollegesSectionClientProps {
  colleges: DatabaseCollege[];
  content: FeaturedCollegesSectionContent;
}

/**
 * Extracts a numeric NIRF rank (1..100) if the college has a verified NIRF Top 100 ranking.
 * Returns null if not in NIRF Top 100.
 */
function getNirfTop100Rank(college: DatabaseCollege): number | null {
  if (Array.isArray(college.rankings) && college.rankings.length > 0) {
    let bestRank: number | null = null;
    for (const r of college.rankings) {
      const agencyUpper = (r.agency || "").toUpperCase();
      if (!agencyUpper.includes("NIRF")) continue;
      const rankMatch = String(r.rank || "").match(/\d+/);
      if (!rankMatch) continue;
      const rankNum = parseInt(rankMatch[0], 10);
      if (!isNaN(rankNum) && rankNum > 0 && rankNum <= 100) {
        if (bestRank === null || rankNum < bestRank) {
          bestRank = rankNum;
        }
      }
    }
    if (bestRank !== null) return bestRank;
  }

  if (
    typeof college.ranking === "number" &&
    college.ranking > 0 &&
    college.ranking <= 100
  ) {
    return college.ranking;
  }

  return null;
}

function isAutonomousCollege(college: DatabaseCollege): boolean {
  const checkAuto = (str?: string | number | null) =>
    /\bautonomous\b/i.test(String(str ?? ""));

  return Boolean(
    checkAuto(college.name) ||
      checkAuto(college.slug) ||
      checkAuto(college.type) ||
      checkAuto(college.type_collwge) ||
      checkAuto(college.description) ||
      college.highlights?.some((h) =>
        checkAuto(typeof h === "string" ? h : h.label || h.value)
      )
  );
}

function isNaacAPlusPlusCollege(college: DatabaseCollege): boolean {
  const grade = (college.naac_grade || "")
    .toUpperCase()
    .replace(/^GRADE\s+/i, "")
    .replace(/^NAAC\s+/i, "")
    .trim();
  return grade === "A++";
}

function isDeemedCollege(college: DatabaseCollege): boolean {
  const checkDeemed = (str?: string | number | null) =>
    /\bdeemed\b/i.test(String(str ?? ""));

  return Boolean(
    checkDeemed(college.name) ||
      checkDeemed(college.slug) ||
      checkDeemed(college.type) ||
      checkDeemed(college.type_collwge) ||
      checkDeemed(college.description) ||
      college.highlights?.some((h) =>
        checkDeemed(typeof h === "string" ? h : h.label || h.value)
      )
  );
}

function matchesFeaturedCollegeFilter(
  college: DatabaseCollege,
  filterId: FeaturedCollegesFilterId
): boolean {
  switch (filterId) {
    case "all":
      return true;
    case "nirf-top-100":
      return getNirfTop100Rank(college) !== null;
    case "autonomous":
      return isAutonomousCollege(college);
    case "naac-a-plus-plus":
      return isNaacAPlusPlusCollege(college);
    case "deemed":
      return isDeemedCollege(college);
    default:
      return true;
  }
}

const MAX_FILTERED_COLLEGES = 9;
const MAX_TOP_RANKED_CANDIDATES = 6;

export const FeaturedCollegesSectionClient: React.FC<
  FeaturedCollegesSectionClientProps
> = ({ colleges, content }) => {
  const allColleges = useSearchColleges();
  const [activeFilter, setActiveFilter] =
    useState<FeaturedCollegesFilterId>("all");
  const [viewMode, setViewMode] = useState<FeaturedCollegesViewMode>("grid");

  // Enrich the homepage featured colleges (9) with full relational data (courses, rankings) from context if available
  const enrichedFeaturedColleges = useMemo(() => {
    if (!allColleges || allColleges.length === 0) return colleges;
    const byId = new Map(allColleges.map((c) => [c.id, c]));
    return colleges.map((c) => byId.get(c.id) ?? c);
  }, [colleges, allColleges]);

  // Curated pool: the 9 homepage featured colleges + a few top-ranked institutions
  const curatedPool = useMemo(() => {
    const featuredIds = new Set(enrichedFeaturedColleges.map((c) => c.id));
    const topRankedExtras = (allColleges || [])
      .filter(
        (c) =>
          !featuredIds.has(c.id) &&
          (getNirfTop100Rank(c) !== null || c.featured)
      )
      .sort((a, b) => {
        const rankA = getNirfTop100Rank(a) ?? 999;
        const rankB = getNirfTop100Rank(b) ?? 999;
        if (rankA !== rankB) return rankA - rankB;
        return (b.featured_priority || 0) - (a.featured_priority || 0);
      })
      .slice(0, MAX_TOP_RANKED_CANDIDATES);

    return [...enrichedFeaturedColleges, ...topRankedExtras];
  }, [enrichedFeaturedColleges, allColleges]);

  const filteredColleges = useMemo(() => {
    if (activeFilter === "all") {
      return enrichedFeaturedColleges;
    }

    const matched = curatedPool.filter((college) =>
      matchesFeaturedCollegeFilter(college, activeFilter)
    );

    if (activeFilter === "nirf-top-100") {
      return [...matched]
        .sort((a, b) => {
          const rankA = getNirfTop100Rank(a) ?? 999;
          const rankB = getNirfTop100Rank(b) ?? 999;
          return rankA - rankB;
        })
        .slice(0, MAX_FILTERED_COLLEGES);
    }

    return matched.slice(0, MAX_FILTERED_COLLEGES);
  }, [enrichedFeaturedColleges, curatedPool, activeFilter]);

  return (
    <>
      <FeaturedCollegesHeader
        content={content}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      <FeaturedCollegesSlider
        colleges={filteredColleges}
        content={content}
        viewMode={viewMode}
      />
      <FeaturedCollegesFooter content={content} />
    </>
  );
};
