import React from "react";
import Link from "next/link";
import { Award, ClipboardList } from "lucide-react";
import { POPULAR_PROGRAMS } from "@/data/homepage";
import type { PopularProgram } from "@/types/home";

export const PopularCourses: React.FC<{ programs?: PopularProgram[] }> = ({ programs = POPULAR_PROGRAMS }) => {
  return (
    <section className="bg-gradient-to-b from-white to-orange-50 py-16 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 md:text-3xl">
              Popular <span className="text-orange-500">Courses</span>
            </h2>
            <p className="mt-1 max-w-xl text-sm text-slate-600 dark:text-slate-300 md:text-base">
              Trending course levels and pathways — find the right one and explore colleges offering them.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-sm font-medium text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
              aria-label="Browse all courses"
            >
              Browse all courses
            </Link>
          </div>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.length > 0 ? (
            programs.map((program) => (
              <article
                key={program.id}
                className="
                  relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900
                  hover:shadow-xl transition-transform duration-300 hover:-translate-y-1
                  flex flex-col
                "
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                    <Award className="w-6 h-6" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="truncate text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {program.name}
                    </h3>

                    {program.level && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="rounded-full border border-blue-100 bg-blue-50 px-2 py-1 text-xs text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300">
                          {program.level}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">Popular pathway</span>
                      </div>
                    )}

                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                      Explore colleges that offer <strong>{program.name}</strong> and compare fees, admissions &amp; placements.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <Link
                    href={`/colleges/${program.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium shadow hover:from-orange-600 hover:to-orange-700 transition"
                    aria-label={`View colleges for ${program.name}`}
                  >
                    View Colleges
                    <ClipboardList className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/colleges/${program.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`}
                    className="text-sm text-slate-500 transition hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                  >
                    Learn more →
                  </Link>
                </div>

                {/* subtle hover wash */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-orange-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:via-slate-700" />
              </article>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-slate-500 dark:text-slate-400">
              No popular courses found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
