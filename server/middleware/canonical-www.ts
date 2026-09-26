import { getRequestHost, getRequestURL, sendRedirect } from "h3"
import {
  buildWwwRedirectUrl,
  shouldRedirectApexToWww,
} from "../utils/canonicalHost"

/**
 * Permanent apex → www redirect for the public marketing site.
 *
 * Hostname comes from `getRequestHost` with `xForwardedHost: true` so Cloud Run
 * (and any proxy that sets X-Forwarded-Host) is respected. Only the exact apex
 * `nexaxtech.com` redirects; `www.nexaxtech.com`, localhost, and `*.run.app`
 * are left alone — no redirect loop.
 */
export default defineEventHandler((event) => {
  const host = getRequestHost(event, { xForwardedHost: true })
  if (!shouldRedirectApexToWww(host)) return

  const url = getRequestURL(event, { xForwardedHost: true })
  const target = buildWwwRedirectUrl(`${url.pathname}${url.search}`)
  return sendRedirect(event, target, 301)
})
