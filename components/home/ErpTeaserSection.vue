<template>
  <section class="page-shell py-16 md:py-24">
    <div class="grid gap-12 lg:grid-cols-2 lg:items-center">
      <div>
        <h2 class="reveal font-heading font-bold text-[36px] md:text-[48px] leading-tight">
          {{ t("teaser.title") }}
        </h2>
        <p class="reveal reveal-delay-1 mt-5 font-body text-[16px] md:text-[17px] leading-8 text-[color:var(--color-text-soft)] max-w-md">
          {{ t("teaser.body") }}
        </p>
        <div class="reveal reveal-delay-2 mt-8">
          <BaseButton variant="mint" to="/erp">
            {{ t("teaser.cta") }}
          </BaseButton>
        </div>
      </div>
      <div class="reveal reveal-delay-2">
        <ErpDashboardPreview />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useLocale()
</script>
