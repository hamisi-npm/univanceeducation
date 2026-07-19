import { Container } from "@/components/layout/container";
import { TestimonialCard } from "@/features/testimonials/components/testimonial-card";
import { TestimonialTrustStats } from "@/features/testimonials/components/testimonial-trust-stats";
import type { Testimonial, TestimonialsSectionContent } from "@/features/testimonials/types";
import type { TrustStat } from "@/types/trust-stats";
import { sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type TestimonialsSectionProps = {
  section: TestimonialsSectionContent;
  testimonials: Testimonial[];
  trustStats: TrustStat[];
  className?: string;
};

export function TestimonialsSection({
  section,
  testimonials,
  trustStats,
  className,
}: TestimonialsSectionProps) {
  const featured = testimonials.find((item) => item.featured);
  const supporting = testimonials.filter((item) => !item.featured);

  if (!featured) {
    return null;
  }

  return (
    <section
      aria-labelledby="testimonials-section-heading"
      className={cn(sectionStyles.sectionBackground, sectionStyles.padding, className)}
    >
      <Container>
        <div className={sectionStyles.stack}>
          <div className={sectionStyles.header}>
            <span
              className={cn(
                sectionStyles.badge,
                sectionStyles.badgeOnBackground,
              )}
            >
              {section.badge}
            </span>
            <h2 id="testimonials-section-heading" className={sectionStyles.heading}>
              {section.heading}
            </h2>
            <p className={sectionStyles.description}>{section.description}</p>
          </div>

          <TestimonialTrustStats stats={trustStats} />

          <div className="flex flex-col gap-6">
            <TestimonialCard testimonial={featured} variant="featured" />

            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {supporting.map((testimonial) => (
                <li key={testimonial.id} className="h-full">
                  <TestimonialCard
                    testimonial={testimonial}
                    variant="standard"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
