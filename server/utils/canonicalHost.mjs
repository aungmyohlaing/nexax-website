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

/** Pathnames that 301 to the same page without the trailing slash. */
const TRAILING_SLASH_TARGETS = {
  "/erp/": "/erp",
  "/my/": "/my",
  "/my/erp/": "/my/erp",
}

/** Slash-free target path, or null when this pathname should not redirect. */
export const trailingSlashTarget = (pathname) =>
  TRAILING_SLASH_TARGETS[pathname] ?? null

/**
 * Canonical www URL for a trailing-slash variant, preserving the query string.
 * @param {string} pathname
 * @param {string} [search] value of `URL.search` (`""` or `"?a=1"`)
 */
export const buildTrailingSlashCanonicalUrl = (pathname, search = "") => {
  const target = trailingSlashTarget(pathname)
  if (!target) return null
  const query = search && search !== "?" ? search : ""
  return `${CANONICAL_ORIGIN}${target}${query}`
}

/** True for `/erp/` and not for `/erp`, `/`, or deeper paths. */
export const shouldRedirectErpTrailingSlash = (pathname) =>
  trailingSlashTarget(pathname) === "/erp"

/**
 * Canonical ERP URL on the www origin, preserving a query string.
 * @param {string} [search] value of `URL.search` (`""` or `"?a=1"`)
 */
export const buildErpCanonicalUrl = (search = "") =>
  buildTrailingSlashCanonicalUrl("/erp/", search)
