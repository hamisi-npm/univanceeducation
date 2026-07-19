import { defineArrayMember, defineField, defineType } from "sanity";

import {
  singletonDocumentIds,
  singletonDocumentRule,
} from "../../singletons";
import {
  limits,
  requiredString,
  requiredText,
} from "../../fields/validators";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  description: `About page content (singleton ID: \`${singletonDocumentIds.aboutPage}\`).`,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "story", title: "Company story" },
    { name: "mission", title: "Mission & vision" },
    { name: "why", title: "Why choose us" },
    { name: "team", title: "Team" },
    { name: "cta", title: "CTA banner" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "header",
          title: "Section header",
          type: "sectionHeader",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "primaryCta",
          title: "Primary CTA",
          type: "ctaLink",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "secondaryCta",
          title: "Secondary CTA",
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
      name: "companyStory",
      title: "Company story",
      type: "object",
      group: "story",
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
          name: "paragraphs",
          title: "Content",
          type: "richText",
          validation: (rule) =>
            rule.required().error("Story content is required").min(1),
        }),
        defineField({
          name: "image",
          title: "Image",
          type: "imageWithAlt",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "missionVision",
      title: "Mission & vision",
      type: "object",
      group: "mission",
      fields: [
        defineField({
          name: "header",
          title: "Section header",
          type: "sectionHeader",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "cards",
          title: "Cards",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "missionVisionCard",
              fields: [
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: requiredString("Title is required", 80),
                }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 4,
                  validation: requiredText("Description is required", 500),
                }),
              ],
              preview: {
                select: { title: "title" },
              },
            }),
          ],
          validation: (rule) => rule.required().min(2).max(2),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "whyChooseUs",
      title: "Why choose us",
      type: "object",
      group: "why",
      fields: [
        defineField({
          name: "header",
          title: "Section header",
          type: "sectionHeader",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "features",
          title: "Features",
          type: "array",
          of: [defineArrayMember({ type: "whyChooseUsFeature" })],
          validation: (rule) => rule.required().min(1),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "team",
      title: "Team",
      type: "object",
      group: "team",
      fields: [
        defineField({
          name: "header",
          title: "Section header",
          type: "sectionHeader",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "members",
          title: "Team members",
          type: "array",
          of: [
            defineArrayMember({
              type: "reference",
              to: [{ type: "teamMember" }],
            }),
          ],
          validation: (rule) => rule.required().min(1),
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
  ],
  preview: {
    prepare() {
      return { title: "About page" };
    },
  },
  validation: singletonDocumentRule("aboutPage"),
});
