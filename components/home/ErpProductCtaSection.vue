<template>
  <section class="page-shell py-16 md:py-24">
    <div class="grid gap-10 lg:grid-cols-2 lg:items-center">
      <div>
        <h2 class="reveal font-heading font-bold text-[32px] md:text-[44px] leading-tight">
          {{ t("pillars.title") }}
        </h2>
        <p class="reveal reveal-delay-1 mt-5 font-body text-[16px] md:text-[17px] leading-8 text-[color:var(--color-text-soft)] max-w-md">
          {{ t("pillars.body") }}
        </p>
      </div>
      <div class="reveal reveal-delay-2 rounded-[32px] bg-[color:var(--color-surface)] shadow-card px-8 py-10 md:px-10 md:py-12">
        <h3 class="font-heading font-bold text-[28px] md:text-[32px] leading-tight">
          {{ t("pillars.cardTitle") }}
        </h3>
        <p class="mt-4 font-body text-[16px] leading-7 text-[color:var(--color-text-soft)]">
          {{ t("pillars.cardBody") }}
        </p>
        <div class="mt-8">
          <BaseButton to="/erp">
            {{ t("pillars.cta") }}
          </BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useLocale()
</script>
