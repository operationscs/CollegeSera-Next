"use client";

import React, { useState } from "react";
import { DatabaseCollege } from "@/types/database";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCategoryInfo } from "@/features/colleges/data/seoCategoryContent";

export interface SEOContentSectionProps {
    location?: string;
    category?: string;
    subjectName?: string;
    h2Title?: string;
    colleges: DatabaseCollege[];
}

export const SEOContentSection: React.FC<SEOContentSectionProps> = ({
    location,
    category,
    subjectName,
    h2Title,
    colleges,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // If no location is selected, we might want to show generic text or nothing
    if (!location) return null;

    const city = location.charAt(0).toUpperCase() + location.slice(1);
    const currentYear = new Date().getFullYear();
    const count = colleges.length;

    // Dynamic Data Calculation
    const governmentColleges = colleges.filter((c) => c.type === "Government");
    const privateColleges = colleges.filter((c) => c.type === "Private");

    // Helper to get numeric rank
    const getRank = (college: DatabaseCollege) => {
        if (!college.rankings || college.rankings.length === 0) return 999;
        // Try to find NIRF rank first
        const nirf = college.rankings.find((r) =>
            (r?.agency || "").toLowerCase().includes("nirf")
        );
        if (nirf) return parseInt(nirf.rank || "") || 999;
        // Fallback to first available rank
        return parseInt(college.rankings[0]?.rank || "") || 999;
    };

    const topRanked = [...colleges]
        .sort((a, b) => getRank(a) - getRank(b))
        .slice(0, 5);

    const govNames = governmentColleges
        .slice(0, 3)
        .map((c) => c.name)
        .join(", ");
    const pvtNames = privateColleges
        .slice(0, 3)
        .map((c) => c.name)
        .join(", ");

    const subjectDisplayName =
        subjectName ||
        (category
            ? category === "arts"
                ? "Arts & Science"
                : category.toUpperCase() === "MBA"
                    ? "MBA"
                    : category.charAt(0).toUpperCase() + category.slice(1)
            : "");

    const defaultH2 = subjectDisplayName
        ? `Best ${subjectDisplayName} Colleges in ${city} - Rankings, Fees & Placements ${currentYear}`
        : `Best Colleges in ${city} - Rankings, Fees & Placements ${currentYear}`;

    const displayH2 = h2Title
        ? h2Title.includes(String(currentYear))
            ? h2Title
            : `${h2Title} ${currentYear}`
        : defaultH2;

    const categoryInfo = getCategoryInfo(subjectDisplayName, category, h2Title);

    const highlightRows = [
        {
            label: `Total ${subjectDisplayName ? `${subjectDisplayName} ` : ""}Colleges in ${city}`,
            value: `${count}+`,
            striped: true,
        },
        {
            label: "Ownership",
            value: `~${Math.round((privateColleges.length / Math.max(count, 1)) * 100)}% Private, ~${Math.round((governmentColleges.length / Math.max(count, 1)) * 100)}% Government`,
            striped: false,
        },
        {
            label: "Admission & Eligibility",
            value: categoryInfo.eligibility,
            striped: true,
        },
        {
            label: "Entrance Exams Accepted",
            value: categoryInfo.entranceExams,
            striped: false,
        },
        {
            label: "Top Recruiters",
            value: categoryInfo.topRecruiters,
            striped: true,
        },
    ];

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6 mt-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{displayH2}</h2>

            <div
                className={`prose prose-slate max-w-none text-slate-600 relative transition-all duration-300 ${!isExpanded ? "max-h-36 overflow-hidden" : ""
                    }`}
            >
                <p>
                    Looking for the top {subjectDisplayName ? `${subjectDisplayName} ` : ""}colleges in{" "}
                    {city} in {currentYear}?
                    {govNames && ` Top government institutes include ${govNames}, and`}
                    {pvtNames && ` leading private universities are ${pvtNames}.`}
                    {!govNames &&
                        !pvtNames &&
                        ` Explore premier institutions offering recognized academic programs, experienced faculty, and strong career placement support.`}
                    {" "}
                    {categoryInfo.programDescription}
                </p>

                <p className="mt-4">
                    When selecting the best {subjectDisplayName ? `${subjectDisplayName} ` : ""}colleges in{" "}
                    {city}, students should consider factors such as NIRF rankings, placement records, return
                    on investment (ROI), location, faculty, and specializations. This guide highlights the
                    top-ranked {subjectDisplayName ? `${subjectDisplayName} ` : ""}colleges in {city}{" "}
                    {currentYear} providing all key details on fees, courses, placements, eligibility, and
                    entrance exams to help students make an informed choice.
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                    Top {subjectDisplayName ? `${subjectDisplayName} ` : ""}Colleges in {city}{" "}
                    {currentYear}: Key Highlights
                </h3>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border border-slate-200 rounded-lg">
                        <tbody className="divide-y divide-slate-200">
                            {highlightRows.map((row) => (
                                <tr key={row.label} className={row.striped ? "bg-slate-50" : undefined}>
                                    <td className="p-3 font-medium">{row.label}</td>
                                    <td className="p-3">{row.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                    Top {subjectDisplayName ? `${subjectDisplayName} ` : ""}Colleges in {city} by Rankings{" "}
                    {currentYear}
                </h3>
                <p>
                    The NIRF {currentYear} is the most trusted ranking for colleges in India. Below are the
                    top {subjectDisplayName ? `${subjectDisplayName} ` : ""}colleges in {city} as per
                    available rankings.
                </p>

                <ul className="list-disc pl-5 mt-2 space-y-1">
                    {topRanked.map((college) => {
                        const rank = getRank(college);
                        return (
                            <li key={college.id}>
                                <span className="font-medium">{college.name}</span>
                                {rank !== 999 ? ` - Rank #${rank}` : ""}
                            </li>
                        );
                    })}
                </ul>

                {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                )}
            </div>

            <Button
                variant="ghost"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-4 text-orange-600 hover:text-orange-700 hover:bg-orange-50 p-0 h-auto font-medium flex items-center gap-1"
            >
                {isExpanded ? (
                    <>
                        Show Less <ChevronUp size={16} />
                    </>
                ) : (
                    <>
                        Read More <ChevronDown size={16} />
                    </>
                )}
            </Button>
        </div>
    );
};

export default SEOContentSection;

