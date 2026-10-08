/** Public canonical origin. Kept in sync with constants/site.ts. */
export const CANONICAL_ORIGIN = "https://www.nexaxtech.com"

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
 */
export const canonicalUrl = (path) => {
  const kind = pageKind(path)
  if (!kind) return null
  if (kind === "home") {
    return localeFromPath(path) === "my" ? `${CANONICAL_ORIGIN}/my` : `${CANONICAL_ORIGIN}/`
  }
  return localeFromPath(path) === "my" ? `${CANONICAL_ORIGIN}/my/erp` : `${CANONICAL_ORIGIN}/erp`
}

/**
 * Reciprocal alternates. ERP `x-default` is the English homepage, as specified.
 * @param {"home" | "erp"} kind
 */
export const hreflangAlternates = (kind) => {
  if (kind === "erp") {
    return [
      { hreflang: "en", href: `${CANONICAL_ORIGIN}/erp` },
      { hreflang: "my", href: `${CANONICAL_ORIGIN}/my/erp` },
      { hreflang: "x-default", href: `${CANONICAL_ORIGIN}/` },
    ]
  }
  return [
    { hreflang: "en", href: `${CANONICAL_ORIGIN}/` },
    { hreflang: "my", href: `${CANONICAL_ORIGIN}/my` },
    { hreflang: "x-default", href: `${CANONICAL_ORIGIN}/` },
  ]
}
