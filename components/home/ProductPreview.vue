<template>
  <div>
    <button
      type="button"
      class="group w-full text-left"
      :aria-label="t('erp.play')"
      @click="open = true"
    >
      <p class="font-body text-[12px] font-semibold tracking-[0.14em] uppercase text-[color:var(--color-gold)]">
        {{ t("erp.modules") }}
      </p>
      <div class="product-video-frame mt-4 overflow-hidden rounded-[24px] border border-[color:var(--color-border)]">
        <video
          :src="SITE.erpVideoUrl"
          muted
          playsinline
          preload="metadata"
        />
        <span class="absolute inset-0 flex items-center justify-center bg-[color:color-mix(in_srgb,var(--color-stage)_0%,transparent)] group-hover:bg-[color:color-mix(in_srgb,var(--color-stage)_28%,transparent)] transition-colors">
          <span class="h-12 w-12 rounded-full bg-[color:var(--color-surface)] text-[color:var(--color-stage)] flex items-center justify-center shadow-card">
            <Icon name="Play" :size="18" />
          </span>
        </span>
      </div>
    </button>

    <Teleport to="body">
      <div
        v-if="open"
        class="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        :aria-describedby="bodyId"
      >
        <button
          type="button"
          class="modal-scrim absolute inset-0 cursor-default"
          tabindex="-1"
          :aria-label="t('video.close')"
          @click="open = false"
        />
        <div class="relative w-full max-w-4xl overflow-hidden rounded-[28px] bg-[color:var(--color-surface)] text-[color:var(--color-text)] shadow-card">
          <div class="flex items-start justify-between gap-4 px-5 pt-5 md:px-6 md:pt-6">
            <div>
              <p class="font-body text-[12px] font-semibold tracking-[0.16em] uppercase text-[color:var(--color-gold)]">
                {{ t("erp.visualLabel") }}
              </p>
              <h2
                :id="titleId"
                class="mt-2 font-heading font-bold text-[24px] md:text-[32px] leading-tight"
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
              class="h-10 w-10 shrink-0 rounded-full bg-[color:var(--color-mint-wash)] text-[color:var(--color-text)] flex items-center justify-center hover:bg-[color:var(--color-stage)] hover:text-[color:var(--color-on-dark)] transition-colors"
              :aria-label="t('video.close')"
              @click="open = false"
            >
              <Icon name="X" :size="18" />
            </button>
          </div>
          <div class="px-5 pb-5 md:px-6 md:pb-6">
            <div class="product-video-frame mt-5 overflow-hidden rounded-[20px] border border-[color:var(--color-border)]">
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
                class="absolute inset-0 z-[1] flex items-center justify-center bg-[color:color-mix(in_srgb,var(--color-stage)_18%,transparent)]"
                :aria-label="t('erp.play')"
                @click="togglePlay"
              >
                <span class="h-14 w-14 rounded-full bg-[color:var(--color-surface)] text-[color:var(--color-stage)] flex items-center justify-center shadow-card">
                  <Icon name="Play" :size="20" />
                </span>
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
const closeRef = ref<HTMLButtonElement | null>(null)
const modalRef = ref<HTMLVideoElement | null>(null)
const titleId = "erp-preview-title"
const bodyId = "erp-preview-body"

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

onBeforeUnmount(() => {
  if (!import.meta.client) return
  window.removeEventListener("keydown", onKeydown)
  document.body.style.overflow = ""
})
</script>
