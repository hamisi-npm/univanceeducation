export type TestimonialImage = {
  src: string;
  alt: string;
};

export type Testimonial = {
  id: string;
  name: string;
  destination: string;
  university: string;
  course: string;
  rating: number;
  quote: string;
  image: TestimonialImage;
  featured: boolean;
};

export type TestimonialsSectionContent = {
  badge: string;
  heading: string;
  description: string;
};

export type TestimonialCardVariant = "featured" | "standard";
