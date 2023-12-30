-- CreateTable
CREATE TABLE "PetHistory" (
    "id" SERIAL NOT NULL,
    "pet_id" INTEGER NOT NULL,
    "diagnostic" TEXT NOT NULL,
    "observation" TEXT,
    "weight" DECIMAL(65,30),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PetHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetHistoryImage" (
    "id" SERIAL NOT NULL,
    "pet_history_id" INTEGER NOT NULL,
    "image_src" TEXT,
    "image_url" TEXT,

    CONSTRAINT "PetHistoryImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PetHistory" ADD CONSTRAINT "PetHistory_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetHistoryImage" ADD CONSTRAINT "PetHistoryImage_pet_history_id_fkey" FOREIGN KEY ("pet_history_id") REFERENCES "PetHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
