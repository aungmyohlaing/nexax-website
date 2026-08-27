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
const { locale } = useLocale()

useHead(() => ({
  htmlAttrs: {
    lang: locale.value === "my" ? "my" : "en",
  },
}))
</script>

