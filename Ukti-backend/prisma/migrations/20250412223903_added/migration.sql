/*
  Warnings:

  - A unique constraint covering the columns `[tag,articleId]` on the table `ArticleTag` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ArticleTag" DROP CONSTRAINT "ArticleTag_articleId_fkey";

-- AlterTable
ALTER TABLE "ArticleTag" ALTER COLUMN "articleId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "tag" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "ArticleTag_tag_articleId_key" ON "ArticleTag"("tag", "articleId");

-- AddForeignKey
ALTER TABLE "ArticleTag" ADD CONSTRAINT "ArticleTag_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE SET NULL ON UPDATE CASCADE;
