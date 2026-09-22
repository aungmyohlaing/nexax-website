<template>
  <footer class="bg-[color:var(--color-footer)] text-[color:var(--color-on-dark-soft)]" data-nav-dark>
    <div class="page-shell py-12 md:py-16 flex flex-col gap-10">
      <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <div class="flex flex-col gap-4">
          <NuxtLink to="/" class="shrink-0 self-start" :aria-label="SITE.fullName">
            <BrandLockup on-dark />
          </NuxtLink>
          <div class="font-body text-[14px] grid gap-1.5">
            <a
              :href="`mailto:${SITE.contactEmail}`"
              class="hover:text-[color:var(--color-on-dark)]"
            >
              {{ SITE.contactEmail }}
            </a>
            <a
              :href="`tel:${SITE.phone}`"
              class="tabular-nums hover:text-[color:var(--color-on-dark)]"
            >
              {{ SITE.phoneDisplay }}
            </a>
          </div>
        </div>

        <div class="flex flex-col items-start md:items-end gap-6">
          <nav class="flex flex-wrap gap-x-6 gap-y-3 font-body text-[14px] md:justify-end">
            <NuxtLink to="/erp" class="hover:text-[color:var(--color-on-dark)]">{{ t("footer.products") }}</NuxtLink>
            <a href="/#clients" class="hover:text-[color:var(--color-on-dark)]">{{ t("footer.clients") }}</a>
            <a href="/#about" class="hover:text-[color:var(--color-on-dark)]">{{ t("footer.about") }}</a>
            <a href="/#contact" class="hover:text-[color:var(--color-on-dark)]">{{ t("footer.contact") }}</a>
          </nav>
          <div class="flex items-center gap-3">
            <a
              :href="SITE.facebookUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center text-[color:var(--color-on-dark)] hover:border-[color:var(--color-gold)] hover:text-[color:var(--color-gold)] transition-colors"
              :aria-label="t('footer.facebook')"
            >
              <Icon name="Facebook" :size="18" />
            </a>
            <a
              :href="`mailto:${SITE.contactEmail}`"
              class="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center text-[color:var(--color-on-dark)] hover:border-[color:var(--color-gold)] hover:text-[color:var(--color-gold)] transition-colors"
              :aria-label="t('next.email')"
            >
              <Icon name="Mail" :size="18" />
            </a>
            <a
              :href="`tel:${SITE.phone}`"
              class="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center text-[color:var(--color-on-dark)] hover:border-[color:var(--color-gold)] hover:text-[color:var(--color-gold)] transition-colors"
              :aria-label="t('next.phone')"
            >
              <Icon name="Phone" :size="18" />
            </a>
          </div>
        </div>
      </div>

      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-white/10 pt-6">
        <p class="font-body text-[12px]">
          © {{ year }} {{ SITE.fullName }}. {{ t("footer.copyright") }}
        </p>
        <div class="flex items-center gap-2 font-body text-[12px]">
          <button type="button" class="hover:text-[color:var(--color-on-dark)]" @click="setLocale('en')">
            {{ t("lang.en") }}
          </button>
          <span>/</span>
          <button type="button" class="myanmar hover:text-[color:var(--color-on-dark)]" @click="setLocale('my')">
            {{ t("lang.my") }}
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { SITE } from "~/constants/site"

const { t, setLocale } = useLocale()
const year = new Date().getFullYear()
</script>
