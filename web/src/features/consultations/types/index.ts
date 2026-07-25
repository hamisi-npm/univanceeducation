import type { Consultation, ConsultationStatus } from "@/generated/prisma/client";
import type { CreateConsultationInput } from "@/features/consultations/validation";

export type { Consultation, ConsultationStatus };

export type CreateConsultationResult = {
  id: string;
  status: ConsultationStatus;
  createdAt: string;
};

export type CreateConsultationContext = {
  source: string;
  ipHash: string | null;
};

export type ConsultationCreateData = CreateConsultationInput &
  CreateConsultationContext;
