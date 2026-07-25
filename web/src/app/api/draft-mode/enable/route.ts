import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Enables Next.js Draft Mode for Presentation / Visual Editing.
 * Studio Presentation Tool calls this endpoint when opening a preview.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const expected = process.env.SANITY_PREVIEW_SECRET?.trim();

  if (!expected || secret !== expected) {
    return new NextResponse("Invalid preview secret", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  const redirectTo = safePreviewPath(
    searchParams.get("sanity-preview-pathname"),
  );
  return NextResponse.redirect(new URL(redirectTo, request.url));
}

/**
 * Presentation Tool may pass a pathname query param. Only same-origin
 * relative paths are accepted — absolute URLs and protocol-relative
 * targets are rejected to prevent open redirects.
 */
function safePreviewPath(value: string | null): string {
  if (!value) {
    return "/";
  }

  const trimmed = value.trim();

  if (
    !trimmed.startsWith("/") ||
    trimmed.startsWith("//") ||
    trimmed.includes("://") ||
    trimmed.includes("\\")
  ) {
    return "/";
  }

  return trimmed;
}
