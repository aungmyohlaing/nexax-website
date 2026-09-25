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
      <div class="reveal reveal-delay-2 erp-bleed min-w-0 lg:w-[112%] lg:max-w-none">
        <div class="product-video-frame erp-depth overflow-hidden border border-[color:var(--color-border)] sm:rounded-[24px] lg:rounded-[24px]">
          <video
            :src="SITE.erpVideoUrl"
            controls
            playsinline
            preload="metadata"
            :aria-label="t('erpPage.video.label')"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { SITE } from "~/constants/site"

const { t } = useLocale()
</script>
