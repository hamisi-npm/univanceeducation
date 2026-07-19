import { JsonLd } from "@/components/seo/json-ld";
import type { BlogArticle } from "@/features/blog/types";
import { articleJsonLd } from "@/lib/seo/json-ld";
import type { SiteConfig } from "@/types/site";

type ArticleJsonLdProps = {
  article: BlogArticle;
  site: SiteConfig;
};

export function ArticleJsonLd({ article, site }: ArticleJsonLdProps) {
  return <JsonLd data={articleJsonLd(article, site)} />;
}
