import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import { getCollegeDirectory } from "@/services/collegeDirectoryService";
import Advertisement from "@/components/shared/Advertisement";
import CollegeDirectoryClient from "@/features/college-directory/CollegeDirectoryClient";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata({
    title: "College Directory",
    description:
      "Access direct contact information, principal details, and administrative records for top institutions across India.",
    path: "/college-directory",
  });
}

export default async function CollegeDirectoryPage() {
  const colleges = await getCollegeDirectory().catch(() => []);
  return (
    <CollegeDirectoryClient
      initialColleges={colleges}
      adSlot={<Advertisement placement="results" className="w-full max-h-[100px] object-cover" />}
    />
  );
}
