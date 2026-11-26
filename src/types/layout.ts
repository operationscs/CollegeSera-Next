import type { DatabaseArticle, DatabaseCollege } from "@/types/database";

export interface HeaderProps {
  onBookingClick?: () => void;
  colleges?: DatabaseCollege[];
}

export interface FooterProps {
  initialExams?: DatabaseArticle[];
}

export type FooterSocialPlatform = "facebook" | "instagram" | "linkedin";

export type FooterLinkHighlight = "orange-400" | "orange-500";

export interface FooterSocialLink {
  id: string;
  label: string;
  href: string;
  platform: FooterSocialPlatform;
}

export interface FooterNavLink {
  id: string;
  label: string;
  href: string;
  highlight?: FooterLinkHighlight;
}

export type FooterContactType = "location" | "phone" | "email";

export interface FooterContactItem {
  id: string;
  type: FooterContactType;
  label: string;
  href?: string;
}

export interface FooterBrandContent {
  href: string;
  brandPrimary: string;
  brandAccent: string;
  description: string;
  socialLinks: readonly FooterSocialLink[];
}

export interface FooterLinkColumnContent {
  title: string;
  links: readonly FooterNavLink[];
}

export interface FooterExamsColumnContent {
  title: string;
  articleLabel: string;
  maxItems: number;
  articleBasePath: string;
  fallbackLinks: readonly FooterNavLink[];
}

export interface FooterContactColumnContent {
  title: string;
  items: readonly FooterContactItem[];
}

export interface FooterBottomBarContent {
  copyrightSymbol: string;
  copyrightCompany: string;
  dividerSymbol: string;
  madeWithPrefix: string;
  madeWithHeart: string;
  madeWithSuffix: string;
  links: readonly FooterNavLink[];
}

export interface FooterContent {
  brand: FooterBrandContent;
  topStreams: FooterLinkColumnContent;
  popularDegrees: FooterLinkColumnContent;
  examsAndDates: FooterLinkColumnContent;
  resources: FooterLinkColumnContent;
  contact: FooterContactColumnContent;
  bottomBar: FooterBottomBarContent;
}
