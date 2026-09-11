<template>
  <section id="why" class="scroll-mt-24">
    <div class="page-shell py-16 md:py-24">
      <div class="max-w-2xl">
        <p class="reveal font-body text-[12px] md:text-[13px] font-semibold tracking-[0.18em] uppercase text-[color:var(--color-gold)]">
          {{ t("why.kicker") }}
        </p>
        <h2 class="reveal reveal-delay-1 mt-4 font-heading font-bold text-[32px] md:text-[44px] leading-tight">
          {{ t("why.title") }}
        </h2>
        <p class="reveal reveal-delay-2 mt-5 font-body text-[16px] leading-7 text-[color:var(--color-text-soft)]">
          {{ t("why.body") }}
        </p>
      </div>

      <ol class="reveal reveal-delay-2 mt-12 md:mt-16 grid gap-10 lg:grid-cols-3 lg:gap-12">
        <li
          v-for="(principle, index) in principles"
          :key="principle"
          class="min-w-0 border-t border-[color:var(--color-border)] pt-6"
        >
          <p class="font-body text-[12px] font-semibold tracking-[0.14em] text-[color:var(--color-gold)]">
            0{{ index + 1 }}
          </p>
          <h3 class="mt-4 font-heading font-semibold text-[20px] md:text-[22px] leading-snug">
            {{ t(`why.${principle}`) }}
          </h3>
          <p class="mt-3 font-body text-[15px] leading-7 text-[color:var(--color-text-soft)]">
            {{ t(`why.${principle}Hint`) }}
          </p>
        </li>
      </ol>

      <div class="reveal reveal-delay-3 mt-14 md:mt-16 pt-10 border-t border-[color:var(--color-border)]">
        <p class="font-heading font-semibold text-[20px] md:text-[24px] leading-snug max-w-xl">
          {{ t("why.closing") }}
        </p>
        <div class="mt-8 flex flex-col sm:flex-row sm:items-center gap-5">
          <BaseButton to="/erp">
            {{ t("nav.erp") }}
          </BaseButton>
          <BaseButton variant="ghost" :href="SITE.regifyUrl" external>
            {{ t("nav.regify") }}
            <Icon name="ArrowRight" :size="16" />
          </BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { SITE, WHY_PRINCIPLES } from "~/constants/site"

const { t } = useLocale()
const principles = WHY_PRINCIPLES
</script>
