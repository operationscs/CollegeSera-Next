import type { Metadata } from "next";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import { getAllPrograms } from "@/services/programService";
import ProgramsClient from "@/features/programs/ProgramsClient";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata({
    title: "Explore Academic Programs",
    description:
      "Browse academic programs, degrees, and certifications across top colleges in India.",
    path: "/programs",
  });
}

export default async function ProgramsPage() {
  const programs = await getAllPrograms();
  return <ProgramsClient initialPrograms={programs} />;
}
