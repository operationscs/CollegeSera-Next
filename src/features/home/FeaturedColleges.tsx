import React from "react";
import { getHomepageFeaturedColleges } from "@/services/collegeService";
import { FEATURED_COLLEGES_SECTION_CONTENT } from "@/data/homepage";
import { FeaturedCollegesSectionClient } from "@/components/homepage-components/featuredcolleges-components/FeaturedCollegesSectionClient";
import type { DatabaseCollege } from "@/types/database";
import type { FeaturedCollegesSectionContent } from "@/types/home";

export interface FeaturedCollegesProps {
  colleges?: DatabaseCollege[];
  content?: FeaturedCollegesSectionContent;
}

export const FeaturedColleges = async ({
  colleges: propColleges,
  content = FEATURED_COLLEGES_SECTION_CONTENT,
}: FeaturedCollegesProps = {}) => {
  const colleges =
    propColleges ?? (await getHomepageFeaturedColleges().catch(() => []));

  if (!colleges || colleges.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#FAF8F6] py-8 dark:bg-slate-950 sm:py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FeaturedCollegesSectionClient colleges={colleges} content={content} />
      </div>
    </section>
  );
};

export default FeaturedColleges;
