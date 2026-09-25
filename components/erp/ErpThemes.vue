<template>
  <section id="erp-themes" class="scroll-mt-24 overflow-x-clip">
    <div class="page-shell py-12 md:py-24">
      <h2 class="reveal font-heading text-[28px] font-semibold leading-[1.15] md:text-[44px]">
        {{ t("erpPage.themes.title") }}
      </h2>

      <div class="reveal reveal-delay-1 erp-bleed mt-6 lg:hidden">
        <div class="erp-flow-rail mb-4 px-[var(--page-pad)]" role="tablist" :aria-label="t('erpPage.themes.switchLabel')">
          <button
            v-for="theme in themes"
            :key="`${theme.id}-m`"
            type="button"
            role="tab"
            class="erp-flow-chip min-h-[40px] font-body text-[13px] font-semibold transition-colors"
            :class="theme.id === activeId
              ? 'border-[color:var(--color-stage)] bg-[color:var(--color-stage)] text-[color:var(--color-on-dark)]'
              : 'text-[color:var(--color-text)]'"
            :aria-selected="theme.id === activeId"
            @click="scrollToTheme(theme.id)"
          >
            {{ theme.label }}
          </button>
        </div>
        <div
          ref="railRef"
          class="erp-rail px-[var(--page-pad)]"
          :aria-label="t('erpPage.themes.switchLabel')"
          @scroll.passive="onRailScroll"
        >
          <figure
            v-for="theme in themes"
            :key="theme.id"
            :data-theme-id="theme.id"
            class="erp-depth w-[88%] overflow-hidden rounded-[20px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]"
          >
            <img
              :src="theme.src"
              :alt="theme.alt"
              :width="theme.width"
              :height="theme.height"
              loading="lazy"
              decoding="async"
              class="block h-[min(52vw,260px)] w-full object-cover object-left-top"
            >
            <figcaption class="border-t border-[color:var(--color-border)] px-4 py-3 font-heading text-[15px] font-semibold">
              {{ theme.label }}
            </figcaption>
          </figure>
        </div>
      </div>

      <div class="reveal reveal-delay-1 relative mt-12 hidden h-[520px] lg:block" :aria-label="t('erpPage.themes.switchLabel')">
        <button
          v-for="(theme, index) in themes"
          :key="theme.id"
          type="button"
          class="erp-theme-card erp-depth absolute left-1/2 top-1/2 w-[72%] overflow-hidden rounded-[24px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-left"
          :style="cardStyle(index)"
          :aria-pressed="theme.id === activeId"
          @click="activeId = theme.id"
        >
          <img
            :src="theme.src"
            :alt="theme.alt"
            :width="theme.width"
            :height="theme.height"
            loading="lazy"
            decoding="async"
            class="block h-auto w-full"
          >
          <span class="absolute bottom-4 left-4 rounded-full bg-[color:var(--color-surface)] px-3 py-1 font-body text-[13px] font-semibold text-[color:var(--color-text)]">
            {{ theme.label }}
          </span>
        </button>
      </div>

      <div class="mt-6 hidden flex-wrap justify-center gap-2 lg:flex" role="tablist" :aria-label="t('erpPage.themes.switchLabel')">
        <button
          v-for="theme in themes"
          :key="`${theme.id}-tab`"
          type="button"
          role="tab"
          class="min-h-[44px] rounded-full px-4 py-2 font-body text-[14px] font-semibold transition-colors"
          :class="theme.id === activeId
            ? 'bg-[color:var(--color-stage)] text-[color:var(--color-on-dark)]'
            : 'bg-[color:var(--color-mint-wash)] text-[color:var(--color-text)]'"
          :aria-selected="theme.id === activeId"
          @click="activeId = theme.id"
        >
          {{ theme.label }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useLocale()

const themes = computed(() => [
  {
    id: "classic",
    label: t("erpPage.themes.classic"),
    src: "/images/erp/theme-classic.png",
    alt: t("erpPage.themes.classicAlt"),
    width: 1867,
    height: 950,
  },
  {
    id: "purple",
    label: t("erpPage.themes.purple"),
    src: "/images/erp/theme-purple.png",
    alt: t("erpPage.themes.purpleAlt"),
    width: 1919,
    height: 1078,
  },
  {
    id: "magenta",
    label: t("erpPage.themes.magenta"),
    src: "/images/erp/theme-magenta.png",
    alt: t("erpPage.themes.magentaAlt"),
    width: 1919,
    height: 1079,
  },
  {
    id: "orange",
    label: t("erpPage.themes.orange"),
    src: "/images/erp/theme-dark-orange.png",
    alt: t("erpPage.themes.orangeAlt"),
    width: 1917,
    height: 1079,
  },
])

const activeId = ref("classic")
const railRef = ref<HTMLElement | null>(null)

const scrollToTheme = (id: string) => {
  activeId.value = id
  const rail = railRef.value
  if (!rail) return
  const target = rail.querySelector(`[data-theme-id="${id}"]`) as HTMLElement | null
  target?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
}

const onRailScroll = () => {
  const rail = railRef.value
  if (!rail) return
  const center = rail.scrollLeft + rail.clientWidth / 2
  let bestId = activeId.value
  let bestDist = Number.POSITIVE_INFINITY
  rail.querySelectorAll<HTMLElement>("[data-theme-id]").forEach((el) => {
    const mid = el.offsetLeft + el.offsetWidth / 2
    const dist = Math.abs(mid - center)
    if (dist < bestDist) {
      bestDist = dist
      bestId = el.dataset.themeId || bestId
    }
  })
  if (bestId !== activeId.value) activeId.value = bestId
}

const cardStyle = (index: number) => {
  const activeIndex = Math.max(0, themes.value.findIndex((theme) => theme.id === activeId.value))
  const delta = (index - activeIndex + themes.value.length) % themes.value.length
  const place = [
    { x: 0, y: 0, scale: 1, z: 30, opacity: 1 },
    { x: 30, y: 4, scale: 0.86, z: 20, opacity: 1 },
    { x: 48, y: 8, scale: 0.74, z: 10, opacity: 0.92 },
    { x: -30, y: 4, scale: 0.86, z: 20, opacity: 1 },
  ][delta] ?? { x: 0, y: 0, scale: 1, z: 30, opacity: 1 }

  return {
    transform: `translate(calc(-50% + ${place.x}%), calc(-50% + ${place.y}%)) scale(${place.scale})`,
    zIndex: String(place.z),
    opacity: String(place.opacity),
  }
}
</script>
