export {
  newsletterSubscribeSchema,
  newsletterConfirmSchema,
  type NewsletterSubscribeInput,
  type NewsletterConfirmInput,
} from "@/features/newsletter/validation";

export {
  subscribeNewsletter,
  resolveNewsletterConfirmationPage,
  resolveNewsletterUnsubscribePage,
} from "@/features/newsletter/services/newsletter-service";

export {
  handleSubscribeNewsletter,
  handleConfirmNewsletterRedirect,
  handleUnsubscribeNewsletterRedirect,
  newsletterMethodNotAllowed,
  newsletterConfirmMethodNotAllowed,
} from "@/features/newsletter/api/newsletter-handlers";

export { NewsletterSystemPageView } from "@/features/newsletter/components/newsletter-system-page";
