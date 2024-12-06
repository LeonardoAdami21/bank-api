/*
  Warnings:

  - Added the required column `accountId` to the `Investiments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Investiments" ADD COLUMN     "accountId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Investiments" ADD CONSTRAINT "Investiments_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
