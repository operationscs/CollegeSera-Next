import ArticleEditor from "@/features/admin/ArticleEditor";

export default async function SecurePortalEditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ArticleEditor id={id} />;
}
