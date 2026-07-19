import Link from "next/link";

import {
  footerHeadingClassName,
  footerLabelClassName,
  footerLinkClassName,
} from "@/features/footer/components/footer-link-styles";
import type { FooterContactItem, FooterContent } from "@/features/footer/types";
import { cn } from "@/lib/utils";

type FooterContactProps = {
  contact: FooterContent["contact"];
};

function ContactValue({ item }: { item: FooterContactItem }) {
  if (!item.href) {
    return (
      <span className={cn("text-footer-muted", item.id === "address" && "whitespace-pre-line")}>
        {item.value}
      </span>
    );
  }

  const className = footerLinkClassName;

  if (item.external || item.href.startsWith("http")) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {item.value}
      </a>
    );
  }

  if (item.href.startsWith("mailto:") || item.href.startsWith("tel:")) {
    return (
      <a href={item.href} className={className}>
        {item.value}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      {item.value}
    </Link>
  );
}

export function FooterContact({ contact }: FooterContactProps) {
  return (
    <div>
      <h3 className={footerHeadingClassName}>{contact.title}</h3>
      <dl className="mt-4 space-y-4">
        {contact.items.map((item) => (
          <div key={item.id}>
            <dt className={footerLabelClassName}>{item.label}</dt>
            <dd className={cn("mt-1 text-sm")}>
              <ContactValue item={item} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
