import { Container } from "@/components/layout/container";
import { sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type TrustedUniversitiesProps = {
  heading: string;
  partners: string[];
  className?: string;
};

export function TrustedUniversities({
  heading,
  partners,
  className,
}: TrustedUniversitiesProps) {
  return (
    <section
      aria-label={heading}
      className={cn(
        "border-b border-border",
        sectionStyles.sectionBackground,
        sectionStyles.paddingCompact,
        className,
      )}
    >
      <Container>
        <div className="flex flex-col items-center gap-7 text-center">
          <p className="max-w-prose text-balance text-sm text-muted-foreground sm:text-base">
            {heading}
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {partners.map((university) => (
              <li key={university}>
                <span
                  className={cn(
                    "inline-flex rounded-full border border-border/80 bg-card px-4 py-2.5 text-sm text-foreground shadow-sm",
                    "motion-safe:transition-[color,background-color,border-color,box-shadow] motion-safe:duration-200",
                    "motion-safe:hover:border-foreground/20 motion-safe:hover:bg-muted/60 motion-safe:hover:shadow-sm",
                  )}
                >
                  {university}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
