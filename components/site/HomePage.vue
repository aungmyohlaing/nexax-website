<template>
  <div>
    <HeroSection />
    <FlagshipErpSection />
    <ErpTeaserSection />
    <ErpWorkflowSection />
    <ErpProductCtaSection />
    <ClientProofSection />
    <RegifySection />
    <WhyWeBuildSection />
    <HowWeBuildSection />
    <WhatsNextSection />
  </div>
</template>

<script setup lang="ts">
const { t } = useLocale()
useReveal()

usePageSeo({
  title: () => t("meta.title"),
  description: () => t("meta.description"),
  page: "home",
})
</script>
