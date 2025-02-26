-- CreateTable
CREATE TABLE "DebtLog" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "previousDebt" TEXT NOT NULL,
    "newDebt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DebtLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DebtLog" ADD CONSTRAINT "DebtLog_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
