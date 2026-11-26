"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Flame,
  MapPin,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import SearchAutocomplete from "@/features/search/SearchAutocomplete";
import { useSearchColleges } from "@/features/search/SearchCollegesContext";
import { filterCollegesList } from "@/features/colleges/collegeFilterUtils";
import {
  HERO_CITY_FILTER_VALUES,
  HERO_CITY_OPTIONS,
  HERO_CITY_ROUTE_VALUES,
  HERO_ROTATING_TEXTS,
  HERO_SOCIAL_PROOF,
  HERO_STATS,
  HERO_STREAM_OPTIONS,
  HERO_STREAM_ROUTES,
  HERO_TRENDING_SEARCHES,
} from "@/data/homepage";
import type { HeroCityId, HeroStreamId } from "@/types/home";

const AnimatedStatValue = ({ value }: { value: string }) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayNumber, setDisplayNumber] = useState<string>("0");

  useEffect(() => {
    const element = spanRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasAnimated || !match) return;

    let frameId: number;
    const duration = 1200;
    const startTime = performance.now();
    const useDecimals = target > 0 && target < 10;

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      if (progress >= 1) {
        setDisplayNumber(String(target));
      } else if (useDecimals) {
        setDisplayNumber(current.toFixed(1));
      } else {
        setDisplayNumber(String(Math.round(current)));
      }

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [hasAnimated, target]);

  if (!match) return <>{value}</>;

  return (
    <span ref={spanRef}>
      {displayNumber}
      {suffix}
    </span>
  );
};

export const HeroSection = () => {
  const router = useRouter();
  const colleges = useSearchColleges();
  const streamOptionsRef = useRef<HTMLDivElement>(null);
  const statCarouselRef = useRef<HTMLDivElement>(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedStream, setSelectedStream] = useState<HeroStreamId>("all");
  const [selectedCity, setSelectedCity] = useState<HeroCityId>("all");
  const [cityPickerOpen, setCityPickerOpen] = useState(false);
  const [socialProofIndex, setSocialProofIndex] = useState(0);
  const [canScrollStreamsLeft, setCanScrollStreamsLeft] = useState(false);
  const [canScrollStreamsRight, setCanScrollStreamsRight] = useState(false);
  const [canScrollStatsLeft, setCanScrollStatsLeft] = useState(false);
  const [canScrollStatsRight, setCanScrollStatsRight] = useState(true);

  const filteredSearchColleges = useMemo(() => {
    const filterByCategory = (selectedCategory: string) =>
      filterCollegesList(colleges, {
        selectedCategory,
        selectedDistrict: HERO_CITY_FILTER_VALUES[selectedCity],
        selectedState: "all",
        selectedDegree: "all",
        selectedOwnership: "all",
        isTopCities: false,
        courseSlugFilter: "",
        isFeaturedOnly: false,
        isAutonomousOnly: false,
        isNirfOnly: false,
        searchQuery: "",
        fieldParam: "",
        programParam: "",
      });

    return filterByCategory(selectedStream);
  }, [colleges, selectedCity, selectedStream]);

  useEffect(() => {
    const fullText = HERO_ROTATING_TEXTS[currentTextIndex];

    if (!isDeleting && displayedText === fullText) {
      const timeout = setTimeout(() => setIsDeleting(true), 1000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayedText === "") {
      const timeout = setTimeout(() => {
        setIsDeleting(false);
        setCurrentTextIndex((index) => (index + 1) % HERO_ROTATING_TEXTS.length);
      }, 0);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(
      () => {
        setDisplayedText((text) =>
          isDeleting ? text.slice(0, -1) : fullText.slice(0, text.length + 1),
        );
      },
      isDeleting ? 60 : 100,
    );

    return () => clearTimeout(timeout);
  }, [currentTextIndex, displayedText, isDeleting]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSocialProofIndex((index) => (index + 1) % HERO_SOCIAL_PROOF.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const element = streamOptionsRef.current;
    if (!element) return;

    const updateScrollButtons = () => {
      setCanScrollStreamsLeft(element.scrollLeft > 0);
      setCanScrollStreamsRight(
        element.scrollLeft + element.clientWidth < element.scrollWidth - 1,
      );
    };

    updateScrollButtons();
    element.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      element.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  useEffect(() => {
    const element = statCarouselRef.current;
    if (!element) return;

    const updateScrollButtons = () => {
      setCanScrollStatsLeft(element.scrollLeft > 0);
      setCanScrollStatsRight(
        element.scrollLeft + element.clientWidth < element.scrollWidth - 1,
      );
    };

    updateScrollButtons();
    element.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      element.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  const handleExplore = () => {
    const streamRoute = HERO_STREAM_ROUTES[selectedStream];
    const citySlug = HERO_CITY_ROUTE_VALUES[selectedCity];

    if (selectedCity === "all") {
      router.push(streamRoute.href);
    } else if (selectedStream === "all") {
      router.push(`/colleges/location/${citySlug}`);
    } else {
      router.push(`/top-${streamRoute.seoSlug}-colleges-in-${citySlug}`);
    }
  };

  const handleCityChange = (value: string) => {
    const city = HERO_CITY_OPTIONS.find((option) => option.value === value);
    if (!city) {
      throw new Error(`Unsupported homepage city filter: ${value}`);
    }

    setSelectedCity(city.value);
  };

  const scrollStreamOptions = (direction: -1 | 1) => {
    streamOptionsRef.current?.scrollBy({
      left: direction * 160,
      behavior: "smooth",
    });
  };

  const scrollStats = (direction: -1 | 1) => {
    const element = statCarouselRef.current;
    if (!element) return;

    const cards = element.querySelectorAll("[data-stat-card]");
    const currentIndex = Math.round(element.scrollLeft / element.clientWidth);
    const nextIndex = Math.max(
      0,
      Math.min(cards.length - 1, currentIndex + direction),
    );

    element.scrollLeft = nextIndex * element.clientWidth;
  };

  const buildSearchPath = (query: string) => {
    const citySlug = HERO_CITY_ROUTE_VALUES[selectedCity];
    let path: string;

    if (selectedStream === "all") {
      path =
        selectedCity === "all" ? "/colleges" : `/colleges/location/${citySlug}`;
    } else if (selectedCity === "all") {
      path = HERO_STREAM_ROUTES[selectedStream].href;
    } else {
      path = `/colleges/${selectedStream}/top-cities/${citySlug}`;
    }

    return `${path}?${new URLSearchParams({ search: query }).toString()}`;
  };

  const currentProof = HERO_SOCIAL_PROOF[socialProofIndex];

  const handleTrendingSearch = (search: string) => {
    const slug = search
      .toLowerCase()
      .replace(/\./g, "")
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    router.push(`/${slug}`);
  };

  return (
    <section
      id="hero-section"
      className="relative isolate bg-[#FAF8F6] dark:bg-slate-950"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0
    h-[calc(100%-84px)] overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: "url('/homepage.png')",
          backgroundPosition: "center center",
        }}
      >
        {/* Light mode: soft white center, visible campus edges */}
        <div className="absolute inset-0 bg-white/10 dark:bg-slate-950/75" />

        <div
          className="absolute inset-0
      bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.82)_35%,rgba(255,255,255,0.25)_70%,rgba(255,255,255,0.05)_100%)]
      dark:bg-none"
        />

        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-28
    bg-gradient-to-b from-transparent to-[#FAF8F6]
    dark:to-slate-950"
        />
      </div>

      <div className="relative mx-auto max-w-[1664px] px-4 pb-8 pt-24 sm:px-6 sm:pb-10 sm:pt-28 md:pb-12 lg:px-8 lg:pt-[84px]">
        <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center text-center">
          <h1 className="w-full !text-[22px] font-extrabold leading-[1.12] tracking-tight text-[#065893] drop-shadow-[0_1px_0_rgba(255,255,255,0.65)] dark:text-slate-100 dark:drop-shadow-none sm:!text-[34px] md:!text-[42px] md:leading-[1.05]">
            <span className="block">
              South India&apos;s Most Trusted
              <span className="block">Platform</span>
            </span>
            <span className="block min-h-[1.15em] whitespace-nowrap">
              For{" "}
              <span
                className="text-[#ff861c] dark:text-[#ff861c]"
                aria-live="off"
              >
                {displayedText}
              </span>
              <span
                className="animate-pulse text-[#ff861c] dark:text-[#ff861c]"
                aria-hidden="true"
              >
                |
              </span>
            </span>
          </h1>

          <p className="mt-3 text-xs font-semibold text-[#ff861c] dark:text-[#ff861c] sm:text-sm">
            South India&apos;s Most Trusted College Discovery Platform
          </p>
          <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
            Search, compare, and discover top colleges with verified data and
            AI-guided recommendations.
          </p>

          <div className="relative z-30 mt-5 w-full max-w-3xl rounded-2xl border border-white/90 bg-white/90 p-3 shadow-xl shadow-slate-900/10 backdrop-blur dark:border-slate-700 dark:bg-slate-900/95 sm:p-3">
            <div className="mb-3 flex items-center gap-1.5">
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Scroll streams left"
                disabled={!canScrollStreamsLeft}
                onClick={() => scrollStreamOptions(-1)}
                className="h-8 w-8 shrink-0 rounded-full border-slate-200 bg-white p-0 text-slate-600 shadow-sm disabled:opacity-30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 sm:hidden"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div
                ref={streamOptionsRef}
                role="group"
                aria-label="Filter by stream"
                className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0"
              >
                {HERO_STREAM_OPTIONS.map((stream) => (
                  <button
                    key={stream.id}
                    type="button"
                    aria-pressed={selectedStream === stream.id}
                    onClick={() => setSelectedStream(stream.id)}
                    className={`shrink-0 rounded-full border px-3 py-1.5 text-[10px] font-semibold transition-colors sm:text-xs ${
                      selectedStream === stream.id
                        ? "border-[#ff861c] bg-[#ff861c] text-white shadow-sm"
                        : "border-transparent bg-slate-50 text-[#065893] hover:border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-white"
                    }`}
                  >
                    {stream.label}
                  </button>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Scroll streams right"
                disabled={!canScrollStreamsRight}
                onClick={() => scrollStreamOptions(1)}
                className="h-8 w-8 shrink-0 rounded-full border-slate-200 bg-white p-0 text-slate-600 shadow-sm disabled:opacity-30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 sm:hidden"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_170px_auto]">
              <div className="relative min-w-0 rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
                <Search className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                <SearchAutocomplete
                  formId="home-hero-search"
                  placeholder="Search colleges, exams..."
                  variant="hero"
                  showIcon={false}
                  className="w-full"
                  colleges={filteredSearchColleges}
                  searchPathBuilder={buildSearchPath}
                  onEmptySubmit={handleExplore}
                  collegeOnlySuggestions={true}
                  inputClassName="h-11 rounded-xl !border-0 !bg-transparent py-0 pl-10 pr-3 text-xs text-slate-800 shadow-none placeholder:text-slate-400 focus-visible:ring-0 dark:text-slate-100 dark:placeholder:text-slate-500 sm:text-sm"
                />
              </div>

              <Popover open={cityPickerOpen} onOpenChange={setCityPickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    aria-label="Filter by city"
                    aria-expanded={cityPickerOpen}
                    className="h-11 w-full justify-between gap-2 rounded-xl border-slate-200 bg-white px-3 text-xs font-normal text-slate-700 shadow-none hover:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  >
                    <MapPin className="h-4 w-4 shrink-0 text-[#ff861c]" />

                    <span className="min-w-0 flex-1 truncate text-left">
                      {HERO_CITY_OPTIONS.find((city) => city.value === selectedCity)
                        ?.label ?? "All Cities"}
                    </span>

                    <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent
                  align="start"
                  side="bottom"
                  collisionPadding={12}
                  className="z-[100] w-[var(--radix-popover-trigger-width)] border-slate-200 bg-white p-0 dark:border-slate-700 dark:bg-slate-900"
                >
                  <Command>
                    <CommandInput placeholder="Search cities..." />

                    <CommandList>
                      <CommandEmpty>No city found.</CommandEmpty>

                      <CommandGroup>
                        {HERO_CITY_OPTIONS.map((city) => (
                          <CommandItem
                            key={city.value}
                            value={city.value}
                            keywords={[city.label]}
                            onSelect={() => {
                              setSelectedCity(city.value);
                              setCityPickerOpen(false);
                            }}
                            className="cursor-pointer"
                          >
                            <Check
                              className={`mr-2 h-4 w-4 text-[#ff861c] ${
                                selectedCity === city.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                            />

                            {city.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <Button
                type="submit"
                form="home-hero-search"
                className="h-11 w-full gap-2 rounded-xl bg-[#ff861c] px-5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#e67310] sm:w-auto"
              >
                <Search className="h-3.5 w-3.5" />
                Search
              </Button>
            </div>
          </div>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-3 py-1.5 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <p className="text-[10px] font-medium text-slate-700 dark:text-slate-200 sm:text-xs">
              <span className="font-bold text-[#ff861c] dark:text-[#ff861c]">
                {currentProof.count}
              </span>{" "}
              students searched{" "}
              <span className="font-semibold text-[#ff861c] dark:text-[#ff861c]">
                {currentProof.college}
              </span>{" "}
              in the last hour
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
            <span className="mr-1 text-[9px] font-semibold uppercase tracking-wider text-[#065893] dark:text-slate-400 sm:text-[10px]">
              <Flame className="mr-1 inline h-3 w-3 text-[#ff861c]" />
              Trending Searches
            </span>
            {HERO_TRENDING_SEARCHES.map((search) => (
              <button
                key={search}
                type="button"
                onClick={() => handleTrendingSearch(search)}
                className="rounded-full border border-white bg-white/80 px-2.5 py-1 text-[9px] font-medium text-[#065893] shadow-sm transition-colors hover:border-[#ff861c]/40 hover:bg-[#FFF3E8] hover:text-[#ff861c] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-orange-800 dark:hover:bg-slate-700 dark:hover:text-orange-300 sm:text-[10px]"
              >
                {search}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 flex flex-col items-center justify-center gap-2 sm:flex-row">
          <Button
            type="button"
            onClick={handleExplore}
            className="h-11 w-full gap-2 rounded-xl bg-[#ff861c] px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#e67310] sm:w-auto"
          >
            Explore All Colleges
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            asChild
            variant="default"
            className="h-11 w-full lg:mb-0 md:mb-0 mb-3 rounded-xl border-slate-300 bg-white px-6 text-sm font-semibold text-[#065893] shadow-sm hover:bg-[#E8F3FB] dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 sm:w-auto"
          >
            <Link href="/exams">View All Exams</Link>
          </Button>
        </div>

        <div className="relative z-20 mx-auto mt-16 w-full max-w-[1500px] rounded-2xl border border-white/80 bg-white/95 p-3 shadow-[0_12px_30px_rgba(15,23,42,0.14)] backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/95 sm:border-t sm:px-5 sm:py-5 sm:dark:border-t-slate-700 lg:px-8 lg:py-6">
          <div className="flex min-w-0 items-center gap-2 sm:block">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Scroll statistics left"
              disabled={!canScrollStatsLeft}
              onClick={() => scrollStats(-1)}
              className="h-8 w-8 shrink-0 rounded-full border-slate-300 bg-white p-0 text-slate-700 shadow-sm hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 focus-visible:ring-1 focus-visible:ring-[#ff861c] focus-visible:ring-offset-0 disabled:opacity-30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-orange-700 dark:hover:bg-orange-950 dark:hover:text-orange-300 sm:hidden"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div
              ref={statCarouselRef}
              role="group"
              aria-label="College statistics"
              className="flex min-w-0 flex-1 snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-4 sm:overflow-visible sm:snap-none"
            >
              {HERO_STATS.map((stat, index) => {
                const Icon = stat.icon;
                const dividerClass =
                  index < HERO_STATS.length - 1
                    ? "sm:border-r sm:border-slate-200 sm:dark:border-slate-700"
                    : "sm:border-r-0";
                return (
                  <div
                    key={stat.label}
                    data-stat-card
                    className={`flex w-full shrink-0 snap-start items-center justify-center gap-2 px-2 py-4 sm:min-w-0 sm:w-auto sm:gap-4 sm:px-5 sm:py-2 lg:px-6 ${dividerClass}`}
                  >
                    <span
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 lg:h-14 lg:w-14 ${stat.color}`}
                    >
                      <Icon className="h-5 w-5 lg:h-6 lg:w-6" />
                    </span>
                    <span className="min-w-0 text-left">
                      <span className="block text-2xl font-bold leading-tight text-slate-900 dark:text-slate-100 sm:text-2xl lg:text-3xl">
                        <AnimatedStatValue value={stat.value} />
                      </span>
                      <span className="block text-sm leading-tight text-slate-500 dark:text-slate-400 sm:text-xs lg:text-sm">
                        {stat.label}
                      </span>
                      {"detail" in stat && (
                        <span className="block text-[10px] leading-tight text-slate-400 dark:text-slate-500 sm:text-[11px] lg:text-xs">
                          {stat.detail}
                        </span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Scroll statistics right"
              disabled={!canScrollStatsRight}
              onClick={() => scrollStats(1)}
              className="h-8 w-8 shrink-0 rounded-full border-slate-300 bg-white p-0 text-slate-700 shadow-sm hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 focus-visible:ring-1 focus-visible:ring-[#ff861c] focus-visible:ring-offset-0 disabled:opacity-30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-orange-700 dark:hover:bg-orange-950 dark:hover:text-orange-300 sm:hidden"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
