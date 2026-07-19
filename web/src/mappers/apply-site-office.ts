import type { ContactPageData } from "@/types/contact";
import type { FooterContent } from "@/features/footer/types";
import type { SiteConfig } from "@/types/site";
import {
  buildMapsSearchHref,
  formatOfficeAddressInline,
} from "@/lib/format-office-address";

function resolveMapsHref(site: SiteConfig): string {
  return site.contact.mapsHref?.trim() || buildMapsSearchHref(site.office);
}

function isOfficeAddressItem(item: FooterContent["contact"]["items"][number]): boolean {
  return item.id === "address" || item.label.toLowerCase().includes("address");
}

function isOfficeContactMethod(
  method: ContactPageData["contactMethods"]["methods"][number],
): boolean {
  return method.id === "office" || method.icon === "map-pin";
}

/** Applies canonical site office address and maps link to contact page content. */
export function applySiteOfficeToContactPage(
  page: ContactPageData,
  site: SiteConfig,
): ContactPageData {
  const address = site.contact.address;
  const mapsHref = resolveMapsHref(site);
  const officeSummary = formatOfficeAddressInline(site.office);

  return {
    ...page,
    contactMethods: {
      ...page.contactMethods,
      methods: page.contactMethods.methods.map((method) =>
        isOfficeContactMethod(method) ? { ...method, value: officeSummary } : method,
      ),
    },
    officeLocation: {
      ...page.officeLocation,
      address,
      mapsHref,
    },
  };
}

/** Applies canonical site office address to footer contact items. */
export function applySiteOfficeToFooter(
  footer: FooterContent,
  site: SiteConfig,
): FooterContent {
  return {
    ...footer,
    contact: {
      ...footer.contact,
      items: footer.contact.items.map((item) =>
        isOfficeAddressItem(item) ? { ...item, value: site.contact.address } : item,
      ),
    },
  };
}
