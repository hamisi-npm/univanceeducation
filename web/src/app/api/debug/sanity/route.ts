import { NextResponse } from "next/server";

import { sanityClient } from "@/lib/sanity/client";
import { apiVersion, dataset, projectId } from "@/lib/sanity/env";
import {
  SANITY_REVALIDATE_SECONDS,
  sanityTags,
} from "@/lib/sanity/cache-tags";
import { sanityFetch } from "@/lib/sanity/fetch";

/**
 * TEMPORARY diagnostics endpoint — Milestone 4.2.3.
 * Delete this route after the production CMS visibility issue is identified.
 */
export const dynamic = "force-dynamic";

const HOMEPAGE_DEBUG_QUERY = `*[_type=="homepage"][0]{
  _id,
  _type,
  _updatedAt,
  "headline": hero.headline
}`;

const isDevelopment = process.env.NODE_ENV === "development";
const useCdn = process.env.NODE_ENV !== "development";

type HomepageDebugResult = {
  _id: string;
  _type: string;
  _updatedAt: string;
  headline: string | null;
};

export async function GET() {
  const revalidateSecretConfigured = Boolean(
    process.env.SANITY_REVALIDATE_SECRET?.trim(),
  );

  let rawClient: HomepageDebugResult | null = null;
  let rawClientError: string | null = null;

  try {
    // Live read via the same client the app uses — no mappers, no fallbacks.
    rawClient = await sanityClient.fetch<HomepageDebugResult | null>(
      HOMEPAGE_DEBUG_QUERY,
      {},
      { cache: "no-store" },
    );
  } catch (error) {
    rawClientError =
      error instanceof Error ? error.name : "SanityClientFetchError";
  }

  let sanityFetchData: HomepageDebugResult | null = null;
  let sanityFetchError: string | null = null;
  let sanityFetchException = false;

  try {
    sanityFetchData = await sanityFetch<HomepageDebugResult>({
      query: HOMEPAGE_DEBUG_QUERY,
      tags: [sanityTags.homepage],
    });
  } catch (error) {
    // sanityFetch normally swallows errors; this catches unexpected throws.
    sanityFetchException = true;
    sanityFetchError =
      error instanceof Error ? error.name : "SanityFetchUnexpectedError";
  }

  const sanityFetchSuccess =
    !sanityFetchException && sanityFetchData !== null;
  const usedFallback = !sanityFetchException && sanityFetchData === null;

  const cacheMode = isDevelopment
    ? "no-store"
    : `revalidate:${SANITY_REVALIDATE_SECONDS}`;

  return NextResponse.json({
    runtime: {
      nodeEnv: process.env.NODE_ENV ?? null,
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? null,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? null,
      apiVersion:
        process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? apiVersion,
      useCdn,
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? null,
      revalidateSecretConfigured,
    },
    client: {
      projectId,
      dataset,
      apiVersion,
      useCdn,
    },
    rawClient,
    rawClientError,
    sanityFetch: {
      success: sanityFetchSuccess,
      usedFallback,
      error: sanityFetchError,
      data: sanityFetchData,
    },
    cache: {
      nodeEnv: process.env.NODE_ENV ?? null,
      mode: cacheMode,
      revalidate: isDevelopment ? null : SANITY_REVALIDATE_SECONDS,
      tags: [sanityTags.homepage, sanityTags.global],
      useCdn,
    },
    webhook: {
      revalidateSecretConfigured,
      webhookRouteExists: true,
    },
  });
}
