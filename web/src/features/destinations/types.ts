export type DestinationImage = {
  src: string;
  alt: string;
};

export type Destination = {
  id: string;
  slug: string;
  country: string;
  flag: string;
  description: string;
  studyFields: string[];
  tuitionRange: string;
  image: DestinationImage;
  featured: boolean;
  ctaLabel: string;
};

export type FeaturedDestinationsContent = {
  badge: string;
  heading: string;
  description: string;
  viewAllLabel: string;
  viewAllHref: string;
};

export type DestinationCardVariant = "featured" | "standard";
