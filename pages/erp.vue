<template>
  <div class="overflow-x-clip">
    <ErpHero />
    <ErpVideoSection />
    <ErpStatement />
    <ErpSales />
    <ErpInventory />
    <ErpMultiShop />
    <ErpOffline />
    <ErpMoney />
    <ErpPeople />
    <ErpThemes />
    <ErpFinalCta />
    <ErpDemoModal />
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useLocale()
useReveal()

useHead(() => ({
  title: `${t("erpPage.metaTitle")} — NexaXTech`,
  htmlAttrs: {
    lang: locale.value === "my" ? "my" : "en",
  },
  meta: [{ name: "description", content: t("erpPage.metaDescription") }],
}))
</script>
