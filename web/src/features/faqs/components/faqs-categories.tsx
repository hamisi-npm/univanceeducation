import { FaqAccordion } from "@/components/shared/faq-accordion";
import { Container } from "@/components/layout/container";
import type { FaqCategory } from "@/features/faqs/types";
import { sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type FaqsCategoriesProps = {
  categories: FaqCategory[];
  className?: string;
};

export function FaqsCategories({ categories, className }: FaqsCategoriesProps) {

  return (
    <section
      aria-labelledby="faqs-categories-heading"
      className={cn(sectionStyles.sectionMuted, sectionStyles.padding, className)}
    >
      <Container>
        <div className={sectionStyles.stack}>
          <div className={cn(sectionStyles.header, "mx-auto max-w-2xl text-center")}>
            <h2 id="faqs-categories-heading" className="sr-only">
              FAQ categories
            </h2>
          </div>

          <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 sm:gap-14">
            {categories.map((category) => (
              <div key={category.id} className="space-y-6">
                <div className="space-y-2 text-center sm:text-left">
                  <h3 className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                    {category.title}
                  </h3>
                  {category.description ? (
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {category.description}
                    </p>
                  ) : null}
                </div>
                <FaqAccordion items={category.items} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
