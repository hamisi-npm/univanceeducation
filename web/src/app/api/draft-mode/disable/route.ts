import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Disables Next.js Draft Mode.
 * Requires the same `SANITY_PREVIEW_SECRET` used by `/api/draft-mode/enable`.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const expected = process.env.SANITY_PREVIEW_SECRET?.trim();

  if (!expected || secret !== expected) {
    return new NextResponse("Invalid preview secret", { status: 401 });
  }

  const draft = await draftMode();
  draft.disable();
  return NextResponse.redirect(new URL("/", request.url));
}
