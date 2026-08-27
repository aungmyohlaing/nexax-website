<template>
  <div class="rounded-[28px] bg-[color:var(--color-stage)] p-4 md:p-5 shadow-card">
    <div class="flex flex-wrap gap-2">
      <span
        v-for="item in tabs"
        :key="item"
        class="rounded-full bg-[color:var(--color-primary)] text-white font-body text-[12px] font-medium px-3 py-1"
      >
        {{ t(`teaser.${item}`) }}
      </span>
    </div>
    <div class="mt-4 rounded-[22px] bg-[color:var(--color-surface)] px-5 py-6 md:px-6 md:py-7">
      <p class="font-body text-[13px] text-[color:var(--color-text-soft)]">
        {{ t("teaser.today") }}
      </p>
      <p class="mt-1 font-heading font-bold text-[28px] md:text-[32px] tracking-tight text-[color:var(--color-text)]">
        {{ t("teaser.amount") }}
      </p>
      <div class="mt-8 flex items-end gap-2 h-28">
        <span
          v-for="bar in bars"
          :key="bar.height"
          class="flex-1 rounded-t-md"
          :class="bar.tone"
          :style="{ height: bar.height }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useLocale()

const tabs = ["sales", "inventory", "payments", "accounting", "reports"] as const

const bars = [
  { height: "46%", tone: "bg-[color:var(--color-gold)]" },
  { height: "72%", tone: "bg-[color:var(--color-stage)]" },
  { height: "38%", tone: "bg-[color:var(--color-primary)]" },
  { height: "88%", tone: "bg-[color:var(--color-gold)]" },
  { height: "58%", tone: "bg-[color:var(--color-stage)]" },
  { height: "70%", tone: "bg-[color:var(--color-primary)]" },
  { height: "42%", tone: "bg-[color:var(--color-gold)]" },
]
</script>
