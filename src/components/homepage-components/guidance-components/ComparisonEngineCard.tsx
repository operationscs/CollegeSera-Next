import React from "react";
import Link from "next/link";
import { ArrowLeftRight, Scale } from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ComparisonEngineContent } from "@/types/home";

export interface ComparisonEngineCardProps {
  content: ComparisonEngineContent;
}

export const ComparisonEngineCard: React.FC<ComparisonEngineCardProps> = ({
  content,
}) => {
  return (
    <Card className="flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(15,31,61,0.04)] dark:border-slate-800 dark:bg-slate-900 sm:p-7 md:p-8">
      <div>
        <CardHeader className="space-y-0 p-0 pb-5">
          <div className="mb-3">
            <Badge
              variant="secondary"
              className="inline-flex items-center gap-1.5 rounded-full border-0 bg-[#E3EBFF] px-3 py-1 font-jakarta text-[11px] font-bold text-[#142B52] shadow-none hover:bg-[#E3EBFF] dark:bg-blue-950/70 dark:text-blue-300"
            >
              <Scale className="h-3.5 w-3.5 shrink-0 text-[#065893] dark:text-blue-300" />
              <span>{content.badgeText}</span>
            </Badge>
          </div>

          <CardTitle className="font-jakarta text-xl font-extrabold tracking-tight text-[#065893] dark:text-slate-100 sm:text-2xl md:text-[26px]">
            {content.title}
          </CardTitle>

          <CardDescription className="mt-2 font-jakarta text-xs leading-relaxed text-[#64748B] dark:text-slate-400 sm:text-sm">
            {content.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-hidden rounded-xl border border-slate-100 bg-[#F4F6FB] dark:border-slate-800 dark:bg-slate-800/70">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-slate-200/70 hover:bg-transparent dark:border-slate-700/70">
                  <TableHead className="h-10 px-3.5 font-jakarta text-[11px] font-extrabold uppercase tracking-wider text-[#64748B] dark:text-slate-400 sm:px-5">
                    {content.metricColumnLabel}
                  </TableHead>
                  <TableHead className="h-10 px-3.5 font-jakarta text-xs font-extrabold text-[#ff861c] dark:text-[#ff861c] sm:px-5">
                    {content.firstCollegeName}
                  </TableHead>
                  <TableHead className="h-10 px-3.5 font-jakarta text-xs font-extrabold text-[#ff861c] dark:text-[#ff861c] sm:px-5">
                    {content.secondCollegeName}
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {content.rows.map((row) => (
                  <TableRow
                    key={row.metric}
                    className="border-b border-slate-200/50 last:border-0 hover:bg-transparent dark:border-slate-700/50"
                  >
                    <TableCell className="px-3.5 py-3 font-jakarta text-xs font-semibold text-[#64748B] dark:text-slate-300 sm:px-5">
                      {row.metric}
                    </TableCell>
                    <TableCell className="px-3.5 py-3 font-jakarta text-xs font-extrabold text-[#0F1F3D] dark:text-slate-100 sm:px-5">
                      {row.firstValue}
                    </TableCell>
                    <TableCell className="px-3.5 py-3 font-jakarta text-xs font-extrabold text-[#0F1F3D] dark:text-slate-100 sm:px-5">
                      {row.secondValue}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </div>

      <CardFooter className="mt-6 flex items-center p-0">
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                asChild
                className="h-10 w-full gap-2 rounded-full bg-[#4E6185] px-5 font-jakarta text-xs font-bold text-white shadow-sm transition-colors duration-200 hover:bg-[#065893] dark:bg-[#4E6185] dark:text-white dark:hover:bg-[#065893] sm:w-auto"
              >
                <Link href={content.ctaHref}>
                  <ArrowLeftRight className="h-3.5 w-3.5" />
                  <span>{content.ctaLabel}</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              {content.ctaHelperText}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default ComparisonEngineCard;
