<template>
  <div
    class="hero-showcase"
    @pointerenter="paused = true"
    @pointerleave="paused = false"
  >
    <div class="hero-showcase-stack" aria-hidden="true">
      <div
        v-for="(theme, index) in depthThemes"
        :key="`${theme.id}-depth`"
        class="hero-showcase-card hero-showcase-depth"
        :style="depthStyle(index)"
      >
        <img
          :src="theme.src"
          alt=""
          :width="theme.width"
          :height="theme.height"
          decoding="async"
        >
      </div>
    </div>

    <figure class="hero-showcase-card hero-showcase-front">
      <img
        :src="activeTheme.src"
        :alt="t('hero.imageAlt')"
        :width="activeTheme.width"
        :height="activeTheme.height"
        decoding="async"
      >
      <figcaption class="hero-showcase-caption">
        <span class="font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-gold)]">
          {{ t("hero.visualTitle") }}
        </span>
        <span class="font-heading text-[14px] font-semibold text-[color:var(--color-text)]">
          {{ activeTheme.label }}
        </span>
      </figcaption>
    </figure>

    <div
      class="hero-showcase-swatches"
      role="tablist"
      :aria-label="t('hero.themesLabel')"
    >
      <button
        v-for="theme in themes"
        :key="theme.id"
        type="button"
        role="tab"
        class="hero-showcase-swatch"
        :class="{ 'hero-showcase-swatch-active': theme.id === activeId }"
        :style="{ '--swatch': theme.swatch }"
        :aria-selected="theme.id === activeId"
        :aria-label="theme.label"
        @click="select(theme.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useLocale()

const themes = computed(() => [
  {
    id: "classic",
    label: t("hero.themeClassic"),
    src: "/images/erp/theme-classic.png",
    swatch: "#c4a574",
    width: 1867,
    height: 950,
  },
  {
    id: "purple",
    label: t("hero.themePurple"),
    src: "/images/erp/theme-purple.png",
    swatch: "#7c5cbf",
    width: 1919,
    height: 1078,
  },
  {
    id: "magenta",
    label: t("hero.themeMagenta"),
    src: "/images/erp/theme-magenta.png",
    swatch: "#c23a7a",
    width: 1919,
    height: 1079,
  },
  {
    id: "orange",
    label: t("hero.themeOrange"),
    src: "/images/erp/theme-dark-orange.png",
    swatch: "#d97706",
    width: 1917,
    height: 1079,
  },
  {
    id: "cygan",
    label: t("hero.themeCygan"),
    src: "/images/erp/theme-cygan.png",
    swatch: "#0f766e",
    width: 1919,
    height: 1079,
  },
])

const activeId = ref("classic")
const paused = ref(false)

const activeTheme = computed(
  () => themes.value.find((theme) => theme.id === activeId.value) ?? themes.value[0]!,
)

const depthThemes = computed(() => {
  const list = themes.value
  const activeIndex = list.findIndex((theme) => theme.id === activeId.value)
  return [1, 2].map((offset) => list[(activeIndex + offset) % list.length]!)
})

const depthStyle = (index: number) => {
  const place = [
    { x: 18, y: 10, scale: 0.92, opacity: 0.55 },
    { x: 32, y: 18, scale: 0.84, opacity: 0.32 },
  ][index] ?? { x: 18, y: 10, scale: 0.92, opacity: 0.55 }

  return {
    transform: `translate(${place.x}px, ${place.y}px) scale(${place.scale})`,
    opacity: String(place.opacity),
    zIndex: String(10 - index),
  }
}

const select = (id: string) => {
  activeId.value = id
}

let timer: ReturnType<typeof setInterval> | null = null

const start = () => {
  if (timer) return
  timer = setInterval(() => {
    if (paused.value) return
    const list = themes.value
    const index = list.findIndex((theme) => theme.id === activeId.value)
    const next = list[(index + 1) % list.length]
    if (next) activeId.value = next.id
  }, 4200)
}

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
  start()
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>
