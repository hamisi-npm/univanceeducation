import { defineField, defineType } from "sanity";

import { requiredString } from "../../fields/validators";

type IconOption = { title: string; value: string };

/** Icon + title + description card used on About and similar pages. */
export function defineIconFeatureType(
  name: string,
  title: string,
  iconOptions: readonly IconOption[],
) {
  return defineType({
    name,
    title,
    type: "object",
    fields: [
      defineField({
        name: "title",
        title: "Title",
        type: "string",
        validation: requiredString("Title is required", 120),
      }),
      defineField({
        name: "description",
        title: "Description",
        type: "text",
        rows: 3,
        validation: (rule) => rule.required().max(400),
      }),
      defineField({
        name: "icon",
        title: "Icon",
        type: "string",
        options: {
          list: [...iconOptions],
          layout: "dropdown",
        },
        validation: requiredString("Select an icon"),
      }),
    ],
    preview: {
      select: { title: "title", subtitle: "icon" },
    },
  });
}
