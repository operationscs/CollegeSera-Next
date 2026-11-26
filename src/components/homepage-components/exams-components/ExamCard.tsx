"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type {
  ExamsSectionContent,
  HomeExam,
  HomeExamStatusTheme,
} from "@/types/home";

export interface ExamCardProps {
  exam: HomeExam;
  content: ExamsSectionContent;
  onApplyGuidance: () => void;
}

const STATUS_BADGE_STYLES: Record<HomeExamStatusTheme, string> = {
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

const STATUS_DOT_STYLES: Record<HomeExamStatusTheme, string> = {
  orange: "bg-[#ff861c] group-hover:bg-white dark:bg-[#ff861c] dark:group-hover:bg-white",
  blue: "bg-[#142B52] group-hover:bg-white dark:bg-blue-400 dark:group-hover:bg-white",
  purple: "bg-[#5B4B8A] group-hover:bg-white dark:bg-purple-400 dark:group-hover:bg-white",
  amber: "bg-[#ff861c] group-hover:bg-white dark:bg-[#ff861c] dark:group-hover:bg-white",
  green: "bg-[#0F764A] group-hover:bg-white dark:bg-emerald-400 dark:group-hover:bg-white",
};

const HOVER_TITLE_STYLES: Record<HomeExamStatusTheme, string> = {
  orange: "group-hover:text-[#ff861c] dark:group-hover:text-[#ff861c]",
  blue: "group-hover:text-[#4E6185] dark:group-hover:text-blue-300",
  purple: "group-hover:text-[#5B4B8A] dark:group-hover:text-purple-300",
  amber: "group-hover:text-[#ff861c] dark:group-hover:text-[#ff861c]",
  green: "group-hover:text-[#0F764A] dark:group-hover:text-emerald-300",
};

export const ExamCard: React.FC<ExamCardProps> = ({
  exam,
  content,
  onApplyGuidance,
}) => {
  const ActionIcon = ArrowUpRight;
  const theme: HomeExamStatusTheme = exam.statusTheme ?? "orange";
  const badgeLabel = exam.statusBadge ?? exam.type ?? "";
  const authorityText = exam.authorityTag ?? exam.level ?? "";
  const targetHref =
    exam.href ??
    `/exams/${exam.name
      .toLowerCase()
      .replace(/\b20\d{2}\b/g, "")
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")}`;

  return (
    <Card className="group relative flex h-full flex-col justify-between rounded-2xl border border-slate-200/75 bg-white p-5 shadow-[0_2px_12px_rgba(15,31,61,0.03)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#E2E6F3] hover:bg-[#F3F5FC] hover:shadow-[0_14px_32px_rgba(15,31,61,0.10)] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-800/80 dark:hover:shadow-[0_14px_32px_rgba(0,0,0,0.45)] sm:p-6">
      <div>
        {/* Top Row: Status Pill + Right Authority Tag */}
        <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 p-0 pb-4">
          {badgeLabel ? (
            <Badge
              variant="secondary"
              className={`inline-flex items-center gap-1.5 rounded-full border-0 px-3 py-1 font-jakarta text-[11px] font-bold shadow-none transition-colors duration-300 ${STATUS_BADGE_STYLES[theme]}`}
            >
              {exam.statusHasDot && (
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${STATUS_DOT_STYLES[theme]}`}
                />
              )}
              <span>{badgeLabel}</span>
            </Badge>
          ) : (
            <span />
          )}

          {authorityText && (
            <span className="shrink-0 font-jakarta text-[11px] font-semibold tracking-tight text-[#64748B] dark:text-slate-400">
              {authorityText}
            </span>
          )}
        </CardHeader>

        {/* Exam Title, Description & Stats Box (Clickable Link to Exam Details) */}
        <CardContent className="p-0">
          <Link
            href={targetHref}
            className="block focus:outline-none"
            aria-label={exam.name}
          >
            <CardTitle
              className={`mb-2 font-jakarta text-lg font-extrabold leading-snug tracking-tight text-[#0F1F3D] transition-colors duration-300 dark:text-slate-100 sm:text-xl ${HOVER_TITLE_STYLES[theme]}`}
            >
              {exam.name}
            </CardTitle>

            <CardDescription className="line-clamp-2 font-jakarta text-xs leading-relaxed text-[#64748B] dark:text-slate-400">
              {exam.description}
            </CardDescription>

            {/* Inner Stats Box */}
            {exam.stats && exam.stats.length > 0 && (
              <div className="mt-4 space-y-2 rounded-xl bg-[#F4F6FB] p-3.5 font-jakarta text-xs transition-colors duration-300 group-hover:bg-white/80 dark:bg-slate-800/75 dark:group-hover:bg-slate-900/90">
                {exam.stats.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-2"
                  >
                    <span className="font-medium text-[#64748B] dark:text-slate-400">
                      {row.label}
                    </span>
                    <span
                      className={`text-right font-extrabold ${
                        row.highlight
                          ? "text-[#ff861c] dark:text-[#ff861c]"
                          : "text-[#0F1F3D] dark:text-slate-100"
                      }`}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Link>
        </CardContent>
      </div>

      {/* Bottom Action Footer: Apply Guidance CTA + Secondary Icon Button */}
      <CardFooter className="mt-4 flex items-center gap-2.5 p-0">
        <Button
          type="button"
          onClick={onApplyGuidance}
          className="h-10 flex-1 rounded-xl bg-[#ff861c] font-jakarta text-xs font-extrabold text-white shadow-sm transition-colors duration-200 hover:bg-[#e67310] dark:bg-[#ff861c] dark:text-white dark:hover:bg-[#e67310]"
        >
          {content.applyButtonLabel}
        </Button>

        <Button
          asChild
          variant="secondary"
          size="icon"
          className="h-10 w-10 shrink-0 rounded-xl bg-[#EEF2FA] text-[#0F1F3D] shadow-none transition-colors duration-200 hover:bg-[#065893] hover:text-white dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-[#065893] dark:hover:text-white"
        >
          <Link
            href={targetHref}
            aria-label={`${content.actionIconAriaLabel} - ${exam.name}`}
          >
            <ActionIcon className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExamCard;
