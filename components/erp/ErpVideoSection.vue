<template>
  <section id="erp-demo" class="scroll-mt-24 overflow-x-clip pb-12 pt-4 md:pb-24 md:pt-6">
    <div class="page-shell grid items-end gap-4 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] lg:gap-10">
      <div class="max-w-sm border-l-2 border-[color:var(--color-gold)] pl-4 lg:pb-8">
        <p class="reveal font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-gold)]">
          {{ t("erpPage.video.kicker") }}
        </p>
        <p class="reveal reveal-delay-1 mt-2 font-body text-[15px] leading-[1.55] text-[color:var(--color-text-soft)] md:mt-3 md:text-[18px]">
          {{ t("erpPage.video.body") }}
        </p>
      </div>
      <div class="reveal reveal-delay-2 min-w-0 lg:w-[112%] lg:max-w-none">
        <div class="product-video-frame erp-depth overflow-hidden rounded-[20px] border border-[color:var(--color-border)] sm:rounded-[24px]">
          <video
            ref="videoRef"
            :src="`${SITE.erpVideoUrl}#t=0.1`"
            playsinline
            preload="metadata"
            :aria-label="t('erpPage.video.label')"
            class="cursor-pointer"
            @click="togglePlay"
            @play="playing = true"
            @pause="playing = false"
            @ended="onEnded"
            @timeupdate="onTimeUpdate"
          />
          <button
            v-show="!playing"
            type="button"
            class="absolute inset-0 z-[1] flex items-center justify-center bg-[color:color-mix(in_srgb,var(--color-stage)_18%,transparent)] transition-colors hover:bg-[color:color-mix(in_srgb,var(--color-stage)_28%,transparent)]"
            :aria-label="t('erp.play')"
            @click="togglePlay"
          >
            <span class="flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--color-surface)] text-[color:var(--color-stage)] shadow-card md:h-16 md:w-16">
              <Icon name="Play" :size="22" />
            </span>
          </button>
          <div
            class="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-1 bg-[color:color-mix(in_srgb,var(--color-stage)_14%,transparent)]"
            aria-hidden="true"
          >
            <div
              class="h-full bg-[color:var(--color-primary)] transition-[width] duration-200 ease-linear"
              :style="{ width: `${progress}%` }"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { SITE } from "~/constants/site"

const { t } = useLocale()

const videoRef = ref<HTMLVideoElement | null>(null)
const playing = ref(false)
const progress = ref(0)

const togglePlay = async () => {
  const video = videoRef.value
  if (!video) return
  if (video.paused) {
    await video.play()
    return
  }
  video.pause()
}

const onTimeUpdate = () => {
  const video = videoRef.value
  if (!video || !video.duration) return
  progress.value = (video.currentTime / video.duration) * 100
}

const onEnded = () => {
  playing.value = false
  progress.value = 0
  if (videoRef.value) videoRef.value.currentTime = 0
}
</script>
