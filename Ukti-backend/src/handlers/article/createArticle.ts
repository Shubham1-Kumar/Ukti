import { Context } from "hono";
import { createPrismaClient } from "../../db/client";
import { processDeltaAndUploadImages, UploadImage } from "../cloud/upload";

export const createArticleDraft = async (c: Context) => {
  const prisma = createPrismaClient(c.env);
  const { id: userId } = c.get("user");

  const { body } = c.get("validatedData");
  const { title, content, tags = [], categoryId, description, coverImage, status } = body;

  // Process images: upload and replace base64 with CDN URLs 
  const { updatedDelta } = await processDeltaAndUploadImages(content, c.env);

  // Estimate reading time (basic: 200 words/minute)
  const plainText = updatedDelta.ops
    .map((op: any) => (typeof op.insert === "string" ? op.insert : ""))
    .join("");

  const wordCount = plainText.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  // Build data object conditionally
  const articleData: any = {
    title,
    categoryId,
    content: { text: updatedDelta },
    authorId: userId,
    readingTime,
    status,
    description,
  };

  console.log("cover Image",coverImage);
  
  if (coverImage) {
    console.log("reached here");
    
    const CoverImageUrl = await UploadImage(coverImage, c.env) // takes image uploads it and returns the cdn url
    console.log("Loging the cover image url",CoverImageUrl);
    articleData.coverImage = CoverImageUrl ?? "";
  }

  console.log(" not reached here");
 
  // Create the article
  const article = await prisma.article.create({
    data: articleData,
  });

  // Add tags (if any)
  if (tags.length > 0) {
    const tagData = tags.map((tag: any) => ({
      tag,
      articleId: article.id,
    }));
    await prisma.articleTag.createMany({
      data: tagData,
    });
  }
  return c.json({ message: "Article created successfully", article }, 201);
};