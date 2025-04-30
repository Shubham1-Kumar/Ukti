import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const createPrismaClient = (env: any) => {
    if (!env.DATABASE_URL) {
        throw new Error("DATABASE_URL is not defined in environment variables.");
    }
    return new PrismaClient({
        datasourceUrl: env.DATABASE_URL, // ✅ Pass explicitly
    }).$extends(withAccelerate());
};
