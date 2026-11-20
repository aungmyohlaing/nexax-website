/** Production public canonical origin. Default for SEO helpers and tests. */
export const CANONICAL_ORIGIN = "https://www.nexaxtech.com"

/** Staging public origin (for tests and documentation). */
export const STAGING_ORIGIN = "https://staging.nexaxtech.com"

/**
 * Drop a trailing slash, query, and hash. `/` stays `/`.
 * @param {string} path
 */
export const normalizePath = (path) => {
  if (!path) return "/"
  const bare = path.split("?")[0]?.split("#")[0] ?? "/"
  if (bare.length > 1 && bare.endsWith("/")) return bare.slice(0, -1) || "/"
  return bare || "/"
}

/**
 * Locale implied by the URL. `/my` and `/my/...` are Burmese.
 * Every other path, including `/` and `/erp`, is English.
 * @param {string} path
 * @returns {"en" | "my"}
 */
export const localeFromPath = (path) => {
  const normalized = normalizePath(path)
  if (normalized === "/my" || normalized.startsWith("/my/")) return "my"
  return "en"
}

/**
 * @param {string} path
 * @returns {"home" | "erp" | null}
 */
export const pageKind = (path) => {
  const normalized = normalizePath(path)
  if (normalized === "/" || normalized === "/my") return "home"
  if (normalized === "/erp" || normalized === "/my/erp") return "erp"
  return null
}

/**
 * Language-switch target. Unknown paths fall back to that language's homepage.
 * @param {string} path
 * @param {"en" | "my"} next
 */
export const pairedLocalePath = (path, next) => {
  const normalized = normalizePath(path)
  const isMy = normalized === "/my" || normalized.startsWith("/my/")
  const base = isMy
    ? (normalized === "/my" ? "/" : normalized.slice("/my".length) || "/")
    : normalized

  if (next === "my") {
    return base === "/erp" ? "/my/erp" : "/my"
  }
  return base === "/erp" ? "/erp" : "/"
}

/**
 * Absolute canonical URL for a localized public page, or null.
 * @param {string} path
 * @param {string} [origin] public site origin (defaults to production)
 */
export const canonicalUrl = (path, origin = CANONICAL_ORIGIN) => {
  const kind = pageKind(path)
  if (!kind) return null
  if (kind === "home") {
    return localeFromPath(path) === "my" ? `${origin}/my` : `${origin}/`
  }
  return localeFromPath(path) === "my" ? `${origin}/my/erp` : `${origin}/erp`
}

/**
 * Reciprocal alternates. ERP `x-default` is the English homepage, as specified.
 * @param {"home" | "erp"} kind
 * @param {string} [origin] public site origin (defaults to production)
 */
export const hreflangAlternates = (kind, origin = CANONICAL_ORIGIN) => {
  if (kind === "erp") {
    return [
      { hreflang: "en", href: `${origin}/erp` },
      { hreflang: "my", href: `${origin}/my/erp` },
      { hreflang: "x-default", href: `${origin}/` },
    ]
  }
  return [
    { hreflang: "en", href: `${origin}/` },
    { hreflang: "my", href: `${origin}/my` },
    { hreflang: "x-default", href: `${origin}/` },
  ]
}
