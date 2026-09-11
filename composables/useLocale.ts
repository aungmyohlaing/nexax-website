import { SITE } from "~/constants/site"
import { en, type Messages } from "~/i18n/en"
import { my } from "~/i18n/my"
import type { Locale } from "~/types/locale"

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

export function parseLocale(value: unknown): Locale | null {
  return value === "en" || value === "my" ? value : null
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
  const localeCookie = useLocaleCookie()
  const locale = useState<Locale>(
    "locale",
    () => parseLocale(localeCookie.value) ?? "en",
  )

  const t = (path: string) => getByPath(messages[locale.value], path)

  const setLocale = (next: Locale) => {
    locale.value = next
    localeCookie.value = next
    if (import.meta.client) {
      document.documentElement.lang = next === "my" ? "my" : "en"
    }
  }

  return { locale, t, setLocale }
}
