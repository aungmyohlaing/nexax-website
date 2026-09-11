<template>
  <section id="contact" class="scroll-mt-24">
    <div class="page-shell py-16 md:py-24">
      <div class="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div class="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div class="border-b border-slate-200 p-6 md:p-10 lg:border-b-0 lg:border-r dark:border-slate-800">
            <p class="font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-primary)]">
              {{ t("cta.kicker") }}
            </p>
            <h2 class="mt-3 font-heading text-[32px] font-bold tracking-tight text-slate-900 dark:text-slate-50 md:text-[40px]">
              {{ t("cta.title") }}
            </h2>
            <p class="copy mt-4 font-body text-[16px] text-slate-600 dark:text-slate-300">
              {{ t("cta.body") }}
            </p>

            <form v-if="!sent" class="mt-8 grid gap-4" @submit.prevent="submit">
              <label class="grid gap-1">
                <span class="font-body text-[12px] font-medium text-slate-600 dark:text-slate-300">
                  {{ t("cta.name") }}
                </span>
                <input
                  v-model="name"
                  required
                  class="rounded-xl border border-slate-200 bg-white px-3 py-2.5 font-body text-[14px] text-slate-900 outline-none focus:border-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                >
              </label>
              <label class="grid gap-1">
                <span class="font-body text-[12px] font-medium text-slate-600 dark:text-slate-300">
                  {{ t("cta.business") }}
                </span>
                <input
                  v-model="business"
                  required
                  class="rounded-xl border border-slate-200 bg-white px-3 py-2.5 font-body text-[14px] text-slate-900 outline-none focus:border-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                >
              </label>
              <label class="grid gap-1">
                <span class="font-body text-[12px] font-medium text-slate-600 dark:text-slate-300">
                  {{ t("cta.phone") }}
                </span>
                <input
                  v-model="phone"
                  required
                  inputmode="tel"
                  :placeholder="t('cta.phonePlaceholder')"
                  class="rounded-xl border border-slate-200 bg-white px-3 py-2.5 font-body text-[14px] tabular-nums text-slate-900 outline-none focus:border-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                >
              </label>
              <fieldset class="grid gap-2">
                <legend class="font-body text-[12px] font-medium text-slate-600 dark:text-slate-300">
                  {{ t("cta.product") }}
                </legend>
                <div class="flex flex-wrap gap-2">
                  <label
                    v-for="option in products"
                    :key="option.value"
                    class="cursor-pointer rounded-xl border border-slate-200 px-3 py-2 font-body text-[13px] dark:border-slate-800"
                    :class="product === option.value ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900' : 'bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-200'"
                  >
                    <input v-model="product" type="radio" :value="option.value" class="sr-only">
                    {{ t(option.label) }}
                  </label>
                </div>
              </fieldset>
              <label class="grid gap-1">
                <span class="font-body text-[12px] font-medium text-slate-600 dark:text-slate-300">
                  {{ t("cta.note") }}
                </span>
                <textarea
                  v-model="note"
                  rows="3"
                  :placeholder="t('cta.notePlaceholder')"
                  class="resize-y rounded-xl border border-slate-200 bg-white px-3 py-2.5 font-body text-[14px] text-slate-900 outline-none focus:border-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                />
              </label>
              <button
                type="submit"
                class="mt-1 inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 font-body text-[15px] font-semibold text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
              >
                {{ t("cta.submit") }}
              </button>
            </form>
            <p v-else class="copy mt-8 font-body text-[15px] text-slate-600 dark:text-slate-300">
              {{ t("cta.success") }}
            </p>
          </div>

          <aside class="bg-slate-50 p-6 md:p-10 dark:bg-slate-950">
            <p class="font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-500">
              {{ t("cta.or") }}
            </p>
            <div class="mt-5 grid gap-3">
              <a
                :href="`tel:${SITE.phone}`"
                class="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 font-body text-[14px] font-semibold text-slate-900 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                <Icon name="Phone" :size="18" />
                {{ SITE.phoneDisplay }}
              </a>
              <a
                :href="SITE.viberUrl"
                class="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 font-body text-[14px] font-semibold text-slate-900 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                <Icon name="MessageCircle" :size="18" />
                {{ t("cta.viber") }}
              </a>
              <a
                :href="SITE.facebookUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 font-body text-[14px] font-semibold text-slate-900 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                <Icon name="Facebook" :size="18" />
                {{ t("cta.facebook") }}
              </a>
              <a
                :href="`mailto:${SITE.contactEmail}`"
                class="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 font-body text-[14px] font-semibold text-slate-900 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                <Icon name="Mail" :size="18" />
                {{ SITE.contactEmail }}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { SITE } from "~/constants/site"

const { t } = useLocale()

const name = ref("")
const business = ref("")
const phone = ref("")
const product = ref("erp")
const note = ref("")
const sent = ref(false)

const products = [
  { value: "erp", label: "cta.productErp" },
  { value: "regify", label: "cta.productRegify" },
  { value: "both", label: "cta.productBoth" },
] as const

const submit = () => {
  const productLabel = t(products.find((item) => item.value === product.value)?.label ?? "cta.productErp")
  const subject = encodeURIComponent(`Demo request — ${productLabel}`)
  const body = encodeURIComponent(
    [
      `Name: ${name.value}`,
      `Business: ${business.value}`,
      `Phone / Viber: ${phone.value}`,
      `Product: ${productLabel}`,
      note.value ? `Notes: ${note.value}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  )
  sent.value = true
  if (!import.meta.client) return
  window.location.href = `mailto:${SITE.contactEmail}?subject=${subject}&body=${body}`
}
</script>
