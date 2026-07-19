import { defineArrayMember, defineField, defineType } from "sanity";

import { seoField } from "../../fields";
import {
  singletonDocumentIds,
  singletonDocumentRule,
} from "../../singletons";
import {
  limits,
  requiredString,
  requiredText,
} from "../../fields/validators";

export const blogPage = defineType({
  name: "blogPage",
  title: "Blog page",
  type: "document",
  description: `Blog listing page (singleton ID: \`${singletonDocumentIds.blogPage}\`).`,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "featured", title: "Featured post" },
    { name: "latest", title: "Latest articles" },
    { name: "guides", title: "Guides" },
    { name: "newsletter", title: "Newsletter" },
    { name: "cta", title: "CTA banner" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
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
          name: "cta",
          title: "CTA",
          type: "ctaLink",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "image",
          title: "Hero image",
          type: "imageWithAlt",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featuredPost",
      title: "Featured post",
      type: "sectionHeader",
      group: "featured",
      description: "Section intro — featured post is selected from the Blog Posts collection.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "latestArticles",
      title: "Latest articles",
      type: "sectionHeader",
      group: "latest",
      description: "Section intro — articles come from the Blog Posts collection.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "guides",
      title: "Guides",
      type: "object",
      group: "guides",
      fields: [
        defineField({
          name: "header",
          title: "Section header",
          type: "sectionHeader",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "links",
          title: "Guide links",
          type: "array",
          of: [defineArrayMember({ type: "contentLink" })],
          validation: (rule) => rule.required().min(1),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "newsletter",
      title: "Newsletter",
      type: "object",
      group: "newsletter",
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
          validation: requiredText("Description is required", 400),
        }),
        defineField({
          name: "emailLabel",
          title: "Email label",
          type: "string",
          validation: requiredString("Email label is required", 60),
        }),
        defineField({
          name: "emailPlaceholder",
          title: "Email placeholder",
          type: "string",
          validation: requiredString("Email placeholder is required", 60),
        }),
        defineField({
          name: "submitLabel",
          title: "Submit button label",
          type: "string",
          validation: requiredString("Submit label is required", 40),
        }),
        defineField({
          name: "privacyNote",
          title: "Privacy note",
          type: "text",
          rows: 2,
          validation: (rule) => rule.required().max(200),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cta",
      title: "CTA banner",
      type: "ctaBanner",
      group: "cta",
      validation: (rule) => rule.required(),
    }),
    seoField(),
  ],
  preview: {
    prepare() {
      return { title: "Blog page" };
    },
  },
  validation: singletonDocumentRule("blogPage"),
});
