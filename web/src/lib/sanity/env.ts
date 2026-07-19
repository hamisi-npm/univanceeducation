function assertValue<T>(value: T | undefined, errorMessage: string): T {
  if (value === undefined) {
    throw new Error(errorMessage);
  }

  return value;
}

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET",
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID",
);

/** Pin to a fixed date — do not use `new Date()` here. */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-03-01";
