<template>
  <div>
    <div class="page-shell pt-8 md:pt-12">
      <BaseButton variant="ghost" to="/">
        {{ t("productPage.back") }}
      </BaseButton>
    </div>
    <NexaErpShowcaseSection />
    <ProductCtaSection />
  </div>
</template>

<script setup lang="ts">
const { t } = useLocale()
useReveal()

useHead(() => ({
  title: `${t("productPage.erpTitle")} — NexaXTech`,
  meta: [{ name: "description", content: t("productPage.erpBody") }],
}))
</script>
