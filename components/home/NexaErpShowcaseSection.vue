<template>
  <section id="erp" class="scroll-mt-24 border-b border-slate-200 dark:border-slate-800">
    <div class="page-shell py-16 md:py-24">
      <div class="max-w-2xl">
        <p class="font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-primary)]">
          {{ t("erpShowcase.kicker") }}
        </p>
        <h2 class="mt-3 font-heading text-[32px] font-bold tracking-tight text-slate-900 dark:text-slate-50 md:text-[44px]">
          {{ t("erpShowcase.title") }}
        </h2>
        <p class="copy mt-4 font-body text-[16px] text-slate-600 dark:text-slate-300">
          {{ t("erpShowcase.lead") }}
        </p>
      </div>

      <div class="mt-14 grid gap-16">
        <article
          v-for="block in blocks"
          :key="block.key"
          class="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
        >
          <div>
            <p class="font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-500">
              {{ t(`erpShowcase.${block.key}Kicker`) }}
            </p>
            <h3 class="mt-2 font-heading text-[24px] font-semibold tracking-tight text-slate-900 dark:text-slate-50 md:text-[28px]">
              {{ t(`erpShowcase.${block.key}Title`) }}
            </h3>
            <p class="copy mt-3 font-body text-[15px] text-slate-600 dark:text-slate-300 md:text-[16px]">
              {{ t(`erpShowcase.${block.key}Body`) }}
            </p>
          </div>
          <component :is="block.preview" />
        </article>
      </div>

      <div class="mt-12">
        <BaseButton href="#contact">
          {{ t("erpShowcase.cta") }}
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ErpBranchPreview from "~/components/home/ErpBranchPreview.vue"
import ErpPosPreview from "~/components/home/ErpPosPreview.vue"
import ErpStockLedgerPreview from "~/components/home/ErpStockLedgerPreview.vue"

const { t } = useLocale()

const blocks = [
  { key: "fifo", preview: ErpStockLedgerPreview },
  { key: "pos", preview: ErpPosPreview },
  { key: "branch", preview: ErpBranchPreview },
] as const
</script>
