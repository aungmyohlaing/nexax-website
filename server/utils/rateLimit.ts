import type { H3Event } from "h3"

type Bucket = {
  count: number
  resetAt: number
}

const buckets = new Map<string, Bucket>()

const pruneExpired = (now: number) => {
  if (buckets.size < 500) return
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key)
  }
}

/** Returns true when the request is allowed. */
export const consumeRateLimit = (
  key: string,
  limit: number,
  windowMs: number,
): { ok: true } | { ok: false; retryAfterSec: number } => {
  const now = Date.now()
  pruneExpired(now)

  const existing = buckets.get(key)
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true }
  }

  if (existing.count >= limit) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    }
  }

  existing.count += 1
  return { ok: true }
}

export const clientIp = (event: H3Event): string => {
  const forwarded = getHeader(event, "x-forwarded-for")
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim()
    if (first) return first
  }
  const realIp = getHeader(event, "x-real-ip")
  if (realIp) return realIp
  return getRequestIP(event, { xForwardedFor: true }) || "unknown"
}
