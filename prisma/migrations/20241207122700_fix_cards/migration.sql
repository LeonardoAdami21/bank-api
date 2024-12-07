/*
  Warnings:

  - Changed the type of `type` on the `Cards` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Cards" ADD COLUMN     "isBlocked" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "type",
ADD COLUMN     "type" "cardType" NOT NULL;
