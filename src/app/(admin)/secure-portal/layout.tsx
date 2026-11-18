import type { Metadata } from "next";
import AdminShell from "@/features/admin/AdminShell";

export const metadata: Metadata = {
  title: "Admin Portal | Collegesera",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default function SecurePortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
