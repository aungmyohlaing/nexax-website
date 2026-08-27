<template>
  <section id="erp" class="page-shell pb-16 md:pb-24 scroll-mt-24">
    <div class="reveal rounded-[32px] bg-[color:var(--color-stage)] text-[color:var(--color-on-dark)] px-6 py-10 md:px-12 md:py-14 lg:px-16 lg:py-16">
      <div class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p class="font-body text-[12px] font-semibold tracking-[0.16em] uppercase text-[color:var(--color-gold)]">
            {{ t("erp.kicker") }}
          </p>
          <h2 class="mt-4 font-heading font-bold text-[36px] md:text-[48px] leading-tight">
            {{ t("erp.title") }}
          </h2>
          <p class="mt-5 font-body text-[16px] md:text-[17px] leading-8 text-[color:var(--color-on-dark-soft)] max-w-md">
            {{ t("erp.lead") }}
          </p>
          <div class="mt-8">
            <BaseButton variant="mint" to="/erp">
              {{ t("erp.cta") }}
            </BaseButton>
          </div>
        </div>
        <div class="rounded-[28px] bg-[color:var(--color-stage-soft)] p-5 md:p-6">
          <ProductPreview />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useLocale()
</script>
