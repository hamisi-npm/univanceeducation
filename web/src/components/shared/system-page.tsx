import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type SystemPageProps = {
  badge: string;
  title: string;
  description: string;
  headingId: string;
  actions: ReactNode;
  className?: string;
};

export function SystemPage({
  badge,
  title,
  description,
  headingId,
  actions,
  className,
}: SystemPageProps) {
  return (
    <main
      id="main-content"
      className={cn(
        "relative flex flex-1 items-center",
        sectionStyles.sectionBackground,
        sectionStyles.padding,
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,var(--muted)_0%,transparent_60%)]"
        aria-hidden="true"
      />
      <Container className="relative w-full">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
          <div className={cn(sectionStyles.header, "items-center")}>
            <span
              className={cn(
                sectionStyles.badge,
                sectionStyles.badgeOnBackground,
                "mx-auto",
              )}
            >
              {badge}
            </span>
            <h1
              id={headingId}
              tabIndex={-1}
              className="text-balance text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              {title}
            </h1>
            <p className={cn(sectionStyles.description, "mx-auto")}>
              {description}
            </p>
          </div>
          <div className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            {actions}
          </div>
        </div>
      </Container>
    </main>
  );
}
