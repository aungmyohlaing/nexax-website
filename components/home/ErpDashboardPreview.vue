<template>
  <div class="rounded-[28px] bg-[color:var(--color-stage)] p-4 md:p-5 shadow-card">
    <div
      role="tablist"
      :aria-label="t('teaser.tabsLabel')"
      class="flex flex-wrap gap-2"
    >
      <button
        v-for="item in tabs"
        :id="`teaser-tab-${item}`"
        :key="item"
        type="button"
        role="tab"
        class="rounded-full font-body text-[12px] font-medium px-3 py-1 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-stage)]"
        :class="item === active
          ? 'bg-[color:var(--color-primary)] text-white'
          : 'bg-[color:var(--color-stage-soft)] text-[color:var(--color-on-dark-soft)] hover:text-[color:var(--color-on-dark)]'"
        :aria-selected="item === active"
        :aria-controls="`teaser-panel-${item}`"
        :tabindex="item === active ? 0 : -1"
        @click="active = item"
        @keydown="onTabKey($event, item)"
      >
        {{ t(`teaser.${item}`) }}
      </button>
    </div>

    <div
      :id="`teaser-panel-${active}`"
      role="tabpanel"
      :aria-labelledby="`teaser-tab-${active}`"
      class="mt-4 rounded-[22px] bg-[color:var(--color-surface)] px-5 py-6 md:px-6 md:py-7"
    >
      <p class="font-body text-[13px] text-[color:var(--color-text-soft)]">
        {{ t("teaser.today") }}
      </p>
      <p class="mt-1 font-heading font-bold text-[28px] md:text-[32px] tracking-tight text-[color:var(--color-text)]">
        {{ formatMmk(view.amount) }}
      </p>
      <p class="mt-1 font-body text-[13px] text-[color:var(--color-text-soft)]">
        {{ t(`teaser.${active}Metric`) }}
      </p>

      <div class="mt-8 h-32">
        <div v-if="view.chart === 'bars'" class="flex items-end gap-2 h-full">
          <span
            v-for="(bar, index) in view.bars"
            :key="index"
            class="flex-1 rounded-t-md origin-bottom transition-[height] duration-300 ease-out motion-reduce:transition-none"
            :class="barTones[index % barTones.length]"
            :style="{ height: `${bar}%` }"
          />
        </div>

        <div
          v-else
          class="flex items-center gap-4 h-full"
        >
          <div class="relative size-28 shrink-0" aria-hidden="true">
            <svg viewBox="0 0 36 36" class="size-full -rotate-90">
              <circle
                cx="18"
                cy="18"
                r="12"
                fill="none"
                stroke="var(--color-border)"
                stroke-width="6"
              />
              <circle
                v-for="slice in donutArcs"
                :key="slice.key"
                cx="18"
                cy="18"
                r="12"
                fill="none"
                :stroke="slice.color"
                stroke-width="6"
                pathLength="100"
                :stroke-dasharray="`${slice.pct} 100`"
                :stroke-dashoffset="slice.offset"
              />
            </svg>
            <p class="absolute inset-0 flex items-center justify-center font-heading font-bold text-[16px] text-[color:var(--color-text)]">
              {{ Math.round(donutArcs[0]?.pct ?? 0) }}%
            </p>
          </div>
          <ul class="grid grid-cols-2 gap-x-3 gap-y-1.5 min-w-0 flex-1">
            <li
              v-for="slice in donutArcs"
              :key="slice.key"
              class="flex items-center gap-2 font-body text-[13px] leading-5 text-[color:var(--color-text)] min-w-0"
            >
              <span
                class="size-2.5 rounded-full shrink-0"
                :style="{ background: slice.color }"
              />
              <span class="truncate">{{ slice.label }}</span>
              <span class="text-[color:var(--color-text-soft)] shrink-0">{{ Math.round(slice.pct) }}%</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ERP_TEASERS } from "~/constants/site"
import { formatMmk } from "~/utils/formatMmk"

type TeaserId = (typeof ERP_TEASERS)[number]

interface DonutSlice {
  key: string
  label: string
  value: number
  color: string
}

const { t } = useLocale()
const tabs = ERP_TEASERS
const active = ref<TeaserId>("sales")

const barTones = [
  "bg-[color:var(--color-gold)]",
  "bg-[color:var(--color-stage)]",
  "bg-[color:var(--color-primary)]",
] as const

const views = computed(() => ({
  sales: {
    chart: "bars" as const,
    amount: 8_420_000,
    bars: [46, 72, 38, 88, 58, 70, 42],
  },
  inventory: {
    chart: "donut" as const,
    amount: 3_839_100,
    slices: [
      { key: "phones", label: t("teaser.phones"), value: 38, color: "var(--color-gold)" },
      { key: "laptops", label: t("teaser.laptops"), value: 32, color: "var(--color-primary)" },
      { key: "audio", label: t("teaser.audio"), value: 18, color: "var(--color-stage)" },
      { key: "accessories", label: t("teaser.accessories"), value: 12, color: "var(--color-primary-soft)" },
    ],
  },
  payments: {
    chart: "donut" as const,
    amount: 8_420_000,
    slices: [
      { key: "cash", label: t("teaser.cash"), value: 62, color: "var(--color-gold)" },
      { key: "mobile", label: t("teaser.mobile"), value: 38, color: "var(--color-primary)" },
    ],
  },
  accounting: {
    chart: "bars" as const,
    amount: 8_420_000,
    bars: [30, 54, 48, 80, 44, 62, 36],
  },
  reports: {
    chart: "bars" as const,
    amount: 42_100_000,
    bars: [62, 40, 78, 52, 90, 48, 66],
  },
}))

const view = computed(() => views.value[active.value])

const donutArcs = computed(() => {
  const slices = "slices" in view.value ? view.value.slices : []
  const total = slices.reduce((sum, slice) => sum + slice.value, 0) || 1
  let cursor = 0
  return slices.map((slice: DonutSlice) => {
    const pct = (slice.value / total) * 100
    const offset = -cursor
    cursor += pct
    return { ...slice, pct, offset }
  })
})

const onTabKey = (event: KeyboardEvent, item: TeaserId) => {
  const index = tabs.indexOf(item)
  if (index < 0) return

  let next = index
  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    next = (index + 1) % tabs.length
  } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    next = (index - 1 + tabs.length) % tabs.length
  } else if (event.key === "Home") {
    next = 0
  } else if (event.key === "End") {
    next = tabs.length - 1
  } else {
    return
  }

  event.preventDefault()
  const nextTab = tabs[next]
  if (!nextTab) return
  active.value = nextTab
  document.getElementById(`teaser-tab-${nextTab}`)?.focus()
}
</script>
