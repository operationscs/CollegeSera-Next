export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://collegesera.com").replace(/\/+$/, "");
export const SITE_NAME = "Collegesera";
export const DEFAULT_DESCRIPTION =
  "Find the best colleges in India. Compare fees, courses, placements, and reviews.";
export const DEFAULT_KEYWORDS = "colleges, universities, admission, engineering, medical, mba, india";
export const DEFAULT_OG_IMAGE = "/og-image.png";
export const GA_ID = "G-097W6Z314Z";
export const GOOGLE_SITE_VERIFICATION = "aKbqbTnqxKAP02oUMCgdOf9UVU03IVp496zXzIRbqHw";

export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CollegeSera",
  url: "https://collegesera.com/",
  logo: "https://collegesera.com/CollegeseraLogo.png",
  sameAs: [
    "https://www.facebook.com/profile.php?id=61581886108783",
    "https://www.instagram.com/collegesera/",
    "https://www.linkedin.com/company/collegesera/",
  ],
};
