import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbListJsonLd } from "@/lib/seo/json-ld";
import { pageSeo, type PageSeoPath } from "@/lib/seo/routes";

type PageJsonLdProps = {
  path: PageSeoPath;
};

export function PageJsonLd({ path }: PageJsonLdProps) {
  const breadcrumbs = pageSeo[path].breadcrumbs;

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return <JsonLd data={breadcrumbListJsonLd(breadcrumbs)} />;
}
