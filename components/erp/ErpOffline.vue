<template>
  <section
    id="erp-offline"
    class="scroll-mt-24 overflow-x-clip bg-[color:var(--color-stage)] text-[color:var(--color-on-dark)]"
    data-nav-dark
  >
    <div class="page-shell grid items-center gap-6 py-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-10 lg:py-24">
      <div class="order-2 lg:order-1">
        <h2 class="reveal font-heading text-[28px] font-semibold leading-[1.15] md:text-[44px]">
          {{ t("erpPage.offline.title") }}
        </h2>
        <p class="reveal reveal-delay-1 mt-3 max-w-sm font-body text-[15px] leading-[1.55] text-[color:var(--color-on-dark-soft)] md:mt-4 md:text-[16px]">
          {{ t("erpPage.offline.body") }}
        </p>

        <div class="reveal reveal-delay-2 erp-bleed mt-5 lg:hidden">
          <ol class="erp-flow-rail px-[var(--page-pad)]">
            <li
              v-for="step in steps"
              :key="step.label"
              class="erp-flow-chip erp-flow-chip-dark font-heading text-[14px] font-semibold"
            >
              <span
                v-if="step.cloud"
                class="text-[color:var(--color-gold)]"
                aria-hidden="true"
              >☁</span>
              <span
                v-else
                class="h-2.5 w-2.5 rounded-full border"
                :class="step.filled
                  ? 'border-[color:var(--color-gold)] bg-[color:var(--color-gold)]'
                  : 'border-[color:var(--color-on-dark-soft)] bg-transparent'"
                aria-hidden="true"
              />
              {{ step.label }}
            </li>
          </ol>
        </div>

        <ol class="reveal reveal-delay-2 mt-8 hidden space-y-0 lg:block">
          <li
            v-for="(step, index) in steps"
            :key="`d-${step.label}`"
          >
            <div class="flex items-center gap-3">
              <span
                v-if="step.cloud"
                class="flex h-5 w-5 items-center justify-center font-body text-[16px] leading-none text-[color:var(--color-gold)]"
                aria-hidden="true"
              >☁</span>
              <span
                v-else
                class="h-3 w-3 rounded-full border"
                :class="step.filled
                  ? 'border-[color:var(--color-gold)] bg-[color:var(--color-gold)]'
                  : 'border-[color:var(--color-on-dark-soft)] bg-transparent'"
                aria-hidden="true"
              />
              <span class="font-heading text-[18px] font-semibold md:text-[20px]">
                {{ step.label }}
              </span>
            </div>
            <span
              v-if="index < steps.length - 1"
              class="ml-[5px] block h-6 w-px bg-[color:var(--color-on-dark-soft)]"
              aria-hidden="true"
            />
          </li>
        </ol>
      </div>

      <figure class="reveal reveal-delay-2 order-1 erp-bleed erp-bleed-shot min-w-0 overflow-hidden border border-[color:var(--color-stage-soft)] bg-[color:var(--color-surface)] sm:rounded-[24px] lg:order-2 lg:w-[108%]">
        <img
          src="/images/erp/offline-dashboard.png"
          :alt="t('erpPage.offline.imageAlt')"
          width="1919"
          height="1078"
          loading="lazy"
          decoding="async"
          class="block h-[min(52vw,280px)] w-full object-cover object-left-top sm:h-auto"
        >
      </figure>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useLocale()

const steps = computed(() => [
  { label: t("erpPage.offline.online"), filled: true, cloud: false },
  { label: t("erpPage.offline.offline"), filled: false, cloud: false },
  { label: t("erpPage.offline.working"), filled: true, cloud: false },
  { label: t("erpPage.offline.sync"), filled: true, cloud: true },
])
</script>
