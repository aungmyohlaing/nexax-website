<template>
  <section id="erp-connected" class="scroll-mt-24 bg-[color:var(--color-mint-wash)]">
    <div class="page-shell py-12 md:py-24">
      <h2 class="reveal max-w-3xl font-heading text-[28px] font-semibold leading-[1.2] md:text-[44px]">
        {{ t("erpPage.connected.title") }}
      </h2>

      <div class="reveal reveal-delay-1 erp-bleed mt-8 lg:hidden">
        <ol class="erp-rail px-[var(--page-pad)]">
          <li
            v-for="(step, index) in steps"
            :key="step.name"
            class="w-[78%] rounded-[24px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5 shadow-card"
          >
            <p class="font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-gold)]">
              0{{ index + 1 }}
            </p>
            <h3 class="mt-3 font-heading text-[24px] font-semibold">
              {{ step.name }}
            </h3>
            <p class="mt-2 font-body text-[14px] leading-[1.5] text-[color:var(--color-text-soft)]">
              {{ step.detail }}
            </p>
            <p
              v-if="index < steps.length - 1"
              class="mt-4 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-primary)]"
            >
              {{ t("erpPage.connected.nextHint") }}
            </p>
          </li>
        </ol>
      </div>

      <ol class="mt-16 hidden lg:grid lg:grid-cols-4">
        <li
          v-for="(step, index) in steps"
          :key="`${step.name}-desk`"
          class="reveal relative"
          :class="delay(index)"
          :style="{ paddingTop: `${index * 52}px` }"
        >
          <span
            v-if="index < steps.length - 1"
            class="erp-bridge pointer-events-none absolute left-0 right-2"
            :style="{ top: `${index * 52 + 18}px` }"
            aria-hidden="true"
          />
          <p class="font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-gold)]">
            0{{ index + 1 }}
          </p>
          <h3 class="relative mt-2 font-heading text-[28px] font-semibold">
            <span
              class="mb-3 block h-2.5 w-2.5 rounded-full bg-[color:var(--color-primary)]"
              aria-hidden="true"
            />
            {{ step.name }}
          </h3>
          <p class="relative mt-2 max-w-[14rem] font-body text-[15px] leading-[1.5] text-[color:var(--color-text-soft)]">
            {{ step.detail }}
          </p>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useLocale()

const steps = computed(() => [
  { name: t("erpPage.connected.sale"), detail: t("erpPage.connected.saleDetail") },
  { name: t("erpPage.connected.inventory"), detail: t("erpPage.connected.inventoryDetail") },
  { name: t("erpPage.connected.finance"), detail: t("erpPage.connected.financeDetail") },
  { name: t("erpPage.connected.reports"), detail: t("erpPage.connected.reportsDetail") },
])

const delay = (index: number) => {
  if (index === 0) return ""
  return `reveal-delay-${index}`
}
</script>
