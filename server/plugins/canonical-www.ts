import { getRequestHeader, getRequestURL, sendRedirect } from "h3"
import {
  buildTrailingSlashCanonicalUrl,
  buildWwwRedirectUrl,
  resolveRequestHostname,
  shouldRedirectApexToWww,
} from "../utils/canonicalHost.mjs"

/**
 * Apex → www must run before Nitro's static/prerender asset middleware.
 * `server/middleware` is registered after static handlers, so prerendered
 * `/` and `/erp` were served as 200 HTML and never hit the redirect.
 * Prepending on `h3App.stack` fixes that on Cloud Run.
 *
 * Host selection prefers the request Host header. X-Forwarded-Host is only
 * used when Host is absent and the forwarded value is allowlisted.
 */
export default defineNitroPlugin((nitroApp) => {
  nitroApp.h3App.stack.unshift({
    route: "/",
    handler: defineEventHandler((event) => {
      const url = getRequestURL(event)
      const host = getRequestHeader(event, "host")
      const forwarded = getRequestHeader(event, "x-forwarded-host")
      const requestHost = resolveRequestHostname(host, forwarded)

      // Fold trailing-slash copies onto the slash-free URL before the apex
      // check, so www and apex both land on the slash-free www URL in one hop.
      const slashTarget = buildTrailingSlashCanonicalUrl(
        url.pathname,
        url.search,
        requestHost,
      )
      if (slashTarget) {
        return sendRedirect(event, slashTarget, 301)
      }

      if (!shouldRedirectApexToWww(requestHost)) {
        return
      }

      const target = buildWwwRedirectUrl(`${url.pathname}${url.search}`)
      return sendRedirect(event, target, 301)
    }),
  })
})
