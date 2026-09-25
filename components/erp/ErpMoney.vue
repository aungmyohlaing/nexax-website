<template>
  <section id="erp-money" class="scroll-mt-24 overflow-x-clip">
    <div class="page-shell py-12 md:py-24">
      <h2 class="reveal max-w-3xl font-heading text-[28px] font-semibold leading-[1.15] md:text-[44px]">
        {{ t("erpPage.money.title") }}
      </h2>

      <div class="reveal reveal-delay-1 erp-bleed mt-6 lg:hidden">
        <ol class="erp-flow-rail px-[var(--page-pad)]">
          <li
            v-for="(step, index) in steps"
            :key="step"
            class="erp-flow-chip font-heading text-[14px] font-semibold text-[color:var(--color-text)]"
          >
            <span class="flex h-5 w-5 items-center justify-center rounded-full bg-[color:var(--color-gold)/0.2] font-body text-[11px] font-semibold text-[color:var(--color-gold)]">
              {{ index + 1 }}
            </span>
            {{ step }}
          </li>
        </ol>
      </div>

      <ol class="reveal reveal-delay-1 mt-8 hidden lg:flex lg:items-center">
        <li
          v-for="(step, index) in steps"
          :key="`d-${step}`"
          class="lg:flex lg:min-w-0 lg:flex-1 lg:items-center"
        >
          <span class="flex items-center gap-3">
            <span class="h-2.5 w-2.5 shrink-0 rounded-full bg-[color:var(--color-gold)]" aria-hidden="true" />
            <span class="font-heading text-[18px] font-semibold">{{ step }}</span>
          </span>
          <span
            v-if="index < steps.length - 1"
            class="mx-3 h-px min-w-4 flex-1 bg-[color:var(--color-gold)]"
            aria-hidden="true"
          />
        </li>
      </ol>

      <div class="reveal reveal-delay-2 erp-bleed mt-8 lg:hidden">
        <div class="erp-rail px-[var(--page-pad)]">
          <figure
            v-for="panel in panels"
            :key="panel.caption"
            class="erp-depth w-[86%] overflow-hidden rounded-[20px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]"
          >
            <figcaption class="border-b border-[color:var(--color-border)] px-4 py-3 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-text-soft)]">
              {{ panel.caption }}
            </figcaption>
            <img
              :src="panel.src"
              :alt="panel.alt"
              width="1919"
              height="1079"
              loading="lazy"
              decoding="async"
              class="block h-[min(52vw,260px)] w-full object-cover object-left-top"
            >
          </figure>
        </div>
      </div>

      <div class="reveal reveal-delay-2 relative mt-10 hidden lg:mt-16 lg:mb-8 lg:block lg:min-h-[640px]">
        <figure class="erp-depth relative z-10 mx-auto w-[74%] overflow-hidden rounded-[24px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
          <figcaption class="border-b border-[color:var(--color-border)] px-4 py-3 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-text-soft)]">
            {{ t("erpPage.money.profit") }}
          </figcaption>
          <img
            src="/images/erp/profit-loss.png"
            :alt="t('erpPage.money.profitAlt')"
            width="1919"
            height="1079"
            loading="lazy"
            decoding="async"
            class="block h-auto w-full"
          >
        </figure>

        <figure class="erp-depth absolute bottom-0 left-0 z-20 w-[42%] overflow-hidden rounded-[20px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
          <figcaption class="border-b border-[color:var(--color-border)] px-4 py-3 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-text-soft)]">
            {{ t("erpPage.money.ledger") }}
          </figcaption>
          <img
            src="/images/erp/account-ledger.png"
            :alt="t('erpPage.money.ledgerAlt')"
            width="1919"
            height="1079"
            loading="lazy"
            decoding="async"
            class="block h-auto w-full"
          >
        </figure>

        <figure class="erp-depth absolute bottom-8 right-0 z-20 w-[38%] overflow-hidden rounded-[20px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
          <figcaption class="border-b border-[color:var(--color-border)] px-4 py-3 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-text-soft)]">
            {{ t("erpPage.money.reports") }}
          </figcaption>
          <img
            src="/images/erp/reports-dashboard.png"
            :alt="t('erpPage.money.reportsAlt')"
            width="1919"
            height="1079"
            loading="lazy"
            decoding="async"
            class="block h-auto w-full"
          >
        </figure>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useLocale()

const steps = computed(() => [
  t("erpPage.money.transactions"),
  t("erpPage.money.ledger"),
  t("erpPage.money.profit"),
  t("erpPage.money.reports"),
])

const panels = computed(() => [
  {
    caption: t("erpPage.money.profit"),
    src: "/images/erp/profit-loss.png",
    alt: t("erpPage.money.profitAlt"),
  },
  {
    caption: t("erpPage.money.ledger"),
    src: "/images/erp/account-ledger.png",
    alt: t("erpPage.money.ledgerAlt"),
  },
  {
    caption: t("erpPage.money.reports"),
    src: "/images/erp/reports-dashboard.png",
    alt: t("erpPage.money.reportsAlt"),
  },
])
</script>
