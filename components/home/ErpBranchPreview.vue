<template>
  <UiAppFrame :title="t('preview.branchTitle')" :padded="false">
    <template #meta>
      <span
        v-for="branch in branches"
        :key="branch"
        class="rounded-md bg-slate-100 px-2 py-0.5 font-body text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"
      >
        {{ t(`preview.${branch}`) }}
      </span>
    </template>
    <div class="overflow-x-auto">
      <table class="w-full min-w-[520px] border-collapse text-left">
        <thead>
          <tr class="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
            <th class="px-3 py-2.5 font-body text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {{ t("preview.product") }}
            </th>
            <th
              v-for="branch in branches"
              :key="branch"
              class="px-3 py-2.5 font-body text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
            >
              {{ t(`preview.${branch}`) }}
            </th>
            <th class="px-3 py-2.5 font-body text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {{ t("preview.branchTotal") }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in ERP_BRANCH_ROWS"
            :key="row.product"
            class="border-b border-slate-200 last:border-b-0 dark:border-slate-800"
          >
            <td class="px-3 py-2.5 font-body text-[13px] font-medium text-slate-900 dark:text-slate-100">
              {{ t(`preview.${row.product}`) }}
            </td>
            <td v-for="branch in branches" :key="branch" class="px-3 py-2.5">
              <span class="inline-flex items-center gap-1.5">
                <span class="font-body text-[13px] tabular-nums text-slate-700 dark:text-slate-200">
                  {{ row[branch] }}
                </span>
                <span
                  v-if="row.low === branch"
                  class="rounded-md border border-slate-200 px-1.5 py-0.5 font-body text-[10px] font-semibold uppercase tracking-wide text-amber-800 dark:border-slate-800 dark:text-amber-200"
                >
                  {{ t("preview.lowStock") }}
                </span>
              </span>
            </td>
            <td class="px-3 py-2.5 font-body text-[13px] font-medium tabular-nums text-slate-900 dark:text-slate-100">
              {{ row.bahan + row.tamwe + row.hledan }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </UiAppFrame>
</template>

<script setup lang="ts">
import { ERP_BRANCH_ROWS } from "~/constants/site"

const { t } = useLocale()
const branches = ["bahan", "tamwe", "hledan"] as const
</script>
