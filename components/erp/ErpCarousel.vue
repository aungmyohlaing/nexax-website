<template>
  <div class="erp-carousel">
    <div
      ref="railRef"
      class="erp-rail"
      :class="railClass"
      :aria-label="ariaLabel"
      @scroll.passive="onScroll"
    >
      <slot />
    </div>

    <div
      v-if="total > 1"
      class="erp-carousel-nav"
    >
      <button
        type="button"
        class="erp-carousel-nav-btn"
        :disabled="!canPrev"
        :aria-label="prevLabel"
        @click="scrollBy(-1)"
      >
        <Icon name="ChevronLeft" :size="18" />
      </button>

      <div class="erp-carousel-dots" role="tablist" :aria-label="ariaLabel">
        <button
          v-for="index in total"
          :key="index"
          type="button"
          class="erp-carousel-dot"
          :class="{ 'erp-carousel-dot-active': index - 1 === activeIndex }"
          :aria-label="`${index} / ${total}`"
          :aria-current="index - 1 === activeIndex ? 'true' : undefined"
          @click="scrollToIndex(index - 1)"
        />
      </div>

      <button
        type="button"
        class="erp-carousel-nav-btn"
        :disabled="!canNext"
        :aria-label="nextLabel"
        @click="scrollBy(1)"
      >
        <Icon name="ChevronRight" :size="18" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  ariaLabel?: string
  railClass?: string
  prevLabel?: string
  nextLabel?: string
}>(), {
  ariaLabel: undefined,
  railClass: "",
  prevLabel: "Previous",
  nextLabel: "Next",
})

const emit = defineEmits<{
  indexChange: [index: number]
}>()

const railRef = ref<HTMLElement | null>(null)
const activeIndex = ref(0)
const total = ref(0)
const canPrev = ref(false)
const canNext = ref(false)

const getSlides = () => {
  const rail = railRef.value
  if (!rail) return [] as HTMLElement[]
  return [...rail.children] as HTMLElement[]
}

const measure = () => {
  const rail = railRef.value
  const slides = getSlides()
  total.value = slides.length
  if (!rail || !slides.length) {
    activeIndex.value = 0
    canPrev.value = false
    canNext.value = false
    return
  }

  const center = rail.scrollLeft + rail.clientWidth / 2
  let best = 0
  let bestDist = Number.POSITIVE_INFINITY
  slides.forEach((el, index) => {
    const mid = el.offsetLeft + el.offsetWidth / 2
    const dist = Math.abs(mid - center)
    if (dist < bestDist) {
      bestDist = dist
      best = index
    }
  })

  if (best !== activeIndex.value) {
    activeIndex.value = best
    emit("indexChange", best)
  }

  const maxScroll = rail.scrollWidth - rail.clientWidth
  canPrev.value = rail.scrollLeft > 8
  canNext.value = rail.scrollLeft < maxScroll - 8
}

const scrollBy = (dir: -1 | 1) => {
  const slides = getSlides()
  if (!slides.length) return
  const next = Math.max(0, Math.min(slides.length - 1, activeIndex.value + dir))
  slides[next]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
}

const scrollToIndex = (index: number) => {
  const slides = getSlides()
  slides[index]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
}

const scrollToSelector = (selector: string) => {
  const rail = railRef.value
  if (!rail) return
  const target = rail.querySelector(selector) as HTMLElement | null
  target?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
}

let scrollTimer: ReturnType<typeof setTimeout> | null = null
let resizeObserver: ResizeObserver | null = null

const onScroll = () => {
  if (scrollTimer) clearTimeout(scrollTimer)
  scrollTimer = setTimeout(measure, 60)
}

onMounted(() => {
  measure()
  requestAnimationFrame(() => {
    measure()
    requestAnimationFrame(measure)
  })
  window.addEventListener("resize", measure, { passive: true })

  const rail = railRef.value
  if (rail && typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(() => measure())
    resizeObserver.observe(rail)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", measure)
  resizeObserver?.disconnect()
  if (scrollTimer) clearTimeout(scrollTimer)
})

defineExpose({
  scrollToIndex,
  scrollToSelector,
  measure,
})
</script>
