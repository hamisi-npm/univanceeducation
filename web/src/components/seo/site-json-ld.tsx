import { JsonLd } from "@/components/seo/json-ld";
import {
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo/json-ld";
import type { SiteConfig } from "@/types/site";

type SiteJsonLdProps = {
  site: SiteConfig;
};

export function SiteJsonLd({ site }: SiteJsonLdProps) {
  return (
    <>
      <JsonLd data={organizationJsonLd(site)} />
      <JsonLd data={websiteJsonLd(site)} />
    </>
  );
}
