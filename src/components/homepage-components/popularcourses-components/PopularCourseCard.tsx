import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type {
  PopularCourseBadgeTheme,
  PopularCourseCardLabels,
  PopularProgram,
} from "@/types/home";

export interface PopularCourseCardProps {
  program: PopularProgram;
  labels: PopularCourseCardLabels;
}

const BADGE_THEME_STYLES: Record<PopularCourseBadgeTheme, string> = {
  orange:
    "bg-[#FFF3E8] text-[#ff861c] hover:bg-[#FFF3E8] group-hover:bg-[#ff861c] group-hover:text-white dark:bg-orange-950/70 dark:text-[#ff861c] dark:group-hover:bg-[#ff861c] dark:group-hover:text-white",
  blue:
    "bg-[#E3EBFF] text-[#142B52] hover:bg-[#E3EBFF] group-hover:bg-[#4E6185] group-hover:text-white dark:bg-blue-950/70 dark:text-blue-300 dark:group-hover:bg-[#4E6185] dark:group-hover:text-white",
  purple:
    "bg-[#F3EFFF] text-[#4C3D7A] hover:bg-[#F3EFFF] group-hover:bg-[#5B4B8A] group-hover:text-white dark:bg-purple-950/70 dark:text-purple-300 dark:group-hover:bg-[#5B4B8A] dark:group-hover:text-white",
  amber:
    "bg-[#FFF3E8] text-[#ff861c] hover:bg-[#FFF3E8] group-hover:bg-[#ff861c] group-hover:text-white dark:bg-orange-950/70 dark:text-[#ff861c] dark:group-hover:bg-[#ff861c] dark:group-hover:text-white",
  green:
    "bg-[#DCFCE7] text-[#0F764A] hover:bg-[#DCFCE7] group-hover:bg-[#0F764A] group-hover:text-white dark:bg-emerald-950/70 dark:text-emerald-300 dark:group-hover:bg-[#0F764A] dark:group-hover:text-white",
};

const HOVER_TITLE_THEME_STYLES: Record<PopularCourseBadgeTheme, string> = {
  orange: "group-hover:text-[#ff861c] dark:group-hover:text-[#ff861c]",
  blue: "group-hover:text-[#4E6185] dark:group-hover:text-blue-300",
  purple: "group-hover:text-[#5B4B8A] dark:group-hover:text-purple-300",
  amber: "group-hover:text-[#ff861c] dark:group-hover:text-[#ff861c]",
  green: "group-hover:text-[#0F764A] dark:group-hover:text-emerald-300",
};

export const PopularCourseCard: React.FC<PopularCourseCardProps> = ({
  program,
  labels,
}) => {
  const theme: PopularCourseBadgeTheme = program.badgeTheme ?? "orange";
  const badgeText = program.durationBadge ?? program.level ?? "";
  const targetHref =
    program.href ??
    `/colleges/${program.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")}`;

  return (
    <Link
      href={targetHref}
      className="group block h-full focus:outline-none"
      aria-label={program.name}
    >
      <Card className="relative flex h-full flex-col justify-between rounded-2xl border border-slate-200/75 bg-white p-5 shadow-[0_2px_12px_rgba(15,31,61,0.03)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#E2E6F3] hover:bg-[#F3F5FC] hover:shadow-[0_14px_32px_rgba(15,31,61,0.10)] group-focus-visible:ring-2 group-focus-visible:ring-[#ff861c] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-800/80 dark:hover:shadow-[0_14px_32px_rgba(0,0,0,0.45)] sm:p-6">
        <div>
          {/* Top Row: Duration/Mode Badge */}
          {badgeText && (
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-4">
              <Badge
                variant="secondary"
                className={`rounded-md border-0 px-2.5 py-1 font-jakarta text-[11px] font-bold shadow-none transition-colors duration-300 ${BADGE_THEME_STYLES[theme]}`}
              >
                {badgeText}
              </Badge>
            </CardHeader>
          )}

          {/* Course Title & Description */}
          <CardContent className="p-0">
            <CardTitle
              className={`mb-2 font-jakarta text-base font-extrabold leading-snug tracking-tight text-[#0F1F3D] transition-colors duration-300 dark:text-slate-100 sm:text-[17px] ${HOVER_TITLE_THEME_STYLES[theme]}`}
            >
              {program.name}
            </CardTitle>

            {program.description && (
              <CardDescription className="line-clamp-3 font-jakarta text-xs leading-relaxed text-[#64748B] dark:text-slate-400">
                {program.description}
              </CardDescription>
            )}
          </CardContent>
        </div>

        {/* Highlighted Footer Box: Average Fee, Eligibility, Top Recruiters */}
        <CardFooter className="mt-5 flex flex-col items-stretch p-0">
          <div className="space-y-1.5 rounded-xl bg-[#F4F6FB] p-3.5 font-jakarta text-xs transition-colors duration-300 group-hover:bg-white/80 dark:bg-slate-800/75 dark:group-hover:bg-slate-900/90">
            {program.averageFee && (
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-[#64748B] dark:text-slate-400">
                  {labels.averageFeeLabel}
                </span>
                <span className="text-right font-extrabold text-[#0F1F3D] dark:text-slate-100">
                  {program.averageFee}
                </span>
              </div>
            )}

            {program.eligibility && (
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-[#64748B] dark:text-slate-400">
                  {labels.eligibilityLabel}
                </span>
                <span className="text-right font-extrabold text-[#0F1F3D] dark:text-slate-100">
                  {program.eligibility}
                </span>
              </div>
            )}

            {program.topRecruiters && (
              <div className="flex items-center justify-between gap-2 pt-0.5">
                <span className="shrink-0 font-medium text-[#64748B] dark:text-slate-400">
                  {labels.topRecruitersPrefix}
                </span>
                <span
                  className="truncate text-right font-extrabold text-[#ff861c] dark:text-[#ff861c]"
                  title={program.topRecruiters}
                >
                  {program.topRecruiters}
                </span>
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PopularCourseCard;
