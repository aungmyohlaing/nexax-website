/**
 * Resolve Resend settings from Nuxt server runtime config only.
 * No legacy RESEND_* fallback and no baked-in recipient.
 *
 * @param {{ resendApiKey?: unknown, resendFrom?: unknown, resendTo?: unknown } | null | undefined} runtimeConfig
 */
export const resolveResendConfig = (runtimeConfig) => ({
  apiKey: String(runtimeConfig?.resendApiKey ?? "").trim(),
  from: String(runtimeConfig?.resendFrom ?? "").trim(),
  to: String(runtimeConfig?.resendTo ?? "").trim(),
})

/**
 * @param {{ apiKey: string, from: string, to: string }} config
 */
export const isResendConfigured = (config) =>
  Boolean(config.apiKey && config.from && config.to)
