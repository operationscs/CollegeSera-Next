import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { HomeStream } from "@/types/home";

export interface StreamCardProps {
  stream: HomeStream;
}

export const StreamCard: React.FC<StreamCardProps> = ({ stream }) => {
  const Icon = stream.icon;

  const hoverIconStyles: Record<HomeStream["theme"], string> = {
    orange:
      "group-hover:bg-[#ff861c] group-hover:text-white dark:group-hover:bg-[#ff861c] dark:group-hover:text-white",
    blue: "group-hover:bg-[#4E6185] group-hover:text-white dark:group-hover:bg-[#4E6185] dark:group-hover:text-white",
    purple:
      "group-hover:bg-[#5B4B8A] group-hover:text-white dark:group-hover:bg-[#5B4B8A] dark:group-hover:text-white",
    green:
      "group-hover:bg-[#0F764A] group-hover:text-white dark:group-hover:bg-[#0F764A] dark:group-hover:text-white",
    amber:
      "group-hover:bg-[#ff861c] group-hover:text-white dark:group-hover:bg-[#ff861c] dark:group-hover:text-white",
    indigo:
      "group-hover:bg-[#4338CA] group-hover:text-white dark:group-hover:bg-[#4338CA] dark:group-hover:text-white",
    rose: "group-hover:bg-[#E11D48] group-hover:text-white dark:group-hover:bg-[#E11D48] dark:group-hover:text-white",
    teal: "group-hover:bg-[#0F766E] group-hover:text-white dark:group-hover:bg-[#0F766E] dark:group-hover:text-white",
  };

  const hoverTitleStyles: Record<HomeStream["theme"], string> = {
    orange: "group-hover:text-[#ff861c] dark:group-hover:text-[#ff861c]",
    blue: "group-hover:text-[#4E6185] dark:group-hover:text-blue-300",
    purple: "group-hover:text-[#5B4B8A] dark:group-hover:text-purple-300",
    green: "group-hover:text-[#0F764A] dark:group-hover:text-emerald-300",
    amber: "group-hover:text-[#ff861c] dark:group-hover:text-[#ff861c]",
    indigo: "group-hover:text-[#4338CA] dark:group-hover:text-indigo-300",
    rose: "group-hover:text-[#BE123C] dark:group-hover:text-rose-300",
    teal: "group-hover:text-[#0F766E] dark:group-hover:text-teal-300",
  };

  return (
    <Link href={stream.path} className="group block h-full focus:outline-none">
      <Card className="relative flex h-full flex-col justify-between rounded-2xl border border-slate-200/75 bg-white p-5 shadow-[0_2px_12px_rgba(15,31,61,0.03)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#E2E6F3] hover:bg-[#F3F5FC] hover:shadow-[0_14px_32px_rgba(15,31,61,0.10)] group-focus-visible:ring-2 group-focus-visible:ring-[#ff861c] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-800/80 dark:hover:shadow-[0_14px_32px_rgba(0,0,0,0.45)] sm:p-6">
        <div>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 p-0 pb-4">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300 ${stream.bgColor} ${stream.color} ${hoverIconStyles[stream.theme]}`}
            >
              <Icon className="h-5 w-5 stroke-[2]" />
            </div>

            <ArrowUpRight className="h-4 w-4 text-slate-500 transition-colors duration-300 group-hover:text-[#ff861c] dark:text-slate-400 dark:group-hover:text-[#ff861c]" />
          </CardHeader>

          <CardContent className="p-0">
            <CardTitle
              className={`mb-1 font-jakarta text-base font-extrabold leading-snug tracking-tight text-[#0F1F3D] transition-colors duration-300 dark:text-slate-100 sm:text-[17px] ${hoverTitleStyles[stream.theme]}`}
            >
              {stream.name}
            </CardTitle>

            <CardDescription className="line-clamp-1 font-jakarta text-xs font-medium text-[#64748B] dark:text-slate-400">
              {stream.courses}
            </CardDescription>

            <div className="mt-3.5 flex flex-wrap items-center gap-2">
              <span className="font-jakarta text-xs font-bold text-[#475569] dark:text-slate-300">
                {stream.colleges}
              </span>
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#ff861c]"
                aria-hidden="true"
              />
              <Badge
                variant="secondary"
                className={`rounded-md border-0 px-2 py-0.5 font-jakarta text-[11px] font-bold shadow-none ${stream.badgeClassName}`}
              >
                {stream.badgeText}
              </Badge>
            </div>
          </CardContent>
        </div>

        <CardFooter className="mt-4 flex flex-col items-stretch p-0">
          <Separator className="mb-3.5 bg-slate-100 dark:bg-slate-800" />

          <div className="space-y-1.5 font-jakarta text-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium text-[#64748B] dark:text-slate-400">
                {stream.primaryStat.label}
              </span>
              <span className="font-extrabold text-[#0F1F3D] dark:text-slate-100">
                {stream.primaryStat.value}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="font-medium text-[#64748B] dark:text-slate-400">
                {stream.secondaryStat.label}
              </span>
              <span
                className={`font-extrabold ${
                  stream.secondaryStat.highlight
                    ? "text-[#ff861c] dark:text-[#ff861c]"
                    : "text-[#0F1F3D] dark:text-slate-100"
                }`}
              >
                {stream.secondaryStat.value}
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
