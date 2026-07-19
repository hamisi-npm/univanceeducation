"use client";

import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cardStyles, focusRing } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
  className?: string;
};

export function FaqAccordion({ items, className }: FaqAccordionProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className={cn(cardStyles.base, "px-4 sm:px-6", className)}
    >
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger className="text-sm font-medium text-foreground sm:text-base">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

type FaqViewAllLinkProps = {
  label: string;
  href: string;
  className?: string;
};

export function FaqViewAllLink({ label, href, className }: FaqViewAllLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center text-sm font-medium text-primary motion-safe:transition-colors motion-safe:duration-200 hover:underline",
        focusRing,
        className,
      )}
    >
      {label}
    </Link>
  );
}
