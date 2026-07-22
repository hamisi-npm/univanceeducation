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

const businessStatusOptions = [
  { title: "Open", value: "open" },
  { title: "Closed", value: "closed" },
  { title: "Limited hours", value: "limited" },
] as const;

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  description: `Global site configuration (singleton ID: \`${singletonDocumentIds.siteSettings}\`).`,
  groups: [
    { name: "business", title: "Business", default: true },
    { name: "branding", title: "Branding" },
    { name: "contact", title: "Contact" },
    { name: "social", title: "Social" },
    { name: "seo", title: "SEO defaults" },
    { name: "office", title: "Office" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Company name",
      type: "string",
      group: "business",
      validation: requiredString("Company name is required", limits.shortLabel),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "business",
      validation: requiredString("Tagline is required", limits.heading),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      group: "business",
      description: "Short company description used in metadata and footer.",
      validation: requiredText("Description is required", 500),
    }),
    defineField({
      name: "url",
      title: "Site URL",
      type: "url",
      group: "business",
      description: "Canonical base URL for the website.",
      validation: requiredUrl,
    }),
    defineField({
      name: "logo",
      title: "Primary logo",
      type: "imageWithAlt",
      group: "branding",
      description:
        "Default logo for light backgrounds. Wait for the upload to finish before publishing.",
      validation: (rule) =>
        rule.required().assetRequired().error("Primary logo is required"),
      options: {
        accept: "image/png,image/svg+xml,image/jpeg,image/webp",
      },
    }),
    defineField({
      name: "logoLight",
      title: "Secondary logo",
      type: "imageWithAlt",
      group: "branding",
      description:
        "Logo variant for dark backgrounds (e.g. footer). Wait for the upload to finish before publishing.",
      options: {
        accept: "image/png,image/svg+xml,image/jpeg,image/webp",
      },
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      group: "branding",
      description:
        "Square icon for browser tabs on the public site and Studio. Recommended 512×512 PNG or SVG. Falls back to the primary logo when empty.",
      options: {
        accept: "image/png,image/svg+xml,image/x-icon,image/jpeg,image/webp",
      },
    }),
    defineField({
      name: "contact",
      title: "Contact details",
      type: "contactDetails",
      group: "contact",
      validation: (rule) => rule.required().error("Contact details are required"),
    }),
    defineField({
      name: "social",
      title: "Social profiles",
      type: "array",
      group: "social",
      of: [defineArrayMember({ type: "socialLink" })],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: "keywords",
      title: "Site keywords",
      type: "array",
      group: "seo",
      of: [defineArrayMember({ type: "string" })],
      options: {
        layout: "tags",
      },
      validation: (rule) => rule.max(20).unique(),
    }),
    defineField({
      name: "seoDefaults",
      title: "SEO defaults",
      type: "seo",
      group: "seo",
      description: "Site-wide fallback metadata when pages do not override SEO.",
      validation: (rule) => rule.required().error("SEO defaults are required"),
    }),
    defineField({
      name: "primaryOffice",
      title: "Primary office location",
      type: "primaryOffice",
      group: "office",
      description:
        "Structured office address. A formatted mailing address is generated for the public site.",
      validation: (rule) => rule.required().error("Primary office location is required"),
    }),
    defineField({
      name: "officeHours",
      title: "Office hours",
      type: "text",
      group: "office",
      rows: 3,
      description: "Human-readable office hours, e.g. Mon–Fri 9:00–17:00 EAT.",
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: "timezone",
      title: "Timezone",
      type: "string",
      group: "office",
      description: "IANA timezone, e.g. Africa/Nairobi.",
      validation: (rule) =>
        rule.max(64).warning("Use a valid IANA timezone identifier"),
    }),
    defineField({
      name: "businessStatus",
      title: "Business status",
      type: "string",
      group: "office",
      options: {
        list: [...businessStatusOptions],
        layout: "radio",
      },
      initialValue: "open",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site settings",
      };
    },
  },
  validation: singletonDocumentRule("siteSettings"),
});
