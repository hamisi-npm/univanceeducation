import type { MetadataRoute } from "next";

export type MarketingRoute = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

/** Public marketing routes included in sitemap.xml */
export const marketingRoutes: MarketingRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/destinations", changeFrequency: "monthly", priority: 0.9 },
  { path: "/universities", changeFrequency: "monthly", priority: 0.8 },
  { path: "/programs", changeFrequency: "weekly", priority: 0.9 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/study-guides", changeFrequency: "weekly", priority: 0.8 },
  { path: "/faqs", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.9 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type PageSeoEntry = {
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
};

export const pageSeo: Record<string, PageSeoEntry> = {
  "/": {
    title: "Your Future, Our Commitment",
    description:
      "Univance Education — expert study abroad consultancy for university selection, applications, visas, and scholarships.",
    breadcrumbs: [{ name: "Home", path: "/" }],
  },
  "/about": {
    title: "About Us",
    description:
      "Learn about our study abroad consultancy — our story, mission, team of certified advisors, and commitment to honest, student-first guidance.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ],
  },
  "/services": {
    title: "Our Services",
    description:
      "Study abroad services including university selection, application support, scholarships, visa assistance, accommodation, and pre-departure guidance.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ],
  },
  "/destinations": {
    title: "Study Destinations",
    description:
      "Compare study abroad destinations — tuition, living costs, popular courses, admission requirements, and work rights for Canada, the UK, Australia, and more.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Destinations", path: "/destinations" },
    ],
  },
  "/universities": {
    title: "Universities",
    description:
      "Explore world-class universities across Canada, the UK, Australia, Germany, Ireland, and the United States — with programme highlights, tuition ranges, and admission guidance.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Universities", path: "/universities" },
    ],
  },
  "/programs": {
    title: "Programs",
    description:
      "Browse study abroad programs by destination, university, course category, and study level — with tuition, duration, and scholarship details.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Programs", path: "/programs" },
    ],
  },
  "/blog": {
    title: "Blog",
    description:
      "Study abroad advice on admissions, visas, scholarships, destinations, and student life — practical guides from experienced counsellors.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
    ],
  },
  "/study-guides": {
    title: "Study Guides",
    description:
      "Free study abroad guides on destinations, admissions, visas, scholarships, accommodation, and student life — written for international students.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Study Guides", path: "/study-guides" },
    ],
  },
  "/faqs": {
    title: "FAQs",
    description:
      "Answers to common questions about study abroad consultations, destinations, visas, and our counselling services.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "FAQs", path: "/faqs" },
    ],
  },
  "/contact": {
    title: "Contact Us",
    description:
      "Book a free study abroad consultation, reach our counsellors by phone, email, or WhatsApp, and find our office hours and location.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ],
  },
  "/privacy-policy": {
    title: "Privacy Policy",
    description:
      "How Univance Education collects, uses, and protects your personal information when you use our website and counselling services.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Privacy Policy", path: "/privacy-policy" },
    ],
  },
  "/terms": {
    title: "Terms & Conditions",
    description:
      "Terms and conditions governing your use of the Univance Education website and counselling services.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Terms", path: "/terms" },
    ],
  },
};

export type PageSeoPath = keyof typeof pageSeo;

export function getAbsoluteUrl(path: string, baseUrl?: string): string {
  const base =
    baseUrl ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://univanceeducation.com";
  return new URL(path, base).toString();
}
