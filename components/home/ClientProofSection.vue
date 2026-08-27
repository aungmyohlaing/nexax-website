<template>
  <section id="clients" class="bg-[color:var(--color-stage)] text-[color:var(--color-on-dark)] scroll-mt-24">
    <div class="page-shell py-16 md:py-24 grid gap-10 lg:grid-cols-2 lg:items-center">
      <div>
        <p class="reveal font-body text-[12px] font-semibold tracking-[0.16em] uppercase text-[color:var(--color-gold)]">
          {{ t("clients.kicker") }}
        </p>
        <h2 class="reveal reveal-delay-1 mt-4 font-heading font-bold text-[32px] md:text-[44px] leading-tight max-w-md">
          {{ t("clients.title") }}
        </h2>
      </div>
      <article class="reveal reveal-delay-1 rounded-[28px] bg-[color:var(--color-stage-soft)] px-7 py-8 md:px-9 md:py-10">
        <p class="font-body text-[13px] font-semibold tracking-[0.12em] uppercase text-[color:var(--color-gold)]">
          {{ t("clients.cardTitle") }}
        </p>
        <p class="mt-4 font-body text-[16px] md:text-[17px] leading-8 text-[color:var(--color-on-dark-soft)]">
          {{ t("clients.quote") }}
        </p>
        <p class="mt-4 font-body text-[14px] leading-7 text-[color:var(--color-on-dark-soft)]">
          {{ t("clients.context") }}
        </p>
        <p class="mt-6 inline-flex items-center gap-2 font-body font-semibold text-[15px] text-[color:var(--color-gold)]">
          {{ t("clients.link") }}
          <Icon name="ArrowRight" :size="16" />
        </p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useLocale()
</script>
