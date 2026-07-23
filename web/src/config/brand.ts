/** Brand color constants for manifest, OG images, and non-CSS contexts. */
export const brandColors = {
  /** Deep maroon — primary actions and brand identity. */
  primary: "#800020",
  /** Royal blue — supporting accent (icons, stats, secondary UI). */
  secondary: "#0057B8",
  /** Warm beige — soft section backgrounds. */
  neutral: "#F5E6D3",
  white: "#FFFFFF",
  /** Dark gray — main headings / body. */
  text: "#1F2937",
  /** Muted body text. */
  mutedText: "#4B5563",
  /** Subtle muted text. */
  mutedTextSoft: "#6B7280",
  /** Gray borders. */
  border: "#E5E7EB",
  /** Accent blue alias (legacy `navy` token name). */
  navy: "#0057B8",
  /** Primary maroon alias. */
  maroon: "#800020",
  /** Footer surface = primary maroon. */
  footer: "#800020",
  /**
   * @deprecated Gold retired from brand palette — maps to primary maroon
   * so residual `brand-gold` utilities stay on-brand until cleaned up.
   */
  gold: "#800020",
} as const;
