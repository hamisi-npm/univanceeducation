import Link from "next/link";

import {
  footerHeadingClassName,
  footerLinkClassName,
} from "@/features/footer/components/footer-link-styles";
import type { FooterLinkGroup } from "@/features/footer/types";

type FooterNavGroupProps = {
  group: FooterLinkGroup;
};

export function FooterNavGroup({ group }: FooterNavGroupProps) {
  return (
    <nav aria-labelledby={`footer-nav-${group.id}`}>
      <h3 id={`footer-nav-${group.id}`} className={footerHeadingClassName}>
        {group.title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {group.links.map((link) => (
          <li key={link.href}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={footerLinkClassName}
              >
                {link.label}
              </a>
            ) : (
              <Link href={link.href} className={footerLinkClassName}>
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
