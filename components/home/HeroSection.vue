<template>
  <section class="hero-band">
    <div class="hero-pattern" aria-hidden="true" />
    <div class="page-shell pt-8 pb-16 md:pt-10 md:pb-20 lg:pt-12 lg:pb-24">
      <div class="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
        <div class="max-w-xl">
          <p class="reveal font-body text-[12px] md:text-[13px] font-semibold tracking-[0.18em] uppercase text-[color:var(--color-gold)]">
            {{ t("hero.kicker") }}
          </p>
          <h1 class="reveal reveal-delay-1 mt-5 font-heading font-bold text-[40px] md:text-[56px] lg:text-[64px] leading-[1.08] tracking-tight text-[color:var(--color-text)]">
            {{ t("hero.headline") }}
          </h1>
          <p class="reveal reveal-delay-2 mt-6 font-body text-[16px] md:text-[18px] leading-8 text-[color:var(--color-text-soft)]">
            {{ t("hero.body") }}
          </p>
          <p class="reveal reveal-delay-2 myanmar mt-3 text-[16px] md:text-[18px] leading-8 text-[color:var(--color-text-soft)]">
            {{ t("hero.myanmar") }}
          </p>
          <div class="reveal reveal-delay-3 mt-9 flex flex-col sm:flex-row sm:items-center gap-5">
            <BaseButton href="#erp" @click="emit('see-work')">
              {{ t("hero.primary") }}
            </BaseButton>
            <BaseButton variant="ghost" href="#erp" @click="emit('see-work')">
              {{ t("hero.secondary") }}
              <Icon name="ArrowRight" :size="16" />
            </BaseButton>
          </div>
        </div>

        <div class="reveal reveal-delay-2 hero-visual">
          <div class="overflow-hidden rounded-[32px] shadow-card bg-[color:var(--color-mint-wash)]">
            <img
              src="/images/hero-desk.png"
              :alt="t('hero.imageAlt')"
              width="1280"
              height="960"
              class="hero-photo aspect-[4/3]"
            >
          </div>
          <div class="absolute bottom-5 left-5 md:left-6 inline-flex items-center gap-3 max-w-[calc(100%-2.5rem)] rounded-[20px] bg-[color:var(--color-surface)] px-4 py-3 shadow-card">
            <img
              src="/brand/nexax_icon_512.png"
              alt=""
              width="36"
              height="36"
              class="h-9 w-9 shrink-0 rounded-[10px] object-contain"
            >
            <p class="font-heading font-semibold text-[14px] leading-tight text-[color:var(--color-text)] whitespace-nowrap">
              {{ t("hero.visualTitle") }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useLocale()

const emit = defineEmits<{
  "see-work": []
}>()
</script>
