import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type LegalLayoutProps = {
  children: ReactNode;
  className?: string;
};

export function LegalLayout({ children, className }: LegalLayoutProps) {
  return (
    <section
      className={cn(sectionStyles.sectionMuted, sectionStyles.padding, className)}
    >
      <Container>
        <div className="mx-auto max-w-3xl space-y-10">{children}</div>
      </Container>
    </section>
  );
}
