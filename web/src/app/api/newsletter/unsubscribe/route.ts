import {
  handleUnsubscribeNewsletterRedirect,
  newsletterConfirmMethodNotAllowed,
} from "@/features/newsletter";

export const dynamic = "force-dynamic";

export const POST = newsletterConfirmMethodNotAllowed;
export const PUT = newsletterConfirmMethodNotAllowed;
export const PATCH = newsletterConfirmMethodNotAllowed;
export const DELETE = newsletterConfirmMethodNotAllowed;

export const GET = handleUnsubscribeNewsletterRedirect;
