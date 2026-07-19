import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbListJsonLd } from "@/lib/seo/json-ld";
import type { BreadcrumbItem } from "@/lib/seo/routes";

type DetailJsonLdProps = {
  breadcrumbs: BreadcrumbItem[];
};

export function DetailJsonLd({ breadcrumbs }: DetailJsonLdProps) {
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return <JsonLd data={breadcrumbListJsonLd(breadcrumbs)} />;
}
