<template>
  <section id="erp-close" class="scroll-mt-24 border-t border-[color:var(--color-border)]">
    <div class="page-shell py-20 md:py-28">
      <h2 class="reveal max-w-2xl font-heading text-[32px] font-semibold leading-[1.25] md:text-[48px]">
        {{ t("erpPage.close.title") }}
      </h2>
      <div class="reveal reveal-delay-1 mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
        <BaseButton class="w-full sm:w-auto" @click="showDemo">
          {{ t("erpPage.requestDemo") }}
        </BaseButton>
        <BaseButton class="w-full sm:w-auto" variant="ghost" @click="showDemo">
          {{ t("nav.talk") }}
          <Icon name="ArrowRight" :size="16" />
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useLocale()
const { show: showDemo } = useErpDemoModal()
</script>
