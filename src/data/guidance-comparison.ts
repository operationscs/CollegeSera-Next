import type { GuidanceComparisonSectionContent } from "@/types/home";

export const GUIDANCE_COMPARISON_CONTENT: GuidanceComparisonSectionContent = {
  comparison: {
    badgeText: "Side-by-Side Comparison Engine",
    title: "Confused Between Two Colleges?",
    description:
      "Evaluate annual tuition fees, KCET / COMEDK cutoff percentiles, and median CTC head-to-head.",
    metricColumnLabel: "METRIC",
    firstCollegeName: "RVCE Bengaluru",
    secondCollegeName: "BMSCE Bengaluru",
    rows: [
      {
        metric: "NIRF Ranking",
        firstValue: "#96",
        secondValue: "#101-150",
        highlightFirst: true,
      },
      {
        metric: "Average CTC",
        firstValue: "₹12.50 LPA",
        secondValue: "₹11.20 LPA",
      },
      {
        metric: "KCET CSE Cutoff",
        firstValue: "Rank ~340",
        secondValue: "Rank ~890",
      },
    ],
    ctaLabel: "Launch Comparison Tool",
    ctaHref: "/colleges",
    ctaHelperText: "Compare up to 4 institutes",
  },
  advisor: {
    eyebrow: "FREE COUNSELLING",
    title: "Speak with a Higher Ed Advisor",
    description:
      "Get personalized guidance on state quota rank cutoffs, seat allocations, and fees.",
    namePlaceholder: "Student Full Name",
    phonePlaceholder: "Mobile / WhatsApp Number (+91)",
    coursePlaceholder: "Select Course / Stream",
    courseOptions: [
      {
        value: "B.Tech / Engineering (CSE, AI, ECE)",
        label: "B.Tech / Engineering (CSE, AI, ECE)",
      },
      {
        value: "MBA / PGDM (Business & FinTech)",
        label: "MBA / PGDM (Business & FinTech)",
      },
      {
        value: "MBBS / BDS / Medical & Allied Health",
        label: "MBBS / BDS / Medical & Allied Health",
      },
      {
        value: "B.Sc Nursing / BPT / Paramedical",
        label: "B.Sc Nursing / BPT / Paramedical",
      },
      {
        value: "BCA / B.Com / Arts & Science",
        label: "BCA / B.Com / Arts & Science",
      },
      {
        value: "BA LLB / Law & Legal Studies",
        label: "BA LLB / Law & Legal Studies",
      },
    ],
    submitButtonLabel: "Request Free Callback",
    submittingButtonLabel: "Requesting Callback...",
    submittedButtonLabel: "Callback Requested!",
    responseTimePrefix: "Average callback response time:",
    responseTimeHighlight: "12 Mins",
    defaultEmailDomain: "callback.collegesera.com",
    defaultCity: "South India",
    defaultSource: "homepage_advisor_callback",
    validationErrorMessage: "Please enter a valid name and 10-digit mobile number.",
    submitErrorMessage: "Unable to submit request right now. Please try again.",
    submitSuccessMessage:
      "Thank you! Our higher education advisor will call you shortly.",
  },
};
