import React from "react";
import Link from "next/link";
import type { FooterBrandContent, FooterSocialPlatform } from "@/types/layout";

const SocialIcon: React.FC<{ platform: FooterSocialPlatform; size?: number }> = ({
  platform,
  size = 18,
}) => {
  if (platform === "facebook") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );
  }

  if (platform === "instagram") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
};

export interface FooterBrandColumnProps {
  content: FooterBrandContent;
}

export const FooterBrandColumn: React.FC<FooterBrandColumnProps> = ({
  content,
}) => {
  return (
    <div className="space-y-5 font-jakarta lg:max-w-[250px]">
      <div>
        <Link
          href={content.href}
          className="font-jakarta !text-2xl !font-bold tracking-tight text-[#065893] dark:text-white"
        >
          {content.brandPrimary}
          <span className="font-jakarta !text-2xl !font-bold text-[#ff861c]">
            {content.brandAccent}
          </span>
        </Link>
        <p className="mt-3 font-jakarta !text-xs font-medium leading-relaxed text-[#64748B] dark:text-slate-400">
          {content.description}
        </p>
      </div>

      <div className="flex gap-3">
        {content.socialLinks.map((social) => (
          <a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/90 bg-white text-[#64748B] shadow-sm transition-all duration-300 hover:border-[#ff861c] hover:bg-[#ff861c] hover:text-white dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-[#ff861c] dark:hover:bg-[#ff861c] dark:hover:text-white"
          >
            <SocialIcon platform={social.platform} size={16} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default FooterBrandColumn;
