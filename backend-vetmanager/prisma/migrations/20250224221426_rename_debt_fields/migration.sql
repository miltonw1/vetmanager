/*
  Warnings:

  - You are about to drop the column `createdAt` on the `DebtLog` table. All the data in the column will be lost.
  - You are about to drop the column `newDebt` on the `DebtLog` table. All the data in the column will be lost.
  - You are about to drop the column `previousDebt` on the `DebtLog` table. All the data in the column will be lost.
  - Added the required column `new_debt` to the `DebtLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `previous_debt` to the `DebtLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DebtLog" DROP COLUMN "createdAt",
DROP COLUMN "newDebt",
DROP COLUMN "previousDebt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "new_debt" TEXT NOT NULL,
ADD COLUMN     "previous_debt" TEXT NOT NULL;
