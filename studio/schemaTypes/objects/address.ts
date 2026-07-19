import { defineField, defineType } from "sanity";

import { requiredString } from "../fields/validators";

export const address = defineType({
  name: "address",
  title: "Address",
  type: "object",
  description: "Structured postal address for offices and locations.",
  fields: [
    defineField({
      name: "street",
      title: "Street address",
      type: "string",
      validation: requiredString("Street address is required", 200),
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "region",
      title: "State / region",
      type: "string",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "postalCode",
      title: "Postal code",
      type: "string",
      validation: (rule) => rule.max(20),
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      validation: (rule) => rule.max(80),
    }),
  ],
  preview: {
    select: {
      street: "street",
      city: "city",
      country: "country",
    },
    prepare({ street, city, country }) {
      const subtitle = [city, country].filter(Boolean).join(", ");
      return {
        title: street || "Address",
        subtitle,
      };
    },
  },
});
