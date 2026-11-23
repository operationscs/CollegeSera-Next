import type { ParsedCollegeFilters } from "@/features/colleges/collegeFilterUtils";
import type { SeoOverrideEntry } from "@/features/colleges/collegesData";

export interface CategoryBreadcrumbInfo {
    categoryPath: string;
    categoryName: string;
}

export interface ResolvedCollegesSeoMeta extends CategoryBreadcrumbInfo {
    displayHeroTitle: string;
    title: string;
    description: string;
}

export function formatCategoryBreadcrumb(selectedCategory: string): CategoryBreadcrumbInfo {
    const categoryPath =
        selectedCategory !== "all" ? `/colleges/${selectedCategory}` : "/colleges";

    const categoryName =
        selectedCategory !== "all"
            ? selectedCategory.toUpperCase() === "MBA"
                ? "MBA Colleges"
                : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Colleges`
            : "Colleges";

    return { categoryPath, categoryName };
}

export function resolveCollegesSeoMeta(
    urlFilters: ParsedCollegeFilters,
    seoOverride: SeoOverrideEntry | null
): ResolvedCollegesSeoMeta {
    const displayHeroTitle =
        seoOverride?.college_name ||
        (seoOverride?.seo_title
            ? seoOverride.seo_title.split("|")[0].trim()
            : urlFilters.h1Title);

    const title =
        seoOverride?.seo_title ||
        (urlFilters.h1Title
            ? `${urlFilters.h1Title} | Collegesera`
            : "Top Colleges in Tamil Nadu | Collegesera");

    const description =
        seoOverride?.seo_description ||
        urlFilters.seoDesc ||
        (urlFilters.h2Title
            ? `${displayHeroTitle}. ${urlFilters.h2Title}. Compare fees, placements, and rankings.`
            : displayHeroTitle
                ? `Explore ${displayHeroTitle}. Compare fees, placements, and rankings across top rated colleges.`
                : "Find the best colleges in Tamil Nadu. Check fees, placements, and rankings.");

    const { categoryPath, categoryName } = formatCategoryBreadcrumb(
        urlFilters.resolvedCategory
    );

    return {
        displayHeroTitle,
        title,
        description,
        categoryPath,
        categoryName,
    };
}
