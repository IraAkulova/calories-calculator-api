-- CreateTable
CREATE TABLE "diary_records" (
    "id" SERIAL NOT NULL,
    "diaryId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "diary_records_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "diary_records" ADD CONSTRAINT "diary_records_diaryId_fkey" FOREIGN KEY ("diaryId") REFERENCES "diaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diary_records" ADD CONSTRAINT "diary_records_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
