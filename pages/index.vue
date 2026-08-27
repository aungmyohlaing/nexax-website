<template>
  <div>
    <HeroSection @see-work="onSeeWork" />
    <FlagshipErpSection />
    <ErpTeaserSection />
    <ErpWorkflowSection />
    <ErpProductCtaSection />
    <ClientProofSection />
    <RegifySection />
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

const onSeeWork = () => {
  if (!import.meta.client) return
  document.getElementById("erp")?.scrollIntoView({ behavior: "smooth" })
}
</script>
