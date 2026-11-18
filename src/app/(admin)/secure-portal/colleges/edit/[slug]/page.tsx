import CollegeEditor from "@/features/admin/CollegeEditor";

export default async function SecurePortalEditCollegePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <CollegeEditor slug={slug} />;
}
