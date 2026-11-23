"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Program } from "@/types/database";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, BookOpen, GraduationCap, ChevronRight } from "lucide-react";

interface ProgramsClientProps {
  initialPrograms: Program[];
}

export default function ProgramsClient({ initialPrograms }: ProgramsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const router = useRouter();

  const levels = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(initialPrograms.map((p) => p.level).filter(Boolean) as string[])
      ),
    ],
    [initialPrograms]
  );

  const filteredPrograms = useMemo(() => {
    let result = initialPrograms;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (selectedLevel !== "All") {
      result = result.filter((p) => p.level === selectedLevel);
    }
    return result;
  }, [searchQuery, selectedLevel, initialPrograms]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Explore Academic Programs
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
            Discover the perfect course for your career goals. Browse through our comprehensive list of degrees and certifications.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-6 mb-10 items-center justify-between">
          <div className="w-full md:w-96 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              placeholder="Search programs..."
              className="pl-10 h-11 bg-white border-slate-200 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
            {levels.map((level) => (
              <Button
                key={level}
                variant={selectedLevel === level ? "default" : "outline"}
                onClick={() => setSelectedLevel(level)}
                className={`rounded-full px-6 ${
                  selectedLevel === level
                    ? "bg-orange-600 hover:bg-orange-700 text-white border-none"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {level}
              </Button>
            ))}
          </div>
        </div>

        {/* Programs Grid */}
        {filteredPrograms.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-500 text-lg">No programs found matching your criteria.</p>
            <Button
              variant="link"
              onClick={() => {
                setSearchQuery("");
                setSelectedLevel("All");
              }}
              className="text-orange-600 mt-2"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => (
              <Card
                key={program.id}
                className="group hover:shadow-lg transition-all duration-300 border-slate-200 bg-white overflow-hidden cursor-pointer"
                onClick={() => {
                  const slug = program.name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-+|-+$/g, "");
                  router.push(`/colleges/${slug}`);
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    {program.level && (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 uppercase tracking-wide">
                        {program.level}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {program.name}
                  </h3>

                  <div className="flex items-center text-slate-500 text-sm font-medium mt-4">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span>View Colleges</span>
                    <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
