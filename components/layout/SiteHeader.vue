<template>
  <header
    ref="headerRef"
    class="site-header sticky top-0 z-40"
    :class="{ 'is-on-dark': onDark }"
  >
    <div class="page-shell flex items-center justify-between h-[76px] gap-4">
      <NuxtLink
        to="/"
        class="shrink-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2"
        :class="onDark
          ? 'focus-visible:ring-offset-[color:var(--color-stage)]'
          : 'focus-visible:ring-offset-[color:var(--color-bg)]'"
        :aria-label="SITE.fullName"
      >
        <BrandLockup :on-dark="onDark" />
      </NuxtLink>

      <nav
        class="hidden lg:flex items-center gap-8 font-body text-[15px] font-medium transition-colors duration-200"
        :class="onDark ? 'text-[color:var(--color-on-dark)]' : 'text-[color:var(--color-text)]'"
      >
        <div
          class="relative"
          @mouseenter="productsOpen = true"
          @mouseleave="productsOpen = false"
        >
          <button
            type="button"
            class="inline-flex items-center gap-1 transition-colors"
            :class="onDark ? 'hover:text-[color:var(--color-gold)]' : 'hover:text-[color:var(--color-primary)]'"
            :aria-expanded="productsOpen"
            @click="productsOpen = !productsOpen"
          >
            {{ t("nav.products") }}
          </button>
          <div
            v-if="productsOpen"
            class="absolute left-0 top-full pt-3"
          >
            <div class="min-w-[220px] rounded-[20px] bg-[color:var(--color-surface)] text-[color:var(--color-text)] p-2 shadow-card">
              <NuxtLink
                to="/erp"
                class="block rounded-[14px] px-4 py-3 hover:bg-[color:var(--color-mint-wash)] transition-colors"
                @click="productsOpen = false"
              >
                <span class="block">{{ t("nav.erp") }}</span>
                <span class="block text-[12px] text-[color:var(--color-gold)]">{{ t("nav.erpHint") }}</span>
              </NuxtLink>
              <a
                :href="SITE.regifyUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="block rounded-[14px] px-4 py-3 hover:bg-[color:var(--color-mint-wash)] transition-colors"
                @click="productsOpen = false"
              >
                {{ t("nav.regify") }}
              </a>
            </div>
          </div>
        </div>
        <a
          href="/#clients"
          class="transition-colors"
          :class="onDark ? 'hover:text-[color:var(--color-gold)]' : 'hover:text-[color:var(--color-primary)]'"
        >{{ t("nav.clients") }}</a>
        <a
          href="/#about"
          class="transition-colors"
          :class="onDark ? 'hover:text-[color:var(--color-gold)]' : 'hover:text-[color:var(--color-primary)]'"
        >{{ t("nav.about") }}</a>

        <div
          class="relative"
          @mouseenter="langOpen = true"
          @mouseleave="langOpen = false"
        >
          <button
            type="button"
            class="inline-flex items-center gap-1 transition-colors"
            :class="onDark ? 'hover:text-[color:var(--color-gold)]' : 'hover:text-[color:var(--color-primary)]'"
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
            <div class="min-w-[140px] rounded-[16px] bg-[color:var(--color-surface)] text-[color:var(--color-text)] p-2 shadow-card">
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

        <BaseButton
          v-if="isErpPage"
          size="sm"
          :variant="onDark ? 'mint' : 'dark'"
          @click="openErpDemo"
        >
          {{ t("nav.talk") }}
        </BaseButton>
        <BaseButton
          v-else
          href="/#contact"
          size="sm"
          :variant="onDark ? 'mint' : 'dark'"
        >
          {{ t("nav.talk") }}
        </BaseButton>
      </nav>

      <button
        type="button"
        class="lg:hidden h-10 w-10 flex items-center justify-center transition-colors duration-200"
        :class="onDark ? 'text-[color:var(--color-on-dark)]' : 'text-[color:var(--color-text)]'"
        :aria-label="t('nav.menu')"
        @click="mobileOpen = true"
      >
        <Icon name="Menu" :size="22" />
      </button>
    </div>

    <Teleport to="body">
      <div
        v-if="mobileOpen"
        class="fixed inset-0 z-50 overflow-y-auto bg-[color:var(--color-bg)] text-[color:var(--color-text)] lg:hidden"
      >
        <div class="page-shell flex items-center justify-between h-[76px]">
          <NuxtLink
            to="/"
            class="shrink-0"
            :aria-label="SITE.fullName"
            @click="mobileOpen = false"
          >
            <BrandLockup />
          </NuxtLink>
          <button
            type="button"
            class="h-10 w-10 flex items-center justify-center"
            :aria-label="t('nav.close')"
            @click="mobileOpen = false"
          >
            <Icon name="X" :size="22" />
          </button>
        </div>
        <nav class="page-shell flex flex-col gap-6 pt-8 pb-12 font-body text-[20px] font-medium">
          <NuxtLink to="/erp" @click="mobileOpen = false">{{ t("nav.erp") }}</NuxtLink>
          <a
            :href="SITE.regifyUrl"
            target="_blank"
            rel="noopener noreferrer"
            @click="mobileOpen = false"
          >{{ t("nav.regify") }}</a>
          <a href="/#clients" @click="mobileOpen = false">{{ t("nav.clients") }}</a>
          <a href="/#about" @click="mobileOpen = false">{{ t("nav.about") }}</a>
          <div class="flex items-center gap-3 text-[16px] text-[color:var(--color-text-soft)]">
            <button type="button" @click="setLocale('en')">{{ t("lang.en") }}</button>
            <span>/</span>
            <button type="button" class="myanmar" @click="setLocale('my')">{{ t("lang.my") }}</button>
          </div>
          <BaseButton v-if="isErpPage" @click="openErpDemo">
            {{ t("nav.talk") }}
          </BaseButton>
          <BaseButton v-else href="/#contact" @click="mobileOpen = false">
            {{ t("nav.talk") }}
          </BaseButton>
        </nav>
      </div>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
import type { Locale } from "~/types/locale"
import { SITE } from "~/constants/site"

const { t, locale, setLocale } = useLocale()
const route = useRoute()
const { show: showErpDemo } = useErpDemoModal()
const headerRef = ref<HTMLElement | null>(null)
const productsOpen = ref(false)
const langOpen = ref(false)
const mobileOpen = ref(false)
const onDark = ref(false)
let frame = 0

const isErpPage = computed(() => route.path === "/erp" || route.path.startsWith("/erp/"))

const openErpDemo = () => {
  mobileOpen.value = false
  showErpDemo()
}

const chooseLocale = (next: Locale) => {
  setLocale(next)
  langOpen.value = false
}

const syncOnDark = () => {
  const header = headerRef.value
  if (!header) return
  const band = header.getBoundingClientRect()
  onDark.value = Array.from(document.querySelectorAll("[data-nav-dark]")).some((el) => {
    const box = el.getBoundingClientRect()
    return box.top < band.bottom && box.bottom > band.top && box.left < band.right && box.right > band.left
  })
}

const onScroll = () => {
  if (frame) return
  frame = requestAnimationFrame(() => {
    frame = 0
    syncOnDark()
  })
}

watch(mobileOpen, (open) => {
  if (!import.meta.client) return
  document.body.style.overflow = open ? "hidden" : ""
})

watch(() => route.fullPath, async () => {
  await nextTick()
  syncOnDark()
})

onMounted(() => {
  syncOnDark()
  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("resize", onScroll)
})

onBeforeUnmount(() => {
  if (!import.meta.client) return
  window.removeEventListener("scroll", onScroll)
  window.removeEventListener("resize", onScroll)
  if (frame) cancelAnimationFrame(frame)
  document.body.style.overflow = ""
})
</script>
