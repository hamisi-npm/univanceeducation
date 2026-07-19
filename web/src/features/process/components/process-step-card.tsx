import {
  FileText,
  MailCheck,
  MapPin,
  MessageCircle,
  PlaneTakeoff,
  Stamp,
  type LucideIcon,
} from "lucide-react";

import type { ProcessStep, ProcessStepIconName } from "@/features/process/types";
import { cardStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

const processStepIcons: Record<ProcessStepIconName, LucideIcon> = {
  "message-circle": MessageCircle,
  "map-pin": MapPin,
  "file-text": FileText,
  "mail-check": MailCheck,
  stamp: Stamp,
  "plane-takeoff": PlaneTakeoff,
};

type ProcessStepCardProps = {
  step: ProcessStep;
  className?: string;
};

export function ProcessStepCard({ step, className }: ProcessStepCardProps) {
  const Icon = processStepIcons[step.icon];

  return (
    <article
      className={cn(
        cardStyles.base,
        cardStyles.interactive,
        cardStyles.padding,
        "group relative flex h-full flex-col gap-4",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "font-mono text-xs tabular-nums text-muted-foreground",
            "motion-safe:transition-colors motion-safe:duration-300",
            "motion-safe:group-hover:text-foreground",
          )}
        >
          {String(step.step).padStart(2, "0")}
        </span>
        <div className={cardStyles.iconBox}>
          <Icon className={cn(cardStyles.icon, "size-5")} aria-hidden="true" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className={cardStyles.title}>{step.title}</h3>
        <p className={cardStyles.body}>{step.description}</p>
      </div>
    </article>
  );
}
