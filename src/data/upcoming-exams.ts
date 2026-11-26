import { ArrowUpRight } from "lucide-react";
import type { ExamsSectionContent, HomeExam } from "@/types/home";

export const EXAMS_SECTION_CONTENT: ExamsSectionContent = {
  eyebrow: "TESTING DEADLINES",
  title: "Upcoming Entrance Exams 2027",
  description:
    "Track registration schedules, download admit cards, and review normalized cutoffs.",
  applyButtonLabel: "Apply Guidance",
  actionIconAriaLabel: "View exam overview and details",
  prevButtonLabel: "Scroll entrance exams left",
  nextButtonLabel: "Scroll entrance exams right",
  emptyMessage: "No upcoming entrance exams found.",
};

export const UPCOMING_EXAMS_DATA: HomeExam[] = [
  {
    id: "kcet-2027",
    name: "KCET 2027",
    description:
      "Karnataka Common Entrance Test for B.Tech, B.Pharm, Agri & Veterinary admissions across Karnataka.",
    statusBadge: "Registration Active",
    statusTheme: "orange",
    statusHasDot: true,
    authorityTag: "KEA State Exam",
    stats: [
      { label: "Exam Date:", value: "April 17 - 18, 2027" },
      { label: "Eligibility:", value: "10+2 PCM Karnataka" },
      { label: "Mode:", value: "Offline (OMR Based)" },
    ],
    actionIcon: ArrowUpRight,
    href: "/exams/kcet",
  },
  {
    id: "tnea-2027",
    name: "TNEA 2027",
    description:
      "Tamil Nadu Engineering Admissions for 500+ government and Anna University affiliated colleges.",
    statusBadge: "Counselling Notification",
    statusTheme: "orange",
    statusHasDot: false,
    authorityTag: "DOTE TN",
    stats: [
      { label: "Exam Date:", value: "May - July 2027" },
      { label: "Eligibility:", value: "10+2 PCM Tamil Nadu" },
      { label: "Mode:", value: "12th Marks Merit" },
    ],
    actionIcon: ArrowUpRight,
    href: "/exams/tnea",
  },
  {
    id: "comedk-uget-2027",
    name: "COMEDK UGET 2027",
    description:
      "Undergraduate Entrance Test for 190+ top un-aided private engineering institutions in Karnataka.",
    statusBadge: "National Slot Open",
    statusTheme: "orange",
    statusHasDot: false,
    authorityTag: "Pan-India Quota",
    stats: [
      { label: "Exam Date:", value: "May 9, 2027" },
      { label: "Eligibility:", value: "10+2 PCM (45%+)" },
      { label: "Mode:", value: "Online (CBT Across India)" },
    ],
    actionIcon: ArrowUpRight,
    href: "/exams/comedk",
  },
  {
    id: "jee-main-2027",
    name: "JEE Main 2027",
    description:
      "National level engineering entrance exam for NITs, IIITs, CFTIs and qualifier for JEE Advanced.",
    statusBadge: "Session 1 & 2 Schedule",
    statusTheme: "orange",
    statusHasDot: true,
    authorityTag: "NTA National",
    stats: [
      { label: "Exam Date:", value: "Jan & April 2027" },
      { label: "Eligibility:", value: "10+2 PCM (75% for NITs)" },
      { label: "Mode:", value: "Online (Computer Based)" },
    ],
    actionIcon: ArrowUpRight,
    href: "/exams/jee-main",
  },
  {
    id: "neet-ug-2027",
    name: "NEET UG 2027",
    description:
      "Single national medical entrance exam for MBBS, BDS, AYUSH & B.Sc Nursing across India.",
    statusBadge: "Syllabus Released",
    statusTheme: "purple",
    statusHasDot: false,
    authorityTag: "NTA / NMC",
    stats: [
      { label: "Exam Date:", value: "May 2, 2027" },
      { label: "Eligibility:", value: "10+2 PCB (50%+)" },
      { label: "Mode:", value: "Offline (Pen & Paper)" },
    ],
    actionIcon: ArrowUpRight,
    href: "/exams/neet-ug",
  },
  {
    id: "viteee-2027",
    name: "VITEEE 2027",
    description:
      "Vellore Institute of Technology Engineering Entrance Exam for Vellore, Chennai, AP & Bhopal campuses.",
    statusBadge: "Applications Open",
    statusTheme: "orange",
    statusHasDot: true,
    authorityTag: "VIT University",
    stats: [
      { label: "Exam Date:", value: "April 19 - 30, 2027" },
      { label: "Eligibility:", value: "10+2 PCM/PCB (60%+)" },
      { label: "Mode:", value: "Online Slot Booking" },
    ],
    actionIcon: ArrowUpRight,
    href: "/exams/viteee",
  },
  {
    id: "tancet-2027",
    name: "TANCET 2027",
    description:
      "Tamil Nadu Common Entrance Test conducted by Anna University for MBA and MCA postgraduate admissions.",
    statusBadge: "PG State Window",
    statusTheme: "blue",
    statusHasDot: false,
    authorityTag: "Anna University",
    stats: [
      { label: "Exam Date:", value: "March 2027" },
      { label: "Eligibility:", value: "Bachelor's Degree (50%+)" },
      { label: "Mode:", value: "Offline (OMR Sheet)" },
    ],
    actionIcon: ArrowUpRight,
    href: "/exams/tancet",
  },
  {
    id: "cat-2027",
    name: "CAT 2027",
    description:
      "Common Admission Test for flagship MBA & PGDM programs across 21 IIMs and top B-Schools in India.",
    statusBadge: "National Management",
    statusTheme: "blue",
    statusHasDot: false,
    authorityTag: "IIM Consortium",
    stats: [
      { label: "Exam Date:", value: "November 28, 2027" },
      { label: "Eligibility:", value: "Graduation (50%+)" },
      { label: "Mode:", value: "Online (Computer Based)" },
    ],
    actionIcon: ArrowUpRight,
    href: "/exams/cat",
  },
  {
    id: "clat-2027",
    name: "CLAT 2027",
    description:
      "Common Law Admission Test for 5-Year Integrated BA LLB, BBA LLB & LLM across 24 National Law Universities.",
    statusBadge: "Registration Active",
    statusTheme: "purple",
    statusHasDot: true,
    authorityTag: "NLU Consortium",
    stats: [
      { label: "Exam Date:", value: "December 2026 / 2027" },
      { label: "Eligibility:", value: "10+2 Any Stream (45%+)" },
      { label: "Mode:", value: "Offline Test Centers" },
    ],
    actionIcon: ArrowUpRight,
    href: "/exams/clat",
  },
];
