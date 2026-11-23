import React from "react";
import Link from "next/link";

/* ---------- HELPERS ---------- */
const ParentLink: React.FC<{ parent: string; children: React.ReactNode }> = ({
  parent,
  children,
}) => (
  <Link
    href={parent}
    className="block text-xs text-slate-600 transition-all duration-200 hover:translate-x-1 hover:text-orange-600 dark:text-slate-300 dark:hover:text-orange-400"
  >
    {children}
  </Link>
);

const SectionHeader: React.FC<{ children: React.ReactNode; link?: string }> = ({
  children,
  link,
}) => (
  <h4 className="mb-2 border-b border-slate-50 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-700 dark:text-slate-400">
    {link ? (
      <Link
        href={link}
        className="hover:text-orange-600 transition-colors inline-flex items-center gap-1"
      >
        {children}
      </Link>
    ) : (
      children
    )}
  </h4>
);

/* ---------- UNIVERSITIES MEGA ---------- */
export const UniversitiesMega = () => (
  <div className="grid grid-cols-1 gap-4 xl:grid-cols-12 xl:gap-5">
    <div className="col-span-1 flex min-h-[182px] flex-col self-start rounded-xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-4 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900 xl:col-span-4 xl:h-[182px]">
      <h3 className="mb-1 text-base font-bold text-slate-900 dark:text-slate-100">
        Find your Universities
      </h3>
      <p className="mb-3 text-xs leading-5 text-slate-600 dark:text-slate-300">
        Explore top rated universities across South India based on NIRF ranking,
        placements, and student reviews.
      </p>
      <Link
        href="/colleges/universities"
        className="mt-auto inline-flex w-48 self-start items-center justify-center whitespace-nowrap rounded-lg bg-orange-600 px-1.5 py-1.5 text-[10px] font-medium text-white shadow-sm transition-colors hover:bg-orange-700"
      >
        View All Universities
      </Link>
    </div>
    <div className="col-span-1 grid grid-cols-1 gap-4 xl:col-span-8 xl:grid-cols-[0.95fr_0.95fr_1.1fr] xl:gap-5">
      <div>
        <SectionHeader>By State</SectionHeader>
        <ul className="space-y-2">
          <li>
            <ParentLink parent="/colleges/university/by-state/tamilnadu-universities">
              Tamil Nadu Universities
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/university/by-state/kerala-universities">
              Kerala Universities
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/university/by-state/karnataka-universities">
              Karnataka Universities
            </ParentLink>
          </li>
        </ul>
      </div>
      <div>
        <SectionHeader>Popular</SectionHeader>
        <ul className="space-y-2">
          <li>
            <ParentLink parent="/colleges/university/popular/top-ranked-universities">
              Top Ranked Universities
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/university/popular/featured-universities">
              Featured Universities
            </ParentLink>
          </li>
        </ul>
      </div>
      <div>
        <SectionHeader>Trending Searches</SectionHeader>
        <ul className="space-y-2">
          <li>
            <ParentLink parent="/colleges/university/trending-searches/top-universities-in-tamil-nadu">
              Top Universities in Tamil Nadu
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/university/trending-searches/top-universities-in-kerala">
              Top Universities in Kerala
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/university/trending-searches/top-universities-in-karnataka">
              Top Universities in Karnataka
            </ParentLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

/* ---------- ENGINEERING MEGA ---------- */
export const EngineeringMega = () => (
  <div className="grid grid-cols-1 gap-4 xl:grid-cols-12 xl:gap-5">
    <div className="col-span-1 flex min-h-[182px] flex-col self-start rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-4 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900 xl:col-span-4 xl:h-[182px]">
      <h3 className="mb-1 text-base font-bold text-slate-900 dark:text-slate-100">
        Engineering
      </h3>
      <p className="mb-3 text-xs leading-5 text-slate-600 dark:text-slate-300">
        Discover top engineering colleges across South India with course
        details, fees & placement data.
      </p>
      <Link
        href="/colleges/engineering"
        className="mt-auto inline-flex w-48 self-start items-center justify-center whitespace-nowrap rounded-lg bg-blue-600 px-1.5 py-1.5 text-[10px] font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
      >
        All Engineering Colleges
      </Link>
    </div>
    <div className="col-span-1 grid grid-cols-1 gap-4 xl:col-span-8 xl:grid-cols-2 xl:gap-5">
      <div>
        <SectionHeader>Top Engineering Colleges in</SectionHeader>
        <ul className="space-y-2">
          <li>
            <ParentLink parent="/colleges/engineering/top-engineering-colleges-in/tamilnadu-engineering-colleges">
              Tamil Nadu
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/engineering/top-engineering-colleges-in/kerala-engineering-colleges">
              Kerala
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/engineering/top-engineering-colleges-in/karnataka-engineering-colleges">
              Karnataka
            </ParentLink>
          </li>
        </ul>
      </div>
      <div>
        <SectionHeader link="/colleges/engineering/top-cities">
          Top Cities
        </SectionHeader>
        <ul className="space-y-2">
          <li>
            <ParentLink parent="/colleges/engineering/top-cities/chennai">
              Chennai
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/engineering/top-cities/coimbatore">
              Coimbatore
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/engineering/top-cities/bangalore">
              Bangalore
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/engineering/top-cities/kochi">
              Kochi
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/engineering/top-cities/salem">
              Salem
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/engineering/top-cities/erode">
              Erode
            </ParentLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

/* ---------- ARTS & SCIENCE MEGA ---------- */
export const ArtsMega = () => (
  <div className="grid grid-cols-1 gap-4 xl:grid-cols-12 xl:gap-5">
    <div className="col-span-1 flex min-h-[182px] flex-col self-start rounded-xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-4 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900 xl:col-span-4 xl:h-[182px]">
      <h3 className="mb-1 text-base font-bold text-slate-900 dark:text-slate-100">
        Arts & Science
      </h3>
      <p className="mb-3 text-xs leading-5 text-slate-600 dark:text-slate-300">
        Find the best Arts & Science colleges across South India for BA, BSc,
        BCom & more.
      </p>
      <Link
        href="/colleges/arts"
        className="mt-auto inline-flex w-48 self-start items-center justify-center whitespace-nowrap rounded-lg bg-purple-600 px-1.5 py-1.5 text-[10px] font-medium text-white shadow-sm transition-colors hover:bg-purple-700"
      >
        All Arts & Science Colleges
      </Link>
    </div>
    <div className="col-span-1 grid grid-cols-1 gap-4 xl:col-span-8 xl:grid-cols-2 xl:gap-5">
      <div>
        <SectionHeader>Top Arts & Science Colleges in</SectionHeader>
        <ul className="space-y-2">
          <li>
            <ParentLink parent="/colleges/arts/top-arts-colleges-in/tamilnadu-arts-colleges">
              Tamil Nadu
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/arts/top-arts-colleges-in/kerala-arts-colleges">
              Kerala
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/arts/top-arts-colleges-in/karnataka-arts-colleges">
              Karnataka
            </ParentLink>
          </li>
        </ul>
      </div>
      <div>
        <SectionHeader link="/colleges/arts/top-cities">
          Top Cities
        </SectionHeader>
        <ul className="space-y-2">
          <li>
            <ParentLink parent="/colleges/arts/top-cities/chennai">
              Chennai
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/arts/top-cities/coimbatore">
              Coimbatore
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/arts/top-cities/bangalore">
              Bangalore
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/arts/top-cities/kochi">
              Kochi
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/arts/top-cities/salem">
              Salem
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/arts/top-cities/erode">
              Erode
            </ParentLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

/* ---------- MBA MEGA ---------- */
export const MbaMega = () => (
  <div className="grid grid-cols-1 gap-4 xl:grid-cols-12 xl:gap-5">
    <div className="col-span-1 flex min-h-[182px] flex-col self-start rounded-xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-4 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900 xl:col-span-4 xl:h-[182px]">
      <h3 className="mb-1 text-base font-bold text-slate-900 dark:text-slate-100">
        MBA
      </h3>
      <p className="mb-3 text-xs leading-5 text-slate-600 dark:text-slate-300">
        Top MBA & PGDM colleges across South India with specializations, fees &
        ROI data.
      </p>
      <Link
        href="/colleges/mba"
        className="mt-auto inline-flex w-48 self-start items-center justify-center whitespace-nowrap rounded-lg bg-amber-600 px-1.5 py-1.5 text-[10px] font-medium text-white shadow-sm transition-colors hover:bg-amber-700"
      >
        All MBA Colleges
      </Link>
    </div>
    <div className="col-span-1 grid grid-cols-1 gap-4 xl:col-span-8 xl:grid-cols-2 xl:gap-5">
      <div>
        <SectionHeader>Top MBA Colleges in</SectionHeader>
        <ul className="space-y-2">
          <li>
            <ParentLink parent="/colleges/mba/top-mba-colleges-in/tamilnadu-mba-colleges">
              Tamil Nadu
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/mba/top-mba-colleges-in/kerala-mba-colleges">
              Kerala
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/mba/top-mba-colleges-in/karnataka-mba-colleges">
              Karnataka
            </ParentLink>
          </li>
        </ul>
      </div>
      <div>
        <SectionHeader link="/colleges/mba/top-cities">
          Top Cities
        </SectionHeader>
        <ul className="space-y-2">
          <li>
            <ParentLink parent="/colleges/mba/top-cities/chennai">
              Chennai
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/mba/top-cities/coimbatore">
              Coimbatore
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/mba/top-cities/bangalore">
              Bangalore
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/mba/top-cities/kochi">
              Kochi
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/mba/top-cities/salem">
              Salem
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/mba/top-cities/erode">
              Erode
            </ParentLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

/* ---------- PARAMEDICAL MEGA ---------- */
export const ParamedicalMega = () => (
  <div className="grid grid-cols-1 gap-4 xl:grid-cols-12 xl:gap-5">
    <div className="col-span-1 flex min-h-[182px] flex-col self-start rounded-xl border border-teal-100 bg-gradient-to-br from-teal-50 to-white p-4 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900 xl:col-span-4 xl:h-[182px]">
      <h3 className="mb-1 text-base font-bold text-slate-900 dark:text-slate-100">
        Paramedical
      </h3>
      <p className="mb-3 text-xs leading-5 text-slate-600 dark:text-slate-300">
        Explore top paramedical colleges offering BPT, DMLT, B.Sc Nursing & more
        across South India.
      </p>
      <Link
        href="/colleges/paramedical"
        className="mt-auto inline-flex w-48 self-start items-center justify-center whitespace-nowrap rounded-lg bg-teal-600 px-1.5 py-1.5 text-[10px] font-medium text-white shadow-sm transition-colors hover:bg-teal-700"
      >
        All Paramedical Colleges
      </Link>
    </div>
    <div className="col-span-1 grid grid-cols-1 gap-4 xl:col-span-8 xl:grid-cols-2 xl:gap-5">
      <div>
        <SectionHeader>Top Paramedical Colleges in</SectionHeader>
        <ul className="space-y-2">
          <li>
            <ParentLink parent="/colleges/paramedical/top-paramedical-colleges-in/tamilnadu-paramedical-colleges">
              Tamil Nadu
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/paramedical/top-paramedical-colleges-in/kerala-paramedical-colleges">
              Kerala
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/paramedical/top-paramedical-colleges-in/karnataka-paramedical-colleges">
              Karnataka
            </ParentLink>
          </li>
        </ul>
        <h4 className="mb-2 mt-4 border-b border-slate-50 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-700">
          Popular Courses
        </h4>
        <ul className="space-y-2">
          <li>
            <ParentLink parent="/colleges/paramedical/popular-courses/bsc-nursing">
              B.Sc Nursing
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/paramedical/popular-courses/b-pharm">
              B.Pharm (Pharmacy)
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/paramedical/popular-courses/bpt">
              BPT (Physiotherapy)
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/paramedical/popular-courses/dmlt">
              DMLT (Lab Technology)
            </ParentLink>
          </li>
        </ul>
      </div>
      <div>
        <SectionHeader>More Courses</SectionHeader>
        <ul className="space-y-2">
          <li>
            <ParentLink parent="/colleges/paramedical/more-courses/bot">
              BOT (Occupational Therapy)
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/paramedical/more-courses/bsc-radiology">
              B.Sc Radiology
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/paramedical/more-courses/bsc-cardiac-technology">
              B.Sc Cardiac Technology
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/paramedical/more-courses/bsc-optometry">
              B.Sc Optometry
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/paramedical/more-courses/bsc-renal-dialysis">
              B.Sc Renal Dialysis
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/paramedical/more-courses/bsc-anaesthesia">
              B.Sc Anaesthesia Technology
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/paramedical/more-courses/bsc-respiratory">
              B.Sc Respiratory Therapy
            </ParentLink>
          </li>
          <li>
            <ParentLink parent="/colleges/paramedical/more-courses/bsc-emergency-medicine">
              B.Sc Emergency Medicine
            </ParentLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

/* ---------- EXAMS MEGA ---------- */
export const ExamsMega = () => (
  <div className="grid grid-cols-1 gap-4 xl:grid-cols-12 xl:gap-5">
    <div className="col-span-1 flex min-h-[182px] flex-col self-start rounded-xl border border-red-100 bg-gradient-to-br from-red-50 to-white p-4 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900 xl:col-span-4 xl:h-[182px]">
      <h3 className="mb-1 text-base font-bold text-slate-900 dark:text-slate-100">
        Entrance Exams
      </h3>
      <p className="mb-3 text-xs leading-5 text-slate-600 dark:text-slate-300">
        Complete guide to all major entrance examinations with dates, syllabus &
        preparation tips.
      </p>
      <Link
        href="/exams"
        className="mt-auto inline-flex w-48 self-start items-center justify-center whitespace-nowrap rounded-lg bg-red-600 px-1.5 py-1.5 text-[10px] font-medium text-white shadow-sm transition-colors hover:bg-red-700"
      >
        View All Exams
      </Link>
    </div>
    <div className="col-span-1 grid grid-cols-1 gap-4 xl:col-span-8 xl:grid-cols-3 xl:gap-5">
      <div>
        <SectionHeader>Engineering Exams</SectionHeader>
        <ul className="space-y-2">
          <li>
            <ParentLink parent="/exams/jee-main">JEE Main</ParentLink>
          </li>
          <li>
            <ParentLink parent="/exams/jee-advanced">JEE Advanced</ParentLink>
          </li>
          <li>
            <ParentLink parent="/exams/tnea">TNEA</ParentLink>
          </li>
          <li>
            <ParentLink parent="/exams/gate">GATE</ParentLink>
          </li>
          <li>
            <ParentLink parent="/exams/bitsat">BITSAT</ParentLink>
          </li>
          <li>
            <ParentLink parent="/exams/viteee">VITEEE</ParentLink>
          </li>
        </ul>
      </div>
      <div>
        <SectionHeader>Medical & Law</SectionHeader>
        <ul className="space-y-2">
          <li>
            <ParentLink parent="/exams/neet-ug">NEET UG</ParentLink>
          </li>
          <li>
            <ParentLink parent="/exams/neet-pg">NEET PG</ParentLink>
          </li>
          <li>
            <ParentLink parent="/exams/clat">CLAT</ParentLink>
          </li>
          <li>
            <ParentLink parent="/exams/nata">NATA</ParentLink>
          </li>
          <li>
            <ParentLink parent="/exams/cuet">CUET</ParentLink>
          </li>
        </ul>
      </div>
      <div>
        <SectionHeader>MBA & Others</SectionHeader>
        <ul className="space-y-2">
          <li>
            <ParentLink parent="/exams/cat">CAT</ParentLink>
          </li>
          <li>
            <ParentLink parent="/exams/mat">MAT</ParentLink>
          </li>
          <li>
            <ParentLink parent="/exams/cmat">CMAT</ParentLink>
          </li>
          <li>
            <ParentLink parent="/exams/xat">XAT</ParentLink>
          </li>
          <li>
            <ParentLink parent="/exams/tancet">TANCET</ParentLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
);
