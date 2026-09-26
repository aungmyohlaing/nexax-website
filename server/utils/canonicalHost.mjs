/** Apex hostname that must permanently redirect to www. */
export const APEX_HOSTNAME = "nexaxtech.com"

/** Public canonical origin (scheme + www host). */
export const CANONICAL_ORIGIN = "https://www.nexaxtech.com"

/**
 * Normalize a Host / X-Forwarded-Host value to a bare hostname.
 * Strips optional port, trailing DNS dots, and lowercases; empty/invalid → "".
 * @param {string | undefined | null} raw
 */
export const normalizeHostname = (raw) => {
  if (!raw) return ""
  const first = raw.split(",")[0]?.trim() ?? ""
  if (!first) return ""
  // Bracketed IPv6 with port: [::1]:3000
  if (first.startsWith("[")) {
    const end = first.indexOf("]")
    if (end > 0) return first.slice(1, end).toLowerCase()
  }
  // hostname:port (avoid splitting IPv6 without brackets)
  const colon = first.indexOf(":")
  const host = colon === -1 ? first : first.slice(0, colon)
  return host.replace(/\.$/, "").toLowerCase()
}

/** True only for the bare apex `nexaxtech.com` (not www, not other hosts). */
export const shouldRedirectApexToWww = (hostname) =>
  normalizeHostname(hostname) === APEX_HOSTNAME

/**
 * Build the www redirect target, preserving path and query string.
 * Hash fragments are not sent to the server, so they are not included.
 * @param {string} pathWithQuery
 */
export const buildWwwRedirectUrl = (pathWithQuery) => {
  const path = pathWithQuery.startsWith("/") ? pathWithQuery : `/${pathWithQuery}`
  return `${CANONICAL_ORIGIN}${path}`
}
