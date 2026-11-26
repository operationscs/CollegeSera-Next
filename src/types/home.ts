import type { LucideIcon } from "lucide-react";

export type HeroStreamId = "all" | "engineering" | "mba" | "medical" | "arts";
export type HeroCityId =
  | "all"
  | "coimbatore"
  | "chennai"
  | "salem"
  | "madurai"
  | "trichy"
  | "bengaluru"
  | "kochi";

export interface HeroOption<TValue extends string> {
  value: TValue;
  label: string;
}

export interface HeroRoute {
  href: string;
  seoSlug: string;
}

export interface HeroSocialProofItem {
  count: number;
  college: string;
}

export interface HeroStat {
  icon: LucideIcon;
  value: string;
  label: string;
  detail?: string;
  color: string;
}

export type HomeStreamTheme =
  | "orange"
  | "blue"
  | "purple"
  | "green"
  | "amber"
  | "indigo"
  | "rose"
  | "teal";

export type StreamFilterId =
  | "all"
  | "engineering"
  | "management"
  | "medical"
  | "design"
  | "law-humanities";

export interface StreamFilterOption {
  id: StreamFilterId;
  label: string;
}

export interface StreamStatRow {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface HomeStream {
  name: string;
  icon: LucideIcon;
  path: string;
  category: Exclude<StreamFilterId, "all">;
  colleges: string;
  courses: string;
  badgeText: string;
  theme: HomeStreamTheme;
  color: string;
  bgColor: string;
  badgeClassName: string;
  primaryStat: StreamStatRow;
  secondaryStat: StreamStatRow;
}

export interface StreamsSectionContent {
  eyebrow: string;
  title: string;
  description: string;
  filters: StreamFilterOption[];
  prevButtonLabel: string;
  nextButtonLabel: string;
}

export type FeaturedCollegesFilterId =
  | "all"
  | "nirf-top-100"
  | "autonomous"
  | "naac-a-plus-plus"
  | "deemed";

export type FeaturedCollegesViewMode = "grid" | "list";

export interface FeaturedCollegesFilterOption {
  id: FeaturedCollegesFilterId;
  label: string;
}

export interface FeaturedCollegeStatPreset {
  readonly annualFees: string;
  readonly avgCtc: string;
}

export interface FeaturedCollegesCardLabels {
  featuredBadge: string;
  naacPrefix: string;
  nirfPrefix: string;
  defaultLocation: string;
  defaultType: string;
  coursesAvailable: string;
  coursesSuffix: string;
  annualFeesLabel: string;
  avgCtcLabel: string;
  establishedLabel: string;
  establishedPrefix: string;
  naacGradeLabel: string;
  gradePrefix: string;
  notAvailable: string;
  detailsButton: string;
  compareAriaLabel: string;
  logoPlaceholder: string;
  campusPlaceholder: string;
  campusImagesByKeyword: ReadonlyArray<{
    readonly keywords: readonly string[];
    readonly imageUrl: string;
  }>;
  fallbackCampusImages: readonly string[];
  statsByKeyword: ReadonlyArray<{
    readonly keywords: readonly string[];
    readonly annualFees: string;
    readonly avgCtc: string;
  }>;
  fallbackStats: readonly FeaturedCollegeStatPreset[];
}

export interface FeaturedCollegesSectionContent {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaPath: string;
  emptyFilterMessage: string;
  scrollLeftAriaLabel: string;
  scrollRightAriaLabel: string;
  gridViewAriaLabel: string;
  listViewAriaLabel: string;
  filters: readonly FeaturedCollegesFilterOption[];
  cardLabels: FeaturedCollegesCardLabels;
}

export interface CitiesSectionContent {
  eyebrow: string;
  title: string;
  description: string;
  prevButtonLabel: string;
  nextButtonLabel: string;
  emptyMessage: string;
}

export interface HomeCity {
  id?: string;
  name: string;
  colleges: string;
  image: string;
  href?: string;
}

export interface HomeStat {
  icon: string;
  label: string;
  bg: string;
  text: string;
}

export type HomeExamStatusTheme = "orange" | "blue" | "purple" | "amber" | "green";

export interface HomeExamStatRow {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface ExamsSectionContent {
  eyebrow: string;
  title: string;
  description: string;
  applyButtonLabel: string;
  actionIconAriaLabel: string;
  prevButtonLabel: string;
  nextButtonLabel: string;
  emptyMessage: string;
}

export interface HomeExam {
  id: number | string;
  name: string;
  description: string;
  level?: string;
  applicationDate?: string;
  examDate?: string;
  duration?: string;
  logo?: string;
  type?: "Online" | "Computer-based test";
  statusBadge?: string;
  statusTheme?: HomeExamStatusTheme;
  statusHasDot?: boolean;
  authorityTag?: string;
  stats?: readonly HomeExamStatRow[];
  actionIcon?: LucideIcon;
  href?: string;
}

export type PopularCourseTabId = "ug" | "pg" | "diploma";

export type PopularCourseBadgeTheme = "orange" | "blue" | "purple" | "amber" | "green";

export interface PopularCourseTabOption {
  id: PopularCourseTabId;
  label: string;
}

export interface PopularCourseCardLabels {
  averageFeeLabel: string;
  eligibilityLabel: string;
  topRecruitersPrefix: string;
}

export interface PopularCoursesSectionContent {
  eyebrow: string;
  title: string;
  description: string;
  tabsAriaLabel: string;
  prevButtonLabel: string;
  nextButtonLabel: string;
  emptyFilterMessage: string;
  tabs: readonly PopularCourseTabOption[];
  cardLabels: PopularCourseCardLabels;
}

export interface PopularProgram {
  id: string;
  name: string;
  level: string | null;
  category?: PopularCourseTabId;
  durationBadge?: string;
  badgeTheme?: PopularCourseBadgeTheme;
  icon?: LucideIcon;
  description?: string;
  averageFee?: string;
  eligibility?: string;
  topRecruiters?: string;
  recruitersTheme?: "orange" | "navy";
  href?: string;
}

export interface StreamOption {
  name: string;
  count: number;
}

export interface CourseGroupOption {
  name: string;
  count: number;
}

export interface CourseCatalogItem {
  id: number;
  name: string;
  type: string;
  level: string;
  collegesAvailable: string;
  mode: string;
}

export interface ComparisonMetricRow {
  metric: string;
  firstValue: string;
  secondValue: string;
  highlightFirst?: boolean;
}

export interface ComparisonEngineContent {
  badgeText: string;
  title: string;
  description: string;
  metricColumnLabel: string;
  firstCollegeName: string;
  secondCollegeName: string;
  rows: readonly ComparisonMetricRow[];
  ctaLabel: string;
  ctaHref: string;
  ctaHelperText: string;
}

export interface AdvisorCourseOption {
  value: string;
  label: string;
}

export interface AdvisorCounsellingContent {
  eyebrow: string;
  title: string;
  description: string;
  namePlaceholder: string;
  phonePlaceholder: string;
  coursePlaceholder: string;
  courseOptions: readonly AdvisorCourseOption[];
  submitButtonLabel: string;
  submittingButtonLabel: string;
  submittedButtonLabel: string;
  responseTimePrefix: string;
  responseTimeHighlight: string;
  defaultEmailDomain: string;
  defaultCity: string;
  defaultSource: string;
  validationErrorMessage: string;
  submitErrorMessage: string;
  submitSuccessMessage: string;
}

export interface GuidanceComparisonSectionContent {
  comparison: ComparisonEngineContent;
  advisor: AdvisorCounsellingContent;
}

export interface HomeFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface HomeFaqSupportCardContent {
  title: string;
  description: string;
  whatsappLabel: string;
  whatsappHref: string;
  phoneLabel: string;
  phoneHref: string;
}

export interface FaqSectionContent {
  eyebrow: string;
  title: string;
  brandPrimary: string;
  brandAccent: string;
  description: string;
  items: readonly HomeFaqItem[];
  supportCard: HomeFaqSupportCardContent;
}
