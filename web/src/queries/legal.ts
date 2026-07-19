import { defineQuery } from "next-sanity";

export const legalPageQuery = defineQuery(`*[_type == "legalPage" && _id == $id][0]{
  kind,
  hero {
    badge,
    heading,
    description,
    lastUpdated
  },
  sections[] {
    heading,
    paragraphs,
    listItems
  },
  seo {
    title,
    description
  }
}`);
