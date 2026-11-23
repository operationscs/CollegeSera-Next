import React from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { HOME_STREAMS } from "@/data/homepage";

export const StreamsSection: React.FC = () => {
  return (
    <section className="bg-white py-16 dark:bg-slate-950 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-1.5 text-sm font-semibold text-orange-600 dark:bg-orange-950/50 dark:text-orange-300">
            <BookOpen className="w-4 h-4" />
            Browse by Stream
          </span>
          <h2 className="mb-3 text-3xl font-bold text-slate-900 dark:text-slate-100 md:text-4xl">
            Explore Colleges by <span className="text-orange-600">Stream</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-300 md:text-lg">
            Find the best colleges across 16+ popular streams. Compare courses, fees, and placements.
          </p>
        </div>

        {/* Streams Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-5">
          {HOME_STREAMS.map((stream) => (
            <Link
              key={stream.name}
              href={stream.path}
              className={`
                group relative flex flex-col items-center justify-center p-5 md:p-6 rounded-2xl border
                ${stream.bgColor}
                dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800
                transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
              `}
            >
              {/* Icon */}
              <div
                className={`
                  w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-3
                  bg-white shadow-sm dark:bg-slate-800 ${stream.color}
                  group-hover:scale-110 transition-transform duration-300
                `}
              >
                <stream.icon className="h-7 w-7" />
              </div>

              {/* Name */}
              <h3 className="mb-1 text-center text-sm font-semibold leading-tight text-slate-800 dark:text-slate-100 md:text-base">
                {stream.name}
              </h3>

              {/* College count */}
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 md:text-xs">
                {stream.colleges}
              </p>

              {/* Hover arrow */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-10">
          <Link
            href="/colleges"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-lg transition-colors hover:bg-slate-800 hover:shadow-xl dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            View All Streams & Colleges
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StreamsSection;
