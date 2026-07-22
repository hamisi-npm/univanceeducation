import Link from "next/link";

import { Button } from "@/components/ui/button";
import { buttonStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type ProgramCtaProps = {
  /** Stable program identifier for a future Applications module. */
  programSlug: string;
  /** Destination for Apply — defaults to consultation/contact until Applications ships. */
  href?: string;
  label?: string;
  size?: "default" | "sm" | "lg";
  className?: string;
  variant?: "gold" | "outline";
};

/**
 * Apply CTA with stable props for a future Applications flow.
 * Currently navigates to `href` (default `/contact`).
 */
export function ProgramCta({
  programSlug,
  href = "/contact",
  label = "Apply Now",
  size = "default",
  className,
  variant = "gold",
}: ProgramCtaProps) {
  const destination = href.includes("?")
    ? `${href}&program=${encodeURIComponent(programSlug)}`
    : `${href}?program=${encodeURIComponent(programSlug)}`;

  return (
    <Button
      asChild
      size={size}
      className={cn(
        variant === "gold" ? buttonStyles.gold : buttonStyles.responsiveOutline,
        className,
      )}
      data-program-slug={programSlug}
    >
      <Link href={destination}>{label}</Link>
    </Button>
  );
}
