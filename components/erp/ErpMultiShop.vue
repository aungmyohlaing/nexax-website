<template>
  <section id="erp-shops" class="scroll-mt-24 overflow-x-clip bg-[color:var(--color-mint-wash)]">
    <div class="page-shell py-12 md:py-24">
      <div class="max-w-2xl">
        <h2 class="reveal font-heading text-[28px] font-semibold leading-[1.15] md:text-[44px]">
          {{ t("erpPage.shops.title") }}
        </h2>
        <p class="reveal reveal-delay-1 mt-3 font-body text-[15px] leading-[1.55] text-[color:var(--color-text-soft)] md:mt-4 md:text-[18px]">
          {{ t("erpPage.shops.line") }}
        </p>
      </div>

      <div class="reveal reveal-delay-2 mt-8 lg:mt-12">
        <p class="text-center font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-gold)]">
          {{ t("erpPage.shops.business") }}
        </p>

        <div class="relative mt-4 lg:mt-4">
          <figure class="erp-depth erp-bleed erp-bleed-shot overflow-hidden border border-[color:var(--color-border)] bg-[color:var(--color-surface)] sm:rounded-[24px]">
            <img
              src="/images/erp/multishop-dashboard.png"
              :alt="t('erpPage.shops.dashAlt')"
              width="1919"
              height="1078"
              loading="lazy"
              decoding="async"
              class="block h-[min(48vw,260px)] w-full object-cover object-left-top sm:h-auto"
            >
          </figure>

          <div class="erp-bleed mt-4 px-[var(--page-pad)] lg:hidden">
            <div class="erp-flow-rail mb-3 justify-center">
              <span class="erp-flow-chip font-heading text-[14px] font-semibold">{{ t("erpPage.shops.main") }}</span>
              <span class="erp-flow-chip font-body text-[12px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-primary)]">
                {{ t("erpPage.shops.transfer") }}
              </span>
              <span class="erp-flow-chip font-heading text-[14px] font-semibold">{{ t("erpPage.shops.branch") }}</span>
            </div>
            <figure class="erp-depth overflow-hidden rounded-[20px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] shadow-card">
              <img
                src="/images/erp/stock-transfer.png"
                :alt="t('erpPage.shops.transferAlt')"
                width="1919"
                height="1079"
                loading="lazy"
                decoding="async"
                class="block max-h-[200px] w-full object-cover object-top"
              >
            </figure>
          </div>
        </div>

        <div class="mt-10 hidden items-center gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)_minmax(0,1fr)]">
          <div class="text-right">
            <p class="font-heading text-[32px] font-semibold">
              {{ t("erpPage.shops.main") }}
            </p>
            <span class="ml-auto mt-4 block h-px w-full max-w-[180px] bg-[color:var(--color-primary)]" aria-hidden="true" />
          </div>
          <div>
            <p class="text-center font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-primary)]">
              {{ t("erpPage.shops.transfer") }}
            </p>
            <figure class="erp-depth mt-3 overflow-hidden rounded-[20px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
              <img
                src="/images/erp/stock-transfer.png"
                :alt="t('erpPage.shops.transferAlt')"
                width="1919"
                height="1079"
                loading="lazy"
                decoding="async"
                class="block max-h-[220px] w-full object-cover object-top"
              >
            </figure>
          </div>
          <div>
            <p class="font-heading text-[32px] font-semibold">
              {{ t("erpPage.shops.branch") }}
            </p>
            <span class="mt-4 block h-px w-full max-w-[180px] bg-[color:var(--color-primary)]" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useLocale()
</script>
