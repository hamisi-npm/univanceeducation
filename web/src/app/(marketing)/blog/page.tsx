import {
  ArticleGrid,
  BlogCta,
  BlogHero,
  FeaturedPost,
  GuidesSection,
  Newsletter,
} from "@/features/blog";
import { BlogJsonLd } from "@/components/seo/blog-json-ld";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { createCmsPageMetadata } from "@/lib/metadata";
import { getBlogPage } from "@/services/blog";
import { getSiteConfig } from "@/services/site";

export async function generateMetadata() {
  const blog = await getBlogPage();
  return createCmsPageMetadata("/blog", blog.seo);
}

export default async function BlogPage() {
  const [blog, site] = await Promise.all([getBlogPage(), getSiteConfig()]);
  const listArticles = [blog.featuredArticle, ...blog.latestArticleList];

  return (
    <main id="main-content">
      <PageJsonLd path="/blog" />
      <BlogJsonLd articles={listArticles} site={site} />
      <BlogHero content={blog.hero} />
      <FeaturedPost content={blog.featuredPost} article={blog.featuredArticle} />
      <ArticleGrid
        content={blog.latestArticles}
        articles={blog.latestArticleList}
        categoryOptions={blog.categoryOptions}
      />
      <GuidesSection content={blog.guides} />
      <Newsletter content={blog.newsletter} />
      <BlogCta content={blog.cta} />
    </main>
  );
}
