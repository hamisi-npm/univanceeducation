import { defineField, defineType } from "sanity";

import {
  limits,
  requiredString,
} from "../fields/validators";

const socialIcons = [
  { title: "Twitter / X", value: "twitter" },
  { title: "LinkedIn", value: "linkedin" },
  { title: "Instagram", value: "instagram" },
  { title: "Facebook", value: "facebook" },
] as const;

export const socialLink = defineType({
  name: "socialLink",
  title: "Social link",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Network",
      type: "string",
      options: {
        list: [...socialIcons],
        layout: "dropdown",
      },
      validation: requiredString("Select a social network"),
    }),
    defineField({
      name: "label",
      title: "Accessible label",
      type: "string",
      description: "Screen-reader label, e.g. \"Follow us on LinkedIn\".",
      validation: requiredString("A label is required", limits.shortLabel),
    }),
    defineField({
      name: "href",
      title: "Profile URL",
      type: "url",
      validation: (rule) =>
        rule.required().uri({ scheme: ["http", "https"] }).error("Enter a valid URL"),
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "icon",
    },
  },
});
