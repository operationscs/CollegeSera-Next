"use client";

import SEOContentSection from "@/features/colleges/SEOContentSection";
import type {
  DatabaseAdvertisement,
  DatabaseBranch,
  DatabaseCollege,
} from "@/types/database";
import type { ParsedCollegeFilters } from "@/features/colleges/collegeFilterUtils";
import type { SeoOverrideEntry } from "@/features/colleges/collegesData";
import { useCollegesListing } from "@/features/colleges/hooks/useCollegesListing";
import { CollegesHero } from "@/features/colleges/components/CollegesHero";
import { CollegesFilterSidebar } from "@/features/colleges/components/CollegesFilterSidebar";
import { CollegesToolbar } from "@/features/colleges/components/CollegesToolbar";
import { CollegesFeed } from "@/features/colleges/components/CollegesFeed";
import { PopularSearchesSection } from "@/features/colleges/components/PopularSearchesSection";

interface CollegesClientProps {
  colleges: DatabaseCollege[];
  branches: DatabaseBranch[];
  collegeTypes: string[];
  locations: string[];
  states: string[];
  topAds: DatabaseAdvertisement[];
  feedAds: DatabaseAdvertisement[];
  urlFilters: ParsedCollegeFilters;
  seoOverride: SeoOverrideEntry | null;
  routeCategory?: string;
  routeLocation?: string;
  seoSlug?: string;
  initialSearchQuery?: string;
  sidebarAdSlot?: React.ReactNode;
  topAdSlot?: React.ReactNode;
  rightSidebarAdSlot?: React.ReactNode;
}

export default function CollegesClient({
  colleges,
  branches,
  collegeTypes,
  locations,
  states,
  topAds,
  feedAds,
  urlFilters,
  seoOverride,
  routeCategory,
  routeLocation,
  seoSlug,
  sidebarAdSlot,
  topAdSlot,
  rightSidebarAdSlot,
}: CollegesClientProps) {
  const {
    selectedCategory,
    institutionType,
    heroSubtitle,
    displayHeroTitle,
    searchQuery,
    categoryPath,
    categoryName,
    activeFilterCount,
    activeFilterChips,
    filteredColleges,
    collegesToDisplay,
    combinedItems,
    derivedLocation,
    hasMore,
    filterProps,
    handleLoadMore,
    handleClearAll,
  } = useCollegesListing({
    colleges,
    branches,
    collegeTypes,
    locations,
    states,
    feedAds,
    urlFilters,
    seoOverride,
    routeLocation,
    seoSlug,
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-orange-100 text-slate-900">
      {/* --- PREMIUM HERO & HEADER --- */}
      <CollegesHero
        categoryPath={categoryPath}
        categoryName={categoryName}
        displayHeroTitle={displayHeroTitle}
        searchQuery={searchQuery}
        institutionType={institutionType}
      />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 -mt-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* --- LEFT SIDEBAR --- */}
          <CollegesFilterSidebar
            activeFilterCount={activeFilterCount}
            activeFilterChips={activeFilterChips}
            filterProps={filterProps}
            onClearAll={handleClearAll}
            sidebarAdSlot={sidebarAdSlot}
          />

          {/* --- MAIN CONTENT --- */}
          <main className="lg:col-span-9 xl:col-span-7 space-y-6">
            {topAds.length > 0 && topAdSlot && <div className="w-full">{topAdSlot}</div>}

            <SEOContentSection
              colleges={filteredColleges}
              location={derivedLocation}
              category={
                routeCategory || (selectedCategory !== "all" ? selectedCategory : undefined)
              }
              subjectName={institutionType}
              h2Title={heroSubtitle}
            />

            <CollegesToolbar
              selectedCategory={selectedCategory}
              displayedCount={collegesToDisplay.length}
              totalCount={filteredColleges.length}
              filterProps={filterProps}
            />

            {/* --- RESULTS LIST --- */}
            <CollegesFeed
              items={combinedItems}
              hasResults={collegesToDisplay.length > 0}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
              onClearAll={handleClearAll}
            />

            {/* Crawlable Internal Links for Important SEO Landing Pages */}
            <PopularSearchesSection />
          </main>

          {/* --- RIGHT SIDEBAR --- */}
          <aside className="hidden xl:block xl:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="w-full">{rightSidebarAdSlot}</div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

