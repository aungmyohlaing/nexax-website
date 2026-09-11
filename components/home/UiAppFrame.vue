<template>
  <div
    class="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
  >
    <div
      class="flex flex-wrap items-center gap-2 border-b border-slate-200 px-3 py-2 dark:border-slate-800"
    >
      <p class="font-body text-[12px] font-medium text-slate-500 dark:text-slate-400">
        {{ title }}
      </p>
      <div class="ml-auto flex flex-wrap items-center gap-1.5">
        <slot name="meta" />
      </div>
    </div>
    <div :class="padded ? 'p-3 md:p-4' : ''">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    padded?: boolean
  }>(),
  { padded: true },
)
</script>
