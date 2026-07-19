import { ProcessStepCard } from "@/features/process/components/process-step-card";
import type { ProcessStep } from "@/features/process/types";
import { cn } from "@/lib/utils";

type ProcessStepsProps = {
  steps: ProcessStep[];
  className?: string;
};

export function ProcessSteps({ steps, className }: ProcessStepsProps) {
  return (
    <ol
      className={cn(
        "relative grid grid-cols-1 gap-8 border-l border-border pl-8",
        "md:grid-cols-3 md:gap-6 md:border-l-0 md:pl-0",
        "lg:grid-cols-6 lg:gap-4",
        className,
      )}
    >
      {steps.map((step, index) => (
        <li
          key={step.id}
          className={cn(
            "group relative h-full",
            "max-lg:before:absolute max-lg:before:-left-8 max-lg:before:top-6 max-lg:before:size-2.5 max-lg:before:-translate-x-1/2 max-lg:before:rounded-full max-lg:before:border-2 max-lg:before:border-background max-lg:before:bg-border max-lg:before:content-['']",
            "motion-safe:max-lg:group-hover:before:bg-secondary",
            index < steps.length - 1 &&
              "lg:after:absolute lg:after:top-10 lg:after:left-12 lg:after:right-0 lg:after:z-0 lg:after:h-px lg:after:bg-border lg:after:content-['']",
            "motion-safe:lg:group-hover:after:bg-secondary/40",
          )}
        >
          <ProcessStepCard step={step} className="relative z-10" />
        </li>
      ))}
    </ol>
  );
}
