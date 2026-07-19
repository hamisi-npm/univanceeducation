import { defineArrayMember, defineField, defineType } from "sanity";

import { seoField } from "../../fields";
import {
  popularProgramIconOptions,
  universityAdmissionStepIconOptions,
} from "../../fields/iconOptions";
import {
  singletonDocumentIds,
  singletonDocumentRule,
} from "../../singletons";
import {
  limits,
  requiredString,
  requiredText,
} from "../../fields/validators";

export const universitiesPage = defineType({
  name: "universitiesPage",
  title: "Universities page",
  type: "document",
  description: `Universities listing page (singleton ID: \`${singletonDocumentIds.universitiesPage}\`).`,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "featured", title: "Featured universities" },
    { name: "browse", title: "Browse by country" },
    { name: "programs", title: "Popular programs" },
    { name: "admission", title: "Admission overview" },
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
          validation: requiredText("Description is required", 600),
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
      name: "featuredUniversities",
      title: "Featured universities",
      type: "object",
      group: "featured",
      fields: [
        defineField({
          name: "header",
          title: "Section header",
          type: "sectionHeader",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "universities",
          title: "Universities",
          type: "array",
          of: [
            defineArrayMember({
              type: "reference",
              to: [{ type: "university" }],
            }),
          ],
          validation: (rule) => rule.required().min(1),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "browseByCountry",
      title: "Browse by country",
      type: "sectionHeader",
      group: "browse",
      description: "Intro copy — country list is derived from the Universities collection.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "popularPrograms",
      title: "Popular programs",
      type: "object",
      group: "programs",
      fields: [
        defineField({
          name: "header",
          title: "Section header",
          type: "sectionHeader",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "programs",
          title: "Programs",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "popularProgram",
              fields: [
                defineField({ name: "title", type: "string", validation: requiredString("Title required", 80) }),
                defineField({ name: "description", type: "text", rows: 3, validation: (rule) => rule.required().max(400) }),
                defineField({
                  name: "icon",
                  type: "string",
                  options: { list: [...popularProgramIconOptions], layout: "dropdown" },
                  validation: requiredString("Select an icon"),
                }),
              ],
              preview: { select: { title: "title" } },
            }),
          ],
          validation: (rule) => rule.required().min(1),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "admissionOverview",
      title: "Admission overview",
      type: "object",
      group: "admission",
      fields: [
        defineField({
          name: "header",
          title: "Section header",
          type: "sectionHeader",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "steps",
          title: "Steps",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "admissionStep",
              fields: [
                defineField({ name: "title", type: "string", validation: requiredString("Title required", 80) }),
                defineField({ name: "description", type: "text", rows: 3, validation: (rule) => rule.required().max(400) }),
                defineField({
                  name: "icon",
                  type: "string",
                  options: { list: [...universityAdmissionStepIconOptions], layout: "dropdown" },
                  validation: requiredString("Select an icon"),
                }),
              ],
              preview: { select: { title: "title" } },
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
    seoField(),
  ],
  preview: {
    prepare() {
      return { title: "Universities page" };
    },
  },
  validation: singletonDocumentRule("universitiesPage"),
});
