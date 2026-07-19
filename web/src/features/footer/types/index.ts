export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FooterLinkGroup = {
  id: string;
  title: string;
  links: FooterLink[];
};

export type FooterSocialIcon = "twitter" | "linkedin" | "instagram" | "facebook";

export type FooterSocialLink = {
  label: string;
  href: string;
  icon: FooterSocialIcon;
};

export type FooterContactItem = {
  id: string;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

export type FooterNewsletterContent = {
  heading: string;
  description: string;
  emailLabel: string;
  emailPlaceholder: string;
  submitLabel: string;
};

export type FooterBottomBarContent = {
  builtWithLabel: string;
  builtWithHref: string;
  legalLinks: FooterLink[];
};

export type FooterBrandContent = {
  name: string;
  href: string;
  description: string;
};

export type FooterContent = {
  brand: FooterBrandContent;
  social: FooterSocialLink[];
  navGroups: FooterLinkGroup[];
  contact: {
    title: string;
    items: FooterContactItem[];
  };
  newsletter: FooterNewsletterContent;
  bottomBar: FooterBottomBarContent;
};
