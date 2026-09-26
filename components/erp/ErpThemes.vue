<template>
  <section id="erp-themes" class="scroll-mt-24 overflow-x-clip">
    <div class="page-shell py-12 md:py-24">
      <h2 class="reveal font-heading text-[28px] font-semibold leading-[1.15] md:text-[44px]">
        {{ t("erpPage.themes.title") }}
      </h2>

      <div class="reveal reveal-delay-1 mt-6 lg:hidden">
        <div class="erp-seg-wrap mb-4" role="tablist" :aria-label="t('erpPage.themes.switchLabel')">
          <button
            v-for="theme in themes"
            :key="`${theme.id}-m`"
            type="button"
            role="tab"
            class="erp-seg"
            :class="theme.id === activeId ? 'erp-seg-active' : ''"
            :aria-selected="theme.id === activeId"
            @click="scrollToTheme(theme.id)"
          >
            {{ theme.label }}
          </button>
        </div>

        <div class="erp-bleed">
          <ErpCarousel
            ref="carouselRef"
            rail-class="px-[var(--page-pad)]"
            :aria-label="t('erpPage.themes.switchLabel')"
            :prev-label="t('erpPage.carousel.prev')"
            :next-label="t('erpPage.carousel.next')"
            @index-change="onIndexChange"
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
          </ErpCarousel>
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
const carouselRef = ref<{ scrollToSelector: (selector: string) => void } | null>(null)

const scrollToTheme = (id: string) => {
  activeId.value = id
  carouselRef.value?.scrollToSelector(`[data-theme-id="${id}"]`)
}

const onIndexChange = (index: number) => {
  const theme = themes.value[index]
  if (theme) activeId.value = theme.id
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
