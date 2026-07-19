import { defineField, defineType } from "sanity";

import {
  limits,
  requiredHref,
  requiredString,
} from "../../fields/validators";

/** Homepage hero badge — matches `HeroContentData.badge`. */
export const heroBadge = defineType({
  name: "heroBadge",
  title: "Hero badge",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "string",
      validation: requiredString("Badge text is required", limits.badge),
    }),
    defineField({
      name: "suffix",
      title: "Suffix",
      type: "string",
      description: "Secondary text shown after the badge, e.g. tagline.",
      validation: (rule) => rule.max(limits.shortLabel),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      validation: requiredHref,
    }),
  ],
  preview: {
    select: { title: "text", subtitle: "suffix" },
  },
});
