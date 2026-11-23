import type {
  CourseCatalogItem,
  CourseGroupOption,
  CourseStreamOption,
} from "@/types/courses";

export const COURSE_CATALOG_ITEMS: CourseCatalogItem[] = [
  { id: 1, name: "B.Des. in Textile Design", type: "B.Des", level: "Degree", collegesAvailable: "18+", mode: "Full Time" },
  { id: 2, name: "M.Sc. in Neuroscience", type: "M.Sc.", level: "Degree", collegesAvailable: "3+", mode: "Full Time" },
  { id: 3, name: "MD in Psychiatry", type: "MD", level: "Degree", collegesAvailable: "122+", mode: "Full Time" },
  { id: 4, name: "Ph.D. in Neuroscience", type: "Ph.D.", level: "Degree", collegesAvailable: "1+", mode: "Full Time" },
  { id: 5, name: "Master of Management Studies (MMS)", type: "MMS", level: "Degree", collegesAvailable: "21+", mode: "Full Time" },
  { id: 6, name: "BAMS - Bachelor of Ayurvedic Medicine and Surgery", type: "B.A.M.S.", level: "Degree", collegesAvailable: "33+", mode: "Full Time" },
  { id: 7, name: "B.Des. in Product Design", type: "B.Des", level: "Degree", collegesAvailable: "49+", mode: "Full Time" },
];

export const COURSE_STREAM_OPTIONS: CourseStreamOption[] = [
  { name: "Animation", count: 6 },
  { name: "Architecture", count: 2 },
  { name: "Arts", count: 10 },
  { name: "Aviation", count: 1 },
  { name: "Beauty & Fitness", count: 5 },
  { name: "Commerce", count: 32 },
];

export const COURSE_GROUP_OPTIONS: CourseGroupOption[] = [
  { name: "After 10th Diploma", count: 23 },
  { name: "B.A.", count: 26 },
  { name: "B.A. LL.B.", count: 1 },
  { name: "B.A. LL.B. (Hons)", count: 1 },
  { name: "B.A.M.S.", count: 2 },
];
