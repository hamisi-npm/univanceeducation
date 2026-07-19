import { defineArrayMember, defineField, defineType } from "sanity";

import {
  singletonDocumentIds,
  singletonDocumentRule,
} from "../../singletons";
import {
  limits,
  requiredHref,
  requiredString,
  requiredText,
  requiredUrl,
} from "../../fields/validators";

export const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  description: `Site footer content (singleton ID: \`${singletonDocumentIds.footer}\`).`,
  groups: [
    { name: "brand", title: "Brand", default: true },
    { name: "navigation", title: "Quick links" },
    { name: "contact", title: "Contact" },
    { name: "newsletter", title: "Newsletter" },
    { name: "bottomBar", title: "Bottom bar" },
  ],
  fields: [
    defineField({
      name: "brand",
      title: "Brand",
      type: "object",
      group: "brand",
      fields: [
        defineField({
          name: "name",
          title: "Name",
          type: "string",
          validation: requiredString("Brand name is required", limits.shortLabel),
        }),
        defineField({
          name: "href",
          title: "Home link",
          type: "string",
          description: "Usually /",
          validation: requiredHref,
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
          validation: requiredText("Footer description is required", 500),
        }),
      ],
      validation: (rule) => rule.required().error("Brand block is required"),
    }),
    defineField({
      name: "social",
      title: "Social links",
      type: "array",
      group: "brand",
      of: [defineArrayMember({ type: "socialLink" })],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: "navGroups",
      title: "Quick link groups",
      type: "array",
      group: "navigation",
      of: [
        defineArrayMember({
          type: "object",
          name: "footerNavGroup",
          title: "Link group",
          fields: [
            defineField({
              name: "title",
              title: "Group title",
              type: "string",
              validation: requiredString("Group title is required", limits.shortLabel),
            }),
            defineField({
              name: "links",
              title: "Links",
              type: "array",
              of: [defineArrayMember({ type: "ctaLink" })],
              validation: (rule) =>
                rule.required().min(1).error("Each group needs at least one link"),
            }),
          ],
          preview: {
            select: {
              title: "title",
              links: "links",
            },
            prepare({ title, links }) {
              const count = Array.isArray(links) ? links.length : 0;
              return {
                title: title || "Link group",
                subtitle: `${count} link${count === 1 ? "" : "s"}`,
              };
            },
          },
        }),
      ],
      validation: (rule) =>
        rule.required().min(1).error("At least one quick link group is required"),
    }),
    defineField({
      name: "contact",
      title: "Contact block",
      type: "object",
      group: "contact",
      fields: [
        defineField({
          name: "title",
          title: "Section title",
          type: "string",
          validation: requiredString("Contact section title is required", limits.shortLabel),
        }),
        defineField({
          name: "items",
          title: "Contact items",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "footerContactItem",
              title: "Contact item",
              fields: [
                defineField({
                  name: "label",
                  title: "Label",
                  type: "string",
                  validation: requiredString("Label is required", limits.shortLabel),
                }),
                defineField({
                  name: "value",
                  title: "Value",
                  type: "string",
                  validation: requiredString("Value is required", 200),
                }),
                defineField({
                  name: "href",
                  title: "Link",
                  type: "string",
                  description: "Optional tel:, mailto:, or URL.",
                  validation: (rule) =>
                    rule.custom((value: string | undefined) => {
                      if (!value) {
                        return true;
                      }

                      if (
                        /^(https?:\/\/|mailto:|tel:|\/|#)/.test(value)
                      ) {
                        return true;
                      }

                      return "Use an internal path, URL, mailto:, or tel: link";
                    }),
                }),
                defineField({
                  name: "external",
                  title: "Open in new tab",
                  type: "boolean",
                  initialValue: false,
                }),
              ],
              preview: {
                select: {
                  title: "label",
                  subtitle: "value",
                },
              },
            }),
          ],
          validation: (rule) =>
            rule.required().min(1).error("At least one contact item is required"),
        }),
      ],
      validation: (rule) => rule.required().error("Contact block is required"),
    }),
    defineField({
      name: "newsletter",
      title: "Newsletter",
      type: "object",
      group: "newsletter",
      description: "Newsletter copy only — submissions are stored in PostgreSQL.",
      fields: [
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
          title: "Email field label",
          type: "string",
          validation: requiredString("Email label is required", limits.shortLabel),
        }),
        defineField({
          name: "emailPlaceholder",
          title: "Email placeholder",
          type: "string",
          validation: requiredString("Email placeholder is required", limits.shortLabel),
        }),
        defineField({
          name: "submitLabel",
          title: "Submit button label",
          type: "string",
          validation: requiredString("Submit label is required", limits.shortLabel),
        }),
      ],
      validation: (rule) => rule.required().error("Newsletter copy is required"),
    }),
    defineField({
      name: "bottomBar",
      title: "Bottom bar",
      type: "object",
      group: "bottomBar",
      fields: [
        defineField({
          name: "copyright",
          title: "Copyright",
          type: "string",
          description:
            'Copyright line shown in the footer. Use {year} for the current year, e.g. "© {year} Univance Education. All rights reserved."',
          validation: requiredString("Copyright text is required", 200),
        }),
        defineField({
          name: "builtWithLabel",
          title: "Built-with label",
          type: "string",
          validation: requiredString("Built-with label is required", limits.shortLabel),
        }),
        defineField({
          name: "builtWithHref",
          title: "Built-with link",
          type: "url",
          validation: requiredUrl,
        }),
        defineField({
          name: "legalLinks",
          title: "Legal links",
          type: "array",
          of: [defineArrayMember({ type: "ctaLink" })],
          validation: (rule) =>
            rule.required().min(1).error("At least one legal link is required"),
        }),
      ],
      validation: (rule) => rule.required().error("Bottom bar is required"),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Footer",
      };
    },
  },
  validation: singletonDocumentRule("footer"),
});
