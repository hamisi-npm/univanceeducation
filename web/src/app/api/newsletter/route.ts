import {
  handleSubscribeNewsletter,
  newsletterMethodNotAllowed,
} from "@/features/newsletter";

export const dynamic = "force-dynamic";

export const GET = newsletterMethodNotAllowed;
export const PUT = newsletterMethodNotAllowed;
export const PATCH = newsletterMethodNotAllowed;
export const DELETE = newsletterMethodNotAllowed;

export const POST = handleSubscribeNewsletter;
