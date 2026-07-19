import type { WhyChooseUsIconName } from "@/features/about/types";
import { slugify } from "@/lib/slugify";
import {
  mapCtaBanner,
  mapCtaLink,
  mapSectionHeader,
} from "@/mappers/shared";
import type { SanityAboutDocument } from "@/types/sanity/about";
import { blocksToParagraphs } from "@/lib/sanity/utils/portable-text";
import { resolveSanityImage } from "@/lib/sanity/utils/image";
import type { AboutPageData } from "@/types/about";

const WHY_CHOOSE_ICONS: WhyChooseUsIconName[] = [
  "badge-check",
  "globe",
  "stamp",
  "award",
  "message-circle",
  "list-checks",
];

function asWhyChooseIcon(icon: string, fallback: WhyChooseUsIconName): WhyChooseUsIconName {
  return WHY_CHOOSE_ICONS.includes(icon as WhyChooseUsIconName)
    ? (icon as WhyChooseUsIconName)
    : fallback;
}

export function mapAboutPage(
  document: SanityAboutDocument | null | undefined,
): AboutPageData {
  if (!document) {
    throw new Error("Missing Sanity document");
  }

  const heroHeader = document.hero?.header;
  const storyParagraphs = blocksToParagraphs(document.companyStory?.paragraphs);

  return {
    hero: {
      badge: heroHeader?.badge || "",
      heading: heroHeader?.heading || "",
      description: heroHeader?.description || "",
      primaryCta: mapCtaLink(document.hero?.primaryCta),
      secondaryCta: mapCtaLink(document.hero?.secondaryCta),
      image: resolveSanityImage(document.hero?.image, { src: "", alt: "" }),
    },
    companyStory: {
      badge: document.companyStory?.badge || "",
      heading: document.companyStory?.heading || "",
      paragraphs: storyParagraphs,
      image: resolveSanityImage(document.companyStory?.image, { src: "", alt: "" }),
    },
    missionVision: {
      ...mapSectionHeader(document.missionVision?.header),
      cards:
        document.missionVision?.cards?.map((card, index) => ({
          id: slugify(card.title) || `card-${index}`,
          title: card.title || "",
          description: card.description || "",
        })) ?? [],
    },
    whyChooseUs: {
      ...mapSectionHeader(document.whyChooseUs?.header),
      features:
        document.whyChooseUs?.features?.map((feature, index) => ({
          id: slugify(feature.title) || `feature-${index}`,
          title: feature.title || "",
          description: feature.description || "",
          icon: asWhyChooseIcon(feature.icon, "badge-check"),
        })) ?? [],
    },
    team: {
      ...mapSectionHeader(document.team?.header),
      members:
        document.team?.members?.map((member, index) => ({
          id: slugify(member.name) || member._id || `member-${index}`,
          name: member.name || "",
          position: member.position || "",
          bio: member.bio || "",
          image: resolveSanityImage(member.image, {
            src: "",
            alt: member.name || "",
          }),
        })) ?? [],
    },
    cta: mapCtaBanner(document.cta),
    seo: document.seo,
  };
}
