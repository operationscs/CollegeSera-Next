import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { DatabaseCollege } from "@/types/database";
import CoursesAndFees from "./CoursesAndFees";
import AdmissionProcessTable from "./AdmissionProcessTable";
import PlacementsTable from "./PlacementsTable";
import RankingsTable from "./RankingsTable";
import FacilitiesTable from "./FacilitiesTable";
import NewsArticles from "./NewsArticles";
import { SyllabusDownloadButton } from "./CollegeDetailClient";

export function CollegeOverviewView({ college }: { college: DatabaseCollege }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-6 mb-10">
        <Card>
          <CardContent className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About {college.name}</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{college.description}</p>
          </CardContent>
        </Card>
        {college.highlights && college.highlights.length > 0 && (
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold mb-4">Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {college.highlights.map((item: any, idx: number) => {
                const text =
                  typeof item === "string"
                    ? item
                    : item?.label
                      ? `${item.label}${item.value ? ": " + item.value : ""}`
                      : JSON.stringify(item);
                return (
                  <div key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>{text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4 mb-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Courses & Fee Structure</h2>
          <span className="text-sm text-slate-500">
            {(college.courses || []).length} courses offered
          </span>
        </div>
        <CoursesAndFees college={college} />
      </div>

      <div className="space-y-6 mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Admission Process</h2>
        <AdmissionProcessTable
          collegeName={college.name}
          collegeLocation={college.location}
          admissionProcess={college.admission_process}
        />
      </div>

      <div className="space-y-6 mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Placements</h2>
        <PlacementsTable collegeName={college.name} placements={college.placements} />
      </div>

      <div className="space-y-6 mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Rankings & Awards</h2>
        <RankingsTable collegeName={college.name} rankings={college.rankings} />
      </div>

      <div className="space-y-6 mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Campus Facilities</h2>
        <FacilitiesTable collegeName={college.name} facilities={college.facilities} />
      </div>

      <div className="space-y-6 mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Explore Other Popular Colleges</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/mba-colleges-in-tamilnadu" className="block">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2 text-slate-900">Top MBA Colleges in Tamil Nadu</h3>
                <p className="text-sm text-slate-600">Explore rankings, fees, and placements.</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/engineering-colleges-in-bangalore" className="block">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2 text-slate-900">Top Engineering Colleges in Bangalore</h3>
                <p className="text-sm text-slate-600">Find the best tech schools.</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/medical-colleges-in-delhi" className="block">
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2 text-slate-900">Top Medical Colleges in Delhi</h3>
                <p className="text-sm text-slate-600">Discover top medical institutions.</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function CollegeCoursesView({ college }: { college: DatabaseCollege }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4 mb-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Courses & Fee Structure</h2>
          <span className="text-sm text-slate-500">
            {(college.courses || []).length} courses offered
          </span>
        </div>
        <CoursesAndFees college={college} />
      </div>

      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Syllabus Overview</h2>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <p className="text-gray-700">
            The curriculum for various programs is designed to meet industry standards. Please refer to the detailed syllabus provided by the university during the commencement of the academic year.
          </p>
          <div className="mt-4 p-4 bg-orange-50 rounded-lg text-orange-800 text-sm font-medium border border-orange-100 flex items-center justify-between">
            <span>Download detailed syllabus and curriculum structure.</span>
            <SyllabusDownloadButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CollegeAdmissionView({ college }: { college: DatabaseCollege }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Exams Accepting Section */}
      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Exams Accepting</h2>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <p className="text-gray-700">
            Admission to various courses at {college.name} is typically based on state or national level entrance exams. Please check the specific course for exact requirements.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-md text-sm font-medium">TANCET</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-md text-sm font-medium">CAT</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-md text-sm font-medium">MAT</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-md text-sm font-medium">CMAT</span>
          </div>
        </div>
      </div>

      <div className="space-y-6 mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Admission Process</h2>
        <AdmissionProcessTable
          collegeName={college.name}
          collegeLocation={college.location}
          admissionProcess={college.admission_process}
        />
      </div>

      {/* Documents Required Section */}
      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Documents Required</h2>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>10th and 12th Mark sheets and Passing Certificates</li>
            <li>Graduation Mark sheets and Degree Certificate (for PG courses)</li>
            <li>Entrance Exam Scorecard</li>
            <li>Transfer Certificate (TC) & Migration Certificate</li>
            <li>Character Certificate</li>
            <li>Category Certificate (if applicable)</li>
            <li>Passport Size Photographs</li>
            <li>Aadhar Card or Valid ID Proof</li>
          </ul>
        </div>
      </div>

      {/* Course Cutoff Section */}
      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Course Cutoff</h2>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <p className="text-gray-700">
            The cutoff for admission varies each year depending on the difficulty of the entrance exam, the number of applicants, and the availability of seats. Candidates meeting the cutoff criteria are called for the subsequent rounds of the admission process (GD/PI).
          </p>
          <div className="mt-4 p-4 bg-orange-50 rounded-lg text-orange-800 text-sm font-medium border border-orange-100">
            Please contact our counselling team for the most recent cutoff trends for your desired course.
          </div>
        </div>
      </div>
    </div>
  );
}

export function CollegePlacementsView({ college }: { college: DatabaseCollege }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-6 mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Placements</h2>
        <PlacementsTable collegeName={college.name} placements={college.placements} />
      </div>
    </div>
  );
}

export function CollegeRankingsView({ college }: { college: DatabaseCollege }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-6 mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Rankings & Awards</h2>
        <RankingsTable collegeName={college.name} rankings={college.rankings} />
      </div>
    </div>
  );
}

export function CollegeFacilitiesView({ college }: { college: DatabaseCollege }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-6 mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Campus Facilities</h2>
        <FacilitiesTable collegeName={college.name} facilities={college.facilities} />
      </div>
    </div>
  );
}

export async function CollegeNewsView({ college }: { college: DatabaseCollege }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-6 mb-10">
        <NewsArticles collegeId={college.id} collegeName={college.name} />
      </div>
    </div>
  );
}
