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

  const redirectTo = searchParams.get("sanity-preview-pathname") || "/";
  return NextResponse.redirect(new URL(redirectTo, request.url));
}
