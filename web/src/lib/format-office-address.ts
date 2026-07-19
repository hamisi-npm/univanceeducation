export type PrimaryOffice = {
  building: string;
  floor: string;
  suite: string;
  street: string;
  area: string;
  city: string;
  country: string;
};

/** Multi-line mailing address for display components. */
export function formatOfficeAddress(office: PrimaryOffice): string {
  const floorSuite = [office.floor, office.suite].filter(Boolean).join(", ");

  return [
    office.building,
    floorSuite,
    office.street,
    office.area,
    `${office.city}, ${office.country}`,
  ]
    .filter(Boolean)
    .join("\n");
}

/** Single-line address for maps search and metadata. */
export function formatOfficeAddressInline(office: PrimaryOffice): string {
  return formatOfficeAddress(office).replace(/\n/g, ", ");
}

/**
 * Builds a Google Maps search URL from the formatted address.
 * TODO: Replace with a pinned Google Maps place URL when the final link is supplied.
 */
export function buildMapsSearchHref(office: PrimaryOffice): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formatOfficeAddressInline(office))}`;
}
