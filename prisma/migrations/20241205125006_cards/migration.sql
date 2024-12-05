-- CreateEnum
CREATE TYPE "cardType" AS ENUM ('CREDIT', 'DEBIT');

-- CreateTable
CREATE TABLE "Cards" (
    "id" SERIAL NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "cvv" TEXT NOT NULL,
    "cardHolder" TEXT NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "type" "accountType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cards_cardNumber_key" ON "Cards"("cardNumber");
