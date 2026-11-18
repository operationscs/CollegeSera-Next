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

export type CollegeTabId = (typeof COLLEGE_TABS)[number]["id"];
