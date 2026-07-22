import { defineQuery } from "next-sanity";

import { imageWithAltProjection } from "@/queries/global";

/** Shared card projection — destination is always derived via university. */
export const programCardProjection = `{
  _id,
  title,
  "slug": slug.current,
  featured,
  featuredImage ${imageWithAltProjection},
  shortDescription,
  duration,
  currency,
  annualTuition,
  scholarshipAvailable,
  university->{
    name,
    "slug": slug.current,
    destination->{
      country,
      "slug": slug.current,
      flag
    }
  },
  courseCategory->{
    name,
    "slug": slug.current
  },
  studyLevel->{
    name,
    "slug": slug.current
  },
  degreeType->{
    name,
    "slug": slug.current
  }
}`;

const programFilterClause = `
  _type == "program"
  && ($destination == "" || university->destination->slug.current == $destination)
  && ($university == "" || university->slug.current == $university)
  && ($category == "" || courseCategory->slug.current == $category)
  && ($level == "" || studyLevel->slug.current == $level)
  && ($q == "" || title match $q || shortDescription match $q)
`;

export const programsPageQuery = defineQuery(`*[_type == "programsPage" && _id == $id][0]{
  hero {
    badge,
    heading,
    description,
    image ${imageWithAltProjection}
  },
  statistics[] {
    value,
    label
  },
  filters {
    heading,
    description,
    destinationLabel,
    universityLabel,
    categoryLabel,
    levelLabel,
    keywordLabel,
    keywordPlaceholder,
    submitLabel,
    clearLabel
  },
  resultsCountLabel,
  emptyState {
    heading,
    description
  },
  ctaBanner {
    heading,
    description,
    cta {
      label,
      href,
      external
    }
  },
  seo {
    title,
    description
  }
}`);

export const programsFilteredQuery = defineQuery(`{
  "items": *[${programFilterClause}] | order(order asc, title asc) [$offset...$end] ${programCardProjection},
  "total": count(*[${programFilterClause}])
}`);

export const programBySlugQuery = defineQuery(`*[_type == "program" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  featured,
  featuredImage ${imageWithAltProjection},
  gallery[] ${imageWithAltProjection},
  shortDescription,
  overview,
  highlights,
  quickFacts[] {
    label,
    value
  },
  duration,
  credits,
  modeOfStudy,
  language,
  intakeMonths,
  entryRequirements,
  englishRequirements,
  requiredDocuments,
  applicationDeadline,
  currency,
  annualTuition,
  applicationFee,
  scholarshipAvailable,
  scholarshipDetails,
  careerOpportunities,
  industry,
  university->{
    _id,
    name,
    "slug": slug.current,
    city,
    type,
    description,
    tuitionRange,
    image ${imageWithAltProjection},
    destination->{
      country,
      "slug": slug.current,
      flag
    }
  },
  courseCategory->{
    name,
    "slug": slug.current
  },
  studyLevel->{
    name,
    "slug": slug.current
  },
  faculty->{
    name,
    "slug": slug.current
  },
  degreeType->{
    name,
    "slug": slug.current
  },
  seo {
    title,
    description
  }
}`);

export const programSlugsQuery = defineQuery(`*[_type == "program" && defined(slug.current)] | order(order asc) {
  "slug": slug.current
}`);

export const programsByUniversityQuery = defineQuery(`*[
  _type == "program"
  && university->slug.current == $universitySlug
] | order(order asc, title asc) [0...$limit] ${programCardProjection}`);

export const programsByDestinationQuery = defineQuery(`*[
  _type == "program"
  && university->destination->slug.current == $destinationSlug
] | order(order asc, title asc) [0...$limit] ${programCardProjection}`);

export const relatedProgramsQuery = defineQuery(`*[
  _type == "program"
  && slug.current != $slug
  && (
    ($categorySlug != "" && courseCategory->slug.current == $categorySlug)
    || ($universitySlug != "" && university->slug.current == $universitySlug)
  )
] | order(order asc, title asc) [0...$limit] ${programCardProjection}`);

export const featuredProgramsQuery = defineQuery(`*[
  _type == "program"
  && featured == true
] | order(order asc, title asc) [0...$limit] ${programCardProjection}`);

export const courseCategoriesQuery = defineQuery(`*[_type == "courseCategory"] | order(order asc) {
  name,
  "slug": slug.current,
  description,
  icon,
  featured
}`);

export const studyLevelsQuery = defineQuery(`*[_type == "studyLevel"] | order(order asc) {
  name,
  "slug": slug.current,
  description,
  icon
}`);

export const facultiesQuery = defineQuery(`*[_type == "faculty"] | order(order asc) {
  name,
  "slug": slug.current,
  description
}`);

export const degreeTypesQuery = defineQuery(`*[_type == "degreeType"] | order(order asc) {
  name,
  "slug": slug.current
}`);

export const programFilterOptionsQuery = defineQuery(`{
  "destinations": *[_type == "destination"] | order(order asc) {
    "slug": slug.current,
    "label": country,
    flag
  },
  "universities": *[_type == "university"] | order(name asc) {
    "slug": slug.current,
    "label": name,
    "destinationSlug": destination->slug.current
  },
  "categories": *[_type == "courseCategory"] | order(order asc) {
    "slug": slug.current,
    "label": name
  },
  "levels": *[_type == "studyLevel"] | order(order asc) {
    "slug": slug.current,
    "label": name
  }
}`);
