/*
  Warnings:

  - Made the column `phone` on table `Client` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "phone" SET NOT NULL;
