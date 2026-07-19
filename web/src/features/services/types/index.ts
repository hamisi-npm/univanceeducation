export type ServiceIconName =
  | "graduation-cap"
  | "file-text"
  | "award"
  | "stamp"
  | "home"
  | "luggage";

export type Service = {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: ServiceIconName;
  ctaLabel: string;
  href: string;
};

export type ServicesSectionContent = {
  badge: string;
  heading: string;
  description: string;
};
