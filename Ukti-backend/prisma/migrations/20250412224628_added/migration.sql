/*
  Warnings:

  - You are about to drop the column `tag` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "tag",
ADD COLUMN     "tags" TEXT[];
