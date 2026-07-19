import { SiteFooter } from "@/features/footer/components/site-footer";
import type { FooterContent } from "@/features/footer/types";
import type { SiteConfig } from "@/types/site";

type FooterProps = {
  content: FooterContent;
  site: SiteConfig;
  className?: string;
};

export function Footer(props: FooterProps) {
  return <SiteFooter {...props} />;
}
