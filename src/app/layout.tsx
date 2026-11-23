import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import JsonLd from "@/components/shared/JsonLd";
import Providers from "./providers";
import FloatingContact from "@/components/shared/FloatingContact";
import {
  GA_ID,
  GOOGLE_SITE_VERIFICATION,
  ORGANIZATION_JSON_LD,
  SITE_URL,
} from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Collegesera - Your College Companion",
  icons: { icon: "/favicon.png" },
  verification: { google: GOOGLE_SITE_VERIFICATION },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakarta.variable} ${inter.variable}`}
    >
      <body>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
        <JsonLd data={ORGANIZATION_JSON_LD} />
        <Providers>{children}</Providers>
        <FloatingContact />
      </body>
    </html>
  );
}
