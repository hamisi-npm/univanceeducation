import { defineField, defineType } from "sanity";

import { limits, requiredString } from "../../fields/validators";
import { uniqueFieldDocumentRule } from "../../singletons";
import { emailTemplateDocumentIds, emailTemplateKinds } from "./ids";

/**
 * Editable email *copy* only. HTML layout, colors, and structure stay in Next.js.
 */
export const emailTemplate = defineType({
  name: "emailTemplate",
  title: "Email template",
  type: "document",
  description:
    "Transactional email copy. HTML rendering stays in application code — do not paste HTML here.",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "cta", title: "CTA" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    defineField({
      name: "kind",
      title: "Template type",
      type: "string",
      group: "content",
      options: {
        list: [...emailTemplateKinds],
        layout: "radio",
      },
      validation: (rule) => rule.required().error("Select a template type"),
      readOnly: ({ document }) => Boolean(document?.kind),
    }),
    defineField({
      name: "subject",
      title: "Subject",
      type: "string",
      group: "content",
      description:
        "Supports placeholders such as {{fullName}}, {{email}}, {{confirmUrl}}, {{unsubscribeUrl}}.",
      validation: requiredString("Subject is required", 200),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      group: "content",
      validation: requiredString("Heading is required", limits.heading),
    }),
    defineField({
      name: "greeting",
      title: "Greeting",
      type: "string",
      group: "content",
      description: "e.g. Hi {{fullName}},",
      validation: requiredString("Greeting is required", 120),
    }),
    defineField({
      name: "introduction",
      title: "Introduction",
      type: "text",
      rows: 4,
      group: "content",
      validation: (rule) =>
        rule.required().error("Introduction is required").max(1000),
    }),
    defineField({
      name: "buttonLabel",
      title: "Button label",
      type: "string",
      group: "cta",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "buttonUrlPlaceholder",
      title: "Button URL placeholder",
      type: "string",
      group: "cta",
      description:
        "Placeholder token resolved at send time (e.g. {{confirmUrl}}, {{siteUrl}}).",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "nextSteps",
      title: "Next steps",
      type: "text",
      rows: 4,
      group: "content",
      validation: (rule) => rule.max(1000),
    }),
    defineField({
      name: "footerMessage",
      title: "Footer message",
      type: "text",
      rows: 2,
      group: "footer",
      validation: (rule) => rule.max(500),
    }),
    defineField({
      name: "supportMessage",
      title: "Support message",
      type: "text",
      rows: 2,
      group: "footer",
      validation: (rule) => rule.max(500),
    }),
    defineField({
      name: "legalNote",
      title: "Legal note",
      type: "text",
      rows: 2,
      group: "footer",
      validation: (rule) => rule.max(500),
    }),
    defineField({
      name: "signature",
      title: "Signature",
      type: "string",
      group: "footer",
      validation: (rule) => rule.max(120),
    }),
  ],
  preview: {
    select: {
      kind: "kind",
      title: "subject",
    },
    prepare({ kind, title }) {
      const label =
        emailTemplateKinds.find((option) => option.value === kind)?.title ??
        "Email template";
      return {
        title: title || label,
        subtitle: label,
      };
    },
  },
  validation: uniqueFieldDocumentRule("emailTemplate", "kind"),
});

export { emailTemplateDocumentIds, emailTemplateKinds };
