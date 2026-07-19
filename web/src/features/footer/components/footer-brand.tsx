import { Logo } from "@/components/layout/logo";
import type { FooterBrandContent, FooterSocialLink } from "@/features/footer/types";
import { FooterSocialLinks } from "@/features/footer/components/footer-social-links";
import {
  footerMutedTextClassName,
} from "@/features/footer/components/footer-link-styles";
import type { SiteConfig } from "@/types/site";
import { cn } from "@/lib/utils";

type FooterBrandProps = {
  brand: FooterBrandContent;
  social: FooterSocialLink[];
  site: SiteConfig;
  className?: string;
};

export function FooterBrand({ brand, social, site, className }: FooterBrandProps) {
  return (
    <div className={cn("space-y-5", className)}>
      <Logo variant="footer" site={site} />
      <p className={cn("max-w-sm text-pretty", footerMutedTextClassName)}>
        {brand.description}
      </p>
      <FooterSocialLinks links={social} />
    </div>
  );
}
