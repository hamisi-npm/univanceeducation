import { defineArrayMember, defineField, defineType } from "sanity";

import {
  singletonDocumentIds,
  singletonDocumentRule,
} from "../../singletons";
import {
  limits,
  requiredString,
  requiredText,
  requiredUrl,
} from "../../fields/validators";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact page",
  type: "document",
  description: `Contact page content (singleton ID: \`${singletonDocumentIds.contactPage}\`).`,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "methods", title: "Contact methods" },
    { name: "form", title: "Consultation form" },
    { name: "office", title: "Office" },
    { name: "faq", title: "FAQ preview" },
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
      name: "contactMethods",
      title: "Contact methods",
      type: "object",
      group: "methods",
      fields: [
        defineField({
          name: "header",
          title: "Section header",
          type: "sectionHeader",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "methods",
          title: "Methods",
          type: "array",
          of: [defineArrayMember({ type: "contactMethod" })],
          validation: (rule) => rule.required().min(1),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "consultationForm",
      title: "Consultation form",
      type: "object",
      group: "form",
      description: "Form labels and options only — submissions are stored in PostgreSQL.",
      fields: [
        defineField({
          name: "header",
          title: "Section header",
          type: "sectionHeader",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "fields",
          title: "Field labels",
          type: "object",
          fields: [
            defineField({
              name: "fullName",
              title: "Full name",
              type: "object",
              fields: [
                defineField({ name: "label", type: "string", validation: requiredString("Label required", 80) }),
                defineField({ name: "placeholder", type: "string", validation: requiredString("Placeholder required", 80) }),
              ],
            }),
            defineField({
              name: "email",
              title: "Email",
              type: "object",
              fields: [
                defineField({ name: "label", type: "string", validation: requiredString("Label required", 80) }),
                defineField({ name: "placeholder", type: "string", validation: requiredString("Placeholder required", 80) }),
              ],
            }),
            defineField({
              name: "phone",
              title: "Phone",
              type: "object",
              fields: [
                defineField({ name: "label", type: "string", validation: requiredString("Label required", 80) }),
                defineField({ name: "placeholder", type: "string", validation: requiredString("Placeholder required", 80) }),
              ],
            }),
            defineField({
              name: "preferredDestination",
              title: "Preferred destination",
              type: "object",
              fields: [
                defineField({ name: "label", type: "string", validation: requiredString("Label required", 80) }),
                defineField({ name: "placeholder", type: "string", validation: requiredString("Placeholder required", 80) }),
              ],
            }),
            defineField({
              name: "preferredIntake",
              title: "Preferred intake",
              type: "object",
              fields: [
                defineField({ name: "label", type: "string", validation: requiredString("Label required", 80) }),
                defineField({ name: "placeholder", type: "string", validation: requiredString("Placeholder required", 80) }),
              ],
            }),
            defineField({
              name: "studyLevel",
              title: "Study level",
              type: "object",
              fields: [
                defineField({ name: "label", type: "string", validation: requiredString("Label required", 80) }),
                defineField({ name: "placeholder", type: "string", validation: requiredString("Placeholder required", 80) }),
              ],
            }),
            defineField({
              name: "message",
              title: "Message",
              type: "object",
              fields: [
                defineField({ name: "label", type: "string", validation: requiredString("Label required", 80) }),
                defineField({ name: "placeholder", type: "string", validation: requiredString("Placeholder required", 80) }),
              ],
            }),
          ],
        }),
        defineField({
          name: "destinationOptions",
          title: "Destination options",
          type: "array",
          of: [defineArrayMember({ type: "selectOption" })],
          validation: (rule) => rule.required().min(1),
        }),
        defineField({
          name: "intakeOptions",
          title: "Intake options",
          type: "array",
          of: [defineArrayMember({ type: "selectOption" })],
          validation: (rule) => rule.required().min(1),
        }),
        defineField({
          name: "studyLevelOptions",
          title: "Study level options",
          type: "array",
          of: [defineArrayMember({ type: "selectOption" })],
          validation: (rule) => rule.required().min(1),
        }),
        defineField({
          name: "submitLabel",
          title: "Submit button label",
          type: "string",
          validation: requiredString("Submit label is required", limits.shortLabel),
        }),
        defineField({
          name: "successTitle",
          title: "Success title",
          type: "string",
          validation: requiredString("Success title is required", limits.shortLabel),
        }),
        defineField({
          name: "successMessage",
          title: "Success message",
          type: "text",
          rows: 2,
          validation: requiredText("Success message is required", 300),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "officeLocation",
      title: "Office location",
      type: "object",
      group: "office",
      fields: [
        defineField({
          name: "header",
          title: "Section header",
          type: "sectionHeader",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "address",
          title: "Address",
          type: "text",
          rows: 3,
          validation: requiredText("Address is required", 400),
        }),
        defineField({
          name: "mapImage",
          title: "Map image",
          type: "imageWithAlt",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "openInMapsLabel",
          title: "Open in maps label",
          type: "string",
          validation: requiredString("Label is required", limits.shortLabel),
        }),
        defineField({
          name: "mapsHref",
          title: "Maps URL",
          type: "url",
          validation: requiredUrl,
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "officeHours",
      title: "Office hours",
      type: "object",
      group: "office",
      fields: [
        defineField({
          name: "header",
          title: "Section header",
          type: "sectionHeader",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "entries",
          title: "Schedule",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "officeHoursEntry",
              fields: [
                defineField({
                  name: "days",
                  title: "Days",
                  type: "string",
                  validation: requiredString("Days are required", 80),
                }),
                defineField({
                  name: "hours",
                  title: "Hours",
                  type: "string",
                  validation: requiredString("Hours are required", 80),
                }),
              ],
              preview: {
                select: { title: "days", subtitle: "hours" },
              },
            }),
          ],
          validation: (rule) => rule.required().min(1),
        }),
        defineField({
          name: "note",
          title: "Note",
          type: "string",
          validation: (rule) => rule.max(200),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "faqPreview",
      title: "FAQ preview",
      type: "object",
      group: "faq",
      fields: [
        defineField({
          name: "header",
          title: "Section header",
          type: "sectionHeader",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "items",
          title: "FAQ items",
          type: "array",
          of: [defineArrayMember({ type: "faqItem" })],
          validation: (rule) => rule.min(1),
        }),
        defineField({
          name: "viewAll",
          title: "View all link",
          type: "ctaLink",
          validation: (rule) => rule.required(),
        }),
      ],
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
      return { title: "Contact page" };
    },
  },
  validation: singletonDocumentRule("contactPage"),
});
