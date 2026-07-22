import { slugify } from "@/lib/slugify";
import { blocksToParagraphs } from "@/lib/sanity/utils/portable-text";
import { resolveSanityImage } from "@/lib/sanity/utils/image";
import type {
  SanityProgramCard,
  SanityProgramDetailDocument,
} from "@/types/sanity/programs";
import type { ProgramCard, ProgramDetail } from "@/types/programs";

function formatTuition(currency: string, amount: number): string {
  if (!Number.isFinite(amount)) {
    return "";
  }

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString("en-US")}`;
  }
}

export function mapProgramCard(program: SanityProgramCard): ProgramCard {
  const slug = program.slug || slugify(program.title);
  const university = program.university;
  const destination = university?.destination;
  const currency = program.currency || "USD";
  const annualTuition = program.annualTuition ?? 0;

  return {
    id: slug,
    slug,
    title: program.title || "",
    featured: program.featured ?? false,
    image: resolveSanityImage(program.featuredImage, {
      src: "",
      alt: program.title || "",
    }),
    shortDescription: program.shortDescription || "",
    duration: program.duration || "",
    currency,
    annualTuition,
    tuitionLabel: formatTuition(currency, annualTuition),
    scholarshipAvailable: program.scholarshipAvailable ?? false,
    universityName: university?.name || "",
    universitySlug: university?.slug || "",
    destinationCountry: destination?.country || "",
    destinationSlug: destination?.slug || "",
    destinationFlag: destination?.flag || "",
    categoryName: program.courseCategory?.name || "",
    categorySlug: program.courseCategory?.slug || "",
    studyLevelName: program.studyLevel?.name || "",
    studyLevelSlug: program.studyLevel?.slug || "",
    degreeTypeName: program.degreeType?.name || "",
  };
}

export function mapProgramDetail(
  document: SanityProgramDetailDocument,
): ProgramDetail {
  const card = mapProgramCard(document);
  const university = document.university;
  const destination = university?.destination;

  return {
    ...card,
    gallery:
      document.gallery?.map((image, index) =>
        resolveSanityImage(image, {
          src: "",
          alt: `${document.title || "Program"} gallery ${index + 1}`,
        }),
      ) ?? [],
    overview: blocksToParagraphs(document.overview),
    highlights: document.highlights?.filter(Boolean) ?? [],
    quickFacts:
      document.quickFacts
        ?.filter((fact) => fact.label && fact.value)
        .map((fact) => ({
          label: fact.label,
          value: fact.value,
        })) ?? [],
    credits: document.credits || "",
    modeOfStudy: document.modeOfStudy || "",
    language: document.language || "",
    intakeMonths: document.intakeMonths?.filter(Boolean) ?? [],
    entryRequirements: blocksToParagraphs(document.entryRequirements),
    englishRequirements: blocksToParagraphs(document.englishRequirements),
    requiredDocuments: blocksToParagraphs(document.requiredDocuments),
    applicationDeadline: document.applicationDeadline || "",
    applicationFee:
      typeof document.applicationFee === "number"
        ? document.applicationFee
        : null,
    scholarshipDetails: blocksToParagraphs(document.scholarshipDetails),
    careerOpportunities: blocksToParagraphs(document.careerOpportunities),
    industry: document.industry || "",
    facultyName: document.faculty?.name || "",
    facultySlug: document.faculty?.slug || "",
    university: {
      name: university?.name || "",
      slug: university?.slug || "",
      city: university?.city || "",
      type: university?.type || "",
      description: university?.description || "",
      tuitionRange: university?.tuitionRange || "",
      image: resolveSanityImage(university?.image ?? null, {
        src: "",
        alt: university?.name || "",
      }),
      destinationCountry: destination?.country || "",
      destinationSlug: destination?.slug || "",
      destinationFlag: destination?.flag || "",
    },
    seo: document.seo,
  };
}
