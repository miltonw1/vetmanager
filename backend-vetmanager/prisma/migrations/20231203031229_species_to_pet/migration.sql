/*
  Warnings:

  - Added the required column `species_id` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "species_id" INTEGER NOT NULL,
ALTER COLUMN "genre" DROP NOT NULL,
ALTER COLUMN "life_status" SET DEFAULT 'ALIVE';

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_species_id_fkey" FOREIGN KEY ("species_id") REFERENCES "Species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
