-- AlterTable
ALTER TABLE "newsletter_subscribers" ADD COLUMN "confirmationExpiresAt" TIMESTAMP(3),
ADD COLUMN "unsubscribeToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "newsletter_subscribers_unsubscribeToken_key" ON "newsletter_subscribers"("unsubscribeToken");
