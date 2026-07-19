import { defineArrayMember, defineField, defineType } from "sanity";

import { seoField } from "../../fields";
import {
  admissionRequirementIconOptions,
  popularCourseIconOptions,
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

export const destinationsPage = defineType({
  name: "destinationsPage",
  title: "Destinations page",
  type: "document",
  description: `Destinations listing page (singleton ID: \`${singletonDocumentIds.destinationsPage}\`).`,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "featured", title: "Featured countries" },
    { name: "grid", title: "Country grid" },
    { name: "costs", title: "Cost comparison" },
    { name: "courses", title: "Popular courses" },
    { name: "admission", title: "Admission requirements" },
    { name: "faq", title: "FAQ preview" },
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
      name: "featuredCountries",
      title: "Featured countries",
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
          name: "destinations",
          title: "Destinations",
          type: "array",
          of: [
            defineArrayMember({
              type: "reference",
              to: [{ type: "destination" }],
            }),
          ],
          validation: (rule) => rule.required().min(1),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "countryGrid",
      title: "Country grid",
      type: "object",
      group: "grid",
      fields: [
        defineField({
          name: "header",
          title: "Section header",
          type: "sectionHeader",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "destinations",
          title: "Destinations",
          type: "array",
          of: [
            defineArrayMember({
              type: "reference",
              to: [{ type: "destination" }],
            }),
          ],
          validation: (rule) => rule.required().min(1),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "costComparison",
      title: "Cost comparison",
      type: "object",
      group: "costs",
      fields: [
        defineField({
          name: "header",
          title: "Section header",
          type: "sectionHeader",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "columns",
          title: "Column labels",
          type: "object",
          fields: [
            defineField({ name: "country", type: "string", validation: requiredString("Required", 40) }),
            defineField({ name: "tuition", type: "string", validation: requiredString("Required", 40) }),
            defineField({ name: "livingCosts", type: "string", validation: requiredString("Required", 40) }),
            defineField({ name: "duration", type: "string", validation: requiredString("Required", 40) }),
            defineField({ name: "workWhileStudying", type: "string", validation: requiredString("Required", 40) }),
          ],
        }),
        defineField({
          name: "rows",
          title: "Rows",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "costComparisonRow",
              fields: [
                defineField({ name: "country", type: "string", validation: requiredString("Required", 80) }),
                defineField({ name: "tuition", type: "string", validation: requiredString("Required", 80) }),
                defineField({ name: "livingCosts", type: "string", validation: requiredString("Required", 80) }),
                defineField({ name: "duration", type: "string", validation: requiredString("Required", 80) }),
                defineField({ name: "workWhileStudying", type: "string", validation: requiredString("Required", 80) }),
              ],
              preview: { select: { title: "country" } },
            }),
          ],
          validation: (rule) => rule.required().min(1),
        }),
        defineField({
          name: "caption",
          title: "Table caption",
          type: "text",
          rows: 2,
          validation: (rule) => rule.required().max(300),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "popularCourses",
      title: "Popular courses",
      type: "object",
      group: "courses",
      fields: [
        defineField({
          name: "header",
          title: "Section header",
          type: "sectionHeader",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "courses",
          title: "Courses",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "popularCourse",
              fields: [
                defineField({ name: "title", type: "string", validation: requiredString("Title required", 80) }),
                defineField({ name: "description", type: "text", rows: 3, validation: (rule) => rule.required().max(400) }),
                defineField({
                  name: "icon",
                  type: "string",
                  options: { list: [...popularCourseIconOptions], layout: "dropdown" },
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
      name: "admissionRequirements",
      title: "Admission requirements",
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
          name: "requirements",
          title: "Requirements",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "admissionRequirement",
              fields: [
                defineField({ name: "title", type: "string", validation: requiredString("Title required", 80) }),
                defineField({ name: "description", type: "text", rows: 3, validation: (rule) => rule.required().max(400) }),
                defineField({
                  name: "icon",
                  type: "string",
                  options: { list: [...admissionRequirementIconOptions], layout: "dropdown" },
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
      name: "faqPreview",
      title: "FAQ preview",
      type: "faqPreview",
      group: "faq",
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
      return { title: "Destinations page" };
    },
  },
  validation: singletonDocumentRule("destinationsPage"),
});
