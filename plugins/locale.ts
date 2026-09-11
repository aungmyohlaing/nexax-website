import { SITE } from "~/constants/site"

export default defineNuxtPlugin((nuxtApp) => {
  const { locale } = useLocale()
  const localeCookie = useCookie<string | null>(SITE.localeCookie)

  if (import.meta.server) {
    const saved = parseLocale(localeCookie.value)
    if (saved) locale.value = saved
    return
  }

  nuxtApp.hook("app:mounted", () => {
    const saved = parseLocale(localeCookie.value)
    if (saved && saved !== locale.value) locale.value = saved
    document.documentElement.lang = locale.value === "my" ? "my" : "en"
  })
})
