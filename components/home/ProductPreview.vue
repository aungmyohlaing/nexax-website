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
      <div class="stage-drift mt-4 rounded-[24px] bg-[color:var(--color-surface)] min-h-[220px] md:min-h-[280px] flex items-center justify-center px-6 py-16">
        <div class="text-center">
          <span class="mx-auto mb-4 h-12 w-12 rounded-full border border-[color:var(--color-stage)/0.16] flex items-center justify-center text-[color:var(--color-stage)] group-hover:bg-[color:var(--color-stage)] group-hover:text-[color:var(--color-on-dark)] transition-colors">
            <Icon name="Play" :size="18" />
          </span>
          <p class="font-body text-[14px] md:text-[15px] text-[color:var(--color-text-soft)]">
            {{ t("erp.visualHint") }}
          </p>
        </div>
      </div>
    </button>

    <div
      v-if="open"
      class="fixed inset-0 z-50 bg-[color:var(--color-stage)/0.72] flex items-center justify-center p-4"
      @click.self="open = false"
    >
      <div class="w-full max-w-3xl rounded-[28px] bg-[color:var(--color-stage)] text-[color:var(--color-on-dark)] p-6 md:p-10">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="font-body text-[12px] tracking-[0.16em] uppercase text-[color:var(--color-gold)]">
              {{ t("erp.visualLabel") }}
            </p>
            <h2 class="mt-3 font-heading font-bold text-[28px] md:text-[36px]">
              {{ t("video.title") }}
            </h2>
          </div>
          <button
            type="button"
            class="h-10 w-10 flex items-center justify-center"
            :aria-label="t('video.close')"
            @click="open = false"
          >
            <Icon name="X" :size="20" />
          </button>
        </div>
        <div class="mt-8 aspect-video rounded-[20px] bg-[color:var(--color-stage-soft)] flex items-center justify-center">
          <p class="font-body text-[16px] text-[color:var(--color-on-dark-soft)] px-6 text-center">
            {{ t("video.body") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useLocale()
const open = ref(false)

watch(open, (value) => {
  if (!import.meta.client) return
  document.body.style.overflow = value ? "hidden" : ""
})

onBeforeUnmount(() => {
  if (import.meta.client) document.body.style.overflow = ""
})
</script>
