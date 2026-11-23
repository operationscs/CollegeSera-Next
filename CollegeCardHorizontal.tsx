"use client";

import React, { useState } from "react";
import { DatabaseCollege } from "@/types/database";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, Download, ArrowRight, Heart, Scale, Trophy } from "lucide-react";
import { getCollegeUrl } from "@/utils/collegeUrl";
import { useBooking } from "@/components/shared/BookingProvider";
import { toast } from "@/hooks/use-toast";
import {
    COLLEGE_CARD_QUICK_LINKS,
    FALLBACK_COLLEGE_LOGO,
} from "@/features/colleges/data/listingConstants";
import {
    formatCollegeRanking,
    formatCollegeSalary,
    getCollegeExams,
} from "@/features/colleges/utils/collegeCardHelpers";

export interface CollegeCardHorizontalProps {
    college: DatabaseCollege;
}

export const CollegeCardHorizontal: React.FC<CollegeCardHorizontalProps> = ({ college }) => {
    const { openBooking } = useBooking();
    const [isWishlisted, setIsWishlisted] = useState(false);

    // --- Derived Data ---
    const salaryDisplay = formatCollegeSalary(college);
    const feeString = null; // Will show 'See details' linking to courses & fees
    const exams = getCollegeExams(college);
    const rankingText = formatCollegeRanking(college);

    const handleCompareClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toast({
            title: "Added to Compare",
            description: `${college.name} has been added to your comparison list.`,
        });
    };

    const handleBrochureClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (college.brochure_file) {
            window.open(college.brochure_file, "_blank", "noopener,noreferrer");
        } else {
            openBooking();
        }
    };

    const handleApplyClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        openBooking();
    };

    return (
        <Card className="group overflow-hidden bg-white border border-slate-100/80 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 rounded-xl mb-4 relative z-0 w-full max-w-full">
            <div className="flex flex-col md:flex-row w-full min-w-0">
                {/* --- Left & Middle Section --- */}
                <div className="flex-1 min-w-0 p-3.5 sm:p-5 pb-3 md:pr-0">
                    {/* Top Header: Logo + College Info */}
                    <div className="flex gap-3 sm:gap-4 items-start min-w-0">
                        {/* Clickable Logo */}
                        <Link
                            href={getCollegeUrl(college.slug)}
                            className="w-14 h-14 sm:w-20 sm:h-20 flex-shrink-0 bg-white border border-slate-100 hover:border-orange-300 rounded-lg p-1.5 sm:p-2 flex items-center justify-center shadow-sm transition-colors"
                            aria-label={`View ${college.name}`}
                        >
                            <img
                                src={college.college_logo || FALLBACK_COLLEGE_LOGO}
                                alt={`${college.name} logo`}
                                className="w-full h-full object-contain"
                                loading="lazy"
                            />
                        </Link>

                        {/* Header Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-2">
                                <div className="flex-1 min-w-0">
                                    <Link href={getCollegeUrl(college.slug)} className="block">
                                        <h3 className="text-sm sm:text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug break-words">
                                            {college.name}
                                        </h3>
                                    </Link>
                                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 flex-wrap">
                                        <span className="flex items-center gap-1">
                                            <MapPin size={12} className="text-slate-400 shrink-0" />
                                            <span className="truncate">
                                                {college.district || college.location}, Tamil Nadu
                                            </span>
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                        <span className="text-slate-600 font-medium">
                                            {college.type || "Private"}
                                        </span>
                                    </div>
                                </div>

                                {/* Wishlist Button */}
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setIsWishlisted(!isWishlisted);
                                    }}
                                    className={`p-1.5 rounded-full transition-colors md:hidden shrink-0 ${isWishlisted
                                            ? "text-red-500 bg-red-50"
                                            : "text-slate-300 hover:text-red-500"
                                        }`}
                                    aria-label="Save to wishlist"
                                >
                                    <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Full-width Stats Section (Utilizes 100% card width on mobile & desktop) */}
                    <div className="mt-3 sm:mt-4 grid grid-cols-2 sm:grid-cols-4 gap-y-3 gap-x-3 sm:gap-x-6 bg-slate-50/80 p-3 sm:p-4 rounded-xl border border-slate-100/80 group-hover:bg-orange-50/30 transition-colors duration-300 w-full min-w-0">
                        {/* Exam */}
                        <div className="min-w-0">
                            <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wide mb-0.5">
                                Exam Accepted
                            </p>
                            <p className="text-xs font-medium text-slate-900 truncate" title={exams.join(", ")}>
                                {exams.length > 0 ? exams.join(", ") : "N/A"}
                            </p>
                        </div>
                        {/* Fees (Clickable link to Courses & Fees) */}
                        <div className="min-w-0">
                            <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wide mb-0.5">
                                Fees
                            </p>
                            <p className="text-xs font-bold text-orange-600 truncate">
                                {feeString ?? (
                                    <Link
                                        href={getCollegeUrl(college.slug, "courses-fees")}
                                        className="text-orange-600 hover:text-orange-700 hover:underline font-semibold"
                                        title="View courses and fee structure"
                                    >
                                        See details
                                    </Link>
                                )}
                            </p>
                        </div>
                        {/* Salary */}
                        <div className="min-w-0">
                            <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wide mb-0.5">
                                Avg. Package
                            </p>
                            <p className="text-xs font-medium text-slate-900 truncate">
                                {salaryDisplay ?? <span className="text-slate-400">N/A</span>}
                            </p>
                        </div>
                        {/* Courses */}
                        <div className="min-w-0">
                            <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wide mb-0.5">
                                Total Courses
                            </p>
                            <p className="text-xs font-medium text-orange-600 truncate">
                                {college.courses?.length ? (
                                    `${college.courses.length} Courses`
                                ) : (
                                    <span className="text-slate-400">N/A</span>
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Bottom Links (Desktop) */}
                    <div className="hidden md:flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                        <div className="flex gap-4 text-xs font-medium text-blue-600">
                            {COLLEGE_CARD_QUICK_LINKS.map((link, idx) => (
                                <React.Fragment key={link.tab}>
                                    {idx > 0 && <span className="text-slate-300">|</span>}
                                    <Link href={getCollegeUrl(college.slug, link.tab)} className="hover:underline">
                                        {link.label}
                                    </Link>
                                </React.Fragment>
                            ))}
                        </div>

                        {rankingText && (
                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                                <Trophy size={14} className="text-yellow-500" />
                                Ranking - <span className="text-slate-900">{rankingText}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- Right Actions Column --- */}
                <div className="border-t md:border-t-0 md:border-l border-slate-100 p-2.5 sm:p-4 md:w-[200px] bg-slate-50/40 grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-col gap-2 items-stretch w-full min-w-0">
                    <Button
                        type="button"
                        onClick={handleCompareClick}
                        variant="outline"
                        className="w-full h-9 sm:h-10 px-2 text-xs font-medium border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 shadow-sm transition-all"
                    >
                        <Scale className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                        <span className="truncate">Compare</span>
                    </Button>

                    <Button
                        type="button"
                        onClick={handleBrochureClick}
                        variant="outline"
                        className="w-full h-9 sm:h-10 px-2 text-xs font-medium border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800 shadow-sm transition-all"
                    >
                        <Download className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                        <span className="truncate">Brochure</span>
                    </Button>

                    <Button
                        type="button"
                        onClick={handleApplyClick}
                        className="col-span-2 sm:col-span-1 md:col-span-auto w-full h-10 px-3 text-xs font-bold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg transition-all border-0"
                    >
                        <span>Apply Now</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0" />
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default CollegeCardHorizontal;

