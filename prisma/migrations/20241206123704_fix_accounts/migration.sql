/*
  Warnings:

  - You are about to drop the column `accoutNumber` on the `Accounts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accountNumber]` on the table `Accounts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountNumber` to the `Accounts` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Accounts_accoutNumber_key";

-- AlterTable
ALTER TABLE "Accounts" DROP COLUMN "accoutNumber",
ADD COLUMN     "accountNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_accountNumber_key" ON "Accounts"("accountNumber");
