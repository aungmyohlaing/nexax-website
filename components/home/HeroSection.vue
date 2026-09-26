<template>
  <section
    ref="heroRef"
    class="hero-band"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <div class="hero-pattern" aria-hidden="true">
      <div class="hero-dots" />
    </div>
    <div class="page-shell pt-8 pb-16 md:pt-10 md:pb-20 lg:pt-12 lg:pb-24">
      <div class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-12">
        <div class="hero-copy max-w-xl">
          <p class="reveal font-body text-[12px] md:text-[13px] font-semibold tracking-[0.18em] uppercase text-[color:var(--color-gold)]">
            {{ t("hero.kicker") }}
          </p>
          <h1 class="reveal reveal-delay-1 mt-4 font-heading font-bold text-[40px] md:text-[56px] lg:text-[64px] leading-[1.08] tracking-tight text-[color:var(--color-text)]">
            {{ t("hero.headline") }}
          </h1>
          <p class="reveal reveal-delay-2 mt-5 font-body text-[16px] md:text-[18px] leading-[1.55] text-[color:var(--color-text-soft)]">
            {{ t("hero.body") }}
          </p>
          <p class="reveal reveal-delay-2 myanmar mt-2 text-[16px] md:text-[18px] leading-[1.6] text-[color:var(--color-text-soft)]">
            {{ t("hero.myanmar") }}
          </p>
          <div class="reveal reveal-delay-3 mt-8 flex flex-col sm:flex-row sm:items-center gap-5">
            <BaseButton href="#erp" class="hero-cta">
              {{ t("hero.primary") }}
            </BaseButton>
            <BaseButton variant="ghost" href="#about">
              {{ t("hero.secondary") }}
              <Icon name="ArrowRight" :size="16" />
            </BaseButton>
          </div>
        </div>

        <div class="reveal reveal-delay-2 hero-visual">
          <HeroProductVisual />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useLocale()

const heroRef = ref<HTMLElement | null>(null)
let frame = 0
let targetX = 0
let targetY = 0
let currentX = 0
let currentY = 0
let reducedMotion = false

const applyVars = () => {
  const el = heroRef.value
  if (!el) return
  el.style.setProperty("--hero-px", currentX.toFixed(4))
  el.style.setProperty("--hero-py", currentY.toFixed(4))
}

const tick = () => {
  currentX += (targetX - currentX) * 0.08
  currentY += (targetY - currentY) * 0.08
  applyVars()
  if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
    frame = requestAnimationFrame(tick)
    return
  }
  currentX = targetX
  currentY = targetY
  applyVars()
  frame = 0
}

const startTick = () => {
  if (frame || reducedMotion) return
  frame = requestAnimationFrame(tick)
}

const onPointerMove = (event: PointerEvent) => {
  if (reducedMotion) return
  const el = heroRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  if (rect.width === 0 || rect.height === 0) return
  targetX = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2))
  targetY = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2))
  startTick()
}

const onPointerLeave = () => {
  targetX = 0
  targetY = 0
  startTick()
}

onMounted(() => {
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
})

onBeforeUnmount(() => {
  if (frame) cancelAnimationFrame(frame)
})
</script>
