"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useBooking } from "@/components/shared/BookingProvider";
import type { TocHeading } from "@/lib/security/sanitize";

export function ArticleBackButton() {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      className="mb-6 pl-0 text-slate-600 hover:bg-transparent hover:text-orange-600 transition-colors"
      onClick={() => router.back()}
    >
      <ArrowLeft className="w-4 h-4 mr-2" /> Back to Articles
    </Button>
  );
}

export function ArticleShareButtons({ title }: { title: string }) {
  const handleShare = (platform: string) => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    let url = "";
    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
    }
    if (url) window.open(url, "_blank", "width=600,height=400");
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-slate-500 mr-2">Share:</span>
      <Button
        size="icon"
        variant="outline"
        className="h-8 w-8 rounded-full text-blue-400 hover:text-blue-500 hover:bg-blue-50 border-slate-200"
        onClick={() => handleShare("twitter")}
        aria-label="Share on Twitter"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      </Button>
      <Button
        size="icon"
        variant="outline"
        className="h-8 w-8 rounded-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-slate-200"
        onClick={() => handleShare("facebook")}
        aria-label="Share on Facebook"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      </Button>
      <Button
        size="icon"
        variant="outline"
        className="h-8 w-8 rounded-full text-blue-700 hover:text-blue-800 hover:bg-blue-50 border-slate-200"
        onClick={() => handleShare("linkedin")}
        aria-label="Share on LinkedIn"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      </Button>
    </div>
  );
}

export function ArticleToc({ toc, variant }: { toc: TocHeading[]; variant: "mobile" | "desktop" }) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (variant === "mobile") {
    return (
      <div className="lg:hidden mb-10 bg-slate-50 p-5 rounded-xl border border-slate-200">
        <h3 className="font-bold text-slate-900 mb-3 flex items-center">
          <List className="w-4 h-4 mr-2" /> Table of Contents
        </h3>
        <ul className="space-y-2 text-sm">
          {toc.map((item, index) => (
            <li key={index}>
              <button
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="text-slate-600 hover:text-orange-600 text-left font-medium"
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <Card className="border-none shadow-sm bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <h3 className="font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center">
          <List className="w-4 h-4 mr-2 text-orange-500" />
          Table of Contents
        </h3>
        <nav>
          <ul className="space-y-1 relative border-l-2 border-slate-100 ml-1.5">
            {toc.map((item, index) => (
              <li key={index} className="pl-4 relative">
                <button
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm text-slate-600 hover:text-orange-600 hover:font-medium text-left transition-all py-1.5 block w-full truncate"
                >
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </CardContent>
    </Card>
  );
}

export function ArticleConsultCard() {
  const { openBooking } = useBooking();
  return (
    <div className="mt-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white text-center shadow-lg">
      <h3 className="font-bold text-xl mb-2">Need Career Guidance?</h3>
      <p className="text-blue-100 text-sm mb-4">
        Get expert advice on choosing the right college for you.
      </p>
      <Button
        onClick={openBooking}
        className="w-full bg-white text-blue-700 hover:bg-blue-50 font-semibold shadow-md"
      >
        Consult an Expert
      </Button>
    </div>
  );
}
