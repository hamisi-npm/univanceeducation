import { Container } from "@/components/layout/container";
import { TestimonialCard } from "@/features/testimonials/components/testimonial-card";
import type {
  Testimonial,
  TestimonialsSectionContent,
} from "@/features/testimonials/types";
import { sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type TestimonialsSectionProps = {
  section: TestimonialsSectionContent;
  testimonials: Testimonial[];
  className?: string;
};

export function TestimonialsSection({
  section,
  testimonials,
  className,
}: TestimonialsSectionProps) {
  if (!testimonials.length) {
    return null;
  }

  const featured = testimonials.find((item) => item.featured) ?? testimonials[0];
  const supporting = testimonials.filter((item) => item.id !== featured.id);

  return (
    <section
      aria-labelledby="testimonials-section-heading"
      className={cn(sectionStyles.sectionBackground, sectionStyles.padding, className)}
    >
      <Container>
        <div className={sectionStyles.stack}>
          <div className={sectionStyles.headerCentered}>
            <span className={cn(sectionStyles.badgeGold, "mx-auto")}>
              {section.badge}
            </span>
            <h2
              id="testimonials-section-heading"
              className={cn(sectionStyles.heading, "text-foreground")}
            >
              {section.heading}
            </h2>
            {section.description ? (
              <p className={cn(sectionStyles.description, "mx-auto")}>
                {section.description}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-6">
            <TestimonialCard testimonial={featured} variant="featured" />

            {supporting.length > 0 ? (
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
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
