"use client";

import { useState, useEffect, useRef } from "react";
import { Filter, ChevronDown } from "lucide-react";
import CollegeFilters, { type CollegeFiltersProps } from "@/features/colleges/CollegeFilters";
import type { ActiveFilterChip } from "@/features/colleges/hooks/useCollegesListing";

export interface CollegesFilterSidebarProps {
    activeFilterCount: number;
    activeFilterChips: ActiveFilterChip[];
    filterProps: CollegeFiltersProps;
    onClearAll: () => void;
    sidebarAdSlot?: React.ReactNode;
}

export function CollegesFilterSidebar({
    activeFilterCount,
    activeFilterChips,
    filterProps,
    onClearAll,
    sidebarAdSlot,
}: CollegesFilterSidebarProps) {
    const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);
    const userManuallyToggledFilter = useRef(false);

    // Auto-collapse filter on scroll down past header/hero
    useEffect(() => {
        const handleFilterScroll = () => {
            if (!userManuallyToggledFilter.current) {
                if (window.scrollY > 200) {
                    setIsFilterCollapsed(true);
                } else {
                    setIsFilterCollapsed(false);
                }
            }
        };
        window.addEventListener("scroll", handleFilterScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleFilterScroll);
    }, []);

    return (
        <aside className="hidden lg:block lg:col-span-3 xl:col-span-3">
            <div className="space-y-6">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm transition-all duration-300">
                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => {
                                userManuallyToggledFilter.current = true;
                                setIsFilterCollapsed(!isFilterCollapsed);
                            }}
                            className="font-semibold text-slate-900 flex items-center gap-2 hover:text-orange-600 transition-colors group cursor-pointer"
                        >
                            <Filter className="w-4 h-4 text-orange-600" />
                            <span>Filters</span>
                            <ChevronDown
                                size={16}
                                className={`text-slate-400 group-hover:text-orange-600 transition-transform duration-300 ${isFilterCollapsed ? "" : "rotate-180"
                                    }`}
                            />
                        </button>
                        <div className="flex items-center gap-2">
                            {activeFilterCount > 0 && (
                                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-semibold">
                                    {activeFilterCount}
                                </span>
                            )}
                            <button
                                type="button"
                                onClick={onClearAll}
                                className="text-[10px] uppercase font-bold text-orange-600 hover:text-orange-700 tracking-wide cursor-pointer"
                            >
                                Clear All
                            </button>
                        </div>
                    </div>

                    {isFilterCollapsed && activeFilterCount > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                            {activeFilterChips.map((chip) => (
                                <span key={chip.key} className={chip.className}>
                                    {chip.label}
                                </span>
                            ))}
                        </div>
                    )}

                    <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${isFilterCollapsed ? "max-h-0 opacity-0 mt-0" : "max-h-[1400px] opacity-100 mt-5"
                            }`}
                    >
                        <CollegeFilters {...filterProps} />
                    </div>
                </div>

                <div className="w-full">{sidebarAdSlot}</div>
            </div>
        </aside>
    );
}
