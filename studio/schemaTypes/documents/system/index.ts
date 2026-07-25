import type { SchemaTypeDefinition } from "sanity";

import { cookiePolicy } from "./cookiePolicy";
import { emailTemplate } from "./emailTemplate";
import { newsletterPage } from "./newsletterPage";
import { systemMessages } from "./systemMessages";

export const systemDocumentTypes: SchemaTypeDefinition[] = [
  newsletterPage,
  emailTemplate,
  systemMessages,
  cookiePolicy,
];

export {
  cookiePolicy,
  emailTemplate,
  newsletterPage,
  systemMessages,
};
