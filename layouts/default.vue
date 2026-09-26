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
import { SITE } from "~/constants/site"

const { locale } = useLocale()
const route = useRoute()

const canonicalHref = computed(() => {
  const path = route.path === "/" ? "/" : route.path.replace(/\/$/, "") || "/"
  return `${SITE.siteUrl}${path === "/" ? "/" : path}`
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
  ],
}))
</script>

