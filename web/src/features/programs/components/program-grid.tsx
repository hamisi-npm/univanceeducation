import { ProgramCard } from "@/features/programs/components/program-card";
import type { ProgramCard as ProgramCardData } from "@/types/programs";
import { cn } from "@/lib/utils";

type ProgramGridProps = {
  programs: ProgramCardData[];
  className?: string;
  applyHref?: string;
};

export function ProgramGrid({
  programs,
  className,
  applyHref,
}: ProgramGridProps) {
  if (programs.length === 0) {
    return null;
  }

  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {programs.map((program) => (
        <li key={program.id} className="h-full">
          <ProgramCard program={program} applyHref={applyHref} />
        </li>
      ))}
    </ul>
  );
}
