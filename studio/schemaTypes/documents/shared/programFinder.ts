import { defineField, defineType } from "sanity";

import { limits, requiredString } from "../../fields/validators";

/**
 * Homepage program finder chrome only.
 * Dropdown values are loaded at runtime from Destinations, Course Categories, and Study Levels.
 */
export const programFinder = defineType({
  name: "programFinder",
  title: "Program finder",
  type: "object",
  description:
    "Homepage finder chrome. Option lists come from Destinations, Course Categories, and Study Levels — not from this object.",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: 'e.g. "Find Your Dream Program"',
      validation: requiredString("Heading is required", limits.heading),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: "destinationLabel",
      title: "Destination label",
      type: "string",
      initialValue: "Destination",
      validation: requiredString("Destination label is required", limits.shortLabel),
    }),
    defineField({
      name: "destinationPlaceholder",
      title: "Destination placeholder",
      type: "string",
      initialValue: "Select destination",
      validation: requiredString(
        "Destination placeholder is required",
        limits.shortLabel,
      ),
    }),
    defineField({
      name: "courseLabel",
      title: "Course category label",
      type: "string",
      initialValue: "Course",
      validation: requiredString("Course label is required", limits.shortLabel),
    }),
    defineField({
      name: "coursePlaceholder",
      title: "Course category placeholder",
      type: "string",
      initialValue: "Select course",
      validation: requiredString("Course placeholder is required", limits.shortLabel),
    }),
    defineField({
      name: "studyLevelLabel",
      title: "Study level label",
      type: "string",
      initialValue: "Study level",
      validation: requiredString("Study level label is required", limits.shortLabel),
    }),
    defineField({
      name: "studyLevelPlaceholder",
      title: "Study level placeholder",
      type: "string",
      initialValue: "Select level",
      validation: requiredString(
        "Study level placeholder is required",
        limits.shortLabel,
      ),
    }),
    defineField({
      name: "cta",
      title: "Find Programs CTA",
      type: "ctaLink",
      description: "Button label; href should point to /programs (query params are appended).",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "backgroundTheme",
      title: "Background theme",
      type: "string",
      options: {
        list: [
          { title: "Light", value: "light" },
          { title: "Navy", value: "navy" },
          { title: "Beige", value: "beige" },
        ],
        layout: "radio",
      },
      initialValue: "light",
    }),
    defineField({
      name: "showDestination",
      title: "Show destination filter",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "showCourse",
      title: "Show course category filter",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "showStudyLevel",
      title: "Show study level filter",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
