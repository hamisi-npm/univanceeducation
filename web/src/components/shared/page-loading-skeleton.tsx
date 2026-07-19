import { Container } from "@/components/layout/container";
import { sectionStyles } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      className={cn("rounded-md bg-muted/60", className)}
      aria-hidden="true"
    />
  );
}

export function PageLoadingSkeleton() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn(sectionStyles.sectionBackground, "flex-1")}
    >
      <span className="sr-only">Loading page content</span>
      <Container className={cn(sectionStyles.padding, "space-y-12")}>
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <SkeletonBlock className="mx-auto h-8 w-28" />
          <SkeletonBlock className="mx-auto h-12 w-full max-w-xl" />
          <SkeletonBlock className="mx-auto h-20 w-full max-w-2xl" />
          <SkeletonBlock className="mx-auto h-10 w-40" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="space-y-4 rounded-lg border border-border bg-card p-6"
            >
              <SkeletonBlock className="aspect-[16/10] w-full" />
              <SkeletonBlock className="h-5 w-3/4" />
              <SkeletonBlock className="h-16 w-full" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
