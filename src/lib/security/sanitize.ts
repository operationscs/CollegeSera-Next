import sanitize from "sanitize-html";

const ALLOWED_TAGS = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "br",
  "hr",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "sub",
  "sup",
  "mark",
  "small",
  "ol",
  "ul",
  "li",
  "dl",
  "dt",
  "dd",
  "blockquote",
  "pre",
  "code",
  "div",
  "span",
  "section",
  "article",
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
  "caption",
  "colgroup",
  "col",
  "a",
  "img",
  "figure",
  "figcaption",
];

const ALLOWED_ATTRIBUTES: sanitize.IOptions["allowedAttributes"] = {
  "*": ["class", "id"],
  a: ["href", "name", "target", "rel", "title", "class", "id"],
  img: ["src", "alt", "title", "width", "height", "loading", "class", "id"],
  th: ["colspan", "rowspan", "scope", "class", "id"],
  td: ["colspan", "rowspan", "class", "id"],
};

/**
 * Server-safe HTML sanitization mirroring SecurityUtils.sanitizeHtml's security intent
 * while permitting rich article HTML elements and heading IDs required by ArticleDetail.
 */
export function sanitizeHtml(html: string): string {
  if (!html || typeof html !== "string") return "";

  return sanitize(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowProtocolRelative: false,
    disallowedTagsMode: "discard",
  });
}

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

/**
 * Server port of ArticleDetail's processedContent logic:
 * 1. Injects deterministic slug IDs into <h2> headings and collects TOC items.
 * 2. Sanitizes the HTML for safe server-side rendering via dangerouslySetInnerHTML.
 */
export function processArticleContent(rawContent?: string | null): {
  processedContent: string;
  toc: TocHeading[];
} {
  if (!rawContent || typeof rawContent !== "string") {
    return { processedContent: "", toc: [] };
  }

  const headings: TocHeading[] = [];

  const withHeadingIds = rawContent.replace(
    /<h2(.*?)>([\s\S]*?)<\/h2>/gi,
    (_match, attrs: string, text: string) => {
      const cleanText = text.replace(/<[^>]*>/g, "");
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      headings.push({ id, text: cleanText, level: 2 });
      const cleanedAttrs = (attrs || "").replace(/\bid\s*=\s*["'][^"']*["']/gi, "");
      return `<h2 id="${id}"${cleanedAttrs}>${text}</h2>`;
    }
  );

  return {
    processedContent: sanitizeHtml(withHeadingIds),
    toc: headings,
  };
}
