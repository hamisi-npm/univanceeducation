import Link from "next/link";

import { footerLinkClassName } from "@/features/footer/components/footer-link-styles";
import type { FooterBottomBarContent } from "@/features/footer/types";
import { cn } from "@/lib/utils";

type FooterBottomBarProps = {
  content: FooterBottomBarContent;
  siteName: string;
  className?: string;
};

export function FooterBottomBar({
  content,
  siteName,
  className,
}: FooterBottomBarProps) {
  const year = new Date().getFullYear();

  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-t border-footer-accent/40 pt-10 text-xs text-footer-muted sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <p>
        &copy; {year} {siteName}. All rights reserved.
      </p>

      <nav aria-label="Footer legal">
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {content.legalLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={footerLinkClassName}>
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={content.builtWithHref}
              target="_blank"
              rel="noopener noreferrer"
              className={footerLinkClassName}
            >
              {content.builtWithLabel}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
