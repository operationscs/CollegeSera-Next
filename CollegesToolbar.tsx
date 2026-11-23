"use client";

import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import CollegeFilters, { type CollegeFiltersProps } from "@/features/colleges/CollegeFilters";
import {
    DESKTOP_SORT_OPTIONS,
    MOBILE_SORT_OPTIONS,
} from "@/features/colleges/data/collegeFilterConfig";

export interface CollegesToolbarProps {
    selectedCategory: string;
    displayedCount: number;
    totalCount: number;
    filterProps: CollegeFiltersProps;
}

export function CollegesToolbar({
    selectedCategory,
    displayedCount,
    totalCount,
    filterProps,
}: CollegesToolbarProps) {
    return (
        <>
            {/* Mobile Tools Bar */}
            <div className="lg:hidden sticky top-[70px] z-30 bg-white/80 backdrop-blur-md p-2 -mx-4 px-4 border-b border-slate-200 flex gap-3 shadow-sm">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            className="flex-1 bg-white border-slate-200 text-slate-700 h-10 shadow-sm"
                        >
                            <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
                            {selectedCategory !== "all" && (
                                <Badge
                                    variant="secondary"
                                    className="ml-2 bg-orange-100 text-orange-700 h-5 px-1.5"
                                >
                                    1
                                </Badge>
                            )}
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[320px] sm:w-[400px] overflow-y-auto">
                        <SheetHeader className="mb-6 text-left">
                            <SheetTitle>Filters</SheetTitle>
                            <SheetDescription>Refine your college search</SheetDescription>
                        </SheetHeader>
                        <CollegeFilters {...filterProps} />
                        <div className="mt-6 pt-4 border-t sticky bottom-0 bg-white pb-4">
                            <Button className="w-full bg-orange-600 hover:bg-orange-700">
                                Show Results
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>

                <Select defaultValue="relevance">
                    <SelectTrigger className="flex-1 bg-white border-slate-200 h-10 shadow-sm">
                        <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                        {MOBILE_SORT_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Desktop Toolbar */}
            <div className="hidden lg:flex items-center justify-between bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                <div className="text-sm text-slate-600 font-medium">
                    {totalCount > 0 ? (
                        <span>
                            Showing{" "}
                            <strong className="text-slate-900 font-semibold">{displayedCount}</strong> of{" "}
                            <strong className="text-slate-900 font-semibold">{totalCount}</strong> Colleges
                        </span>
                    ) : (
                        <span>Featured Institutes</span>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Sort:
                        </span>
                        <Select defaultValue="relevance">
                            <SelectTrigger className="w-[160px] h-8 border-none bg-transparent focus:ring-0 px-0 font-medium text-slate-900 text-sm">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {DESKTOP_SORT_OPTIONS.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </>
    );
}
