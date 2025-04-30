import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/cloudfront-signer";
import { v4 as uuidv4 } from "uuid";

// Function to convert base64 to Uint8Array for Workers
function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Upload to S3
export async function uploadBase64ImageToS3(
  base64Image: string,
  path: string,
  env: any
) {
  const fileType = base64Image.split(";")[0].split("/")[1]; // e.g., png, jpeg
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");

  const s3 = new S3Client({
    region: env.AWS_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const uploadParams = new PutObjectCommand({
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: path,
    Body: base64ToUint8Array(base64Data),
    ContentType: `image/${fileType}`,
  });

  await s3.send(uploadParams);
  return path; // returning path to be used with CloudFront
}

// Generate CloudFront Signed URL
export function generateCloudFrontSignedUrl(
  imageKey: string,
  env: any
): string {
  const url = `${env.CLOUDFRONT_DISTRIBUTION_URL}/${imageKey}`;
  return getSignedUrl({
    url,
    keyPairId: env.CLOUDFRONT_KEY_PAIR_ID,
    dateLessThan: new Date(Date.now() + 60 * 60 * 1000), // expires in 1 hour/
    privateKey: env.CLOUDFRONT_PRIVATE_KEY.replace(/\\n/g, "\n"),
  });
}

export function generateCloudFrontPublicUrls(
  imageKey: string,
  env: any
): string {
  return `${env.CLOUDFRONT_DISTRIBUTION_URL}/${imageKey}`;
}

// Main function to parse Delta JSON and upload images
export async function processDeltaAndUploadImages(delta: any, env: any) {
  const imageUrls: string[] = [];

  for (const op of delta.ops) {
    const img = op.insert?.image;

    if (!img) continue;

    // CASE 1: Already a public URL
    if (typeof img === "string" && !img.startsWith("data:image")) {
      imageUrls.push(img);
      continue;
    }

    // CASE 2: Base64 Image
    try {
      const ext = img.split(";")[0].split("/")[1] || "png";
      let base64Data = img.replace(/^data:image\/\w+;base64,/, "");

      // Clean base64 (only valid characters)
      base64Data = base64Data.replace(/[^A-Za-z0-9+/=]/g, "");

      // Rebuild full base64 image string after cleaning
      const cleanBase64Image = `data:image/${ext};base64,${base64Data}`;

      const imagePath = `uploads/${uuidv4()}.${ext}`;

      // Upload
      await uploadBase64ImageToS3(cleanBase64Image, imagePath, env);

      const signedUrl = generateCloudFrontPublicUrls(imagePath, env);
      imageUrls.push(signedUrl);

      // Replace base64 in delta with image URL
      op.insert.image = signedUrl;
    } catch (error) {
      console.error("Image upload failed for op:", op, "Error:", error);
      // Optionally skip or throw based on use case
    }
  }

  return {
    updatedDelta: delta,
    imageUrls,
  };
}

// Upload a single image to the bucket and cdn
export async function UploadImage(img: string, env: any) {
  if (!img) return;
  // CASE 1: Already a public URL
  if (typeof img === "string" && !img.startsWith("data:image")) {
    return img;
  }

  // CASE 2: Base64 Image
  try {
    const ext = img.split(";")[0].split("/")[1] || "png";
    let base64Data = img.replace(/^data:image\/\w+;base64,/, "");

    // Clean base64 (only valid characters)
    base64Data = base64Data.replace(/[^A-Za-z0-9+/=]/g, "");

    // Rebuild full base64 image string after cleaning
    const cleanBase64Image = `data:image/${ext};base64,${base64Data}`;

    const imagePath = `uploads/${uuidv4()}.${ext}`;

    // Upload
    await uploadBase64ImageToS3(cleanBase64Image, imagePath, env);
    return generateCloudFrontPublicUrls(imagePath, env);
  } catch (error) {
    console.error("Image upload Failed", error);
    throw new Error("Failed to process and upload image.");
  }
}
