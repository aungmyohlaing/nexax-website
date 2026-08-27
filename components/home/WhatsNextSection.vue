<template>
  <section class="page-shell py-16 md:py-24">
    <h2 class="reveal font-heading font-bold text-[40px] md:text-[56px] leading-tight">
      {{ t("next.title") }}
    </h2>
    <p class="reveal reveal-delay-1 mt-4 font-body text-[16px] md:text-[18px] leading-7 text-[color:var(--color-text-soft)]">
      {{ t("next.body") }}
    </p>
    <div class="reveal reveal-delay-2 mt-8">
      <BaseButton variant="mint" href="/#contact">
        {{ t("next.cta") }}
      </BaseButton>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useLocale()
</script>
