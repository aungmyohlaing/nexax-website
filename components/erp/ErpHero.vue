<template>
  <section id="erp-hero" class="scroll-mt-24 overflow-x-clip">
    <div class="relative">
      <div
        class="pointer-events-none absolute inset-y-0 right-0 hidden w-[54%] bg-[color:var(--color-mint-wash)] lg:block"
        aria-hidden="true"
      />
      <div class="page-shell relative grid items-center gap-6 py-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-4 lg:py-12">
        <div class="erp-hero-copy relative z-10 max-w-[34rem]">
          <h1 class="reveal font-heading text-[40px] font-bold leading-[0.96] tracking-tight text-[color:var(--color-text)] md:text-[64px] lg:text-[72px]">
            {{ t("erpPage.hero.title") }}
          </h1>
          <p class="reveal reveal-delay-1 mt-3 font-heading text-[20px] font-semibold leading-[1.3] text-[color:var(--color-text)] md:text-[30px]">
            {{ t("erpPage.hero.statement") }}
          </p>
          <p class="reveal reveal-delay-2 mt-3 hidden max-w-md font-body text-[16px] leading-[1.6] text-[color:var(--color-text-soft)] sm:block md:text-[18px]">
            {{ t("erpPage.hero.body") }}
          </p>
          <div class="reveal reveal-delay-3 mt-6 hidden flex-col gap-5 sm:flex sm:flex-row sm:items-center lg:mt-8">
            <BaseButton @click="showDemo">
              {{ t("erpPage.requestDemo") }}
            </BaseButton>
            <BaseButton variant="ghost" href="#erp-demo">
              {{ t("erpPage.watch") }}
              <Icon name="Play" :size="16" />
            </BaseButton>
          </div>
        </div>

        <div class="relative min-w-0">
          <div
            class="pointer-events-none absolute -left-3 top-6 hidden h-[calc(100%-2.5rem)] w-5 rounded-l-[24px] bg-[color:var(--color-gold-soft)] lg:block"
            aria-hidden="true"
          />
          <figure class="erp-depth erp-bleed erp-bleed-shot relative overflow-hidden border border-[color:var(--color-border)] bg-[color:var(--color-surface)] sm:rounded-[24px] lg:w-[138%] lg:max-w-none lg:rounded-r-none">
            <img
              src="/images/erp/hero-dashboard.png"
              :alt="t('erpPage.hero.imageAlt')"
              width="1918"
              height="1079"
              decoding="async"
              fetchpriority="high"
              class="block h-[min(52vw,280px)] w-full object-cover object-left-top sm:h-auto lg:h-[540px]"
            >
          </figure>
          <p class="reveal reveal-delay-2 mt-4 font-body text-[15px] leading-[1.55] text-[color:var(--color-text-soft)] sm:hidden">
            {{ t("erpPage.hero.body") }}
          </p>
          <div class="reveal reveal-delay-3 mt-5 flex flex-col gap-4 sm:hidden">
            <BaseButton class="w-full" @click="showDemo">
              {{ t("erpPage.requestDemo") }}
            </BaseButton>
            <BaseButton variant="ghost" href="#erp-demo">
              {{ t("erpPage.watch") }}
              <Icon name="Play" :size="16" />
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useLocale()
const { show: showDemo } = useErpDemoModal()
</script>
