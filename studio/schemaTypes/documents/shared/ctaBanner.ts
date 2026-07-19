import { defineField, defineType } from "sanity";

import {
  limits,
  requiredString,
  requiredText,
} from "../../fields/validators";

/** Reusable CTA banner — matches `CtaSectionContent` in `features/cta/types`. */
export const ctaBanner = defineType({
  name: "ctaBanner",
  title: "CTA banner",
  type: "object",
  fields: [
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      validation: (rule) => rule.max(limits.badge),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: requiredString("Heading is required", limits.heading),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: requiredText("Description is required", 500),
    }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
      type: "ctaLink",
      validation: (rule) => rule.required().error("Primary CTA is required"),
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "ctaLink",
      validation: (rule) => rule.required().error("Secondary CTA is required"),
    }),
    defineField({
      name: "trustMicrocopy",
      title: "Trust microcopy",
      type: "string",
      validation: (rule) => rule.max(200),
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "badge" },
  },
});
