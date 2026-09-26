<script setup lang="ts">
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Facebook,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Play,
  X,
} from "lucide-vue-next"

const icons = {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Facebook,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Play,
  X,
}

interface Props {
  name: keyof typeof icons | string
  size?: number | string
  strokeWidth?: number | string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 20,
  strokeWidth: 1.75,
})

const IconComponent = computed(() => {
  return icons[props.name as keyof typeof icons] || icons.CircleHelp
})
</script>

<template>
  <span
    class="inline-flex items-center justify-center flex-shrink-0"
    :style="{
      width: typeof props.size === 'number' ? `${props.size}px` : props.size,
      height: typeof props.size === 'number' ? `${props.size}px` : props.size,
    }"
  >
    <component
      :is="IconComponent"
      :size="props.size"
      :stroke-width="props.strokeWidth"
      :class="[
        props.class?.includes('text-') || props.class?.includes('stroke-') ? '' : 'stroke-current',
        props.class,
      ]"
    />
  </span>
</template>
