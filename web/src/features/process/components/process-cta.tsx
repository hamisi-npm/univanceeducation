import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { ProcessSectionContent } from "@/features/process/types";
import { buttonStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type ProcessCtaProps = {
  content: ProcessSectionContent["cta"];
  className?: string;
};

export function ProcessCta({ content, className }: ProcessCtaProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-5 text-center",
        className,
      )}
    >
      <Button asChild size="lg" className={buttonStyles.responsiveLg}>
        <Link href={content.href}>{content.label}</Link>
      </Button>
      <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
        {content.supportingText}
      </p>
    </div>
  );
}
