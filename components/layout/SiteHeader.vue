<template>
  <header class="sticky top-0 z-40 bg-[color:var(--color-bg)/0.92] backdrop-blur-md">
    <div class="page-shell flex items-center justify-between h-[76px] gap-4">
      <NuxtLink
        to="/"
        class="font-heading font-bold text-[20px] tracking-tight text-[color:var(--color-text)]"
        aria-label="NexaXTech"
      >
        NexaXTech
      </NuxtLink>

      <nav class="hidden lg:flex items-center gap-8 font-body text-[15px] font-medium text-[color:var(--color-text)]">
        <div
          class="relative"
          @mouseenter="productsOpen = true"
          @mouseleave="productsOpen = false"
        >
          <button
            type="button"
            class="inline-flex items-center gap-1 hover:text-[color:var(--color-primary)] transition-colors"
            :aria-expanded="productsOpen"
            @click="productsOpen = !productsOpen"
          >
            {{ t("nav.products") }}
          </button>
          <div
            v-if="productsOpen"
            class="absolute left-0 top-full pt-3"
          >
            <div class="min-w-[220px] rounded-[20px] bg-[color:var(--color-surface)] p-2 shadow-card">
              <NuxtLink
                to="/erp"
                class="block rounded-[14px] px-4 py-3 hover:bg-[color:var(--color-mint-wash)] transition-colors"
                @click="productsOpen = false"
              >
                <span class="block">{{ t("nav.erp") }}</span>
                <span class="block text-[12px] text-[color:var(--color-gold)]">{{ t("nav.erpHint") }}</span>
              </NuxtLink>
              <NuxtLink
                to="/regify"
                class="block rounded-[14px] px-4 py-3 hover:bg-[color:var(--color-mint-wash)] transition-colors"
                @click="productsOpen = false"
              >
                {{ t("nav.regify") }}
              </NuxtLink>
            </div>
          </div>
        </div>
        <a href="/#clients" class="hover:text-[color:var(--color-primary)] transition-colors">{{ t("nav.clients") }}</a>
        <a href="/#about" class="hover:text-[color:var(--color-primary)] transition-colors">{{ t("nav.about") }}</a>

        <div
          class="relative"
          @mouseenter="langOpen = true"
          @mouseleave="langOpen = false"
        >
          <button
            type="button"
            class="inline-flex items-center gap-1 hover:text-[color:var(--color-primary)] transition-colors"
            :aria-label="t('nav.language')"
            :aria-expanded="langOpen"
            @click="langOpen = !langOpen"
          >
            {{ locale === "my" ? t("lang.my") : t("lang.en") }}
            <Icon name="ChevronDown" :size="14" />
          </button>
          <div
            v-if="langOpen"
            class="absolute right-0 top-full pt-3"
          >
            <div class="min-w-[140px] rounded-[16px] bg-[color:var(--color-surface)] p-2 shadow-card">
              <button
                type="button"
                class="block w-full rounded-[12px] px-3 py-2 text-left hover:bg-[color:var(--color-mint-wash)]"
                @click="chooseLocale('en')"
              >
                {{ t("lang.en") }}
              </button>
              <button
                type="button"
                class="myanmar block w-full rounded-[12px] px-3 py-2 text-left hover:bg-[color:var(--color-mint-wash)]"
                @click="chooseLocale('my')"
              >
                {{ t("lang.my") }}
              </button>
            </div>
          </div>
        </div>

        <BaseButton href="/#contact" size="sm">
          {{ t("nav.talk") }}
        </BaseButton>
      </nav>

      <button
        type="button"
        class="lg:hidden h-10 w-10 flex items-center justify-center"
        :aria-label="t('nav.menu')"
        @click="mobileOpen = true"
      >
        <Icon name="Menu" :size="22" />
      </button>
    </div>

    <div
      v-if="mobileOpen"
      class="fixed inset-0 z-50 bg-[color:var(--color-bg)] lg:hidden"
    >
      <div class="page-shell flex items-center justify-between h-[76px]">
        <span class="font-heading font-bold text-[20px]">NexaXTech</span>
        <button
          type="button"
          class="h-10 w-10 flex items-center justify-center"
          :aria-label="t('nav.close')"
          @click="mobileOpen = false"
        >
          <Icon name="X" :size="22" />
        </button>
      </div>
      <nav class="page-shell flex flex-col gap-6 pt-8 font-body text-[20px] font-medium">
        <NuxtLink to="/erp" @click="mobileOpen = false">{{ t("nav.erp") }}</NuxtLink>
        <NuxtLink to="/regify" @click="mobileOpen = false">{{ t("nav.regify") }}</NuxtLink>
        <a href="/#clients" @click="mobileOpen = false">{{ t("nav.clients") }}</a>
        <a href="/#about" @click="mobileOpen = false">{{ t("nav.about") }}</a>
        <div class="flex items-center gap-3 text-[16px] text-[color:var(--color-text-soft)]">
          <button type="button" @click="setLocale('en')">{{ t("lang.en") }}</button>
          <span>/</span>
          <button type="button" class="myanmar" @click="setLocale('my')">{{ t("lang.my") }}</button>
        </div>
        <BaseButton href="/#contact" @click="mobileOpen = false">
          {{ t("nav.talk") }}
        </BaseButton>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { Locale } from "~/types/locale"

const { t, locale, setLocale } = useLocale()
const productsOpen = ref(false)
const langOpen = ref(false)
const mobileOpen = ref(false)

const chooseLocale = (next: Locale) => {
  setLocale(next)
  langOpen.value = false
}

watch(mobileOpen, (open) => {
  if (!import.meta.client) return
  document.body.style.overflow = open ? "hidden" : ""
})

onBeforeUnmount(() => {
  if (import.meta.client) document.body.style.overflow = ""
})
</script>
