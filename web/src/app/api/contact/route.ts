import {
  contactMethodNotAllowed,
  handleCreateConsultation,
} from "@/features/consultations";

export const dynamic = "force-dynamic";

export const GET = contactMethodNotAllowed;
export const PUT = contactMethodNotAllowed;
export const PATCH = contactMethodNotAllowed;
export const DELETE = contactMethodNotAllowed;

export const POST = handleCreateConsultation;
