<template>
  <section class="page-shell py-16 md:py-24">
    <div class="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
      <div>
        <p class="reveal font-body text-[12px] font-semibold tracking-[0.16em] uppercase text-[color:var(--color-gold)]">
          {{ t("regify.kicker") }}
        </p>
        <h2 class="reveal reveal-delay-1 mt-3 font-heading font-bold text-[32px] md:text-[44px] leading-tight">
          {{ t("regify.title") }}
        </h2>
        <p class="reveal reveal-delay-1 mt-4 font-body text-[16px] leading-7 text-[color:var(--color-text-soft)] max-w-md">
          {{ t("regify.lead") }}
        </p>

        <ul class="reveal reveal-delay-2 mt-10 grid gap-6">
          <li
            v-for="(item, index) in items"
            :key="item"
            class="flex gap-4"
          >
            <span class="font-body text-[13px] font-semibold text-[color:var(--color-gold)] w-8 pt-1">
              0{{ index + 1 }}
            </span>
            <div>
              <p class="font-heading font-semibold text-[20px]">
                {{ t(`regify.${item}`) }}
              </p>
              <p class="mt-1 font-body text-[15px] leading-7 text-[color:var(--color-text-soft)]">
                {{ t(`regify.${item}Hint`) }}
              </p>
            </div>
          </li>
        </ul>
      </div>

      <article class="reveal reveal-delay-2 rounded-[28px] bg-[color:var(--color-gold-soft)] px-7 py-8 md:px-8 md:py-10">
        <p class="font-body text-[12px] font-semibold tracking-[0.14em] uppercase text-[color:var(--color-text-soft)]">
          {{ t("regify.secondary") }}
        </p>
        <p class="mt-3 font-heading font-bold text-[28px] md:text-[32px]">
          Regify
        </p>
        <p class="mt-4 font-body text-[15px] leading-7 text-[color:var(--color-text)]">
          {{ t("regify.body") }}
        </p>
        <NuxtLink
          to="/regify"
          class="mt-6 inline-flex items-center gap-2 font-body font-semibold text-[15px] text-[color:var(--color-text)] hover:text-[color:var(--color-stage)]"
        >
          {{ t("regify.cta") }}
          <Icon name="ArrowRight" :size="16" />
        </NuxtLink>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useLocale()

const items = ["campaigns", "submissions", "events"] as const
</script>
