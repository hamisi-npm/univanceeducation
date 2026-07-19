import { defineField, defineType } from "sanity";

import {
  optionalUrl,
  requiredEmail,
  requiredPhone,
  requiredText,
} from "../fields/validators";

export const contactDetails = defineType({
  name: "contactDetails",
  title: "Contact details",
  type: "object",
  description: "Primary business contact information.",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: requiredEmail,
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      validation: requiredPhone,
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
      description: "Formatted mailing address shown on the site.",
      validation: requiredText("An address is required", 500),
    }),
    defineField({
      name: "mapsHref",
      title: "Google Maps link",
      type: "url",
      description: "Optional link to open the location in Google Maps.",
      validation: optionalUrl,
    }),
  ],
  preview: {
    select: {
      title: "email",
      subtitle: "phone",
    },
  },
});
