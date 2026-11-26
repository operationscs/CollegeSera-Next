"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserForm, useBooking } from "@/components/shared/BookingProvider";
import { getCollegeUrl } from "@/utils/collegeUrl";
import { COLLEGE_TABS } from "@/data/college-details";

interface CollegeApplyContextValue {
  openApplyModal: () => void;
  openBookingModal: () => void;
}

const CollegeApplyContext = createContext<CollegeApplyContextValue>({
  openApplyModal: () => {},
  openBookingModal: () => {},
});

export function useCollegeApplyModal() {
  return useContext(CollegeApplyContext);
}

export function CollegeDetailClientProvider({ children }: { children: React.ReactNode }) {
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const { openBooking } = useBooking();
  const pathname = usePathname() || "";
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openApplyModal = useCallback(() => {
    setIsUserFormOpen(true);
    if (idleTimer.current) clearTimeout(idleTimer.current);
  }, []);

  // Ensure navigating to a college microsite page from the homepage starts at the top of the page
  useEffect(() => {
    const isSubTabRoute = /\/college\/[^/]+\/[^/]+/.test(pathname);
    if (!isSubTabRoute) {
      const scrollToTop = () => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      };
      scrollToTop();
      const rafId = requestAnimationFrame(scrollToTop);
      const timerId = setTimeout(scrollToTop, 50);
      return () => {
        cancelAnimationFrame(rafId);
        clearTimeout(timerId);
      };
    }
  }, [pathname]);

  useEffect(() => {
    const resetIdleTimer = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        setIsUserFormOpen(true);
      }, 60000);
    };

    resetIdleTimer();
    const events = ["mousemove", "keydown", "scroll", "touchstart"];
    const handleActivity = () => resetIdleTimer();
    events.forEach((e) => window.addEventListener(e, handleActivity));
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      events.forEach((e) => window.removeEventListener(e, handleActivity));
    };
  }, []);

  return (
    <CollegeApplyContext.Provider
      value={{ openApplyModal, openBookingModal: openBooking }}
    >
      {children}
      <UserForm isOpen={isUserFormOpen} onClose={() => setIsUserFormOpen(false)} />
    </CollegeApplyContext.Provider>
  );
}

export function CollegeBreadcrumbs({
  cleanSlug,
  collegeName,
}: {
  cleanSlug: string;
  collegeName: string;
}) {
  const pathname = usePathname() || "";
  const normalizedPathname = pathname.replace(/\/$/, "");
  const collegeBasePath = `/college/${cleanSlug}`;
  const currentSubPath = normalizedPathname.startsWith(collegeBasePath)
    ? normalizedPathname.slice(collegeBasePath.length).replace(/^\//, "")
    : "";

  const currentTab = COLLEGE_TABS.find(
    (tab) =>
      currentSubPath === tab.id ||
      (tab.aliases as readonly string[]).includes(currentSubPath)
  );

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/colleges" className="hover:text-blue-600">
          Colleges
        </Link>
        <ChevronRight className="w-4 h-4" />
        {currentTab && currentTab.id !== "overview" ? (
          <>
            <Link
              href={`/college/${cleanSlug}`}
              className="hover:text-blue-600 truncate max-w-[200px] md:max-w-none"
            >
              {collegeName}
            </Link>
            <ChevronRight className="w-4 h-4 shrink-0" />
            <span className="text-gray-900 font-medium whitespace-nowrap">
              {currentTab.label}
            </span>
          </>
        ) : (
          <span className="text-gray-900 font-medium truncate">{collegeName}</span>
        )}
      </div>
    </div>
  );
}

export function CollegeStickyTabs({ cleanSlug }: { cleanSlug: string }) {
  const pathname = usePathname() || "";
  const normalizedPathname = pathname.replace(/\/$/, "");
  const collegeBasePath = `/college/${cleanSlug}`;
  const currentSubPath = normalizedPathname.startsWith(collegeBasePath)
    ? normalizedPathname.slice(collegeBasePath.length).replace(/^\//, "")
    : "";

  const isTabActive = (tab: (typeof COLLEGE_TABS)[number]) => {
    if (currentSubPath === tab.id) return true;
    if ((tab.aliases as readonly string[]).includes(currentSubPath)) return true;
    return false;
  };

  return (
    <div className="sticky top-0 md:top-[65px] z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex overflow-x-auto scrollbar-hide gap-6 md:gap-8">
          {COLLEGE_TABS.map((tab) => {
            const active = isTabActive(tab);
            return (
              <Link
                key={tab.id}
                href={getCollegeUrl(cleanSlug, tab.path)}
                className={`
                  py-4 text-sm md:text-base font-medium whitespace-nowrap border-b-2 transition-colors inline-block
                  ${
                    active
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-800"
                  }
                `}
                onClick={() => window.scrollTo({ top: 380, behavior: "smooth" })}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function HeroApplyButton() {
  const { openApplyModal } = useCollegeApplyModal();
  return (
    <Button
      onClick={openApplyModal}
      className="w-full md:w-auto bg-white hover:bg-orange-50 text-slate-900 rounded-full px-8 py-6 font-bold text-base shadow-lg transition-transform hover:scale-105"
    >
      Apply Now <ChevronRight className="w-5 h-5 ml-2 text-orange-500" />
    </Button>
  );
}

export function SidebarCounsellingButton() {
  const { openApplyModal } = useCollegeApplyModal();
  return (
    <Button
      onClick={openApplyModal}
      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 rounded-xl font-bold text-base mt-2 shadow-lg shadow-orange-500/30"
    >
      Get Free Counselling
    </Button>
  );
}

export function SyllabusDownloadButton() {
  const { openApplyModal } = useCollegeApplyModal();
  return (
    <button
      className="px-4 py-2 bg-orange-600 text-white rounded-md text-sm hover:bg-orange-700 transition-colors"
      onClick={openApplyModal}
    >
      Get Syllabus
    </button>
  );
}

export function MobileBottomActionBar({ brochureFile }: { brochureFile?: string }) {
  const { openApplyModal } = useCollegeApplyModal();
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-50 flex gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <Button
        variant="outline"
        className="flex-1 border-orange-500 text-orange-600 hover:bg-orange-50"
        onClick={() =>
          brochureFile
            ? window.open(brochureFile, "_blank")
            : alert("Brochure not available")
        }
      >
        <Download className="w-4 h-4 mr-2" /> Brochure
      </Button>
      <Button
        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
        onClick={openApplyModal}
      >
        Apply Now
      </Button>
    </div>
  );
}
