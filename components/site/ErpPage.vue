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
const { t } = useLocale()
useReveal()

usePageSeo({
  title: () => t("erpPage.metaTitle"),
  description: () => t("erpPage.metaDescription"),
  page: "erp",
})
</script>
