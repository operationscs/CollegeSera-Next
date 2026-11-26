import {
  BriefcaseMedical,
  Building2,
  ClipboardList,
  Gavel,
  Microscope,
  PencilRuler,
  ShieldCheck,
  ShieldPlus,
  TrendingUp,
  UserCog,
  Users,
} from "lucide-react";
import type {
  FeaturedCollegesFilterOption,
  FeaturedCollegesSectionContent,
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
  StreamsSectionContent,
} from "@/types/home";

export const HERO_ROTATING_TEXTS = [
  "Engineering Colleges",
  "Medical Colleges",
  "MBA Programs",
  "Top Universities",
  "Best Courses",
  "Entrance Exams",
] as const;

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
    color:
      "bg-[#FFF3E8] text-[#ff861c] dark:bg-orange-950/70 dark:text-[#ff861c]",
  },
  {
    icon: TrendingUp,
    value: "500+",
    label: "Popular Courses",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-950/70 dark:text-blue-300",
  },
  {
    icon: Users,
    value: "2M+",
    label: "Students",
    color:
      "bg-purple-100 text-purple-600 dark:bg-purple-950/70 dark:text-purple-300",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "ISO Certified & Verified Data",
    color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/70 dark:text-cyan-300",
  },
];

export const STREAMS_SECTION_CONTENT: StreamsSectionContent = {
  eyebrow: "TARGETED EXPLORATION",
  title: "Browse by Higher Education Stream",
  description:
    "Select your discipline to inspect approved universities, accreditations, fee benchmarks, and placement stats.",
  filters: [
    { id: "all", label: "All Streams" },
    { id: "engineering", label: "Engineering & Tech" },
    { id: "management", label: "Management & MBA" },
    { id: "medical", label: "Medical & Healthcare" },
    { id: "design", label: "Design & Architecture" },
    { id: "law-humanities", label: "Law & Humanities" },
  ],
  prevButtonLabel: "Scroll streams left",
  nextButtonLabel: "Scroll streams right",
};

export const FEATURED_COLLEGES_FILTERS: readonly FeaturedCollegesFilterOption[] = [
  { id: "all", label: "All Institutions" },
  { id: "nirf-top-100", label: "NIRF Top 100" },
  { id: "autonomous", label: "Autonomous" },
  { id: "naac-a-plus-plus", label: "NAAC A++" },
  { id: "deemed", label: "Deemed" },
] as const;

export const FEATURED_COLLEGES_SECTION_CONTENT: FeaturedCollegesSectionContent = {
  eyebrow: "ACADEMIC EXCELLENCE",
  title: "Featured & Top-Ranked Institutions",
  description:
    "Compare seat quotas, placement stats, and state entrance cutoffs across premier autonomous campuses.",
  ctaLabel: "View All 3,200+ Colleges & Campuses",
  ctaPath: "/colleges",
  emptyFilterMessage: "No featured colleges match the selected filter.",
  scrollLeftAriaLabel: "Slide featured colleges left",
  scrollRightAriaLabel: "Slide featured colleges right",
  gridViewAriaLabel: "Grid view",
  listViewAriaLabel: "List view",
  filters: FEATURED_COLLEGES_FILTERS,
  cardLabels: {
    featuredBadge: "FEATURED",
    naacPrefix: "NAAC",
    nirfPrefix: "NIRF",
    defaultLocation: "India",
    defaultType: "College",
    coursesAvailable: "Courses Available",
    coursesSuffix: "Courses",
    annualFeesLabel: "Annual Fees",
    avgCtcLabel: "Avg CTC",
    establishedLabel: "Established",
    establishedPrefix: "Est.",
    naacGradeLabel: "NAAC Grade",
    gradePrefix: "Grade",
    notAvailable: "N/A",
    detailsButton: "Details",
    compareAriaLabel: "Compare",
    logoPlaceholder: "https://via.placeholder.com/100?text=Logo",
    campusPlaceholder:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=3840&q=100&auto=format&fit=crop",
    campusImagesByKeyword: [
      {
        keywords: ["n g p institute of technology", "ngp institute of technology", "drngpit"],
        imageUrl:
          "https://www.drngpit.ac.in/images/homepage/campus_building.jpg",
      },
      {
        keywords: ["n. g. p. arts and science", "ngp arts and science", "drngpasc"],
        imageUrl:
          "https://www.drngpasc.ac.in/images/page_banner/building1.jpg",
      },
      {
        keywords: ["coimbatore institute of technology", "cit"],
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/8/8a/CIT_Main_Building.jpg",
      },
      {
        keywords: ["hindusthan college of engineering", "hicet"],
        imageUrl:
          "https://media.getmyuni.com/azure/college-images-test/hindusthan-college-of-engineering-and-technology-hcet-coimbatore/3fc57288862a46bf91bd668b821cdb62.jpeg",
      },
      {
        keywords: ["ppg business school", "ppg"],
        imageUrl:
          "https://image-static.collegedunia.com/public/college_data/images/campusimage/14544744701.jpg",
      },
      {
        keywords: ["srm institute of science and technology", "srm university", "srmist"],
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/4/4e/SRM_University_Auditorium.JPG",
      },
      {
        keywords: ["sakthi institute of information", "siims"],
        imageUrl:
          "https://media.getmyuni.com/azure/college-image/big/sakthi-institute-of-information-and-management-studies-siims-coimbatore.jpg",
      },
      {
        keywords: ["happy valley business school", "happy valley"],
        imageUrl:
          "https://content.jdmagicbox.com/comp/coimbatore/26/0422p422std1200626/catalogue/happy-valley-business-school-madukkarai-coimbatore-mba-institutes-8x95jput4o.jpg",
      },
      {
        keywords: ["kumaraguru college of liberal arts", "kclas"],
        imageUrl:
          "https://www.kclas.ac.in/wp-content/uploads/2021/01/kclas-building-1.jpg",
      },
      {
        keywords: ["kumaraguru college of technology", "kumaraguru", "kct"],
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/b/ba/KCT_Banner.jpg",
      },
      {
        keywords: ["psg college of technology", "psg tech"],
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/8/87/PSG_College_Of_Technology.jpg",
      },
      {
        keywords: ["amrita vishwa vidyapeetham", "amrita university"],
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/2/2c/Amrita_Vishwa_Vidyapeetham_coimbatore_campus.jpg",
      },
      {
        keywords: ["anna university"],
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/c/cc/Anna_University_Main_Building.jpg",
      },
      {
        keywords: ["vellore institute of technology", "vit vellore", "vit university"],
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/4/43/Technology_Tower%28VIT%29.jpg",
      },
    ],
    fallbackCampusImages: [
      "https://images.unsplash.com/photo-1562774053-701939374585?w=3840&q=100&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=3840&q=100&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=3840&q=100&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=3840&q=100&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=3840&q=100&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=3840&q=100&auto=format&fit=crop",
    ],
    statsByKeyword: [
      {
        keywords: ["psg college of technology", "psg tech"],
        annualFees: "₹1.8L - ₹3.2L",
        avgCtc: "₹10.8 LPA",
      },
      {
        keywords: ["coimbatore institute of technology", "cit"],
        annualFees: "₹1.4L - ₹2.6L",
        avgCtc: "₹8.5 LPA",
      },
      {
        keywords: ["kumaraguru college of technology", "kct"],
        annualFees: "₹1.6L - ₹2.8L",
        avgCtc: "₹7.8 LPA",
      },
      {
        keywords: ["kumaraguru college of liberal arts", "kclas"],
        annualFees: "₹1.2L - ₹2.1L",
        avgCtc: "₹5.6 LPA",
      },
      {
        keywords: ["n g p institute of technology", "ngp institute of technology", "drngpit"],
        annualFees: "₹1.3L - ₹2.2L",
        avgCtc: "₹6.2 LPA",
      },
      {
        keywords: ["n. g. p. arts and science", "ngp arts and science", "drngpasc"],
        annualFees: "₹75K - ₹1.5L",
        avgCtc: "₹4.8 LPA",
      },
      {
        keywords: ["hindusthan college of engineering", "hicet"],
        annualFees: "₹1.4L - ₹2.4L",
        avgCtc: "₹6.5 LPA",
      },
      {
        keywords: ["srm institute of science and technology", "srm university", "srmist"],
        annualFees: "₹2.5L - ₹4.5L",
        avgCtc: "₹9.5 LPA",
      },
      {
        keywords: ["vellore institute of technology", "vit vellore", "vit university"],
        annualFees: "₹1.98L - ₹3.95L",
        avgCtc: "₹9.9 LPA",
      },
      {
        keywords: ["amrita vishwa vidyapeetham", "amrita university"],
        annualFees: "₹2.4L - ₹4.0L",
        avgCtc: "₹9.2 LPA",
      },
      {
        keywords: ["anna university"],
        annualFees: "₹55K - ₹1.4L",
        avgCtc: "₹10.5 LPA",
      },
      {
        keywords: ["ppg business school", "ppg"],
        annualFees: "₹1.2L - ₹2.0L",
        avgCtc: "₹6.0 LPA",
      },
      {
        keywords: ["sakthi institute of information", "siims"],
        annualFees: "₹1.1L - ₹1.9L",
        avgCtc: "₹5.8 LPA",
      },
      {
        keywords: ["happy valley business school", "happy valley"],
        annualFees: "₹1.5L - ₹2.4L",
        avgCtc: "₹6.8 LPA",
      },
    ],
    fallbackStats: [
      { annualFees: "₹1.8L - ₹3.2L", avgCtc: "₹10.8 LPA" },
      { annualFees: "₹1.5L - ₹2.8L", avgCtc: "₹8.4 LPA" },
      { annualFees: "₹1.2L - ₹2.4L", avgCtc: "₹7.2 LPA" },
      { annualFees: "₹2.0L - ₹3.6L", avgCtc: "₹9.5 LPA" },
      { annualFees: "₹1.4L - ₹2.5L", avgCtc: "₹6.8 LPA" },
      { annualFees: "₹1.6L - ₹3.0L", avgCtc: "₹8.9 LPA" },
    ],
  },
};

export const HOME_STREAMS: HomeStream[] = [
  {
    name: "Engineering & Tech",
    icon: UserCog,
    path: "/colleges/engineering",
    category: "engineering",
    colleges: "850+ Colleges",
    courses: "B.Tech, M.Tech, BE, Diploma in AI, Data Science & Core",
    badgeText: "High Demand",
    theme: "orange",
    color: "text-[#ff861c] dark:text-[#ff861c]",
    bgColor: "bg-[#FFF3E8] dark:bg-orange-950/60",
    badgeClassName:
      "bg-[#FFF3E8] text-[#ff861c] dark:bg-orange-950/70 dark:text-[#ff861c]",
    primaryStat: { label: "Avg Fees:", value: "₹2.2L - ₹4.5L/yr" },
    secondaryStat: {
      label: "Avg CTC:",
      value: "₹8.5L - ₹14.0L",
      highlight: true,
    },
  },
  {
    name: "Management & MBA",
    icon: TrendingUp,
    path: "/colleges/mba",
    category: "management",
    colleges: "420+ Colleges",
    courses: "MBA, PGDM, Executive MBA, BBA & Fintech Analytics",
    badgeText: "Tier 1 & 2",
    theme: "blue",
    color: "text-[#142B52] dark:text-blue-300",
    bgColor: "bg-[#DCE4FF] dark:bg-blue-950/60",
    badgeClassName:
      "bg-[#E3EBFF] text-[#142B52] dark:bg-blue-950/70 dark:text-blue-300",
    primaryStat: { label: "Avg Fees:", value: "₹3.8L - ₹9.5L" },
    secondaryStat: {
      label: "Avg CTC:",
      value: "₹9.0L - ₹16.5L",
      highlight: true,
    },
  },
  {
    name: "Medical & Dental",
    icon: BriefcaseMedical,
    path: "/colleges/medical",
    category: "medical",
    colleges: "190+ Colleges",
    courses: "MBBS, BDS, MD, MS, Super-specialty & DNB",
    badgeText: "NMC Approved",
    theme: "purple",
    color: "text-[#5B4B8A] dark:text-purple-300",
    bgColor: "bg-[#EFEAFF] dark:bg-purple-950/60",
    badgeClassName:
      "bg-[#F3EFFF] text-[#4C3D7A] dark:bg-purple-950/70 dark:text-purple-300",
    primaryStat: { label: "Tuition:", value: "₹75K - ₹18L/yr" },
    secondaryStat: {
      label: "Stipend:",
      value: "₹45K - ₹85K/mo",
      highlight: true,
    },
  },
  {
    name: "Paramedical & Nursing",
    icon: ShieldPlus,
    path: "/colleges/paramedical",
    category: "medical",
    colleges: "340+ Colleges",
    courses: "B.Sc Nursing, BPT, Allied Health, DMLT & Optometry",
    badgeText: "INC Accredited",
    theme: "green",
    color: "text-[#0F764A] dark:text-emerald-300",
    bgColor: "bg-[#DCFCE7] dark:bg-emerald-950/60",
    badgeClassName:
      "bg-[#DCFCE7] text-[#0F764A] dark:bg-emerald-950/70 dark:text-emerald-300",
    primaryStat: { label: "Avg Fees:", value: "₹65K - ₹2.2L/yr" },
    secondaryStat: {
      label: "Placement:",
      value: "₹3.5L - ₹7.2L",
      highlight: true,
    },
  },
  {
    name: "Arts, Science & Humanities",
    icon: Microscope,
    path: "/colleges/arts",
    category: "law-humanities",
    colleges: "620+ Colleges",
    courses: "B.Sc, B.Com, BA, BCA, Psychology & Media Studies",
    badgeText: "NAAC A++",
    theme: "blue",
    color: "text-[#142B52] dark:text-blue-300",
    bgColor: "bg-[#DCE4FF] dark:bg-blue-950/60",
    badgeClassName:
      "bg-[#E3EBFF] text-[#142B52] dark:bg-blue-950/70 dark:text-blue-300",
    primaryStat: { label: "Avg Fees:", value: "₹40K - ₹1.8L/yr" },
    secondaryStat: {
      label: "Avg CTC:",
      value: "₹4.2L - ₹8.5L",
      highlight: true,
    },
  },
  {
    name: "Law & Legal Studies",
    icon: Gavel,
    path: "/colleges/law",
    category: "law-humanities",
    colleges: "110+ Colleges",
    courses: "BA LLB, BBA LLB, LLB, LLM & Corporate Law",
    badgeText: "BCI Approved",
    theme: "purple",
    color: "text-[#5B4B8A] dark:text-purple-300",
    bgColor: "bg-[#EFEAFF] dark:bg-purple-950/60",
    badgeClassName:
      "bg-[#F3EFFF] text-[#4C3D7A] dark:bg-purple-950/70 dark:text-purple-300",
    primaryStat: { label: "Avg Fees:", value: "₹1.2L - ₹3.8L/yr" },
    secondaryStat: {
      label: "Avg CTC:",
      value: "₹6.5L - ₹15.0L",
      highlight: true,
    },
  },
  {
    name: "Pharmacy",
    icon: ClipboardList,
    path: "/colleges/pharmacy",
    category: "medical",
    colleges: "180+ Colleges",
    courses: "B.Pharm, Pharm.D, M.Pharm, D.Pharm & Clinical Research",
    badgeText: "PCI Approved",
    theme: "orange",
    color: "text-[#ff861c] dark:text-[#ff861c]",
    bgColor: "bg-[#FFF3E8] dark:bg-orange-950/60",
    badgeClassName:
      "bg-[#FFF3E8] text-[#ff861c] dark:bg-orange-950/70 dark:text-[#ff861c]",
    primaryStat: { label: "Avg Fees:", value: "₹90K - ₹2.8L/yr" },
    secondaryStat: {
      label: "Avg CTC:",
      value: "₹4.5L - ₹9.0L",
      highlight: true,
    },
  },
  {
    name: "Design & Architecture",
    icon: PencilRuler,
    path: "/colleges/design",
    category: "design",
    colleges: "95+ Colleges",
    courses: "B.Des, B.Arch, M.Des, Interior, UI/UX & NATA Prep",
    badgeText: "COA Approved",
    theme: "green",
    color: "text-[#0F764A] dark:text-emerald-300",
    bgColor: "bg-[#DCFCE7] dark:bg-emerald-950/60",
    badgeClassName:
      "bg-[#DCFCE7] text-[#0F764A] dark:bg-emerald-950/70 dark:text-emerald-300",
    primaryStat: { label: "Avg Fees:", value: "₹1.8L - ₹5.2L/yr" },
    secondaryStat: {
      label: "Avg CTC:",
      value: "₹6.0L - ₹12.5L",
      highlight: true,
    },
  },
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

export {
  EXAMS_SECTION_CONTENT,
  UPCOMING_EXAMS_DATA as HOME_EXAMS,
} from "@/data/upcoming-exams";

export {
  POPULAR_COURSES_DATA as POPULAR_PROGRAMS,
  POPULAR_COURSES_SECTION_CONTENT,
  POPULAR_COURSE_TABS,
} from "@/data/popular-courses";
