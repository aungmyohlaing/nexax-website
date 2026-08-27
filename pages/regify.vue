<template>
  <section class="page-shell py-20 md:py-28 max-w-3xl">
    <p class="font-body text-[13px] tracking-[0.22em] uppercase text-[color:var(--color-text-soft)]">
      {{ t("productPage.regifyKicker") }}
    </p>
    <h1 class="mt-4 font-heading font-bold text-[36px] md:text-[48px] leading-tight">
      {{ t("productPage.regifyTitle") }}
    </h1>
    <p class="mt-6 font-body text-[18px] leading-8 text-[color:var(--color-text-soft)]">
      {{ t("productPage.regifyBody") }}
    </p>
    <p class="mt-4 font-body text-[16px] text-[color:var(--color-text-soft)]">
      {{ t("productPage.coming") }}
    </p>
    <div class="mt-10 flex flex-col sm:flex-row gap-4">
      <BaseButton to="/">
        {{ t("productPage.back") }}
      </BaseButton>
      <BaseButton variant="mint" href="/#contact">
        {{ t("nav.talk") }}
      </BaseButton>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useLocale()

useHead(() => ({
  title: `${t("productPage.regifyTitle")} — NexaXTech`,
  meta: [{ name: "description", content: t("productPage.regifyBody") }],
}))
</script>
