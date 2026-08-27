<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :class="buttonClasses"
    @click="$emit('click')"
  >
    <slot />
  </NuxtLink>
  <a
    v-else-if="href"
    :href="href"
    :class="buttonClasses"
    @click="$emit('click')"
  >
    <slot />
  </a>
  <button
    v-else
    :type="type"
    :class="buttonClasses"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: "dark" | "mint" | "ghost" | "gold"
  size?: "md" | "sm"
  type?: "button" | "submit"
  to?: string
  href?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: "dark",
  size: "md",
  type: "button",
})

defineEmits<{
  click: []
}>()

const buttonClasses = computed(() => {
  const sizes = {
    sm: "px-4 py-2 text-[14px]",
    md: "px-6 py-3 text-[15px]",
  }
  const base =
    "inline-flex items-center justify-center gap-2 font-body font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2 rounded-full"
  const variants = {
    dark: "bg-[color:var(--color-stage)] text-[color:var(--color-on-dark)] hover:bg-[color:var(--color-stage-soft)] focus-visible:ring-offset-[color:var(--color-bg)]",
    mint: "bg-[color:var(--color-primary)] text-white hover:bg-[color:var(--color-primary-soft)] focus-visible:ring-offset-[color:var(--color-bg)]",
    ghost:
      "bg-transparent text-[color:var(--color-text)] hover:text-[color:var(--color-primary)] px-0 py-0 rounded-none focus-visible:ring-offset-[color:var(--color-bg)]",
    gold: "bg-transparent text-[color:var(--color-gold)] hover:text-[color:var(--color-on-dark)] px-0 py-0 rounded-none",
  }
  return `${base} ${sizes[props.size]} ${variants[props.variant]}`
})
</script>
