import { defineQuery } from "next-sanity";

/**
 * Shared projection for `imageWithAlt`.
 * Supports both shapes:
 * - native image type: `asset` is a reference
 * - legacy nested object: `asset.asset` is a reference
 */
export const imageWithAltProjection = `{
  alt,
  "asset": coalesce(asset.asset, asset)->{
    _id,
    url,
    metadata {
      dimensions {
        width,
        height
      }
    }
  }
}`;

/** Shared projection for university cards and listings. */
export const universityCardProjection = `{
  _id,
  name,
  "slug": slug.current,
  city,
  type,
  description,
  programs,
  tuitionRange,
  image ${imageWithAltProjection},
  featured,
  ctaLabel,
  destination->{
    country,
    "slug": slug.current,
    flag
  }
}`;

export const siteSettingsQuery = defineQuery(`*[_type == "siteSettings" && _id == $id][0]{
  name,
  tagline,
  description,
  url,
  logo ${imageWithAltProjection},
  logoLight ${imageWithAltProjection},
  "faviconUrl": coalesce(favicon.asset->url, logo.asset->url),
  primaryOffice {
    building,
    floor,
    suite,
    street,
    area,
    city,
    country
  },
  contact {
    email,
    phone,
    address,
    mapsHref
  },
  social[]{
    icon,
    label,
    href
  },
  keywords
}`);

export const navigationQuery = defineQuery(`*[_type == "navigation" && _id == $id][0]{
  "items": items[] | order(order asc) {
    title,
    href,
    external,
    openInNewTab,
    order,
    disabled
  },
  cta {
    label,
    href,
    external
  }
}`);

export const footerQuery = defineQuery(`*[_type == "footer" && _id == $id][0]{
  brand {
    name,
    href,
    description
  },
  social[]{
    icon,
    label,
    href
  },
  navGroups[]{
    title,
    links[]{
      label,
      href,
      external
    }
  },
  contact {
    title,
    items[]{
      label,
      value,
      href,
      external
    }
  },
  newsletter {
    heading,
    description,
    emailLabel,
    emailPlaceholder,
    submitLabel
  },
  bottomBar {
    copyright,
    builtWithLabel,
    builtWithHref,
    legalLinks[]{
      label,
      href,
      external
    }
  }
}`);
