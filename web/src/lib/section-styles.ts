/** Shared homepage section and card class tokens — keeps vertical rhythm consistent. */

export const sectionStyles = {
  padding: "py-16 sm:py-20 lg:py-24 xl:py-28",
  paddingCompact: "py-12 sm:py-14 lg:py-16",
  stack: "flex flex-col gap-12 lg:gap-16",
  header: "max-w-2xl space-y-5",
  heading:
    "text-balance text-2xl font-medium tracking-tight text-foreground sm:text-3xl",
  description:
    "max-w-prose text-pretty text-lg leading-relaxed text-muted-foreground",
  badge:
    "inline-flex w-fit rounded-md border border-border px-3 py-1.5 text-sm font-medium text-foreground motion-safe:transition-[color,background-color,border-color] motion-safe:duration-200",
  badgeOnBackground: "bg-muted/50",
  badgeOnMuted: "border-border/80 bg-background shadow-sm",
  sectionMuted: "bg-muted/30",
  sectionBackground: "bg-background",
} as const;

export const cardStyles = {
  base: "rounded-lg border border-border bg-card",
  interactive:
    "motion-safe:transition-[transform,box-shadow,border-color] motion-safe:duration-300 motion-safe:ease-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-primary/25 motion-safe:hover:shadow-sm",
  padding: "p-6",
  iconBox:
    "flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-muted/50 motion-safe:transition-[color,background-color,border-color] motion-safe:duration-300 motion-safe:group-hover:border-primary/30 motion-safe:group-hover:bg-primary/5 motion-safe:group-hover:border-secondary/40 motion-safe:group-hover:bg-secondary/5 group-focus-within:border-primary/30 group-focus-within:bg-primary/5",
  icon:
    "text-primary motion-safe:transition-colors motion-safe:duration-300 motion-safe:group-hover:text-secondary group-focus-within:text-secondary",
  linkFocus:
    "rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
  textLink:
    "mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary motion-safe:transition-[color,transform] motion-safe:duration-200 motion-safe:group-hover:translate-x-1 motion-safe:group-hover:text-secondary group-focus-within:translate-x-1 group-focus-within:text-secondary",
  title: "text-lg font-medium tracking-tight text-foreground",
  body: "text-sm leading-relaxed text-muted-foreground",
} as const;

export const buttonStyles = {
  responsiveLg: "h-11 w-full px-6 text-sm sm:h-9 sm:w-auto",
  responsiveOutline:
    "h-11 w-full px-5 text-sm sm:h-9 sm:w-auto border-primary text-primary hover:border-secondary hover:bg-secondary/5 hover:text-secondary",
} as const;

export const focusRing =
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" as const;

export const linkTransition =
  "motion-safe:transition-colors motion-safe:duration-200" as const;
