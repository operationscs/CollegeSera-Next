import type { CollegeProgramLevel } from "@/types/college-details";

export const UG_DEGREES = [
  "b.e", "b.tech", "btech", "be", "b.e.",
  "b.sc", "bsc", "bachelor of science",
  "b.a", "ba", "bachelor of arts",
  "b.com", "bcom", "bachelor of commerce",
  "bba", "bachelor of business administration",
  "bca", "bachelor of computer applications",
  "b.pharm", "bachelor of pharmacy",
  "b.arch", "bachelor of architecture",
  "llb", "bachelor of laws",
  "b.ed", "bachelor of education",
  "b.des", "bachelor of design",
  "bachelor of business and law",
  "bba & law",
];

export const PG_DEGREES = [
  "mba", "m.b.a", "master of business administration",
  "m.tech", "mtech",
  "mca", "m.c.a", "master of computer applications",
  "m.sc", "msc", "master of science",
  "ma", "master of arts",
  "m.com", "mcom", "master of commerce",
  "m.e", "me",
  "m.pharm", "master of pharmacy",
  "m.ed", "master of education",
  "mhm", "master of hotel management",
  "llm",
];

export const DIPLOMA_DEGREES = ["diploma", "polytechnic", "pgdm", "pgd"];
export const PHD_DEGREES = ["ph.d", "phd", "doctor of philosophy", "m.phil"];

export const COLLEGE_PROGRAM_LEVEL_ORDER: CollegeProgramLevel[] = [
  "UG Programs",
  "PG Programs",
  "Diploma",
  "Ph.D / M.Phil",
  "Other Programs",
];

export const DEGREE_DISPLAY_NAMES: Record<string, string> = {
  "b.e": "B.E", be: "B.E", "b.e.": "B.E",
  "b.tech": "B.Tech", btech: "B.Tech", "b.tech.": "B.Tech",
  "b.sc": "B.Sc", bsc: "B.Sc", "bachelor of science": "B.Sc",
  "b.a": "B.A", ba: "B.A", "bachelor of arts": "B.A",
  "b.com": "B.Com", bcom: "B.Com", "bachelor of commerce": "B.Com",
  bba: "BBA", "bachelor of business administration": "BBA",
  bca: "BCA", "bachelor of computer applications": "BCA",
  "bachelor of business and law": "BBA & Law",
  mba: "MBA", "m.b.a": "MBA",
  "m.tech": "M.Tech", mtech: "M.Tech",
  mca: "MCA", "m.c.a": "MCA",
  "m.sc": "M.Sc", msc: "M.Sc", "master of science": "M.Sc",
  ma: "M.A", "master of arts": "M.A",
  "m.com": "M.Com", mcom: "M.Com",
  "m.e": "M.E",
  "ph.d": "Ph.D", phd: "Ph.D", "doctor of philosophy": "Ph.D",
  "m.phil": "M.Phil",
};
