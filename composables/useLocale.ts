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

function readCookieLocale(): Locale | null {
  if (!import.meta.client) return null
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${SITE.localeCookie}=`))
  const value = match?.split("=")[1]
  return value === "en" || value === "my" ? value : null
}

function writeCookieLocale(locale: Locale) {
  if (!import.meta.client) return
  document.cookie = `${SITE.localeCookie}=${locale}; path=/; max-age=31536000; SameSite=Lax`
}

export function useLocale() {
  const locale = useState<Locale>("locale", () => "en")

  const t = (path: string) => getByPath(messages[locale.value], path)

  const setLocale = (next: Locale) => {
    locale.value = next
    writeCookieLocale(next)
    if (import.meta.client) {
      document.documentElement.lang = next === "my" ? "my" : "en"
    }
  }

  const hydrateLocale = () => {
    const saved = readCookieLocale()
    if (saved) setLocale(saved)
    else if (import.meta.client) {
      document.documentElement.lang = locale.value === "my" ? "my" : "en"
    }
  }

  return { locale, t, setLocale, hydrateLocale }
}
