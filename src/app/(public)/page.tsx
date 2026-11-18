import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/shared/JsonLd";
import HeroSection from "@/features/home/HeroSection";
import StreamsSection from "@/features/home/StreamsSection";
import FeaturedColleges from "@/features/home/FeaturedColleges";
import StatsSection from "@/features/home/StatsSection";
import PopularCourses from "@/features/home/popularCourses";
import NavigationSection from "@/features/home/NavigationSection";
import ExamsSection from "@/features/home/ExamsSection";
import CitiesSection from "@/features/home/CitiesSection";
import { getHomepageFeaturedColleges } from "@/services/collegeService";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata({
    title: "Home",
    description:
      "Discover top colleges in South India. Compare fees, courses, and placements to find your perfect college match.",
    path: "/",
  });
}

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://collegesera.com/#organization",
  name: "CollegeSera",
  alternateName: "College Sera",
  url: "https://collegesera.com",
  logo: "https://collegesera.com/CollegeseraLogo.png",
  description:
    "CollegeSera (College Sera) is South India's most trusted platform that helps students discover colleges, courses, fees, rankings and admissions information.",
  foundingDate: "2025",
  sameAs: [
    "https://www.facebook.com/profile.php?id=61581886108783",
    "https://www.instagram.com/collegesera/",
    "https://www.linkedin.com/company/collegesera/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "support@collegesera.com",
    telephone: "+91-9717819001",
    availableLanguage: ["English", "Hindi"],
  },
};

export default async function HomePage() {
  const featuredColleges = await getHomepageFeaturedColleges().catch(() => []);

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={homeSchema} />
      <HeroSection />
      <StreamsSection />
      <FeaturedColleges colleges={featuredColleges} />
      <StatsSection />
      <PopularCourses />
      <NavigationSection />
      <ExamsSection />
      <CitiesSection />
    </div>
  );
}
