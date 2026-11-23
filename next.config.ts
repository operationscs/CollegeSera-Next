import type { NextConfig } from "next";

/**
 * Caching model: classic App Router caching (segment `revalidate` + fetch/data cache),
 * NOT Cache Components. Public SEO pages use ISR (`export const revalidate`), while
 * admin/auth routes are fully dynamic. Chosen deliberately because Supabase data is
 * edited live by admins and Clerk-protected routes are user specific.
 */
const nextConfig: NextConfig = {
  cacheComponents: false,
  poweredByHeader: false,
  images: {
    // The original app used plain <img> tags with remote URLs from many hosts.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async redirects() {
    return [
      // Legacy aliases kept from the Vite app (src/App.tsx)
      { source: "/seo-admin", destination: "/secure-portal/seo", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
