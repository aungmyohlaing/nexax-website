/**
 * Public site origin from runtime config (SSR + client).
 * Production default comes from nuxt.config / NUXT_PUBLIC_SITE_URL.
 * Staging must set NUXT_PUBLIC_SITE_URL explicitly — there is no
 * secondary fallback to the production constant here.
 */
export function useSiteUrl() {
  const config = useRuntimeConfig()
  return computed(() => String(config.public.siteUrl ?? "").trim())
}
