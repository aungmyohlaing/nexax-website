<template>
  <section id="about" class="bg-[color:var(--color-mint-wash)] scroll-mt-24">
    <div class="page-shell py-16 md:py-24">
      <div class="max-w-2xl">
        <p class="reveal font-body text-[12px] md:text-[13px] font-semibold tracking-[0.18em] uppercase text-[color:var(--color-primary)]">
          {{ t("about.kicker") }}
        </p>
        <h2 class="reveal reveal-delay-1 mt-4 font-heading font-bold text-[32px] md:text-[44px] leading-tight">
          {{ t("about.title") }}
        </h2>
        <p class="reveal reveal-delay-1 myanmar mt-4 font-heading text-[20px] md:text-[24px] leading-snug text-[color:var(--color-text)]">
          {{ t("about.myanmar") }}
        </p>
        <p class="reveal reveal-delay-2 mt-4 font-body text-[16px] leading-7 text-[color:var(--color-text-soft)]">
          {{ t("about.body") }}
        </p>
      </div>

      <ol class="reveal reveal-delay-2 mt-12 flex flex-col md:flex-row md:items-stretch gap-3 md:gap-2">
        <template v-for="(step, index) in steps" :key="step">
          <li
            class="flex-1 rounded-[20px] px-5 py-6"
            :class="index === steps.length - 1
              ? 'bg-[color:var(--color-gold-soft)]'
              : 'bg-[color:var(--color-surface)]'"
          >
            <p class="font-body text-[12px] font-semibold tracking-[0.14em] text-[color:var(--color-gold)]">
              0{{ index + 1 }}
            </p>
            <p class="mt-3 font-heading font-semibold text-[20px] md:text-[22px]">
              {{ t(`about.${step}`) }}
            </p>
            <p class="mt-2 font-body text-[14px] leading-6 text-[color:var(--color-text-soft)]">
              {{ t(`about.${step}Hint`) }}
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
import { BUILD_STEPS } from "~/constants/site"

const { t } = useLocale()
const steps = BUILD_STEPS
</script>
