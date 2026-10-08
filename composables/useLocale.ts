import { SITE } from "~/constants/site"
import { en, type Messages } from "~/i18n/en"
import { my } from "~/i18n/my"
import type { Locale } from "~/types/locale"
import { localeFromPath, normalizePath, pairedLocalePath } from "~/utils/localePath.mjs"

const messages: Record<Locale, Messages> = { en, my }

function getByPath(source: Messages, path: string): string {
  const value = path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, source)

  return typeof value === "string" ? value : path
}

function useLocaleCookie() {
  return useCookie<string | null>(SITE.localeCookie, {
    default: () => null,
    maxAge: 31536000,
    path: "/",
    sameSite: "lax",
  })
}

export function useLocale() {
  const route = useRoute()
  const error = useError()
  const localeCookie = useLocaleCookie()
  const locale = useState<Locale>("locale", () => localeFromPath(route.path))

  // The URL wins. A saved cookie must not render Burmese on `/` or English on `/my`.
  watch(() => route.path, (path) => {
    locale.value = localeFromPath(path)
  }, { immediate: true })

  const t = (path: string) => getByPath(messages[locale.value], path)

  const paths = computed(() => {
    const home = locale.value === "my" ? "/my" : "/"
    return {
      home,
      erp: locale.value === "my" ? "/my/erp" : "/erp",
      clients: `${home}#clients`,
      about: `${home}#about`,
      contact: `${home}#contact`,
    }
  })

  const setLocale = (next: Locale) => {
    localeCookie.value = next
    const target = pairedLocalePath(route.path, next)
    if (target === normalizePath(route.path)) return
    if (error.value) return clearError({ redirect: target })
    return navigateTo(target)
  }

  return { locale, t, setLocale, paths }
}
