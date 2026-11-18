"use client";

import { Toaster } from "@/components/ui/toaster";

/**
 * Global client providers. Keep this thin: data fetching happens in Server Components.
 * (React Query lives only in the admin layout, where client-side mutations/queries exist.)
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
}
