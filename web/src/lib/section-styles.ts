/** Shared section and card class tokens — brand hierarchy via design tokens. */

export const sectionStyles = {
  padding: "py-16 sm:py-20 lg:py-24 xl:py-28",
  paddingCompact: "py-12 sm:py-14 lg:py-16",
  stack: "flex flex-col gap-12 lg:gap-16",
  header: "max-w-2xl space-y-5",
  headerCentered: "mx-auto max-w-2xl space-y-5 text-center",
  /** Light-section headings — dark gray (#1F2937). */
  heading:
    "text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl",
  headingOnDark:
    "text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl",
  description:
    "max-w-prose text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg",
  descriptionOnDark:
    "max-w-prose text-pretty text-base leading-relaxed text-white/80 sm:text-lg",
  /** Accent badge — royal blue. */
  badge:
    "inline-flex w-fit rounded-md border border-border px-3 py-1.5 text-sm font-medium text-brand-navy motion-safe:transition-[color,background-color,border-color] motion-safe:duration-200",
  /** Emphasis eyebrow — deep maroon. */
  badgeGold:
    "inline-flex w-fit text-xs font-semibold uppercase tracking-[0.14em] text-primary",
  badgeOnBackground: "bg-card",
  badgeOnMuted: "border-border/80 bg-card shadow-sm",
  sectionMuted: "bg-brand-beige",
  sectionBackground: "bg-background",
  sectionBeige: "bg-brand-beige",
  /** Dark brand band — deep maroon (footer-like surfaces). */
  sectionNavy: "bg-primary text-white",
  sectionMaroon: "bg-primary text-white",
  /** Supporting dark band — royal blue (e.g. homepage CTA banner). */
  sectionBlue: "bg-brand-navy text-white",
} as const;

export const cardStyles = {
  base: "rounded-xl border border-border/80 bg-card shadow-sm",
  elevated:
    "rounded-xl border border-border/60 bg-card shadow-[0_8px_30px_rgb(128,0,32,0.06)]",
  interactive:
    "motion-safe:transition-[transform,box-shadow,border-color] motion-safe:duration-300 motion-safe:ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:border-primary/25 motion-safe:hover:shadow-md",
  padding: "p-6",
  /** Soft blue icon well. */
  iconBox:
    "flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-navy/10 text-brand-navy motion-safe:transition-[color,background-color] motion-safe:duration-300 motion-safe:group-hover:bg-primary/10 motion-safe:group-hover:text-primary group-focus-within:bg-primary/10 group-focus-within:text-primary",
  /** Blue circle icon (supporting accent). */
  iconCircle:
    "flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-navy text-white",
  icon:
    "text-brand-navy motion-safe:transition-colors motion-safe:duration-300 motion-safe:group-hover:text-primary group-focus-within:text-primary",
  linkFocus:
    "rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
  /** Action text link — maroon, hover slightly deeper. */
  textLink:
    "mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary motion-safe:transition-[color,transform] motion-safe:duration-200 motion-safe:group-hover:translate-x-1 motion-safe:group-hover:text-primary/85 group-focus-within:translate-x-1 group-focus-within:text-primary/85",
  title: "text-lg font-semibold tracking-tight text-foreground",
  body: "text-sm leading-relaxed text-muted-foreground",
} as const;

export const buttonStyles = {
  responsiveLg: "h-11 w-full px-6 text-sm sm:h-11 sm:w-auto",
  /** Secondary outline — royal blue. */
  responsiveOutline:
    "h-11 w-full px-5 text-sm sm:h-11 sm:w-auto rounded-lg border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white",
  /** Primary solid CTA — deep maroon (legacy name `gold` retained). */
  gold: "rounded-lg border-transparent bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
  primary:
    "rounded-lg border-transparent bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
  /** Outline on maroon / dark surfaces. */
  outlineOnDark:
    "rounded-lg border-brand-beige/70 bg-transparent text-white hover:bg-white/10 hover:text-white",
  /** Secondary CTA on hero imagery. */
  outlineOnHero:
    "rounded-lg border-white/80 bg-transparent text-white hover:bg-white/15 hover:text-white",
  /** Ghost — maroon text. */
  ghost:
    "rounded-lg border-transparent bg-transparent text-primary hover:bg-primary/5",
} as const;

export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2" as const;

export const linkTransition =
  "motion-safe:transition-colors motion-safe:duration-200" as const;
