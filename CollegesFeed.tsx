"use client";

import { useRef, useCallback } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdBanner from "@/components/shared/AdBanner";
import CollegeCardHorizontal from "@/features/colleges/CollegeCardHorizontal";
import type { CombinedFeedItem } from "@/features/colleges/hooks/useCollegesListing";

export interface CollegesFeedProps {
    items: CombinedFeedItem[];
    hasResults: boolean;
    hasMore: boolean;
    onLoadMore: () => void;
    onClearAll: () => void;
}

export function CollegesFeed({
    items,
    hasResults,
    hasMore,
    onLoadMore,
    onClearAll,
}: CollegesFeedProps) {
    const observer = useRef<IntersectionObserver | null>(null);
    const lastCollegeElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    onLoadMore();
                }
            });
            if (node) observer.current.observe(node);
        },
        [onLoadMore]
    );

    return (
        <>
            {!hasResults ? (
                <div className="text-center py-24 bg-white rounded-xl border border-dashed border-slate-300">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">No matches found</h3>
                    <p className="text-slate-500 max-w-xs mx-auto mt-2">
                        We couldn&rsquo;t find any colleges matching your current filters.
                    </p>
                    <Button variant="link" onClick={onClearAll} className="mt-4 text-orange-600">
                        Clear all filters
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    {items.map((item, index) =>
                        item.type === "college" ? (
                            <div key={`college-${item.data.id}`}>
                                <CollegeCardHorizontal college={item.data} />
                            </div>
                        ) : (
                            <div key={`ad-${item.data.id}-${index}`} className="mt-0">
                                <AdBanner
                                    placement="manual"
                                    className="w-full rounded-xl overflow-hidden shadow-sm h-[120px] bg-slate-100"
                                    adData={item.data}
                                />
                            </div>
                        )
                    )}
                </div>
            )}

            {/* Infinite Scroll Trigger */}
            {hasMore && (
                <div ref={lastCollegeElementRef} className="pt-8 flex justify-center pb-8">
                    <div className="flex space-x-2 justify-center items-center">
                        <span className="sr-only">Loading...</span>
                        <div className="h-2 w-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="h-2 w-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="h-2 w-2 bg-orange-500 rounded-full animate-bounce"></div>
                    </div>
                </div>
            )}
        </>
    );
}
