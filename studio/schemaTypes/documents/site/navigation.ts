import { defineArrayMember, defineField, defineType } from "sanity";

import {
  singletonDocumentIds,
  singletonDocumentRule,
} from "../../singletons";
import {
  limits,
  requiredHref,
  requiredString,
} from "../../fields/validators";

export const navigationItem = defineType({
  name: "navigationItem",
  title: "Navigation item",
  type: "object",
  description: "A single main-navigation link.",
  fields: [
    defineField({
      name: "title",
      title: "Label",
      type: "string",
      validation: requiredString("A navigation label is required", limits.shortLabel),
    }),
    defineField({
      name: "href",
      title: "URL",
      type: "string",
      description: "Internal path (/about) or absolute URL (https://…).",
      validation: requiredHref,
    }),
    defineField({
      name: "external",
      title: "External link",
      type: "boolean",
      description: "Enable when the URL points outside this website.",
      initialValue: false,
    }),
    defineField({
      name: "openInNewTab",
      title: "Open in new tab",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Sort position in the navigation bar (lowest first).",
      validation: (rule) => rule.required().min(0).integer(),
    }),
    defineField({
      name: "disabled",
      title: "Hidden",
      type: "boolean",
      description: "Hide this item from the navigation without deleting it.",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "href",
      order: "order",
      disabled: "disabled",
    },
    prepare({ title, subtitle, order, disabled }) {
      const prefix = disabled ? "[Hidden] " : "";
      return {
        title: `${prefix}${title || "Navigation item"}`,
        subtitle: [order !== undefined ? `#${order}` : null, subtitle]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});

export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  description: `Main site navigation (singleton ID: \`${singletonDocumentIds.navigation}\`).`,
  fields: [
    defineField({
      name: "items",
      title: "Navigation items",
      type: "array",
      of: [defineArrayMember({ type: "navigationItem" })],
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .error("At least one navigation item is required"),
    }),
    defineField({
      name: "cta",
      title: "Header CTA",
      type: "ctaLink",
      description: 'Primary call-to-action in the navbar, e.g. "Book Consultation".',
      validation: (rule) => rule.required().error("Header CTA is required"),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Navigation",
      };
    },
  },
  validation: singletonDocumentRule("navigation"),
});
