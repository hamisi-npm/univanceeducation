export type ContactCtaLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type ContactImage = {
  src: string;
  alt: string;
};

export type ContactHeroContent = {
  badge: string;
  heading: string;
  description: string;
  cta: ContactCtaLink;
  image: ContactImage;
};

export type SectionHeaderContent = {
  badge: string;
  heading: string;
  description: string;
};

export type ContactMethodIcon = "phone" | "mail" | "message-circle" | "map-pin";

export type ContactMethod = {
  id: string;
  title: string;
  description: string;
  value: string;
  href?: string;
  external?: boolean;
  icon: ContactMethodIcon;
};

export type ContactMethodsContent = SectionHeaderContent & {
  methods: ContactMethod[];
};

export type FormSelectOption = {
  value: string;
  label: string;
};

export type ConsultationFormContent = SectionHeaderContent & {
  fields: {
    fullName: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    phone: { label: string; placeholder: string };
    preferredDestination: { label: string; placeholder: string };
    preferredIntake: { label: string; placeholder: string };
    studyLevel: { label: string; placeholder: string };
    message: { label: string; placeholder: string };
  };
  destinationOptions: FormSelectOption[];
  intakeOptions: FormSelectOption[];
  studyLevelOptions: FormSelectOption[];
  submitLabel: string;
  successTitle: string;
  successMessage: string;
};

export type OfficeLocationContent = SectionHeaderContent & {
  address: string;
  mapImage: ContactImage;
  openInMapsLabel: string;
  mapsHref: string;
};

export type OfficeHoursEntry = {
  id: string;
  days: string;
  hours: string;
};

export type OfficeHoursContent = SectionHeaderContent & {
  entries: OfficeHoursEntry[];
  note: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type FaqPreviewContent = SectionHeaderContent & {
  items: FaqItem[];
  viewAllLabel: string;
  viewAllHref: string;
};

export type ContactCtaContent = {
  badge: string;
  heading: string;
  description: string;
  primaryCta: ContactCtaLink;
  secondaryCta: ContactCtaLink;
  trustMicrocopy: string;
};

export type ContactPageContent = {
  hero: ContactHeroContent;
  contactMethods: ContactMethodsContent;
  consultationForm: ConsultationFormContent;
  officeLocation: OfficeLocationContent;
  officeHours: OfficeHoursContent;
  faqPreview: FaqPreviewContent;
  cta: ContactCtaContent;
};
