"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Building2, MapPin, Scale } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FEATURED_COLLEGES_SECTION_CONTENT } from "@/data/homepage";
import type { DatabaseCollege } from "@/types/database";
import type {
  FeaturedCollegesCardLabels,
  FeaturedCollegesViewMode,
} from "@/types/home";
import { getCollegeUrl } from "@/utils/collegeUrl";

export interface CollegeCardProps {
  college: DatabaseCollege;
  labels?: FeaturedCollegesCardLabels;
  viewMode?: FeaturedCollegesViewMode;
}

function resolveCollegeCampusImage(
  college: DatabaseCollege,
  labels: FeaturedCollegesCardLabels
): string {
  const haystack = `${college.name || ""} ${college.slug || ""}`.toLowerCase();

  for (const entry of labels.campusImagesByKeyword) {
    if (entry.keywords.some((kw) => haystack.includes(kw.toLowerCase()))) {
      return entry.imageUrl;
    }
  }

  if (college.image_url && college.image_url.trim().length > 0) {
    return college.image_url;
  }

  const pool = labels.fallbackCampusImages;
  if (pool.length > 0) {
    const hash = Array.from(haystack).reduce(
      (acc, ch) => acc + ch.charCodeAt(0),
      0
    );
    return pool[hash % pool.length];
  }

  return labels.campusPlaceholder;
}

function resolveCollegeStats(
  college: DatabaseCollege,
  labels: FeaturedCollegesCardLabels
): { annualFees: string; avgCtc: string } {
  const haystack = `${college.name || ""} ${college.slug || ""}`.toLowerCase();

  const matchedPreset = labels.statsByKeyword.find((entry) =>
    entry.keywords.some((kw) => haystack.includes(kw.toLowerCase()))
  );

  const hash = Array.from(haystack).reduce(
    (acc, ch) => acc + ch.charCodeAt(0),
    0
  );
  const fallbackPreset =
    labels.fallbackStats[hash % labels.fallbackStats.length] ?? {
      annualFees: labels.notAvailable,
      avgCtc: labels.notAvailable,
    };

  let avgCtc = matchedPreset?.avgCtc ?? fallbackPreset.avgCtc;

  if (Array.isArray(college.placements) && college.placements.length > 0) {
    const latestPlacement = [...college.placements].sort(
      (a, b) => (b.year || 0) - (a.year || 0)
    )[0];
    const rawSalary = latestPlacement?.average_salary?.trim();
    if (rawSalary && rawSalary !== "-" && rawSalary !== "0") {
      if (/lpa|lakh/i.test(rawSalary)) {
        avgCtc = rawSalary.startsWith("₹") ? rawSalary : `₹${rawSalary}`;
      } else {
        const numericValue = parseFloat(rawSalary.replace(/[^0-9.]/g, ""));
        if (!isNaN(numericValue) && numericValue > 0) {
          const inLakhs =
            numericValue >= 100000
              ? (numericValue / 100000).toFixed(1)
              : numericValue.toFixed(1);
          avgCtc = `₹${inLakhs.replace(/\.0$/, "")} LPA`;
        }
      }
    }
  }

  const annualFees = matchedPreset?.annualFees ?? fallbackPreset.annualFees;

  return { annualFees, avgCtc };
}

const CollegeCard: React.FC<CollegeCardProps> = ({
  college,
  labels = FEATURED_COLLEGES_SECTION_CONTENT.cardLabels,
  viewMode = "grid",
}) => {
  const initialCampusSrc = useMemo(
    () => resolveCollegeCampusImage(college, labels),
    [college, labels]
  );

  const [campusSrc, setCampusSrc] = useState<string>(initialCampusSrc);
  const [logoSrc, setLogoSrc] = useState<string>(
    college.college_logo || labels.logoPlaceholder
  );

  useEffect(() => {
    setCampusSrc(initialCampusSrc);
  }, [initialCampusSrc]);

  useEffect(() => {
    setLogoSrc(college.college_logo || labels.logoPlaceholder);
  }, [college.college_logo, labels.logoPlaceholder]);

  const nirfRankings = (college.rankings || []).filter(
    (r) =>
      (r.agency || "").toUpperCase().includes("NIRF") &&
      r.rank &&
      r.rank !== "-" &&
      r.rank !== "0"
  );

  const nirfRanking = nirfRankings.sort((a, b) => {
    const numA = parseInt(String(a.rank || "").match(/\d+/)?.[0] || "9999", 10);
    const numB = parseInt(String(b.rank || "").match(/\d+/)?.[0] || "9999", 10);
    return numA - numB;
  })[0];

  const primaryBadgeText = nirfRanking
    ? `${labels.nirfPrefix} #${nirfRanking.rank}`
    : college.ranking && college.ranking > 0
      ? `${labels.nirfPrefix} #${college.ranking}`
      : college.featured
        ? labels.featuredBadge
        : null;

  const coursesText =
    Array.isArray(college.courses) && college.courses.length > 0
      ? `${college.courses.length} ${labels.coursesSuffix}`
      : labels.coursesAvailable;

  const { annualFees, avgCtc } = useMemo(
    () => resolveCollegeStats(college, labels),
    [college, labels]
  );

  const locationText =
    college.location || college.address || labels.defaultLocation;

  const typeText = college.type || college.type_collwge || labels.defaultType;

  const metaLineText = `${typeText} • ${coursesText}`;

  const isList = viewMode === "list";

  return (
    <Link
      href={getCollegeUrl(college.slug)}
      scroll={true}
      className="group block h-full focus:outline-none"
      aria-label={`${labels.detailsButton} - ${college.name}`}
    >
      <Card
        className={`
          relative flex h-full overflow-hidden rounded-2xl
          border border-slate-200/80 bg-white
          shadow-[0_4px_20px_rgba(15,31,61,0.04)]
          transition-all duration-300 ease-out
          hover:-translate-y-1 hover:border-[#E2E6F3] hover:shadow-[0_14px_32px_rgba(15,31,61,0.10)]
          group-focus-visible:ring-2 group-focus-visible:ring-[#ff861c]
          dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700
          ${isList ? "flex-col sm:flex-row" : "flex-col"}
        `}
      >
        {/* Top / Left Media Header */}
        <div
          className={`relative shrink-0 overflow-hidden bg-[#0F1F3D] ${
            isList
              ? "h-48 w-full sm:h-auto sm:min-h-[210px] sm:w-64 md:w-72"
            : "h-44 w-full sm:h-48"
          }`}
        >
          <Image
            src={campusSrc}
            alt={college.name}
            fill
            unoptimized
            quality={100}
            onError={() => {
              if (campusSrc !== labels.campusPlaceholder) {
                setCampusSrc(labels.campusPlaceholder);
              }
            }}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Gradient Overlay */}
          <div
            aria-hidden="true"
            className={`absolute inset-0 ${
              isList
                ? "bg-gradient-to-t from-[#0F1F3D]/50 via-transparent to-black/15"
                : "bg-gradient-to-t from-[#0F1F3D]/85 via-[#0F1F3D]/25 to-transparent"
            }`}
          />

          {/* Top Left Pills (NIRF / Featured & NAAC) */}
          <div className="absolute left-3.5 right-14 top-3.5 z-10 flex flex-wrap items-center gap-1.5">
            {primaryBadgeText && (
              <Badge
                variant="secondary"
                className="rounded-md border-0 bg-white/95 px-2.5 py-1 font-jakarta text-[11px] font-bold tracking-wide text-[#0F1F3D] shadow-sm backdrop-blur-sm hover:bg-white"
              >
                {primaryBadgeText}
              </Badge>
            )}

            {college.naac_grade && (
              <Badge
                variant="secondary"
                className="rounded-md border-0 bg-[#FFF3E8]/95 px-2.5 py-1 font-jakarta text-[11px] font-bold tracking-wide text-[#ff861c] shadow-sm backdrop-blur-sm hover:bg-[#FFF3E8]"
              >
                {labels.naacPrefix} {college.naac_grade}
              </Badge>
            )}
          </div>

          {/* Top Right College Logo Badge */}
          <div className="absolute right-3.5 top-3.5 z-10 flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/80 bg-white p-1.5 shadow-md">
            <Image
              src={logoSrc}
              alt={`${college.name} logo`}
              width={40}
              height={40}
              onError={() => {
                if (logoSrc !== labels.logoPlaceholder) {
                  setLogoSrc(labels.logoPlaceholder);
                }
              }}
              className="h-full w-full object-contain"
            />
          </div>

          {/* Bottom Overlay: Location & College Name (Shown on image only in Grid view) */}
          {!isList && (
            <div className="absolute inset-x-3.5 bottom-3.5 z-10">
              <p className="mb-1 truncate font-jakarta text-[10px] font-extrabold uppercase tracking-wider text-[#ff861c]">
                {locationText}
              </p>
              <h3 className="line-clamp-2 font-jakarta text-base font-extrabold leading-snug text-white transition-colors group-hover:text-[#ff861c] sm:text-[17px]">
                {college.name}
              </h3>
            </div>
          )}
        </div>

        {/* Right / Bottom Body + Footer Wrapper */}
        <div className="flex min-w-0 flex-1 flex-col justify-between">
          {/* Body Content */}
          <CardContent className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
            {/* List View College Heading & Location on the White Area */}
            {isList && (
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-jakarta text-[11px] font-extrabold uppercase tracking-wider text-[#ff861c] dark:text-[#ff861c]">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{locationText}</span>
                </div>
                <h3 className="line-clamp-2 font-jakarta text-lg font-extrabold leading-snug text-[#0F1F3D] transition-colors group-hover:text-[#ff861c] dark:text-slate-100 dark:group-hover:text-[#ff861c] sm:text-xl">
                  {college.name}
                </h3>
              </div>
            )}

            {/* Single Clean Metadata Row: Type • Courses Available */}
            <div className="flex items-center gap-2 text-xs text-[#4B5563] dark:text-slate-300">
              <Building2 className="h-3.5 w-3.5 shrink-0 text-[#4E6185] dark:text-slate-400" />
              <span
                className="truncate font-jakarta font-medium"
                title={metaLineText}
              >
                {metaLineText}
              </span>
            </div>

            <div className="flex-1" />

            {/* Highlighted Stats Box (Annual Fees & Avg CTC) */}
            <div className="grid grid-cols-2 gap-3 rounded-xl bg-[#F4F6FB] px-3.5 py-2.5 dark:bg-slate-800/80">
              <div className="min-w-0">
                <span className="block font-jakarta text-[11px] font-medium text-[#64748B] dark:text-slate-400">
                  {labels.annualFeesLabel}
                </span>
                <span className="mt-0.5 block truncate font-jakarta text-sm font-extrabold text-[#0F1F3D] dark:text-slate-100">
                  {annualFees}
                </span>
              </div>

              <div className="min-w-0">
                <span className="block font-jakarta text-[11px] font-medium text-[#64748B] dark:text-slate-400">
                  {labels.avgCtcLabel}
                </span>
                <span className="mt-0.5 block truncate font-jakarta text-sm font-extrabold text-[#ff861c] dark:text-[#ff861c]">
                  {avgCtc}
                </span>
              </div>
            </div>
          </CardContent>

          {/* Action Footer */}
          <CardFooter className="flex items-center gap-2.5 px-4 pb-4 pt-0 sm:px-5 sm:pb-5">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="h-10 flex-1 rounded-xl bg-[#EEF2FA] font-jakarta text-xs font-bold text-[#0F1F3D] shadow-none transition-colors hover:bg-[#065893] hover:text-white dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-[#065893] dark:hover:text-white"
            >
              {labels.detailsButton}
            </Button>

            <Button
              type="button"
              variant="secondary"
              size="icon"
              aria-label={`${labels.compareAriaLabel} - ${college.name}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="h-10 w-10 shrink-0 rounded-xl bg-[#DCE4FF] text-[#142B52] shadow-none transition-colors hover:bg-[#065893] hover:text-white dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-[#065893] dark:hover:text-white"
            >
              <Scale className="h-4 w-4" />
            </Button>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
};

export default CollegeCard;
