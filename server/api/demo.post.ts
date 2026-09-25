import { Resend } from "resend"
import { SITE } from "../../constants/site"
import { clientIp, consumeRateLimit } from "../utils/rateLimit"

type DemoBody = {
  source?: "erp" | "contact"
  company?: string
  name?: string
  phone?: string
  email?: string
  business?: string
  product?: string
  note?: string
  /** Honeypot — must stay empty */
  website?: string
}

const MAX_LEN = {
  company: 120,
  name: 120,
  phone: 40,
  email: 160,
  business: 2000,
  product: 40,
  note: 2000,
} as const

const trim = (value: unknown, max: number) =>
  String(value ?? "")
    .trim()
    .slice(0, max)

export default defineEventHandler(async (event) => {
  const body = await readBody<DemoBody>(event).catch(() => null)
  if (!body || typeof body !== "object") {
    throw createError({ statusCode: 400, statusMessage: "Invalid request" })
  }

  // Bots that fill hidden fields — pretend success, do not email
  if (trim(body.website, 200)) {
    return { ok: true }
  }

  const ip = clientIp(event)
  const rate = consumeRateLimit(`demo:${ip}`, 3, 15 * 60 * 1000)
  if (!rate.ok) {
    setHeader(event, "Retry-After", rate.retryAfterSec)
    throw createError({
      statusCode: 429,
      statusMessage: "Too many requests. Please try again later.",
    })
  }

  const source = body.source === "contact" ? "contact" : "erp"
  const company = trim(body.company, MAX_LEN.company)
  const name = trim(body.name, MAX_LEN.name)
  const phone = trim(body.phone, MAX_LEN.phone)
  const email = trim(body.email, MAX_LEN.email)
  const business = trim(body.business, MAX_LEN.business)
  const product = trim(body.product, MAX_LEN.product)
  const note = trim(body.note, MAX_LEN.note)

  if (source === "erp") {
    if (!company || !phone || !email || !business) {
      throw createError({ statusCode: 400, statusMessage: "Missing required fields" })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw createError({ statusCode: 400, statusMessage: "Invalid email" })
    }
  } else if (!name || !business || !phone) {
    throw createError({ statusCode: 400, statusMessage: "Missing required fields" })
  }

  // Soft dedupe: same contact within 1 hour
  const dedupeKey = `dedupe:${source}:${(email || phone).toLowerCase()}`
  const dedupe = consumeRateLimit(dedupeKey, 1, 60 * 60 * 1000)
  if (!dedupe.ok) {
    return { ok: true, duplicate: true }
  }

  const config = useRuntimeConfig()
  const apiKey = String(config.resendApiKey || process.env.RESEND_API_KEY || "")
  const from = String(config.resendFrom || process.env.RESEND_FROM || "")
  const to = String(config.resendTo || process.env.RESEND_TO || SITE.contactEmail)

  if (!apiKey || !from) {
    console.error("[demo] Resend is not configured (RESEND_API_KEY / RESEND_FROM)")
    throw createError({
      statusCode: 503,
      statusMessage: "Email service is not configured",
    })
  }

  const subject =
    source === "erp"
      ? `NexaX ERP demo request — ${company}`
      : `Demo request — ${product || "NexaX"}`

  const lines =
    source === "erp"
      ? [
          "Source: ERP page",
          `Company: ${company}`,
          `Phone: ${phone}`,
          `Email: ${email}`,
          `Business: ${business}`,
          `IP: ${ip}`,
        ]
      : [
          "Source: Homepage contact",
          `Name: ${name}`,
          `Business: ${business}`,
          `Phone / Viber: ${phone}`,
          product ? `Product: ${product}` : "",
          note ? `Notes: ${note}` : "",
          `IP: ${ip}`,
        ].filter(Boolean)

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from,
    to: [to],
    ...(email ? { replyTo: email } : {}),
    subject,
    text: lines.join("\n"),
  })

  if (error) {
    console.error("[demo] Resend error", error)
    throw createError({
      statusCode: 502,
      statusMessage: "Failed to send email",
    })
  }

  return { ok: true }
})
