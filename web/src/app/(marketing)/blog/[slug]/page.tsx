import { notFound } from "next/navigation";

import { ArticleJsonLd } from "@/components/seo/article-json-ld";
import { DetailJsonLd } from "@/components/seo/detail-json-ld";
import { BlogPostDetailView } from "@/features/blog/components/blog-post-detail-view";
import { createMetadata } from "@/lib/metadata";
import { getBlogPostBySlug, getBlogSlugs } from "@/services/blog";
import { getSiteConfig } from "@/services/site";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  const site = await getSiteConfig();

  return createMetadata(
    {
      title: post.seo?.title ?? post.title,
      description: post.seo?.description ?? post.summary,
      path: `/blog/${slug}`,
    },
    site,
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const site = await getSiteConfig();
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${slug}` },
  ];

  return (
    <main id="main-content">
      <DetailJsonLd breadcrumbs={breadcrumbs} />
      <ArticleJsonLd article={post} site={site} />
      <BlogPostDetailView post={post} />
    </main>
  );
}
