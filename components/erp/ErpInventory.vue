<template>
  <section id="erp-inventory" class="scroll-mt-24 overflow-x-clip">
    <div class="page-shell py-12 md:py-24">
      <h2 class="reveal max-w-2xl font-heading text-[28px] font-semibold leading-[1.15] md:text-[44px]">
        {{ t("erpPage.inventory.title") }}
      </h2>

      <div class="reveal reveal-delay-1 mt-6 lg:hidden">
        <ol class="erp-step-wrap" aria-label="Inventory flow">
          <li
            v-for="(step, index) in steps"
            :key="step"
            class="erp-step-item"
          >
            <span class="erp-step-num erp-step-num-primary" aria-hidden="true">{{ index + 1 }}</span>
            {{ step }}
            <span
              v-if="index < steps.length - 1"
              class="erp-step-dot ml-1"
              aria-hidden="true"
            />
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
            <span class="h-2.5 w-2.5 shrink-0 rounded-full bg-[color:var(--color-primary)]" aria-hidden="true" />
            <span class="font-heading text-[18px] font-semibold">{{ step }}</span>
          </span>
          <span
            v-if="index < steps.length - 1"
            class="mx-3 h-px min-w-4 flex-1 bg-[color:var(--color-primary)]"
            aria-hidden="true"
          />
        </li>
      </ol>

      <div class="reveal reveal-delay-2 erp-bleed mt-8 lg:hidden">
        <ErpCarousel
          rail-class="px-[var(--page-pad)]"
          :aria-label="t('erpPage.inventory.title')"
          :prev-label="t('erpPage.carousel.prev')"
          :next-label="t('erpPage.carousel.next')"
        >
          <figure class="erp-depth w-[86%] overflow-hidden rounded-[20px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
            <figcaption class="border-b border-[color:var(--color-border)] px-4 py-3 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-text-soft)]">
              {{ t("erpPage.inventory.stockIn") }}
            </figcaption>
            <img
              src="/images/erp/inventory.png"
              :alt="t('erpPage.inventory.imageAlt')"
              width="1918"
              height="1079"
              loading="lazy"
              decoding="async"
              class="block h-[min(52vw,260px)] w-full object-cover object-left-top"
            >
          </figure>
          <figure class="erp-depth w-[86%] overflow-hidden rounded-[20px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
            <figcaption class="border-b border-[color:var(--color-border)] px-4 py-3 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-text-soft)]">
              {{ t("erpPage.inventory.trail") }}
            </figcaption>
            <img
              src="/images/erp/stock-ledger.png"
              :alt="t('erpPage.inventory.ledgerAlt')"
              width="1918"
              height="1079"
              loading="lazy"
              decoding="async"
              class="block h-[min(52vw,260px)] w-full object-cover object-left-top"
            >
          </figure>
        </ErpCarousel>
      </div>

      <div class="reveal reveal-delay-2 relative mt-10 hidden lg:mt-14 lg:block lg:pb-28">
        <figure class="erp-depth overflow-hidden rounded-[24px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] lg:w-[84%]">
          <img
            src="/images/erp/inventory.png"
            :alt="t('erpPage.inventory.imageAlt')"
            width="1918"
            height="1079"
            loading="lazy"
            decoding="async"
            class="block h-auto w-full"
          >
        </figure>
        <figure class="erp-depth absolute bottom-0 right-0 z-10 w-[54%] overflow-hidden rounded-[20px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
          <img
            src="/images/erp/stock-ledger.png"
            :alt="t('erpPage.inventory.ledgerAlt')"
            width="1918"
            height="1079"
            loading="lazy"
            decoding="async"
            class="block h-auto w-full"
          >
        </figure>
      </div>

      <p class="reveal reveal-delay-3 mt-8 hidden max-w-xl font-heading text-[22px] font-semibold leading-snug md:text-[28px] lg:block">
        {{ t("erpPage.inventory.trail") }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useLocale()

const steps = computed(() => [
  t("erpPage.inventory.purchase"),
  t("erpPage.inventory.stockIn"),
  t("erpPage.inventory.transfer"),
  t("erpPage.inventory.sale"),
  t("erpPage.inventory.stockOut"),
])
</script>
