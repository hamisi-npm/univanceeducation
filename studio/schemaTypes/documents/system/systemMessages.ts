import { defineField, defineType } from "sanity";

import { singletonDocumentRule } from "../../singletons";
import { limits, requiredString } from "../../fields/validators";
import { systemMessagesDocumentId } from "./ids";

export const systemMessages = defineType({
  name: "systemMessages",
  title: "System messages",
  type: "document",
  description: `Global system copy (singleton ID: \`${systemMessagesDocumentId}\`).`,
  groups: [
    { name: "errors", title: "Errors", default: true },
    { name: "success", title: "Success" },
    { name: "validation", title: "Validation" },
    { name: "notices", title: "Notices" },
  ],
  fields: [
    defineField({
      name: "genericError",
      title: "Generic error",
      type: "string",
      group: "errors",
      validation: requiredString("Generic error is required", 200),
    }),
    defineField({
      name: "unexpectedError",
      title: "Unexpected server error",
      type: "string",
      group: "errors",
      validation: requiredString("Unexpected error message is required", 200),
    }),
    defineField({
      name: "maintenance",
      title: "Maintenance message",
      type: "text",
      rows: 3,
      group: "notices",
      validation: (rule) => rule.max(500),
    }),
    defineField({
      name: "successGeneric",
      title: "Generic success",
      type: "string",
      group: "success",
      validation: requiredString("Success message is required", 200),
    }),
    defineField({
      name: "newsletterSubscribeSuccess",
      title: "Newsletter subscribe success",
      type: "string",
      group: "success",
      description: "Shown after a subscription request is accepted (check email).",
      validation: requiredString("Newsletter success message is required", 200),
    }),
    defineField({
      name: "newsletterAlreadySubscribed",
      title: "Newsletter already subscribed",
      type: "string",
      group: "success",
      validation: requiredString(
        "Already-subscribed message is required",
        200,
      ),
    }),
    defineField({
      name: "validationGeneric",
      title: "Generic validation error",
      type: "string",
      group: "validation",
      validation: requiredString("Validation message is required", limits.heading),
    }),
    defineField({
      name: "globalNotice",
      title: "Global notice",
      type: "text",
      rows: 2,
      group: "notices",
      description: "Optional site-wide notice for future use.",
      validation: (rule) => rule.max(500),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "System messages",
        subtitle: "Errors, success, validation, notices",
      };
    },
  },
  validation: singletonDocumentRule("systemMessages"),
});
