import Link from "next/link";

import { footerLinkClassName } from "@/features/footer/components/footer-link-styles";
import type { FooterSocialLink } from "@/features/footer/types";
import { cn } from "@/lib/utils";

type FooterSocialLinksProps = {
  links: FooterSocialLink[];
  className?: string;
};

export function FooterSocialLinks({ links, className }: FooterSocialLinksProps) {
  return (
    <nav aria-label="Social media">
      <ul className={cn("flex flex-wrap gap-x-4 gap-y-2", className)}>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={footerLinkClassName}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
