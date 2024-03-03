-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_race_id_fkey";

-- AlterTable
ALTER TABLE "Pet" ALTER COLUMN "race_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_race_id_fkey" FOREIGN KEY ("race_id") REFERENCES "Race"("id") ON DELETE SET NULL ON UPDATE CASCADE;
