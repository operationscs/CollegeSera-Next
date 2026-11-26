import React from "react";
import { HelpCircle, MessageSquare, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { HomeFaqSupportCardContent } from "@/types/home";

export interface FaqSupportCardProps {
  content: HomeFaqSupportCardContent;
}

export const FaqSupportCard: React.FC<FaqSupportCardProps> = ({ content }) => {
  return (
    <Card className="mx-auto mt-8 flex w-full max-w-4xl flex-col items-start justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_4px_20px_rgba(15,31,61,0.04)] dark:border-slate-800 dark:bg-slate-900 sm:mt-10 sm:p-5 md:flex-row md:items-center">
      <div className="flex items-start gap-3.5 sm:items-center">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFF3E8] text-[#ff861c] dark:bg-orange-950/70 dark:text-[#ff861c]">
          <HelpCircle className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <h3 className="font-jakarta text-sm font-extrabold leading-snug text-[#0F1F3D] dark:text-slate-100 sm:text-base">
            {content.title}
          </h3>
          <p className="mt-0.5 font-jakarta text-xs text-[#64748B] dark:text-slate-400">
            {content.description}
          </p>
        </div>
      </div>

      <div className="flex w-full shrink-0 flex-col items-stretch gap-2.5 sm:flex-row sm:items-center md:w-auto">
        <Button
          asChild
          className="h-10 gap-2 rounded-full bg-[#22C55E] px-5 font-jakarta text-xs font-extrabold text-white shadow-sm transition-colors duration-200 hover:bg-[#16A34A] dark:bg-[#22C55E] dark:text-white dark:hover:bg-[#16A34A]"
        >
          <a
            href={content.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>{content.whatsappLabel}</span>
          </a>
        </Button>

        <Button
          asChild
          className="h-10 gap-2 rounded-full bg-[#ff861c] px-5 font-jakarta text-xs font-extrabold text-white shadow-sm transition-colors duration-200 hover:bg-[#e67310] dark:bg-[#ff861c] dark:text-white dark:hover:bg-[#e67310]"
        >
          <a href={content.phoneHref}>
            <PhoneCall className="h-3.5 w-3.5" />
            <span>{content.phoneLabel}</span>
          </a>
        </Button>
      </div>
    </Card>
  );
};

export default FaqSupportCard;
