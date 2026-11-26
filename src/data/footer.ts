import { HOME_STREAMS, POPULAR_PROGRAMS } from "@/data/homepage";
import type { FooterContent } from "@/types/layout";

const FOOTER_POPULAR_DEGREE_IDS = [
  "ug-btech-cs-ai",
  "pg-mba-analytics",
  "ug-bsc-nursing",
  "ug-bca",
  "ug-bba",
  "ug-bpharm",
] as const;

export const FOOTER_CONTENT: FooterContent = {
  brand: {
    href: "/",
    brandPrimary: "College",
    brandAccent: "Sera",
    description:
      "India's leading university advisory platform empowering students with verified seat intake data, transparent fee insights, and 1-on-1 counseling across 6,000+ institutions.",
    socialLinks: [
      {
        id: "facebook",
        label: "Facebook",
        href: "https://www.facebook.com/profile.php?id=61581886108783",
        platform: "facebook",
      },
      {
        id: "instagram",
        label: "Instagram",
        href: "https://www.instagram.com/collegesera/",
        platform: "instagram",
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/collegesera/",
        platform: "linkedin",
      },
    ],
  },
  topStreams: {
    title: "Top Streams",
    links: HOME_STREAMS.map((stream) => ({
      id: stream.path.replace(/^\//, "").replace(/\//g, "-"),
      label: stream.name,
      href: stream.path,
    })),
  },
  popularDegrees: {
    title: "Popular Degrees",
    links: FOOTER_POPULAR_DEGREE_IDS.flatMap((degreeId) => {
      const program = POPULAR_PROGRAMS.find((item) => item.id === degreeId);
      if (!program) return [];
      return [
        {
          id: program.id,
          label: program.name,
          href: program.href || "/colleges",
        },
      ];
    }),
  },
  examsAndDates: {
    title: "Exams & Dates",
    links: [
      { id: "kcet", label: "KCET 2026", href: "/exams/kcet" },
      { id: "comedk-uget", label: "COMEDK UGET", href: "/exams/comedk" },
      { id: "tnea-cutoffs", label: "TNEA Cutoffs", href: "/exams/tnea" },
      { id: "jee-main", label: "JEE Main 2026", href: "/exams/jee-main" },
      { id: "neet-ug", label: "NEET UG Exam", href: "/exams/neet-ug" },
      { id: "cat-exam", label: "CAT / MAT Exam", href: "/exams/cat" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { id: "college-predictor", label: "College Predictor", href: "/colleges" },
      { id: "nirf-rankings", label: "NIRF Rankings", href: "/colleges" },
      { id: "scholarship-portal", label: "Scholarship Portal", href: "/scholarship" },
      { id: "free-counselling", label: "Free Counselling", href: "/contact-us" },
      { id: "compare-tool", label: "Compare Tool", href: "/colleges" },
    ],
  },
  contact: {
    title: "Get in Touch",
    items: [
      {
        id: "location-coimbatore",
        type: "location",
        label: "Coimbatore, Tamilnadu",
      },
      {
        id: "location-chennai",
        type: "location",
        label: "Ascendas IT Park, Chennai",
      },
      {
        id: "location-bangalore",
        type: "location",
        label: "Bagmane Tech Park, Bangalore",
      },
      {
        id: "phone-primary",
        type: "phone",
        label: "+91 63747 15327",
        href: "tel:+916374715327",
      },
      {
        id: "email-primary",
        type: "email",
        label: "help@collegesera.com",
        href: "mailto:help@collegesera.com",
      },
    ],
  },
  bottomBar: {
    copyrightSymbol: "©",
    copyrightCompany: "Saventevo Solutions.",
    dividerSymbol: "|",
    madeWithPrefix: "Made with",
    madeWithHeart: "❤",
    madeWithSuffix: "in India 🇮🇳",
    links: [
      {
        id: "articles",
        label: "Articles",
        href: "/articles",
        highlight: "orange-400",
      },
      {
        id: "about-us",
        label: "About Us",
        href: "/about-us",
      },
      {
        id: "contact-us",
        label: "Contact Us",
        href: "/contact-us",
      },
      {
        id: "privacy-policy",
        label: "Privacy Policy",
        href: "/privacy-policy",
      },
      {
        id: "terms-and-conditions",
        label: "Terms and Conditions",
        href: "/terms-and-conditions",
      },
      {
        id: "scholarship",
        label: "Scholarship",
        href: "/scholarship",
        highlight: "orange-500",
      },
    ],
  },
};
