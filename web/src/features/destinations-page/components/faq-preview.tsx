import { Container } from "@/components/layout/container";
import {
  FaqAccordion,
  FaqViewAllLink,
} from "@/components/shared/faq-accordion";
import type { FaqPreviewContent } from "@/features/destinations-page/types";
import { sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type FaqPreviewProps = {
  content: FaqPreviewContent;
  className?: string;
};

export function FaqPreview({ content, className }: FaqPreviewProps) {

  return (
    <section
      aria-labelledby="faq-preview-heading"
      className={cn(sectionStyles.sectionBackground, sectionStyles.padding, className)}
    >
      <Container>
        <div className={sectionStyles.stack}>
          <div className={cn(sectionStyles.header, "mx-auto max-w-2xl text-center")}>
            <span
              className={cn(
                sectionStyles.badge,
                sectionStyles.badgeOnBackground,
                "mx-auto",
              )}
            >
              {content.badge}
            </span>
            <h2 id="faq-preview-heading" className={sectionStyles.heading}>
              {content.heading}
            </h2>
            <p className={cn(sectionStyles.description, "mx-auto")}>
              {content.description}
            </p>
          </div>

          <div className="mx-auto w-full max-w-3xl space-y-6">
            <FaqAccordion items={content.items} />
            <div className="flex justify-center">
              <FaqViewAllLink
                label={content.viewAllLabel}
                href={content.viewAllHref}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
