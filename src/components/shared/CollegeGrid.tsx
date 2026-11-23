"use client";

import Link from "next/link";
import { MapPin, Calendar, BookOpen, Award, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DatabaseCollege } from "@/types/database";
import { getCollegeUrl } from "@/utils/collegeUrl";

interface CollegeCardProps {
  college: DatabaseCollege;
}

const CollegeCard = ({ college }: CollegeCardProps) => {
  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Link
      href={getCollegeUrl(college.slug)}
      className="block group h-full"
      aria-label={`View details for ${college.name}`}
    >
      <Card
        className="
          relative h-full overflow-hidden border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900
          transition-all duration-300 ease-out
          hover:border-orange-200 hover:shadow-xl hover:-translate-y-1
          rounded-xl flex flex-col
        "
      >
        {college.featured && (
          <div className="absolute top-0 left-0 z-10">
            <div className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-br-lg shadow-sm">
              Featured
            </div>
          </div>
        )}

        <div className="p-5 flex flex-col gap-4 flex-1">
          <div className="flex items-start gap-4">
            <div
              className="
                w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-slate-100 bg-slate-50 dark:border-slate-700 dark:bg-slate-800
                flex items-center justify-center overflow-hidden shadow-sm p-2 shrink-0
              "
            >
              <img
                src={college.college_logo || "https://via.placeholder.com/100?text=Logo"}
                alt={`${college.name} logo`}
                className="w-full h-full object-contain mix-blend-multiply"
                loading="lazy"
              />
            </div>

            <div className="flex-1 min-w-0 pt-1">
              <h3 className="mb-1 line-clamp-2 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-orange-600 dark:text-slate-100">
                {college.name}
              </h3>

              <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                <span className="truncate">{college.location || college.address || "India"}</span>
              </div>
            </div>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{college.type || "College"}</span>
            </div>

            {college.established && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Est. {college.established}</span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>
                {Array.isArray(college.courses)
                  ? `${college.courses.length} Courses`
                  : "Courses Available"}
              </span>
            </div>

            {college.naac_grade && (
              <div className="flex items-center gap-1.5 text-orange-600 font-medium">
                <Award className="w-3.5 h-3.5 shrink-0" />
                <span>Grade {college.naac_grade}</span>
              </div>
            )}
          </div>

          <div className="flex-1" />

          <div className="mt-2 flex items-center gap-3 border-t border-dashed border-slate-100 pt-4 dark:border-slate-700">
            <Button
              onClick={handleCompareClick}
              variant="outline"
              size="sm"
              className="h-9 flex-1 border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              + Compare
            </Button>

            <Button
              size="sm"
              className="flex-1 h-9 text-xs bg-orange-600 hover:bg-orange-700 text-white shadow-sm"
            >
              View Details
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CollegeCard;
