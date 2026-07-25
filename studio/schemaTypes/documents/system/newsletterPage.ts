import { defineField, defineType } from "sanity";

import { seoField } from "../../fields";
import { limits, requiredString } from "../../fields/validators";
import { uniqueFieldDocumentRule } from "../../singletons";
import {
  newsletterPageDocumentIds,
  newsletterPageKinds,
} from "./ids";

export const newsletterPage = defineType({
  name: "newsletterPage",
  title: "Newsletter page",
  type: "document",
  description:
    "System pages rendered after newsletter confirm/unsubscribe logic. Not marketing pages.",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "cta", title: "CTAs" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "kind",
      title: "Page type",
      type: "string",
      group: "content",
      options: {
        list: [...newsletterPageKinds],
        layout: "radio",
      },
      validation: (rule) => rule.required().error("Select a newsletter page type"),
      readOnly: ({ document }) => Boolean(document?.kind),
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "content",
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
          validation: (rule) =>
            rule.required().error("Description is required").max(500),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "illustration",
      title: "Illustration / image",
      type: "imageWithAlt",
      group: "content",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "richText",
      group: "content",
    }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
      type: "ctaLink",
      group: "cta",
      validation: (rule) => rule.required().error("Primary CTA is required"),
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "ctaLink",
      group: "cta",
    }),
    seoField(),
  ],
  preview: {
    select: {
      kind: "kind",
      title: "hero.heading",
    },
    prepare({ kind, title }) {
      const label =
        newsletterPageKinds.find((option) => option.value === kind)?.title ??
        "Newsletter page";
      return {
        title: title || label,
        subtitle: label,
      };
    },
  },
  validation: uniqueFieldDocumentRule("newsletterPage", "kind"),
});

export { newsletterPageDocumentIds, newsletterPageKinds };
