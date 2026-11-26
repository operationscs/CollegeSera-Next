"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { HomeCity } from "@/types/home";

export interface CityCardProps {
  city: HomeCity;
}

export const CityCard: React.FC<CityCardProps> = ({ city }) => {
  const targetHref =
    city.href ??
    `/colleges/location/${city.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")}`;

  return (
    <Link
      href={targetHref}
      className="group block h-full focus:outline-none"
      aria-label={city.name}
    >
      <Card className="relative h-56 w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-900 shadow-[0_4px_20px_rgba(15,31,61,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#E2E6F3] hover:shadow-[0_14px_30px_rgba(15,31,61,0.10)] group-focus-visible:ring-2 group-focus-visible:ring-[#ff861c] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 sm:h-60">
        <Image
          src={city.image}
          alt={city.name}
          fill
          unoptimized
          quality={100}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Bottom Dark Gradient Overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
        />

        {/* City Details (City Name & College Count) */}
        <div className="absolute inset-x-4 bottom-4 z-10 text-white">
          <h3 className="font-jakarta text-lg font-extrabold tracking-tight text-white transition-colors duration-200 group-hover:text-[#ff861c] sm:text-xl">
            {city.name}
          </h3>
          <p className="mt-0.5 font-jakarta text-xs font-medium text-white/90 sm:text-sm">
            {city.colleges}
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default CityCard;
