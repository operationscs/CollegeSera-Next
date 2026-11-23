import type { ExamFilterCategory, PopularSearch } from "@/types/search";

export const POPULAR_SEARCHES: PopularSearch[] = [
  { label: "Top MBA colleges in Coimbatore", slug: "top-mba-colleges-in-coimbatore" },
  { label: "Top engineering colleges in Coimbatore", slug: "top-engineering-colleges-in-coimbatore" },
  { label: "Autonomous engineering colleges in Coimbatore", slug: "autonomous-engineering-colleges-in-coimbatore" },
  { label: "Top engineering colleges in Salem", slug: "top-engineering-colleges-in-salem" },
  { label: "NIRF ranked engineering colleges in Coimbatore", slug: "nirf-ranked-engineering-colleges-in-coimbatore" },
  { label: "Top paramedical colleges in Coimbatore", slug: "top-paramedical-colleges-in-coimbatore" },
  { label: "Top Occupational Therapy Colleges in Coimbatore", slug: "top-occupational-therapy-colleges-in-coimbatore" },
];

export const EXAM_FILTER_CATEGORIES: ExamFilterCategory[] = [
  {
    name: "Category of Exams",
    options: [
      { label: "Entrance", value: "entrance" },
      { label: "Board", value: "board" },
    ],
  },
  {
    name: "Streams of Exams",
    options: [
      { label: "Engineering", value: "engineering" },
      { label: "Medical", value: "medical" },
    ],
  },
];
