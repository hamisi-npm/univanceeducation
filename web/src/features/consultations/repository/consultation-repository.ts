import type { Consultation } from "@/generated/prisma/client";

import { getPrisma } from "@/lib/db/prisma";
import type { ConsultationCreateData } from "@/features/consultations/types";

export async function createConsultation(
  data: ConsultationCreateData,
): Promise<Consultation> {
  return getPrisma().consultation.create({
    data: {
      fullName: data.fullName,
      email: data.email.toLowerCase(),
      phone: data.phone,
      preferredDestination: data.preferredDestination,
      preferredIntake: data.preferredIntake,
      studyLevel: data.studyLevel,
      message: data.message,
      source: data.source,
      ipHash: data.ipHash,
    },
  });
}

export async function findConsultationById(
  id: string,
): Promise<Consultation | null> {
  return getPrisma().consultation.findFirst({
    where: { id, archived: false },
  });
}
