<template>
  <section id="erp-sales" class="scroll-mt-24 overflow-x-clip">
    <div class="page-shell py-12 md:py-24">
      <div class="max-w-xl">
        <h2 class="reveal font-heading text-[28px] font-semibold leading-[1.15] md:text-[44px]">
          {{ t("erpPage.sales.title") }}
        </h2>
        <p class="reveal reveal-delay-1 mt-3 font-body text-[15px] leading-[1.55] text-[color:var(--color-text-soft)] md:mt-4 md:text-[18px]">
          {{ t("erpPage.sales.body") }}
        </p>
      </div>

      <div class="reveal reveal-delay-2 mt-8 lg:mt-14">
        <div class="mb-3 hidden justify-center gap-2 lg:flex">
          <span class="erp-callout">{{ t("erpPage.sales.customer") }}</span>
          <span class="erp-callout">{{ t("erpPage.sales.items") }}</span>
        </div>

        <figure class="erp-depth overflow-hidden rounded-[20px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] sm:rounded-[24px]">
          <img
            src="/images/erp/sale-create.png"
            :alt="t('erpPage.sales.imageAlt')"
            width="1919"
            height="1075"
            loading="lazy"
            decoding="async"
            class="block h-[min(58vw,320px)] w-full object-cover object-left-top sm:h-auto lg:h-auto lg:object-contain"
          >
        </figure>

        <ul class="erp-tag-wrap mt-4 lg:hidden">
          <li
            v-for="label in mobileLabels"
            :key="label"
            class="erp-tag"
          >
            {{ label }}
          </li>
        </ul>

        <div class="mt-4 hidden items-center justify-between gap-3 px-[4%] lg:flex">
          <span class="erp-callout">{{ t("erpPage.sales.quantity") }}</span>
          <span class="erp-callout">{{ t("erpPage.sales.discount") }}</span>
          <span class="erp-callout">{{ t("erpPage.sales.payment") }}</span>
          <span class="erp-callout">{{ t("erpPage.sales.balance") }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useLocale()

const mobileLabels = computed(() => [
  t("erpPage.sales.customer"),
  t("erpPage.sales.items"),
  t("erpPage.sales.quantity"),
  t("erpPage.sales.discount"),
  t("erpPage.sales.payment"),
  t("erpPage.sales.balance"),
])
</script>

<style scoped>
.erp-callout {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  padding: 8px 14px;
  font-family: Inter, "Noto Sans Myanmar", sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text);
}
</style>
