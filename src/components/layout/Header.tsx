"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useSuggestionGenerator } from "@/features/search/useSuggestionGenerator";
import { useSearchLogic } from "@/features/search/useSearchLogic";
import SearchDropdown from "@/features/search/SearchDropdown";
import { useSearchColleges } from "@/features/search/SearchCollegesContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { DesktopNavigation } from "@/components/header-components/DesktopNavigation";
import { HeaderBrand } from "@/components/header-components/HeaderBrand";
import { HeaderDesktopActions } from "@/components/header-components/HeaderDesktopActions";
import { HeaderUtilityBar } from "@/components/header-components/HeaderUtilityBar";
import { MobileHeaderActions } from "@/components/header-components/MobileHeaderActions";
import { MobileNavigation } from "@/components/header-components/MobileNavigation";
import { navItems } from "@/data/header-navigation";
import type { HeaderProps } from "@/types/layout";

/* ---------- MAIN HEADER ---------- */
export const Header: React.FC<HeaderProps> = ({ colleges: propColleges }) => {
  const [openMenu, setOpenMenu] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const colleges = useSearchColleges(propColleges);
  const generateSuggestions = useSuggestionGenerator(colleges);

  const closeImmediate = () => {
    setOpenMenu("");
    setMobileOpen(false);
  };

  const search = useSearchLogic(generateSuggestions, () => {
    closeImmediate();
    setMobileOpen(false);
  });

  const handleBlurWithDropdown = (e: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      const related = e.relatedTarget as Node | null;
      if (
        !desktopDropdownRef.current?.contains(related) &&
        !mobileDropdownRef.current?.contains(related)
      ) {
        search.handleBlur();
      }
    }, 150);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const go = (path: string) => {
    router.push(path);
    closeImmediate();
    setMobileOpen(false);
  };

  return (
    <header
      className={`${pathname === "/" ? "homepage-typography-header " : ""}fixed left-0 top-0 z-50 w-full border-b border-slate-200 bg-white transition-colors transition-shadow duration-300 dark:border-slate-800 dark:bg-slate-950 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <HeaderUtilityBar />

      <div className="container mx-auto flex h-[62px] max-w-screen-2xl flex-nowrap items-center gap-2 px-3 sm:px-4">
        <HeaderBrand onNavigate={closeImmediate} />
        <MobileHeaderActions
          isOpen={mobileOpen}
          onToggle={() => setMobileOpen(!mobileOpen)}
        />
        <DesktopNavigation
          items={navItems}
          openMenu={openMenu}
          onOpenMenuChange={setOpenMenu}
          pathname={pathname}
          onNavigate={go}
          onMenuContentClick={closeImmediate}
        />

        <div className="relative hidden min-w-0 flex-[0_1_290px] xl:block xl:shrink-0">
          <form onSubmit={search.handleSubmit} className="relative">
            <Input
              type="text"
              value={search.query}
              onChange={search.handleInputChange}
              onKeyDown={search.handleKeyDown}
              onFocus={search.handleFocus}
              onBlur={handleBlurWithDropdown}
              placeholder="Search colleges..."
              aria-label="Search colleges, courses, and exams"
              className="h-9 rounded-full border-slate-200 bg-slate-50 pl-4 pr-10 text-xs shadow-none placeholder:text-slate-400 focus-visible:border-orange-400 focus-visible:ring-1 focus-visible:ring-orange-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
            />
            <Button
              type="submit"
              size="icon"
              aria-label="Search"
              className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full bg-orange-600 text-white shadow-sm transition-all duration-200 hover:scale-105 hover:bg-orange-700"
            >
              <Search className="h-3.5 w-3.5" />
            </Button>
            <SearchDropdown
              ref={desktopDropdownRef}
              isOpen={
                search.isOpen &&
                (search.query.trim().length >= 1 ||
                  search.suggestions.length > 0)
              }
              query={search.query}
              suggestions={search.suggestions}
              isLoading={search.isLoading}
              selectedIndex={search.selectedIndex}
              onSuggestionClick={search.handleSuggestionClick}
              className="right-0 left-auto min-w-[320px] sm:min-w-[380px]"
            />
          </form>
        </div>

        <HeaderDesktopActions />

        <div
          onClick={closeImmediate}
          aria-hidden="true"
          className={`absolute inset-x-0 top-full z-40 h-screen bg-black/20 backdrop-blur-sm transition-opacity duration-200 ${
            openMenu && !isMobile
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        />
      </div>

      <MobileNavigation
        isOpen={mobileOpen}
        isMobile={isMobile}
        items={navItems}
        search={search}
        dropdownRef={mobileDropdownRef}
        onBlur={handleBlurWithDropdown}
        onClose={() => setMobileOpen(false)}
        onMenuContentClick={closeImmediate}
      />
    </header>
  );
};

export default Header;
