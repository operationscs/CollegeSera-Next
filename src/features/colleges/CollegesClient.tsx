"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, SlidersHorizontal, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import AdBanner from "@/components/shared/AdBanner";
import CollegeCardHorizontal from "@/features/colleges/CollegeCardHorizontal";
import CollegeFilters from "@/features/colleges/CollegeFilters";
import SEOContentSection from "@/features/colleges/SEOContentSection";
import type { DatabaseAdvertisement, DatabaseBranch, DatabaseCollege } from "@/types/database";
import {
  filterCollegesList,
  type ParsedCollegeFilters,
} from "@/features/colleges/collegeFilterUtils";
import type { SeoOverrideEntry } from "@/features/colleges/collegesData";

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
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(urlFilters.resolvedCategory);
  const [selectedDistrict, setSelectedDistrict] = useState(urlFilters.resolvedDistrict);
  const [selectedState, setSelectedState] = useState(urlFilters.resolvedState);
  const [isCountryIndia, setIsCountryIndia] = useState(urlFilters.isCountryIndia);
  const [selectedDegree, setSelectedDegree] = useState("all");
  const [selectedOwnership, setSelectedOwnership] = useState("all");
  const [isTopCities, setIsTopCities] = useState(urlFilters.resolvedTopCities);
  const [courseSlugFilter, setCourseSlugFilter] = useState(urlFilters.resolvedCourse);
  const [isFeaturedOnly, setIsFeaturedOnly] = useState(urlFilters.resolvedFeatured);
  const [isAutonomousOnly, setIsAutonomousOnly] = useState(urlFilters.resolvedAutonomous);
  const [isNirfOnly, setIsNirfOnly] = useState(urlFilters.resolvedNirf);
  const [maxCollegeLimit, setMaxCollegeLimit] = useState<number | null>(urlFilters.resolvedLimit);
  const [institutionType, setInstitutionType] = useState(urlFilters.resolvedInstitutionType);
  const [heroTitle, setHeroTitle] = useState(urlFilters.h1Title);
  const [heroSubtitle, setHeroSubtitle] = useState(urlFilters.h2Title);
  const [visibleCollegeCount, setVisibleCollegeCount] = useState(10);
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);
  const [inPageSearch, setInPageSearch] = useState("");
  const userManuallyToggledFilter = useRef(false);

  // Sync state if URL filters change
  useEffect(() => {
    setSelectedCategory(urlFilters.resolvedCategory);
    setSelectedDistrict(urlFilters.resolvedDistrict);
    setSelectedState(urlFilters.resolvedState);
    setIsCountryIndia(urlFilters.isCountryIndia);
    setIsTopCities(urlFilters.resolvedTopCities);
    setCourseSlugFilter(urlFilters.resolvedCourse);
    setIsFeaturedOnly(urlFilters.resolvedFeatured);
    setIsAutonomousOnly(urlFilters.resolvedAutonomous);
    setIsNirfOnly(urlFilters.resolvedNirf);
    setMaxCollegeLimit(urlFilters.resolvedLimit);
    setInstitutionType(urlFilters.resolvedInstitutionType);
    setHeroTitle(urlFilters.h1Title);
    setHeroSubtitle(urlFilters.h2Title);
    setInPageSearch("");
  }, [urlFilters]);

  // Auto-collapse filter on scroll down past header/hero
  useEffect(() => {
    const handleFilterScroll = () => {
      if (!userManuallyToggledFilter.current) {
        if (window.scrollY > 200) {
          setIsFilterCollapsed(true);
        } else {
          setIsFilterCollapsed(false);
        }
      }
    };
    window.addEventListener("scroll", handleFilterScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleFilterScroll);
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== "all") count++;
    if (selectedDistrict !== "all") count++;
    if (selectedState !== "all") count++;
    if (isCountryIndia) count++;
    if (selectedDegree !== "all") count++;
    if (selectedOwnership !== "all") count++;
    if (isAutonomousOnly) count++;
    if (isNirfOnly) count++;
    if (courseSlugFilter) count++;
    if (isTopCities) count++;
    if (isFeaturedOnly) count++;
    return count;
  }, [
    selectedCategory,
    selectedDistrict,
    selectedState,
    isCountryIndia,
    selectedDegree,
    selectedOwnership,
    isAutonomousOnly,
    isNirfOnly,
    courseSlugFilter,
    isTopCities,
    isFeaturedOnly,
  ]);

  // Intersection Observer for Infinite Scroll
  const observer = useRef<IntersectionObserver | null>(null);
  const lastCollegeElementRef = useCallback((node: HTMLDivElement | null) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCollegeCount((prev) => prev + 10);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  const displayHeroTitle =
    seoOverride?.college_name ||
    (seoOverride?.seo_title ? seoOverride.seo_title.split("|")[0].trim() : heroTitle);

  const isStructuredSeo = Boolean(
    seoSlug &&
      (selectedCategory !== "all" ||
        selectedDistrict !== "all" ||
        selectedState !== "all" ||
        isAutonomousOnly ||
        isNirfOnly ||
        Boolean(courseSlugFilter))
  );
  const searchQuery =
    inPageSearch ||
    searchParams.get("search") ||
    (seoSlug && !isStructuredSeo ? seoSlug.replace(/-/g, " ") : "");
  const fieldParam = searchParams.get("field") || "";
  const programParam = searchParams.get("program") || "";

  const availableDegrees = useMemo(() => {
    const degrees = new Set<string>();
    colleges.forEach((c) => {
      c.courses?.forEach((course) => {
        if (course.name) {
          const match = course.name.match(/^[a-zA-Z\.]+/);
          if (match) degrees.add(match[0].toUpperCase());
        }
      });
    });
    return Array.from(degrees).sort();
  }, [colleges]);

  const availableOwnerships = useMemo(() => ["Government", "Private"], []);

  const filteredColleges = useMemo(
    () =>
      filterCollegesList(colleges, {
        selectedCategory,
        selectedDistrict,
        selectedState,
        selectedDegree,
        selectedOwnership,
        isTopCities,
        courseSlugFilter,
        isFeaturedOnly,
        isAutonomousOnly,
        isNirfOnly,
        searchQuery,
        fieldParam,
        programParam,
      }),
    [
      colleges,
      selectedCategory,
      selectedDistrict,
      selectedState,
      selectedDegree,
      selectedOwnership,
      isTopCities,
      courseSlugFilter,
      isFeaturedOnly,
      isAutonomousOnly,
      isNirfOnly,
      searchQuery,
      fieldParam,
      programParam,
    ]
  );

  const derivedLocation = useMemo(() => {
    if (isTopCities) return "Top Cities";
    if (isCountryIndia) return "India";
    if (routeLocation) return routeLocation;
    if (selectedDistrict !== "all") return selectedDistrict;
    if (selectedState !== "all") return selectedState;

    if (searchQuery && filteredColleges.length > 0) {
      const queryLower = searchQuery.toLowerCase();
      const matchedDistrict = locations.find((loc) => queryLower.includes(loc.toLowerCase()));
      if (matchedDistrict) return matchedDistrict;

      const firstDistrict = filteredColleges[0].district;
      const allSame = filteredColleges.every((c) => c.district === firstDistrict);
      if (allSame) return firstDistrict;
    }
    return undefined;
  }, [
    routeLocation,
    selectedDistrict,
    selectedState,
    searchQuery,
    filteredColleges,
    locations,
    isTopCities,
    isCountryIndia,
  ]);

  const collegesToDisplay = useMemo(() => {
    const limit = maxCollegeLimit ? Math.min(visibleCollegeCount, maxCollegeLimit) : visibleCollegeCount;
    return filteredColleges.slice(0, limit);
  }, [filteredColleges, visibleCollegeCount, maxCollegeLimit]);

  const combinedItems = useMemo(() => {
    if (!collegesToDisplay.length) return [];
    if (!feedAds.length) return collegesToDisplay.map((c) => ({ type: "college" as const, data: c }));

    const items: Array<
      | { type: "college"; data: DatabaseCollege }
      | { type: "ad"; data: DatabaseAdvertisement }
    > = [];
    let adIndex = 0;
    const adCounts: Record<string, number> = {};

    collegesToDisplay.forEach((college, index) => {
      items.push({ type: "college", data: college });

      if ((index + 1) % 5 === 0) {
        let attempts = 0;
        let foundAd: DatabaseAdvertisement | null = null;

        while (attempts < feedAds.length) {
          const candidate = feedAds[adIndex % feedAds.length];
          const count = adCounts[candidate.id] || 0;
          const limit =
            candidate.max_display_count === 0 ? Infinity : candidate.max_display_count || Infinity;

          if (count < limit) {
            foundAd = candidate;
            adCounts[candidate.id] = count + 1;
            adIndex++;
            break;
          }
          adIndex++;
          attempts++;
        }

        if (foundAd) {
          items.push({ type: "ad", data: foundAd });
        }
      }
    });
    return items;
  }, [collegesToDisplay, feedAds]);

  const handleFilterNavigation = (newCategory: string, newDistrict: string) => {
    if (newCategory === "all" && newDistrict === "all") {
      router.push("/colleges");
      return;
    }

    const catSlug = newCategory !== "all" ? newCategory.toLowerCase().replace(/\s+/g, "-") : null;
    const distSlug = newDistrict !== "all" ? newDistrict.toLowerCase().replace(/\s+/g, "-") : null;

    if (catSlug && distSlug) {
      router.push(`/colleges/${catSlug}/${distSlug}`);
    } else if (distSlug) {
      router.push(`/colleges/location/${distSlug}`);
    } else if (catSlug) {
      router.push(`/colleges/${catSlug}`);
    }
  };

  const handleClearAll = () => {
    setSelectedCategory("all");
    setSelectedDistrict("all");
    setSelectedState("all");
    setIsCountryIndia(false);
    setSelectedDegree("all");
    setSelectedOwnership("all");
    setIsAutonomousOnly(false);
    setIsNirfOnly(false);
    setMaxCollegeLimit(null);
    setCourseSlugFilter("");
    setIsTopCities(false);
    setIsFeaturedOnly(false);
    setHeroTitle("Explore Top Colleges");
    setHeroSubtitle(
      "Discover top-rated institutions, compare fees and placements, and find the perfect match for your future."
    );
    setInPageSearch("");
    router.push("/colleges");
  };

  const filterProps = {
    branches,
    collegeTypes,
    locations,
    states,
    degrees: availableDegrees,
    ownerships: availableOwnerships,
    selectedCategory,
    selectedDistrict,
    selectedState,
    selectedDegree,
    selectedOwnership,
    onCategoryChange: (val: string) => handleFilterNavigation(val, selectedDistrict),
    onDistrictChange: (val: string) => handleFilterNavigation(selectedCategory, val),
    onStateChange: (st: string) => {
      setSelectedState(st);
      if (st !== "all") {
        const stateSlug = st.toLowerCase().replace(/\s+/g, "-");
        const catSlug =
          selectedCategory !== "all" ? selectedCategory.toLowerCase().replace(/\s+/g, "-") : null;
        if (catSlug) {
          router.push(`/colleges/${catSlug}/${stateSlug}`);
        } else {
          router.push(`/colleges/state/${stateSlug}`);
        }
      }
    },
    onDegreeChange: setSelectedDegree,
    onOwnershipChange: setSelectedOwnership,
    showFilters: true,
    onToggleFilters: () => {},
  };

  const categoryPath = selectedCategory !== "all" ? `/colleges/${selectedCategory}` : "/colleges";
  const categoryName =
    selectedCategory !== "all"
      ? selectedCategory.toUpperCase() === "MBA"
        ? "MBA Colleges"
        : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Colleges`
      : "Colleges";

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-orange-100 text-slate-900">
      {/* --- PREMIUM HERO & HEADER --- */}
      <div className="pt-32 pb-16 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-orange-500/20 blur-[100px] opacity-60 mix-blend-screen" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-[100px] opacity-60 mix-blend-screen" />
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
        </div>

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="text-sm text-slate-400 mb-3 flex items-center gap-2 flex-wrap">
                <Link href="/" className="hover:text-orange-400 transition-colors">
                  Home
                </Link>
                <span className="text-slate-600">/</span>
                <Link href={categoryPath} className="hover:text-orange-400 transition-colors">
                  {categoryName}
                </Link>
                <span className="text-slate-600">/</span>
                <span className="font-medium text-slate-300">{displayHeroTitle || "Colleges"}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
                {displayHeroTitle ? (
                  displayHeroTitle
                ) : searchQuery ? (
                  <span className="capitalize">{searchQuery}</span>
                ) : (
                  <>
                    Explore{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                      Top Colleges
                    </span>
                  </>
                )}
              </h1>
              <p className="text-base md:text-lg text-slate-300">
                Discover top-rated {institutionType ? `${institutionType} ` : ""}institutions, compare fees and placements, and find the perfect match for your future.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 -mt-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* --- LEFT SIDEBAR --- */}
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-3">
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm transition-all duration-300">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      userManuallyToggledFilter.current = true;
                      setIsFilterCollapsed(!isFilterCollapsed);
                    }}
                    className="font-semibold text-slate-900 flex items-center gap-2 hover:text-orange-600 transition-colors group cursor-pointer"
                  >
                    <Filter className="w-4 h-4 text-orange-600" />
                    <span>Filters</span>
                    <ChevronDown
                      size={16}
                      className={`text-slate-400 group-hover:text-orange-600 transition-transform duration-300 ${
                        isFilterCollapsed ? "" : "rotate-180"
                      }`}
                    />
                  </button>
                  <div className="flex items-center gap-2">
                    {activeFilterCount > 0 && (
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-semibold">
                        {activeFilterCount}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={handleClearAll}
                      className="text-[10px] uppercase font-bold text-orange-600 hover:text-orange-700 tracking-wide cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                {isFilterCollapsed && activeFilterCount > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {selectedCategory !== "all" && (
                      <span className="text-[11px] bg-orange-50 text-orange-700 border border-orange-100 px-2 py-0.5 rounded-md font-medium">
                        {selectedCategory}
                      </span>
                    )}
                    {selectedDistrict !== "all" && (
                      <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                        {selectedDistrict}
                      </span>
                    )}
                    {selectedState !== "all" && (
                      <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                        {selectedState}
                      </span>
                    )}
                    {isCountryIndia && (
                      <span className="text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-md font-medium">
                        India
                      </span>
                    )}
                    {selectedDegree !== "all" && (
                      <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                        {selectedDegree}
                      </span>
                    )}
                    {isAutonomousOnly && (
                      <span className="text-[11px] bg-orange-50 text-orange-700 border border-orange-100 px-2 py-0.5 rounded-md font-medium">
                        Autonomous
                      </span>
                    )}
                    {isNirfOnly && (
                      <span className="text-[11px] bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-md font-medium">
                        NIRF Ranked
                      </span>
                    )}
                    {courseSlugFilter && (
                      <span className="text-[11px] bg-purple-50 text-purple-700 border border-purple-100 px-2 py-0.5 rounded-md font-medium">
                        {courseSlugFilter
                          .split(" ")
                          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                          .join(" ")}
                      </span>
                    )}
                  </div>
                )}

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isFilterCollapsed ? "max-h-0 opacity-0 mt-0" : "max-h-[1400px] opacity-100 mt-5"
                  }`}
                >
                  <CollegeFilters {...filterProps} />
                </div>
              </div>

              <div className="w-full">{sidebarAdSlot}</div>
            </div>
          </aside>

          {/* --- MAIN CONTENT --- */}
          <main className="lg:col-span-9 xl:col-span-7 space-y-6">
            {topAds.length > 0 && topAdSlot && <div className="w-full">{topAdSlot}</div>}

            <SEOContentSection
              colleges={filteredColleges}
              location={derivedLocation}
              category={routeCategory || (selectedCategory !== "all" ? selectedCategory : undefined)}
              subjectName={institutionType}
              h2Title={heroSubtitle}
            />

            {/* Mobile Tools Bar */}
            <div className="lg:hidden sticky top-[70px] z-30 bg-white/80 backdrop-blur-md p-2 -mx-4 px-4 border-b border-slate-200 flex gap-3 shadow-sm">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex-1 bg-white border-slate-200 text-slate-700 h-10 shadow-sm">
                    <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
                    {selectedCategory !== "all" && (
                      <Badge variant="secondary" className="ml-2 bg-orange-100 text-orange-700 h-5 px-1.5">
                        1
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[320px] sm:w-[400px] overflow-y-auto">
                  <SheetHeader className="mb-6 text-left">
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>Refine your college search</SheetDescription>
                  </SheetHeader>
                  <CollegeFilters {...filterProps} />
                  <div className="mt-6 pt-4 border-t sticky bottom-0 bg-white pb-4">
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">Show Results</Button>
                  </div>
                </SheetContent>
              </Sheet>

              <Select defaultValue="relevance">
                <SelectTrigger className="flex-1 bg-white border-slate-200 h-10 shadow-sm">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="fees_low">Fees: Low to High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Desktop Toolbar */}
            <div className="hidden lg:flex items-center justify-between bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
              <div className="text-sm text-slate-600 font-medium">
                {filteredColleges.length > 0 ? (
                  <span>
                    Showing <strong className="text-slate-900 font-semibold">{collegesToDisplay.length}</strong> of{" "}
                    <strong className="text-slate-900 font-semibold">{filteredColleges.length}</strong> Colleges
                  </span>
                ) : (
                  <span>Featured Institutes</span>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Sort:</span>
                  <Select defaultValue="relevance">
                    <SelectTrigger className="w-[160px] h-8 border-none bg-transparent focus:ring-0 px-0 font-medium text-slate-900 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="fees_low">Lowest Fees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* --- RESULTS LIST --- */}
            {collegesToDisplay.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-xl border border-dashed border-slate-300">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">No matches found</h3>
                <p className="text-slate-500 max-w-xs mx-auto mt-2">
                  We couldn&rsquo;t find any colleges matching your current filters.
                </p>
                <Button variant="link" onClick={handleClearAll} className="mt-4 text-orange-600">
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {combinedItems.map((item, index) =>
                  item.type === "college" ? (
                    <div key={`college-${item.data.id}`}>
                      <CollegeCardHorizontal college={item.data} />
                    </div>
                  ) : (
                    <div key={`ad-${item.data.id}-${index}`} className="mt-0">
                      <AdBanner
                        placement="manual"
                        className="w-full rounded-xl overflow-hidden shadow-sm h-[120px] bg-slate-100"
                        adData={item.data}
                      />
                    </div>
                  )
                )}
              </div>
            )}

            {/* Infinite Scroll Trigger */}
            {filteredColleges.length > visibleCollegeCount && (
              <div ref={lastCollegeElementRef} className="pt-8 flex justify-center pb-8">
                <div className="flex space-x-2 justify-center items-center">
                  <span className="sr-only">Loading...</span>
                  <div className="h-2 w-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 bg-orange-500 rounded-full animate-bounce"></div>
                </div>
              </div>
            )}

            {/* Crawlable Internal Links for Important SEO Landing Pages */}
            <section className="mt-12 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Popular Searches &amp; Top Colleges
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <Link
                  href="/top-mba-colleges-in-coimbatore"
                  className="text-slate-600 hover:text-orange-600 hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  Top MBA Colleges in Coimbatore
                </Link>
                <Link
                  href="/top-engineering-colleges-in-coimbatore"
                  className="text-slate-600 hover:text-orange-600 hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  Top Engineering Colleges in Coimbatore
                </Link>
                <Link
                  href="/autonomous-engineering-colleges-in-coimbatore"
                  className="text-slate-600 hover:text-orange-600 hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  Autonomous Engineering Colleges in Coimbatore
                </Link>
                <Link
                  href="/top-engineering-colleges-in-salem"
                  className="text-slate-600 hover:text-orange-600 hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  Top Engineering Colleges in Salem
                </Link>
                <Link
                  href="/nirf-ranked-engineering-colleges-in-coimbatore"
                  className="text-slate-600 hover:text-orange-600 hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  NIRF Ranked Engineering Colleges in Coimbatore
                </Link>
                <Link
                  href="/top-paramedical-colleges-in-coimbatore"
                  className="text-slate-600 hover:text-orange-600 hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  Top Paramedical Colleges in Coimbatore
                </Link>
                <Link
                  href="/top-occupational-therapy-colleges-in-coimbatore"
                  className="text-slate-600 hover:text-orange-600 hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  Top Occupational Therapy Colleges in Coimbatore
                </Link>
              </div>
            </section>
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
