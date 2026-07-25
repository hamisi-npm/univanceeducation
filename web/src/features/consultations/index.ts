export {
  consultationFormSchema,
  createConsultationSchema,
  type ConsultationFormValues,
  type CreateConsultationInput,
} from "@/features/consultations/validation";

export { submitConsultation } from "@/features/consultations/services/consultation-service";
export {
  handleCreateConsultation,
  contactMethodNotAllowed,
} from "@/features/consultations/api/create-consultation";
