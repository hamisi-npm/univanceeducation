import { defineField, defineType } from "sanity";

import { requiredString } from "../fields/validators";

export const primaryOffice = defineType({
  name: "primaryOffice",
  title: "Primary office",
  type: "object",
  description: "Structured office location used to generate the site-wide mailing address.",
  fields: [
    defineField({
      name: "building",
      title: "Building",
      type: "string",
      validation: requiredString("Building is required", 120),
    }),
    defineField({
      name: "floor",
      title: "Floor",
      type: "string",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "suite",
      title: "Office / suite",
      type: "string",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "street",
      title: "Street",
      type: "string",
      validation: requiredString("Street is required", 120),
    }),
    defineField({
      name: "area",
      title: "Area",
      type: "string",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: requiredString("City is required", 80),
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      validation: requiredString("Country is required", 80),
    }),
  ],
  preview: {
    select: {
      building: "building",
      city: "city",
      country: "country",
    },
    prepare({ building, city, country }) {
      return {
        title: building || "Primary office",
        subtitle: [city, country].filter(Boolean).join(", "),
      };
    },
  },
});
