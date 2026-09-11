<template>
  <span class="inline-flex items-center gap-2.5 min-w-0">
    <span class="relative h-10 w-10 shrink-0">
      <img
        :src="SITE.logoUrl"
        alt=""
        width="562"
        height="544"
        class="h-full w-full object-contain"
      >
    </span>
    <span class="flex flex-col min-w-0 leading-none">
      <span
        class="font-heading font-bold text-[16px] md:text-[17px] tracking-tight"
        :class="onDark ? 'text-[color:var(--color-on-dark)]' : 'text-[color:var(--color-text)]'"
      >
        NexaX
      </span>
      <span
        class="mt-1 font-body text-[10px] md:text-[11px] font-medium tracking-[0.12em]"
        :class="onDark ? 'text-[color:var(--color-on-dark-soft)]' : 'text-[color:var(--color-text-soft)]'"
      >
        Technologies
      </span>
    </span>
  </span>
</template>

<script setup lang="ts">
import { SITE } from "~/constants/site"

withDefaults(defineProps<{
  onDark?: boolean
}>(), {
  onDark: false,
})
</script>
