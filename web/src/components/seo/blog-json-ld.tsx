import { JsonLd } from "@/components/seo/json-ld";
import type { BlogArticle } from "@/features/blog/types";
import { blogItemListJsonLd } from "@/lib/seo/json-ld";
import type { SiteConfig } from "@/types/site";

type BlogJsonLdProps = {
  articles: BlogArticle[];
  site: SiteConfig;
};

export function BlogJsonLd({ articles, site }: BlogJsonLdProps) {
  return <JsonLd data={blogItemListJsonLd(articles, site)} />;
}
