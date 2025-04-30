import { Context, Next } from "hono";

const RATE_LIMIT = 200; // Max 5 requests per minute
const WINDOW_TIME = 60; // Time window in seconds

export const rateLimiterMiddleware = async (c: Context, next: Next) => {
  const ip =
    c.req.raw.headers.get("CF-Connecting-IP") ||
    c.req.raw.headers.get("X-Forwarded-For") ||
    c.req.raw.headers.get("x-real-ip") ||
    "unknown";

  const key = `rate-limit:${ip}`;
  const env = c.env as { RATE_LIMIT_KV: KVNamespace }; // Ensure KV namespace is available

  // Get the current request count
  const requestCount = parseInt((await env.RATE_LIMIT_KV.get(key)) || "0", 10);

  if (requestCount >= RATE_LIMIT) {
    return c.json({ error: "Too many requests, slow down!" }, 429);
  }
  // Increment the request count and set TTL
  await env.RATE_LIMIT_KV.put(key, (requestCount + 1).toString(), { expirationTtl: WINDOW_TIME });
  await next();
};
