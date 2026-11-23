import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy (Next.js 16 replacement for `middleware`).
 * Mirrors the original RouteValidator: unknown /secure-portal subpaths → 404.
 */
const ADMIN_PREFIXES = [
  "/secure-portal",
  "/secure-portal/leads",
  "/secure-portal/colleges",
  "/secure-portal/analytics",
  "/secure-portal/seo",
  "/secure-portal/articles",
  "/secure-portal/scholarships",
  "/secure-portal/settings",
];

export default function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  if (path.startsWith("/secure-portal")) {
    const valid = ADMIN_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));
    if (!valid) {
      return NextResponse.rewrite(new URL("/_not-found", req.url), { status: 404 });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/secure-portal/:path*"],
};
