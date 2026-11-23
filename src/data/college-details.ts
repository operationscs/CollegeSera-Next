import type { RelatedCollegeLanding } from "@/types/college-details";

export const COLLEGE_TABS = [
  { id: "overview", path: "/overview", label: "Overview", aliases: [""] },
  {
    id: "courses-fees",
    path: "/courses-fees",
    label: "Courses & Fees",
    aliases: ["courses", "courses-and-fees"],
  },
  { id: "admission", path: "/admission", label: "Admission", aliases: ["admissions"] },
  { id: "placements", path: "/placements", label: "Placements", aliases: ["placement"] },
  { id: "rankings", path: "/rankings", label: "Rankings", aliases: ["ranking"] },
  { id: "facilities", path: "/facilities", label: "Facilities", aliases: ["facility"] },
  {
    id: "news-articles",
    path: "/news-articles",
    label: "News & Articles",
    aliases: ["news", "news-and-articles"],
  },
] as const;

export const RELATED_COLLEGE_LANDINGS: RelatedCollegeLanding[] = [
  {
    href: "/mba-colleges-in-tamilnadu",
    title: "Top MBA Colleges in Tamil Nadu",
    description: "Explore rankings, fees, and placements.",
  },
  {
    href: "/engineering-colleges-in-bangalore",
    title: "Top Engineering Colleges in Bangalore",
    description: "Find the best tech schools.",
  },
  {
    href: "/medical-colleges-in-delhi",
    title: "Top Medical Colleges in Delhi",
    description: "Discover top medical institutions.",
  },
];
