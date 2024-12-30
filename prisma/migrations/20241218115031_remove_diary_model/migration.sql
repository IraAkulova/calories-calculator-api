/*
  Warnings:

  - You are about to drop the column `diaryId` on the `diary_records` table. All the data in the column will be lost.
  - You are about to drop the `diaries` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `diary_records` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "diaries" DROP CONSTRAINT "diaries_userId_fkey";

-- DropForeignKey
ALTER TABLE "diary_records" DROP CONSTRAINT "diary_records_diaryId_fkey";

-- AlterTable
ALTER TABLE "diary_records" DROP COLUMN "diaryId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "diaries";

-- AddForeignKey
ALTER TABLE "diary_records" ADD CONSTRAINT "diary_records_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
