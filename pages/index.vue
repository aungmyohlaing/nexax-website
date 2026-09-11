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
const { t, locale } = useLocale()
useReveal()

useHead(() => ({
  title: t("meta.title"),
  htmlAttrs: {
    lang: locale.value === "my" ? "my" : "en",
  },
  meta: [{ name: "description", content: t("meta.description") }],
}))
</script>
