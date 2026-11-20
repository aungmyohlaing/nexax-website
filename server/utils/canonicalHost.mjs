/** Production apex hostname that must permanently redirect to www. */
export const APEX_HOSTNAME = "nexaxtech.com"

/** Production canonical www hostname. */
export const WWW_HOSTNAME = "www.nexaxtech.com"

/** Staging public hostname. Never redirected to production www. */
export const STAGING_HOSTNAME = "staging.nexaxtech.com"

/** Production public canonical origin (scheme + www host). */
export const CANONICAL_ORIGIN = "https://www.nexaxtech.com"

/** Staging public origin. */
export const STAGING_ORIGIN = "https://staging.nexaxtech.com"

/**
 * Trusted public origins keyed by hostname.
 * Redirect targets are taken only from this map — never from raw Host headers.
 */
const TRUSTED_ORIGINS = {
  [APEX_HOSTNAME]: CANONICAL_ORIGIN,
  [WWW_HOSTNAME]: CANONICAL_ORIGIN,
  [STAGING_HOSTNAME]: STAGING_ORIGIN,
}

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

/**
 * Trusted absolute origin for a request host, or null when the host is not a
 * known public site hostname (Cloud Run *.run.app, localhost, unknown).
 * @param {string | undefined | null} hostname
 * @returns {string | null}
 */
export const resolveTrustedOrigin = (hostname) => {
  const host = normalizeHostname(hostname)
  return TRUSTED_ORIGINS[host] ?? null
}

/** True for Cloud Run default hostnames (`*.run.app`). */
export const isRunAppHostname = (hostname) =>
  normalizeHostname(hostname).endsWith(".run.app")

/**
 * Hostname used for redirect decisions.
 *
 * Prefer `Host` whenever it is present. `X-Forwarded-Host` is consulted only
 * when `Host` is empty, and only if that forwarded value is an allowlisted
 * public hostname. This prevents untrusted forwarded headers from sending
 * staging or `*.run.app` traffic to production www.
 *
 * @param {string | undefined | null} hostHeader
 * @param {string | undefined | null} forwardedHostHeader
 */
export const resolveRequestHostname = (hostHeader, forwardedHostHeader) => {
  const host = normalizeHostname(hostHeader)
  if (host) return host

  const forwarded = normalizeHostname(forwardedHostHeader)
  if (forwarded && resolveTrustedOrigin(forwarded)) return forwarded
  return ""
}

/** True only for the bare production apex `nexaxtech.com` (not www, not staging). */
export const shouldRedirectApexToWww = (hostname) =>
  normalizeHostname(hostname) === APEX_HOSTNAME

/**
 * Build the production www redirect target, preserving path and query string.
 * Hash fragments are not sent to the server, so they are not included.
 * Only used after `shouldRedirectApexToWww` is true.
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
 * Trailing-slash redirect URL.
 *
 * Trusted public hosts get an absolute URL on their own origin.
 * Untrusted hosts (localhost, Cloud Run default hostname, unknown) get a
 * relative redirect so we never invent a canonical origin from the Host header.
 *
 * @param {string} pathname
 * @param {string} [search] value of `URL.search` (`""` or `"?a=1"`)
 * @param {string | undefined | null} [hostname] request Host / X-Forwarded-Host
 */
export const buildTrailingSlashCanonicalUrl = (
  pathname,
  search = "",
  hostname = WWW_HOSTNAME,
) => {
  const target = trailingSlashTarget(pathname)
  if (!target) return null
  const query = search && search !== "?" ? search : ""
  const origin = resolveTrustedOrigin(hostname)
  if (!origin) return `${target}${query}`
  return `${origin}${target}${query}`
}

/** True for `/erp/` and not for `/erp`, `/`, or deeper paths. */
export const shouldRedirectErpTrailingSlash = (pathname) =>
  trailingSlashTarget(pathname) === "/erp"

/**
 * Canonical ERP URL for a trailing-slash request, preserving a query string.
 * @param {string} [search] value of `URL.search` (`""` or `"?a=1"`)
 * @param {string | undefined | null} [hostname]
 */
export const buildErpCanonicalUrl = (search = "", hostname = WWW_HOSTNAME) =>
  buildTrailingSlashCanonicalUrl("/erp/", search, hostname)
