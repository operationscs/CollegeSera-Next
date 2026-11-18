import React from "react";
import { notFound } from "next/navigation";
import { Star, MapPin, Calendar, CheckCircle2, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import JsonLd from "@/components/shared/JsonLd";
import { getCleanCollegeSlug } from "@/utils/collegeUrl";
import {
  buildCollegeSchema,
  getCachedCollegeBySlug,
  isValidCollegeSlug,
} from "@/features/colleges/details/collegeDetailData";
import {
  CollegeBreadcrumbs,
  CollegeDetailClientProvider,
  CollegeStickyTabs,
  HeroApplyButton,
  MobileBottomActionBar,
  SidebarCounsellingButton,
} from "@/features/colleges/details/CollegeDetailClient";

export default async function CollegeDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!isValidCollegeSlug(slug)) {
    notFound();
  }

  const college = await getCachedCollegeBySlug(slug);
  if (!college) {
    notFound();
  }

  const cleanSlug = getCleanCollegeSlug(slug || college.slug);
  const schema = buildCollegeSchema(college, cleanSlug);

  return (
    <CollegeDetailClientProvider>
      <div className="min-h-screen bg-slate-50 pb-20 md:pb-0 pt-24">
        <JsonLd data={schema} />

        {/* BREADCRUMBS */}
        <CollegeBreadcrumbs cleanSlug={cleanSlug} collegeName={college.name} />

        {/* HERO SECTION */}
        <div className="relative bg-slate-900 min-h-[350px] md:min-h-[400px] flex flex-col justify-end pt-24 pb-12">
          <div className="absolute inset-0">
            <img
              src={college.image_url || "/placeholder-college.jpg"}
              alt={college.name}
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              {/* Logo */}
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white p-2 rounded-full shadow-2xl shrink-0 border-4 border-white">
                <img
                  src={college.college_logo}
                  alt="Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>

              {/* Info */}
              <div className="flex-1 text-white space-y-3 w-full">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  {college.type && (
                    <Badge className="bg-slate-700/80 hover:bg-slate-700 border border-slate-500 text-white rounded-md flex gap-1">
                      <CheckCircle2 className="w-3 h-3" /> {college.type}
                    </Badge>
                  )}

                  {/* Default rating placeholder until rating is added to DB */}
                  <Badge className="bg-green-600 hover:bg-green-700 border-none text-white rounded-md flex gap-1">
                    <Star className="w-3 h-3 fill-white" /> {(college as any).rating || "3.8"}
                  </Badge>

                  {college.rankings?.map((r) => (
                    <Badge
                      key={`${r.agency}-${r.year}`}
                      className="bg-orange-500 hover:bg-orange-600 border-none text-white rounded-md"
                    >
                      {r.agency} #{r.rank}
                    </Badge>
                  ))}

                  <div className="hidden sm:flex gap-2">
                    {college.naac_grade && (
                      <Badge
                        variant="outline"
                        className="text-gray-300 border-gray-500 rounded-md"
                      >
                        NAAC {college.naac_grade}
                      </Badge>
                    )}

                    {college.highlights
                      ?.map((h: any) => (typeof h === "string" ? h : h?.label || ""))
                      .filter((h: string) =>
                        ["AICTE", "UGC", "NBA", "MCI", "DCI", "PCI"].includes(h.toUpperCase())
                      )
                      .map((approval: string) => (
                        <Badge
                          key={approval}
                          variant="outline"
                          className="text-gray-300 border-gray-500 rounded-md"
                        >
                          {approval.toUpperCase()}
                        </Badge>
                      ))}
                  </div>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">{college.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-orange-400" /> {college.location},{" "}
                    {college.district}
                  </div>
                  {college.established && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-orange-400" /> Est. {college.established}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Glassmorphic Stats Banner */}
            <div className="mt-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="grid grid-cols-3 gap-4 md:gap-12 w-full md:w-auto">
                {/* Courses Count */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">
                      Courses
                    </p>
                    <p className="text-white font-bold text-sm md:text-lg">
                      {college.courses && college.courses.length > 0
                        ? `${college.courses.length}+`
                        : "N/A"}
                    </p>
                  </div>
                </div>
                {/* Established */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">
                      Est.
                    </p>
                    <p className="text-white font-bold text-sm md:text-lg">
                      {college.established || "N/A"}
                    </p>
                  </div>
                </div>
                {/* NAAC */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Star className="w-5 h-5 text-white fill-transparent" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">
                      NAAC
                    </p>
                    <p className="text-white font-bold text-sm md:text-lg">
                      {college.naac_grade || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <HeroApplyButton />
            </div>
          </div>
        </div>

        {/* STICKY TAB NAV */}
        <CollegeStickyTabs cleanSlug={cleanSlug} />

        {/* CONTENT AREA */}
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN - Render Child Route Here */}
          <div className="lg:col-span-8">{children}</div>

          {/* RIGHT SIDEBAR (Always visible) */}
          <div className="lg:col-span-4">
            <div className="sticky top-[140px] space-y-6">
              <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
                <div className="bg-slate-900 p-6 text-white text-center">
                  <h3 className="font-bold text-xl mb-1">Get Admission Details</h3>
                  <p className="text-slate-300 text-sm">Fill in your details to get a callback</p>
                </div>
                <CardContent className="p-6 bg-white space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 border border-r-0 border-slate-300 bg-slate-50 text-slate-500 rounded-l-lg text-sm">
                        +91
                      </span>
                      <input
                        type="tel"
                        placeholder="9999999999"
                        className="flex-1 w-full border border-slate-300 rounded-r-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Email Address</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">
                      Course of Interest
                    </label>
                    <select className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-white text-slate-700">
                      <option value="">Select a course</option>
                      {(college.courses || []).length > 0 ? (
                        college.courses!.map((c: any) => (
                          <option key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        ))
                      ) : (
                        <>
                          <option>B.Tech</option>
                          <option>MBA</option>
                          <option>B.Sc</option>
                        </>
                      )}
                    </select>
                  </div>
                  <SidebarCounsellingButton />
                  <p className="text-xs text-center text-slate-500 mt-4 leading-relaxed">
                    By submitting, you agree to receive communications from {college.name}.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* MOBILE FIXED BOTTOM BAR */}
        <MobileBottomActionBar brochureFile={college.brochure_file} />
      </div>
    </CollegeDetailClientProvider>
  );
}
