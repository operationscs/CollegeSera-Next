import type { FaqSectionContent } from "@/types/home";

export const FAQ_SECTION_CONTENT: FaqSectionContent = {
  eyebrow: "FREQUENTLY ASKED QUESTIONS",
  title: "Everything You Need to Know About Admissions & ",
  brandPrimary: "College",
  brandAccent: "Sera",
  description:
    "Find quick answers to common questions about state counselling cutoffs, application deadlines, fee structures, and verified institutional data.",
  items: [
    {
      id: "faq-cutoffs-fee-accuracy",
      question:
        "How accurate and up-to-date are the cutoffs and fee structures displayed on CollegeSera?",
      answer:
        "All fee structures, seat matrices, and cutoff benchmarks on CollegeSera are cross-verified directly against official state counselling authorities (DOTE TNEA, KEA KCET, COMEDK, KEAM), NIRF reports, and university admission notifications. Our data team updates tuition and hostel fee slabs every admission cycle so students and parents can plan their finances with clarity.",
    },
    {
      id: "faq-quota-fee-differences",
      question:
        "What is the difference between TNEA / KCET Government Quota, COMEDK Quota, and Management Quota fees?",
      answer:
        "Government Quota seats (allotted via TNEA in Tamil Nadu or KCET in Karnataka) carry state-regulated subsidised tuition fees based on merit rank and community reservation. COMEDK UGET offers merit seats in private Karnataka engineering colleges for pan-India students at uniform consortium fee slabs. Management Quota seats are filled directly by institutions under approved fee structures for students seeking specific branches or direct admission.",
    },
    {
      id: "faq-college-comparison-placements",
      question:
        "Can I compare multiple colleges side-by-side on placement records, NAAC grades, and campus facilities?",
      answer:
        "Yes. CollegeSera allows you to evaluate top autonomous and affiliated institutions head-to-head across NIRF rankings, NAAC accreditation grades, median and highest CTC packages, top recruiting companies, hostel amenities, and branch-wise intake.",
    },
    {
      id: "faq-schedule-counselling",
      question:
        "How do I schedule a 1-on-1 counselling session with an expert higher education advisor?",
      answer:
        "You can book a free 1-on-1 session by filling out the 'Request Free Callback' form on our homepage, clicking 'Apply Guidance' on any entrance exam card, or reaching out directly via our WhatsApp Advisor button. Our counsellors typically respond within 12 minutes to help you shortlist colleges matching your cutoff and budget.",
    },
    {
      id: "faq-education-loan-scholarships",
      question:
        "Do colleges listed on CollegeSera offer merit scholarships, first-graduate concessions, and education loan assistance?",
      answer:
        "Absolutely. Most premier institutions in South India provide tuition fee waivers based on 12th board percentages, national entrance ranks, sports quotas, and government schemes (such as First Graduate and Post-Matric scholarships). Our advisors also provide official bonafide fee estimation letters required for nationalised and private bank education loans.",
    },
    {
      id: "faq-national-state-exams",
      question:
        "Does CollegeSera assist with national and state entrance exams like JEE Main, NEET UG, TANCET, and CAT?",
      answer:
        "Yes. Alongside state merit admissions, we track registration timelines, syllabus updates, exam pattern changes, and college-wise closing ranks for JEE Main, NEET UG, VITEEE, SRMJEEE, TANCET, CAT, MAT, and CLAT to guide you from exam registration through final seat allotment.",
    },
  ],
  supportCard: {
    title: "Still have questions regarding counselling or seat options?",
    description:
      "Our dedicated advisors in Coimbatore, Bengaluru, and Chennai are here to assist.",
    whatsappLabel: "WhatsApp Advisor",
    whatsappHref: "https://wa.me/916374715327",
    phoneLabel: "+91 63747 15327",
    phoneHref: "tel:+916374715327",
  },
};
