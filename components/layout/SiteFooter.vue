<template>
  <footer class="bg-[color:var(--color-footer)] text-[color:var(--color-on-dark-soft)]">
    <div class="page-shell py-12 md:py-16 flex flex-col gap-10">
      <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <p class="font-heading font-bold text-[20px] text-[color:var(--color-on-dark)]">
          NexaXTech
        </p>
        <nav class="flex flex-wrap gap-x-6 gap-y-3 font-body text-[14px]">
          <NuxtLink to="/erp" class="hover:text-[color:var(--color-on-dark)]">{{ t("footer.products") }}</NuxtLink>
          <a href="/#clients" class="hover:text-[color:var(--color-on-dark)]">{{ t("footer.clients") }}</a>
          <a href="/#about" class="hover:text-[color:var(--color-on-dark)]">{{ t("footer.about") }}</a>
          <a id="contact" :href="`mailto:${SITE.contactEmail}`" class="hover:text-[color:var(--color-on-dark)] scroll-mt-28">
            {{ t("footer.contact") }}
          </a>
        </nav>
      </div>

      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-white/10 pt-6">
        <p class="font-body text-[12px]">
          © {{ year }} NexaXTech. {{ t("footer.copyright") }}
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
