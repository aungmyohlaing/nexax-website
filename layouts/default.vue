<template>
  <div class="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
    <SiteHeader />
    <main>
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { hreflangAlternates, pageKind } from "~/utils/localePath.mjs"

const { locale } = useLocale()
const route = useRoute()
const siteUrl = useSiteUrl()

const canonicalHref = computed(() => {
  const path = route.path === "/" ? "/" : route.path.replace(/\/$/, "") || "/"
  return `${siteUrl.value}${path === "/" ? "/" : path}`
})

const alternates = computed(() => {
  const kind = pageKind(route.path)
  return kind ? hreflangAlternates(kind, siteUrl.value) : []
})

useHead(() => ({
  htmlAttrs: {
    lang: locale.value === "my" ? "my" : "en",
  },
  link: [
    {
      key: "canonical",
      rel: "canonical",
      href: canonicalHref.value,
    },
    ...alternates.value.map((alternate) => ({
      key: `hreflang-${alternate.hreflang}`,
      rel: "alternate",
      hreflang: alternate.hreflang,
      href: alternate.href,
    })),
  ],
}))
</script>
