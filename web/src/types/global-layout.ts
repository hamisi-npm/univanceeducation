import type { FooterContent } from "@/features/footer/types";
import type { NavCta, NavItem } from "@/types/navigation";
import type { SiteConfig } from "@/types/site";

export type GlobalLayoutData = {
  site: SiteConfig;
  navigation: {
    items: NavItem[];
    cta: NavCta;
  };
  footer: FooterContent;
};
