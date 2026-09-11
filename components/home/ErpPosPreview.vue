<template>
  <UiAppFrame :title="t('preview.posTitle')">
    <template #meta>
      <span
        class="rounded-md border border-slate-200 px-2 py-0.5 font-body text-[11px] font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300"
      >
        {{ t("preview.bahan") }} · {{ t("preview.posTerminal") }}
      </span>
      <span
        class="rounded-md border border-slate-200 px-2 py-0.5 font-body text-[11px] font-medium tabular-nums text-slate-600 dark:border-slate-800 dark:text-slate-300"
      >
        {{ t("preview.posInvoice") }}
      </span>
    </template>

    <div class="grid gap-3">
      <div
        v-for="line in ERP_POS_LINES"
        :key="line.product"
        class="flex items-start justify-between gap-4 border-b border-slate-200 pb-3 last:border-b-0 last:pb-0 dark:border-slate-800"
      >
        <div>
          <p class="font-body text-[14px] font-medium text-slate-900 dark:text-slate-100">
            {{ t(`preview.${line.product}`) }}
          </p>
          <p class="mt-0.5 font-body text-[12px] tabular-nums text-slate-500">
            {{ line.qty }} × {{ formatMmk(line.unitPrice) }}
          </p>
        </div>
        <p class="font-body text-[14px] font-medium tabular-nums text-slate-900 dark:text-slate-100">
          {{ formatMmk(line.qty * line.unitPrice) }}
        </p>
      </div>

      <div class="flex items-center justify-between pt-1">
        <p class="font-body text-[13px] text-slate-500">{{ t("preview.total") }}</p>
        <p class="font-heading text-[18px] font-semibold tabular-nums text-slate-900 dark:text-slate-50">
          {{ formatMmk(total) }}
        </p>
      </div>
      <div class="flex items-center justify-between">
        <p class="font-body text-[13px] text-slate-500">{{ t("preview.paid") }} · {{ t("preview.posCash") }}</p>
        <p class="font-body text-[13px] font-medium tabular-nums text-slate-900 dark:text-slate-100">
          {{ formatMmk(total) }}
        </p>
      </div>

      <div class="flex flex-wrap gap-1.5 pt-1">
        <span
          class="rounded-md border border-slate-200 px-2 py-1 font-body text-[11px] font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300"
        >
          {{ t("preview.posPosted") }}
        </span>
        <span
          class="rounded-md border border-slate-200 px-2 py-1 font-body text-[11px] font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300"
        >
          {{ t("preview.posFifo") }}
        </span>
      </div>
    </div>
  </UiAppFrame>
</template>

<script setup lang="ts">
import { ERP_POS_LINES } from "~/constants/site"
import { formatMmk } from "~/utils/formatMmk"

const { t } = useLocale()
const total = ERP_POS_LINES.reduce((sum, line) => sum + line.qty * line.unitPrice, 0)
</script>
