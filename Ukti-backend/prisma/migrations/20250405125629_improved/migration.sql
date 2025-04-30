/*
  Warnings:

  - A unique constraint covering the columns `[articleId,userId]` on the table `Bookmark` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Bookmark" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_articleId_userId_key" ON "Bookmark"("articleId", "userId");
