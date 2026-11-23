"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type {
    DatabaseAdvertisement,
    DatabaseBranch,
    DatabaseCollege,
} from "@/types/database";
import {
    filterCollegesList,
    type ParsedCollegeFilters,
} from "@/features/colleges/collegeFilterUtils";
import type { SeoOverrideEntry } from "@/features/colleges/collegesData";
import type { CollegeFiltersProps } from "@/features/colleges/CollegeFilters";
import { formatCategoryBreadcrumb } from "@/features/colleges/utils/seoHelpers";

export type CombinedFeedItem =
    | { type: "college"; data: DatabaseCollege }
    | { type: "ad"; data: DatabaseAdvertisement };

export interface ActiveFilterChip {
    key: string;
    label: string;
    className: string;
}

export interface UseCollegesListingParams {
    colleges: DatabaseCollege[];
    branches: DatabaseBranch[];
    collegeTypes: string[];
    locations: string[];
    states: string[];
    feedAds: DatabaseAdvertisement[];
    urlFilters: ParsedCollegeFilters;
    seoOverride: SeoOverrideEntry | null;
    routeLocation?: string;
    seoSlug?: string;
}

export function useCollegesListing({
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
}: UseCollegesListingParams) {
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
    const [inPageSearch, setInPageSearch] = useState("");

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

    const activeFilterChips = useMemo<ActiveFilterChip[]>(() => {
        const chips: ActiveFilterChip[] = [];

        if (selectedCategory !== "all") {
            chips.push({
                key: "category",
                label: selectedCategory,
                className:
                    "text-[11px] bg-orange-50 text-orange-700 border border-orange-100 px-2 py-0.5 rounded-md font-medium",
            });
        }
        if (selectedDistrict !== "all") {
            chips.push({
                key: "district",
                label: selectedDistrict,
                className:
                    "text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium",
            });
        }
        if (selectedState !== "all") {
            chips.push({
                key: "state",
                label: selectedState,
                className:
                    "text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium",
            });
        }
        if (isCountryIndia) {
            chips.push({
                key: "country",
                label: "India",
                className:
                    "text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-md font-medium",
            });
        }
        if (selectedDegree !== "all") {
            chips.push({
                key: "degree",
                label: selectedDegree,
                className:
                    "text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium",
            });
        }
        if (isAutonomousOnly) {
            chips.push({
                key: "autonomous",
                label: "Autonomous",
                className:
                    "text-[11px] bg-orange-50 text-orange-700 border border-orange-100 px-2 py-0.5 rounded-md font-medium",
            });
        }
        if (isNirfOnly) {
            chips.push({
                key: "nirf",
                label: "NIRF Ranked",
                className:
                    "text-[11px] bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-md font-medium",
            });
        }
        if (courseSlugFilter) {
            chips.push({
                key: "course",
                label: courseSlugFilter
                    .split(" ")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" "),
                className:
                    "text-[11px] bg-purple-50 text-purple-700 border border-purple-100 px-2 py-0.5 rounded-md font-medium",
            });
        }

        return chips;
    }, [
        selectedCategory,
        selectedDistrict,
        selectedState,
        isCountryIndia,
        selectedDegree,
        isAutonomousOnly,
        isNirfOnly,
        courseSlugFilter,
    ]);

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
            const matchedDistrict = locations.find((loc) =>
                queryLower.includes(loc.toLowerCase())
            );
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
        const limit = maxCollegeLimit
            ? Math.min(visibleCollegeCount, maxCollegeLimit)
            : visibleCollegeCount;
        return filteredColleges.slice(0, limit);
    }, [filteredColleges, visibleCollegeCount, maxCollegeLimit]);

    const combinedItems = useMemo<CombinedFeedItem[]>(() => {
        if (!collegesToDisplay.length) return [];
        if (!feedAds.length) {
            return collegesToDisplay.map((c) => ({ type: "college" as const, data: c }));
        }

        const items: CombinedFeedItem[] = [];
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
                        candidate.max_display_count === 0
                            ? Infinity
                            : candidate.max_display_count || Infinity;

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

    const handleLoadMore = useCallback(() => {
        setVisibleCollegeCount((prev) => prev + 10);
    }, []);

    const handleFilterNavigation = useCallback(
        (newCategory: string, newDistrict: string) => {
            if (newCategory === "all" && newDistrict === "all") {
                router.push("/colleges");
                return;
            }

            const catSlug =
                newCategory !== "all" ? newCategory.toLowerCase().replace(/\s+/g, "-") : null;
            const distSlug =
                newDistrict !== "all" ? newDistrict.toLowerCase().replace(/\s+/g, "-") : null;

            if (catSlug && distSlug) {
                router.push(`/colleges/${catSlug}/${distSlug}`);
            } else if (distSlug) {
                router.push(`/colleges/location/${distSlug}`);
            } else if (catSlug) {
                router.push(`/colleges/${catSlug}`);
            }
        },
        [router]
    );

    const handleClearAll = useCallback(() => {
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
    }, [router]);

    const filterProps: CollegeFiltersProps = {
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
                    selectedCategory !== "all"
                        ? selectedCategory.toLowerCase().replace(/\s+/g, "-")
                        : null;
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
        onToggleFilters: () => { },
    };

    const { categoryPath, categoryName } = formatCategoryBreadcrumb(selectedCategory);

    return {
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
        hasMore: filteredColleges.length > visibleCollegeCount,
        filterProps,
        handleLoadMore,
        handleClearAll,
    };
}
