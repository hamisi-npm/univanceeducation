import type {
  SanityCtaBanner,
  SanityFaqPreview,
  SanityImageWithAlt,
  SanitySectionHeader,
  SanitySeo,
} from "@/types/sanity/shared";

export type SanityContactMethod = {
  title: string;
  description?: string;
  value: string;
  href?: string;
  external?: boolean;
  icon: string;
};

export type SanitySelectOption = {
  value: string;
  label: string;
};

export type SanityConsultationForm = {
  header: SanitySectionHeader;
  fields: {
    fullName: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    phone: { label: string; placeholder: string };
    preferredDestination: { label: string; placeholder: string };
    preferredIntake: { label: string; placeholder: string };
    studyLevel: { label: string; placeholder: string };
    message: { label: string; placeholder: string };
  };
  destinationOptions: SanitySelectOption[] | null;
  intakeOptions: SanitySelectOption[] | null;
  studyLevelOptions: SanitySelectOption[] | null;
  submitLabel: string;
  successTitle: string;
  successMessage: string;
};

export type SanityOfficeHoursEntry = {
  days: string;
  hours: string;
};

export type SanityContactDocument = {
  hero: {
    header: SanitySectionHeader;
    cta: { label: string; href: string; external?: boolean };
    image: SanityImageWithAlt;
  };
  contactMethods: {
    header: SanitySectionHeader;
    methods: SanityContactMethod[] | null;
  };
  consultationForm: SanityConsultationForm;
  officeLocation: {
    header: SanitySectionHeader;
    address: string;
    mapImage: SanityImageWithAlt;
    openInMapsLabel: string;
    mapsHref: string;
  };
  officeHours: {
    header: SanitySectionHeader;
    entries: SanityOfficeHoursEntry[] | null;
    note?: string;
  };
  faqPreview: SanityFaqPreview;
  cta: SanityCtaBanner;
  seo?: SanitySeo;
};
