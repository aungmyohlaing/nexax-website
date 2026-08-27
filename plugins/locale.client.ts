export default defineNuxtPlugin(() => {
  const { hydrateLocale } = useLocale()
  hydrateLocale()
})
