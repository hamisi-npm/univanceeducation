/** Shared homepage section and card class tokens — keeps vertical rhythm + brand colors consistent. */

export const sectionStyles = {
  padding: "py-16 sm:py-20 lg:py-24 xl:py-28",
  paddingCompact: "py-12 sm:py-14 lg:py-16",
  stack: "flex flex-col gap-12 lg:gap-16",
  header: "max-w-2xl space-y-5",
  headerCentered: "mx-auto max-w-2xl space-y-5 text-center",
  /** Light-section headings — brand navy (#0057B8). */
  heading:
    "text-balance text-2xl font-semibold tracking-tight text-brand-navy sm:text-3xl lg:text-4xl",
  headingOnDark:
    "text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl",
  description:
    "max-w-prose text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg",
  descriptionOnDark:
    "max-w-prose text-pretty text-base leading-relaxed text-white/80 sm:text-lg",
  badge:
    "inline-flex w-fit rounded-md border border-border px-3 py-1.5 text-sm font-medium text-brand-navy motion-safe:transition-[color,background-color,border-color] motion-safe:duration-200",
  badgeGold:
    "inline-flex w-fit text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold",
  badgeOnBackground: "bg-card",
  badgeOnMuted: "border-border/80 bg-card shadow-sm",
  sectionMuted: "bg-brand-beige",
  sectionBackground: "bg-background",
  /** Warm beige #F5E6D3. */
  sectionBeige: "bg-brand-beige",
  /** Brand blue #0057B8 for dark bands. */
  sectionNavy: "bg-brand-navy text-white",
} as const;

export const cardStyles = {
  base: "rounded-xl border border-border/50 bg-card shadow-sm",
  elevated:
    "rounded-xl border border-border/40 bg-card shadow-[0_8px_30px_rgb(0,87,184,0.08)]",
  interactive:
    "motion-safe:transition-[transform,box-shadow,border-color] motion-safe:duration-300 motion-safe:ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:border-brand-navy/20 motion-safe:hover:shadow-md",
  padding: "p-6",
  /** Soft navy icon well (light cards). */
  iconBox:
    "flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-navy/10 text-brand-navy motion-safe:transition-[color,background-color] motion-safe:duration-300 motion-safe:group-hover:bg-brand-gold/15 motion-safe:group-hover:text-brand-gold group-focus-within:bg-brand-gold/15 group-focus-within:text-brand-gold",
  /** Solid navy circle + gold glyph (homepage service / why-choose). */
  iconCircle:
    "flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-navy text-brand-gold",
  icon:
    "text-brand-navy motion-safe:transition-colors motion-safe:duration-300 motion-safe:group-hover:text-brand-gold group-focus-within:text-brand-gold",
  linkFocus:
    "rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2",
  textLink:
    "mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy motion-safe:transition-[color,transform] motion-safe:duration-200 motion-safe:group-hover:translate-x-1 motion-safe:group-hover:text-brand-gold group-focus-within:translate-x-1 group-focus-within:text-brand-gold",
  title: "text-lg font-semibold tracking-tight text-brand-navy",
  body: "text-sm leading-relaxed text-muted-foreground",
} as const;

export const buttonStyles = {
  responsiveLg: "h-11 w-full px-6 text-sm sm:h-11 sm:w-auto",
  responsiveOutline:
    "h-11 w-full px-5 text-sm sm:h-11 sm:w-auto rounded-lg border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white",
  /** Solid gold CTA. */
  gold: "rounded-lg border-transparent bg-brand-gold text-brand-gold-foreground hover:bg-brand-gold/90",
  /** Outline on navy surfaces. */
  outlineOnDark:
    "rounded-lg border-brand-gold bg-transparent text-white hover:bg-brand-gold/10 hover:text-white",
  /** Secondary CTA on hero overlay. */
  outlineOnHero:
    "rounded-lg border-brand-gold bg-brand-navy/70 text-white hover:bg-brand-navy hover:text-white",
} as const;

export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2" as const;

export const linkTransition =
  "motion-safe:transition-colors motion-safe:duration-200" as const;
