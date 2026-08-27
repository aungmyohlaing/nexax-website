<template>
  <section class="bg-[color:var(--color-mint-wash)]">
    <div class="page-shell py-16 md:py-24">
      <div class="max-w-2xl text-left">
        <p class="reveal font-body text-[12px] md:text-[13px] font-semibold tracking-[0.18em] uppercase text-[color:var(--color-primary)]">
          {{ t("workflow.kicker") }}
        </p>
        <h2 class="reveal reveal-delay-1 mt-4 font-heading font-bold text-[32px] md:text-[44px] leading-tight">
          {{ t("workflow.title") }}
        </h2>
        <p class="reveal reveal-delay-1 mt-4 font-body text-[16px] leading-7 text-[color:var(--color-text-soft)]">
          {{ t("workflow.body") }}
        </p>
      </div>

      <ol class="reveal reveal-delay-2 mt-12 flex flex-col md:flex-row md:items-stretch gap-3 md:gap-2">
        <template v-for="(step, index) in steps" :key="step">
          <li
            class="flex-1 rounded-[20px] px-4 py-5 text-center"
            :class="index === steps.length - 1
              ? 'bg-[color:var(--color-gold-soft)] text-[color:var(--color-text)]'
              : 'bg-[color:var(--color-surface)] text-[color:var(--color-text)]'"
          >            
            <p class="mt-1 font-heading font-semibold text-[16px] md:text-[18px]">
              {{ t(`workflow.${step}`) }}
            </p>
            <p class="font-body text-[12px] font-medium tracking-[0.04em] text-[color:var(--color-primary)]">
              {{ t(`workflow.${step}Status`) }}
            </p>
          </li>
          <li
            v-if="index < steps.length - 1"
            class="hidden md:flex items-center justify-center text-[color:var(--color-primary)]"
            aria-hidden="true"
          >
            <Icon name="ChevronRight" :size="18" />
          </li>
        </template>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import { WORKFLOW_STEPS } from "~/constants/site"

const { t } = useLocale()
const steps = WORKFLOW_STEPS
</script>
