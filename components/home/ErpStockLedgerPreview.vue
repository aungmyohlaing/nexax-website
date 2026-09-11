<template>
  <UiAppFrame :title="t('preview.ledgerTitle')" :padded="false">
    <template #meta>
      <span
        class="rounded-md border border-slate-200 px-2 py-0.5 font-body text-[11px] font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300"
      >
        {{ t("preview.ledgerAsOf") }}
      </span>
    </template>
    <div class="overflow-x-auto">
      <table class="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr class="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
            <th
              v-for="col in columns"
              :key="col"
              class="px-3 py-2.5 font-body text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
            >
              {{ t(`preview.${col}`) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in ERP_LEDGER_ROWS"
            :key="row.sku"
            class="border-b border-slate-200 last:border-b-0 dark:border-slate-800"
          >
            <td class="px-3 py-2.5 font-body text-[13px] tabular-nums text-slate-500">
              {{ row.sku }}
            </td>
            <td class="px-3 py-2.5 font-body text-[13px] font-medium text-slate-900 dark:text-slate-100">
              {{ t(`preview.${row.product}`) }}
            </td>
            <td class="px-3 py-2.5">
              <span
                class="rounded-md border border-slate-200 px-1.5 py-0.5 font-body text-[11px] font-medium tabular-nums text-slate-600 dark:border-slate-800 dark:text-slate-300"
              >
                {{ row.batch }}
              </span>
            </td>
            <td class="px-3 py-2.5 font-body text-[13px] tabular-nums text-slate-700 dark:text-slate-200">
              {{ row.qty }}
            </td>
            <td class="px-3 py-2.5 font-body text-[13px] tabular-nums text-slate-700 dark:text-slate-200">
              {{ formatMmk(row.unitCost) }}
            </td>
            <td class="px-3 py-2.5 font-body text-[13px] font-medium tabular-nums text-slate-900 dark:text-slate-100">
              {{ formatMmk(row.qty * row.unitCost) }}
            </td>
            <td class="px-3 py-2.5">
              <span
                class="rounded-md bg-slate-100 px-1.5 py-0.5 font-body text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                {{ t(`preview.${row.branch}`) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </UiAppFrame>
</template>

<script setup lang="ts">
import { ERP_LEDGER_ROWS } from "~/constants/site"
import { formatMmk } from "~/utils/formatMmk"

const { t } = useLocale()
const columns = ["sku", "product", "batch", "qty", "unitCost", "value", "branch"] as const
</script>
