import { defineField, defineType } from "sanity";

import {
  heroFloatingCardIconOptions,
  heroFloatingCardPositionOptions,
} from "../../fields/iconOptions";
import { requiredString } from "../../fields/validators";

/** Homepage hero floating card — matches `HeroFloatingCard`. */
export const heroFloatingCard = defineType({
  name: "heroFloatingCard",
  title: "Hero floating card",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: requiredString("Title is required", 80),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [...heroFloatingCardIconOptions],
        layout: "dropdown",
      },
      validation: requiredString("Select an icon"),
    }),
    defineField({
      name: "position",
      title: "Position",
      type: "string",
      options: {
        list: [...heroFloatingCardPositionOptions],
        layout: "radio",
      },
      validation: requiredString("Select a position"),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "subtitle" },
  },
});
