<template>
  <div class="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
    <SiteHeader />
    <main class="page-shell py-16 md:py-24">
      <p class="font-body text-[12px] md:text-[13px] font-semibold tracking-[0.18em] uppercase text-[color:var(--color-gold)]">
        {{ statusCode }}
      </p>
      <h1 class="mt-4 max-w-xl font-heading font-bold text-[40px] md:text-[56px] leading-[1.08] tracking-tight">
        {{ heading }}
      </h1>
      <p class="mt-5 max-w-xl font-body text-[16px] md:text-[18px] leading-[1.55] text-[color:var(--color-text-soft)]">
        {{ body }}
      </p>
      <div class="mt-8 flex flex-col sm:flex-row sm:items-center gap-5">
        <BaseButton :to="paths.home" @click="clearError({ redirect: paths.home })">
          {{ t("error.home") }}
        </BaseButton>
        <BaseButton variant="ghost" :to="paths.erp" @click="clearError({ redirect: paths.erp })">
          {{ t("error.erp") }}
          <Icon name="ArrowRight" :size="16" />
        </BaseButton>
      </div>
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app"

const props = defineProps<{
  error: NuxtError
}>()

const { t, locale, paths } = useLocale()

const statusCode = computed(() => props.error?.statusCode ?? 500)
const isNotFound = computed(() => statusCode.value === 404)
const heading = computed(() =>
  isNotFound.value ? t("error.notFoundHeading") : t("error.genericHeading"),
)
const body = computed(() =>
  isNotFound.value ? t("error.notFoundBody") : t("error.genericBody"),
)

useSeoMeta({
  title: () => (isNotFound.value ? t("error.notFoundTitle") : t("error.genericTitle")),
  description: () => (
    isNotFound.value ? t("error.notFoundDescription") : t("error.genericDescription")
  ),
  robots: "noindex",
})

useHead(() => ({
  htmlAttrs: {
    lang: locale.value === "my" ? "my" : "en",
  },
}))
</script>
