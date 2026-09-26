<template>
  <div>
    <button
      type="button"
      class="group w-full text-left"
      :aria-label="t('erp.play')"
      @click="open = true"
    >
      <div class="flex items-center justify-between gap-3">
        <p class="font-body text-[12px] font-semibold tracking-[0.14em] uppercase text-[color:var(--color-gold)]">
          {{ t("erp.modules") }}
        </p>
        <p class="font-body text-[12px] font-medium text-[color:var(--color-on-dark-soft)]">
          {{ t("erp.visualHint") }}
        </p>
      </div>

      <div class="relative mt-4 overflow-hidden rounded-[24px] border border-[color:var(--color-stage-soft)] bg-[color:var(--color-surface)]">
        <img
          :src="previewThemes[previewIndex]!.src"
          :alt="previewThemes[previewIndex]!.alt"
          width="1919"
          height="1078"
          class="block h-[min(48vw,260px)] w-full object-cover object-left-top transition-opacity duration-500 md:h-[280px]"
        >
        <span class="absolute inset-0 flex items-center justify-center bg-[color:color-mix(in_srgb,var(--color-stage)_22%,transparent)] transition-colors group-hover:bg-[color:color-mix(in_srgb,var(--color-stage)_34%,transparent)]">
          <span class="flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--color-surface)] text-[color:var(--color-stage)] shadow-card">
            <Icon name="Play" :size="20" />
          </span>
        </span>
        <div class="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-[color:var(--color-stage)] via-[color:color-mix(in_srgb,var(--color-stage)_70%,transparent)] to-transparent px-4 pb-4 pt-10">
          <span class="font-heading text-[14px] font-semibold text-[color:var(--color-on-dark)]">
            {{ previewThemes[previewIndex]!.label }}
          </span>
          <span class="flex gap-1.5" aria-hidden="true">
            <span
              v-for="(theme, index) in previewThemes"
              :key="theme.id"
              class="h-1.5 rounded-full transition-all"
              :class="index === previewIndex
                ? 'w-4 bg-[color:var(--color-gold)]'
                : 'w-1.5 bg-[color:color-mix(in_srgb,var(--color-on-dark)_35%,transparent)]'"
            />
          </span>
        </div>
      </div>
    </button>

    <Teleport to="body">
      <div
        v-if="open"
        class="product-modal fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6 md:p-8"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        :aria-describedby="bodyId"
      >
        <button
          type="button"
          class="product-modal-scrim absolute inset-0 cursor-default"
          tabindex="-1"
          :aria-label="t('video.close')"
          @click="open = false"
        />

        <div class="product-modal-panel relative flex max-h-[92dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[24px] bg-[color:var(--color-stage)] text-[color:var(--color-on-dark)] sm:rounded-[28px]">
          <div class="flex items-center justify-between gap-4 px-5 py-4 md:px-6">
            <div class="min-w-0">
              <p class="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-gold)]">
                {{ t("erp.visualLabel") }}
              </p>
              <h2
                :id="titleId"
                class="mt-1 truncate font-heading text-[20px] font-semibold leading-tight md:text-[24px]"
              >
                {{ t("video.title") }}
              </h2>
              <p :id="bodyId" class="sr-only">
                {{ t("video.body") }}
              </p>
            </div>
            <button
              ref="closeRef"
              type="button"
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--color-on-dark)_18%,transparent)] text-[color:var(--color-on-dark)] transition-colors hover:bg-[color:var(--color-stage-soft)]"
              :aria-label="t('video.close')"
              @click="open = false"
            >
              <Icon name="X" :size="18" />
            </button>
          </div>

          <div class="px-4 pb-4 md:px-6 md:pb-6">
            <div class="product-video-frame overflow-hidden rounded-[18px] border border-[color:var(--color-stage-soft)] sm:rounded-[20px]">
              <video
                ref="modalRef"
                class="product-modal-video"
                :src="SITE.erpVideoUrl"
                playsinline
                preload="metadata"
                @click="togglePlay"
                @play="playing = true"
                @pause="playing = false"
                @ended="playing = false"
              />
              <button
                v-show="!playing"
                type="button"
                class="absolute inset-0 z-[1] flex items-center justify-center bg-[color:color-mix(in_srgb,var(--color-stage)_28%,transparent)]"
                :aria-label="t('erp.play')"
                @click="togglePlay"
              >
                <span class="flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--color-surface)] text-[color:var(--color-stage)] shadow-card">
                  <Icon name="Play" :size="22" />
                </span>
              </button>
            </div>

            <div class="mt-4 flex gap-2 overflow-x-auto pb-1" style="scrollbar-width: none">
              <button
                v-for="(theme, index) in previewThemes"
                :key="`modal-${theme.id}`"
                type="button"
                class="relative h-16 w-[28%] min-w-[96px] shrink-0 overflow-hidden rounded-[12px] border transition-opacity sm:w-[18%]"
                :class="index === previewIndex
                  ? 'border-[color:var(--color-gold)] opacity-100'
                  : 'border-[color:color-mix(in_srgb,var(--color-on-dark)_16%,transparent)] opacity-70'"
                :aria-label="theme.label"
                @click="previewIndex = index"
              >
                <img
                  :src="theme.src"
                  alt=""
                  width="400"
                  height="220"
                  class="h-full w-full object-cover object-left-top"
                >
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { SITE } from "~/constants/site"

const { t } = useLocale()
const open = ref(false)
const playing = ref(false)
const previewIndex = ref(0)
const closeRef = ref<HTMLButtonElement | null>(null)
const modalRef = ref<HTMLVideoElement | null>(null)
const titleId = "erp-preview-title"
const bodyId = "erp-preview-body"

const previewThemes = computed(() => [
  {
    id: "classic",
    label: t("hero.themeClassic"),
    alt: t("hero.themeClassicAlt"),
    src: "/images/erp/theme-classic.png",
  },
  {
    id: "purple",
    label: t("hero.themePurple"),
    alt: t("hero.themePurpleAlt"),
    src: "/images/erp/theme-purple.png",
  },
  {
    id: "magenta",
    label: t("hero.themeMagenta"),
    alt: t("hero.themeMagentaAlt"),
    src: "/images/erp/theme-magenta.png",
  },
  {
    id: "orange",
    label: t("hero.themeOrange"),
    alt: t("hero.themeOrangeAlt"),
    src: "/images/erp/theme-dark-orange.png",
  },
  {
    id: "cygan",
    label: t("hero.themeCygan"),
    alt: t("hero.themeCyganAlt"),
    src: "/images/erp/theme-cygan.png",
  },
])

let previewTimer: ReturnType<typeof setInterval> | null = null

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") open.value = false
}

const togglePlay = async () => {
  const video = modalRef.value
  if (!video) return
  if (video.paused) {
    await video.play()
    return
  }
  video.pause()
}

watch(open, async (value) => {
  if (!import.meta.client) return
  document.body.style.overflow = value ? "hidden" : ""
  if (value) {
    window.addEventListener("keydown", onKeydown)
    await nextTick()
    closeRef.value?.focus()
    return
  }
  window.removeEventListener("keydown", onKeydown)
  playing.value = false
  if (modalRef.value) {
    modalRef.value.pause()
    modalRef.value.currentTime = 0
  }
})

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
  previewTimer = setInterval(() => {
    if (open.value) return
    previewIndex.value = (previewIndex.value + 1) % previewThemes.value.length
  }, 3800)
})

onBeforeUnmount(() => {
  if (!import.meta.client) return
  window.removeEventListener("keydown", onKeydown)
  document.body.style.overflow = ""
  if (previewTimer) clearInterval(previewTimer)
})
</script>
