export type LegalSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  listItems?: string[];
};

export type LegalHeroContent = {
  badge: string;
  heading: string;
  description: string;
  /** Display date, e.g. "March 1, 2026". */
  lastUpdated: string;
  /** ISO date for the `<time dateTime>` attribute. */
  lastUpdatedIso: string;
};

export type LegalPageContent = {
  hero: LegalHeroContent;
  sections: LegalSection[];
};
