"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import {
  createArticle,
  updateArticle,
  getArticles,
} from "@/services/articleService";
import { getColleges } from "@/services/collegeService";
import { DatabaseArticle } from "@/types/database";

const getArticleById = async (id: string, token?: string) => {
  const articles = await getArticles(token);
  return articles.find((a) => a.id === id);
};

interface ArticleEditorProps {
  id?: string;
}

const ArticleEditor = ({ id: propId }: ArticleEditorProps) => {
  const params = useParams<{ id?: string }>();
  const id = propId ?? params?.id;
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditMode = !!id;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Partial<DatabaseArticle>>({
    defaultValues: {
      status: "draft",
      featured: false,
      views: 0,
    },
  });

  const { data: article, isLoading: isLoadingArticle } = useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      if (!id) return null;
      const token = undefined;
      return getArticleById(id, token || undefined);
    },
    enabled: isEditMode,
  });

  const { data: colleges = [] } = useQuery({
    queryKey: ["colleges-list"],
    queryFn: async () => {
      const c = await getColleges();
      return c;
    },
  });

  useEffect(() => {
    if (article) {
      setValue("title", article.title);
      setValue("slug", article.slug);
      setValue("content", article.content);
      setValue("excerpt", article.excerpt);
      setValue("article_label", article.article_label);
      setValue("status", article.status);
      setValue("featured", article.featured);
      setValue("featured_image", article.featured_image);
      setValue("meta_description", article.meta_description);
      setValue("college_id", article.college_id);
    }
  }, [article, setValue]);

  const mutation = useMutation({
    mutationFn: async (data: Partial<DatabaseArticle>) => {
      const token = undefined;
      if (isEditMode && id) {
        return updateArticle(id, data, token || undefined);
      } else {
        return createArticle(
          { ...data, author_id: "system" },
          token || undefined
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      toast({
        title: isEditMode ? "Article updated" : "Article created",
        description: "Your changes have been saved successfully.",
      });
      router.push("/secure-portal/articles");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to save article. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    },
  });

  const onSubmit = (data: Partial<DatabaseArticle>) => {
    mutation.mutate(data);
  };

  if (isEditMode && isLoadingArticle) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/secure-portal/articles")}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {isEditMode ? "Edit Article" : "New Article"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {isEditMode ? "Update existing content" : "Create new content"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2 col-span-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter article title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input
              id="slug"
              placeholder="article-url-slug"
              {...register("slug")}
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to auto-generate from title
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="article_label">Label / Category</Label>
            <Select
              onValueChange={(value) => setValue("article_label", value)}
              defaultValue={watch("article_label")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select label" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="Exam">Exam</SelectItem>
                <SelectItem value="News">News</SelectItem>
                <SelectItem value="Guide">Guide</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="college_id">Link to College (Optional)</Label>
            <Select
              onValueChange={(value) =>
                setValue("college_id", value === "none" ? undefined : value)
              }
              defaultValue={watch("college_id") || "none"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select college" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {colleges.map((college) => (
                  <SelectItem key={college.id} value={college.id}>
                    {college.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              onValueChange={(value) => setValue("status", value)}
              defaultValue={watch("status") || "draft"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="featured_image">Featured Image URL</Label>
            <Input
              id="featured_image"
              placeholder="https://..."
              {...register("featured_image")}
            />
          </div>

          <div className="space-y-2 col-span-2">
            <Label htmlFor="excerpt">Excerpt (Short Description)</Label>
            <Textarea
              id="excerpt"
              placeholder="Brief summary of the article..."
              className="h-20"
              {...register("excerpt")}
            />
          </div>

          <div className="space-y-2 col-span-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Write your article content here..."
              className="min-h-[300px] font-mono"
              {...register("content", {
                required: "Content is required",
                validate: (value) => {
                  if (!value) return true;
                  const wordCount = value.trim().split(/\s+/).length;
                  return (
                    wordCount >= 1500 ||
                    `Article contents should have minimum of 1500 words (currently ${wordCount} words)`
                  );
                },
              })}
            />
            {errors.content && (
              <p className="text-red-500 text-sm">{errors.content.message}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={watch("featured")}
              onCheckedChange={(checked) => setValue("featured", checked)}
            />
            <Label htmlFor="featured">Featured Article</Label>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/secure-portal/articles")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            <Save className="w-4 h-4 mr-2" />
            Save Article
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ArticleEditor;
