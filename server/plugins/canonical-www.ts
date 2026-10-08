import { getRequestHeader, getRequestURL, sendRedirect } from "h3"
import {
  buildTrailingSlashCanonicalUrl,
  buildWwwRedirectUrl,
  shouldRedirectApexToWww,
} from "../utils/canonicalHost.mjs"

/**
 * Apex → www must run before Nitro's static/prerender asset middleware.
 * `server/middleware` is registered after static handlers, so prerendered
 * `/` and `/erp` were served as 200 HTML and never hit the redirect.
 * Prepending on `h3App.stack` fixes that on Cloud Run.
 */
export default defineNitroPlugin((nitroApp) => {
  nitroApp.h3App.stack.unshift({
    route: "/",
    handler: defineEventHandler((event) => {
      const url = getRequestURL(event)

      // Fold trailing-slash copies onto the canonical URL before the apex
      // check, so www and apex both land on the slash-free www URL in one hop.
      const slashTarget = buildTrailingSlashCanonicalUrl(url.pathname, url.search)
      if (slashTarget) {
        return sendRedirect(event, slashTarget, 301)
      }

      const host = getRequestHeader(event, "host")
      const forwarded = getRequestHeader(event, "x-forwarded-host")
      if (
        !shouldRedirectApexToWww(host || "")
        && !shouldRedirectApexToWww(forwarded || "")
      ) {
        return
      }

      const target = buildWwwRedirectUrl(`${url.pathname}${url.search}`)
      return sendRedirect(event, target, 301)
    }),
  })
})
