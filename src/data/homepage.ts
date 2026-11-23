import {
  Activity,
  BookOpen,
  Briefcase,
  Building2,
  Cpu,
  Heart,
  Leaf,
  Palette,
  Pill,
  Plane,
  Scale,
  ShieldCheck,
  Smile,
  Stethoscope,
  TrendingUp,
  UtensilsCrossed,
  Users,
  Wrench,
} from "lucide-react";
import type {
  HeroCityId,
  HeroOption,
  HeroRoute,
  HeroSocialProofItem,
  HeroStat,
  HeroStreamId,
  HomeCity,
  HomeExam,
  HomeStat,
  HomeStream,
  PopularProgram,
} from "@/types/home";

export const HERO_ROTATING_TEXTS = ["Engineering"] as const;

export const HERO_SOCIAL_PROOF: HeroSocialProofItem[] = [
  { count: 338, college: "Amrita University" },
  { count: 251, college: "VIT University" },
  { count: 189, college: "SRM Institute" },
  { count: 412, college: "Anna University" },
  { count: 176, college: "PSG College of Technology" },
  { count: 295, college: "Manipal University" },
];

export const HERO_STREAM_OPTIONS = [
  { id: "all", label: "All Streams" },
  { id: "engineering", label: "Engineering & Tech" },
  { id: "mba", label: "Management & MBA" },
  { id: "medical", label: "Medical & Dental" },
  { id: "arts", label: "Arts & Science" },
] as const;

export const HERO_STREAM_ROUTES: Record<HeroStreamId, HeroRoute> = {
  all: { href: "/colleges", seoSlug: "colleges" },
  engineering: { href: "/colleges/engineering", seoSlug: "engineering" },
  mba: { href: "/colleges/mba", seoSlug: "mba" },
  medical: { href: "/colleges/medical", seoSlug: "medical" },
  arts: { href: "/colleges/arts", seoSlug: "arts-and-science" },
};

export const HERO_CITY_OPTIONS = [
  { value: "all", label: "All Cities" },
  { value: "coimbatore", label: "Coimbatore" },
  { value: "chennai", label: "Chennai" },
  { value: "salem", label: "Salem" },
  { value: "madurai", label: "Madurai" },
  { value: "trichy", label: "Trichy" },
  { value: "bengaluru", label: "Bengaluru" },
  { value: "kochi", label: "Kochi" },
] as const satisfies readonly HeroOption<HeroCityId>[];

export const HERO_CITY_FILTER_VALUES: Record<HeroCityId, string> = {
  all: "all",
  coimbatore: "Coimbatore",
  chennai: "Chennai",
  salem: "Salem",
  madurai: "Madurai",
  trichy: "Tiruchirappalli",
  bengaluru: "Bangalore",
  kochi: "Kochi",
};

export const HERO_CITY_ROUTE_VALUES: Record<HeroCityId, string> = {
  all: "all",
  coimbatore: "coimbatore",
  chennai: "chennai",
  salem: "salem",
  madurai: "madurai",
  trichy: "tiruchirappalli",
  bengaluru: "bangalore",
  kochi: "kochi",
};

export const HERO_TRENDING_SEARCHES = [
  "Top Universities in Tamil Nadu",
  "Top Universities in Kerala",
  "Top Universities in Karnataka",
  "Best Engineering Colleges 2026",
  "TNEA Counselling",
  "Top MBA Colleges",
];

export const HERO_STATS: HeroStat[] = [
  {
    icon: Building2,
    value: "6000+",
    label: "Verified Colleges",
    detail: "Across 16+ popular streams",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: TrendingUp,
    value: "500+",
    label: "Popular Courses",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Users,
    value: "2M+",
    label: "Students",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "ISO Certified & Verified Data",
    color: "bg-cyan-100 text-cyan-700",
  },
];

export const HOME_STREAMS: HomeStream[] = [
  { name: "Engineering", icon: Cpu, path: "/colleges/engineering", color: "text-blue-600", bgColor: "bg-blue-50 hover:bg-blue-100 border-blue-100", colleges: "2500+ Colleges" },
  { name: "Arts & Science", icon: BookOpen, path: "/colleges/arts", color: "text-purple-600", bgColor: "bg-purple-50 hover:bg-purple-100 border-purple-100", colleges: "3000+ Colleges" },
  { name: "MBA", icon: Briefcase, path: "/colleges/mba", color: "text-amber-600", bgColor: "bg-amber-50 hover:bg-amber-100 border-amber-100", colleges: "1200+ Colleges" },
  { name: "Medical", icon: Stethoscope, path: "/colleges/medical", color: "text-red-600", bgColor: "bg-red-50 hover:bg-red-100 border-red-100", colleges: "600+ Colleges" },
  { name: "Dental", icon: Smile, path: "/colleges/dental", color: "text-cyan-600", bgColor: "bg-cyan-50 hover:bg-cyan-100 border-cyan-100", colleges: "300+ Colleges" },
  { name: "Law", icon: Scale, path: "/colleges/law", color: "text-indigo-600", bgColor: "bg-indigo-50 hover:bg-indigo-100 border-indigo-100", colleges: "450+ Colleges" },
  { name: "Pharmacy", icon: Pill, path: "/colleges/pharmacy", color: "text-green-600", bgColor: "bg-green-50 hover:bg-green-100 border-green-100", colleges: "800+ Colleges" },
  { name: "Architecture", icon: Building2, path: "/colleges/architecture", color: "text-orange-600", bgColor: "bg-orange-50 hover:bg-orange-100 border-orange-100", colleges: "200+ Colleges" },
  { name: "Agriculture", icon: Leaf, path: "/colleges/agriculture", color: "text-lime-600", bgColor: "bg-lime-50 hover:bg-lime-100 border-lime-100", colleges: "350+ Colleges" },
  { name: "Nursing", icon: Heart, path: "/colleges/nursing", color: "text-pink-600", bgColor: "bg-pink-50 hover:bg-pink-100 border-pink-100", colleges: "700+ Colleges" },
  { name: "Paramedical", icon: Activity, path: "/colleges/paramedical", color: "text-teal-600", bgColor: "bg-teal-50 hover:bg-teal-100 border-teal-100", colleges: "500+ Colleges" },
  { name: "Design", icon: Palette, path: "/colleges/design", color: "text-fuchsia-600", bgColor: "bg-fuchsia-50 hover:bg-fuchsia-100 border-fuchsia-100", colleges: "150+ Colleges" },
  { name: "Hotel Management", icon: UtensilsCrossed, path: "/colleges/hotel-management", color: "text-rose-600", bgColor: "bg-rose-50 hover:bg-rose-100 border-rose-100", colleges: "250+ Colleges" },
  { name: "Aviation", icon: Plane, path: "/colleges/aviation", color: "text-sky-600", bgColor: "bg-sky-50 hover:bg-sky-100 border-sky-100", colleges: "50+ Colleges" },
  { name: "Polytechnic", icon: Wrench, path: "/colleges/polytechnic", color: "text-slate-600", bgColor: "bg-slate-50 hover:bg-slate-100 border-slate-100", colleges: "400+ Colleges" },
  { name: "Commerce", icon: TrendingUp, path: "/colleges/commerce", color: "text-emerald-600", bgColor: "bg-emerald-50 hover:bg-emerald-100 border-emerald-100", colleges: "1800+ Colleges" },
];

export const HOME_CITIES: HomeCity[] = [
  { name: "DELHI", colleges: "847+ colleges", image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop" },
  { name: "BANGALORE", colleges: "1836+ colleges", image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop" },
  { name: "MUMBAI", colleges: "924+ colleges", image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=400&h=300&fit=crop" },
  { name: "PUNE", colleges: "734+ colleges", image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=400&h=300&fit=crop" },
  { name: "KOLKATA", colleges: "715+ colleges", image: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=400&h=300&fit=crop" },
];

export const HOME_STATS: HomeStat[] = [
  { icon: "🏛️", label: "6000+ Institutions", bg: "bg-orange-100", text: "text-orange-600" },
  { icon: "📝", label: "200+ Exams", bg: "bg-blue-100", text: "text-blue-600" },
  { icon: "📚", label: "1000+ Courses", bg: "bg-green-100", text: "text-green-600" },
  { icon: "💻", label: "200+ Online Courses", bg: "bg-purple-100", text: "text-purple-600" },
];

export const HOME_EXAMS: HomeExam[] = [
  { id: 1, name: "Integral University Entrance Tes... (IUET)", description: "Conducted by Integral University for UG and PG admissions across various disciplines.", level: "National Wise", applicationDate: "-", examDate: "-", duration: "90 min", logo: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=60&h=60&fit=crop", type: "Online" },
  { id: 2, name: "Andhra University Common Entranc... (AUCET PG 2025)", description: "Andhra University's exam for PG admissions in science, arts, and commerce.", level: "National Wise", applicationDate: "-", examDate: "-", duration: "105 min", logo: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=60&h=60&fit=crop", type: "Online" },
  { id: 3, name: "Post Graduate Institute of Medic... (PGIMER 2025)", description: "Entrance exam for PG medical courses like MD, MS, and allied health programs.", level: "National Wise", applicationDate: "-", examDate: "Jul 25, 2025", duration: "180 min", logo: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=60&h=60&fit=crop", type: "Online" },
  { id: 4, name: "National Eligibility cum Entranc... (Neet PG 2025)", description: "National exam for admissions to MD, MS, and PG Diploma courses in medical institutions.", level: "National Wise", applicationDate: "-", examDate: "Jun 15, 2025", duration: "210 min", logo: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=60&h=60&fit=crop", type: "Computer-based test" },
];

export const POPULAR_PROGRAMS: PopularProgram[] = [
  { id: "prog1", name: "Bachelor of Technology", level: "Undergraduate" },
  { id: "prog2", name: "Master of Business Administration", level: "Postgraduate" },
  { id: "prog3", name: "Doctor of Philosophy", level: "Doctoral" },
  { id: "prog4", name: "Associate Degree in Arts", level: "Associate" },
];
