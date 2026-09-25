<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="titleId"
    >
      <button
        type="button"
        class="modal-scrim absolute inset-0 cursor-default border-0 p-0"
        :aria-label="t('erpPage.demo.close')"
        @click="close"
      />
      <div
        class="relative z-10 w-full max-w-[440px] overflow-hidden rounded-[28px] bg-[color:var(--color-surface)] shadow-card"
        @click.stop
      >
        <div class="flex items-start justify-between gap-4 border-b border-[color:var(--color-border)] px-6 py-5">
          <div>
            <p class="font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-gold)]">
              {{ t("erpPage.demo.kicker") }}
            </p>
            <h2 :id="titleId" class="mt-2 font-heading text-[24px] font-semibold leading-tight text-[color:var(--color-text)]">
              {{ t("erpPage.demo.title") }}
            </h2>
          </div>
          <button
            type="button"
            class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[color:var(--color-text-soft)] transition-colors hover:bg-[color:var(--color-mint-wash)] hover:text-[color:var(--color-text)]"
            :aria-label="t('erpPage.demo.close')"
            @click="close"
          >
            <Icon name="X" :size="18" />
          </button>
        </div>

        <form v-if="!sent" class="relative grid gap-4 px-6 py-5" @submit.prevent="submit">
          <label class="grid gap-1.5">
            <span class="font-body text-[13px] font-medium text-[color:var(--color-text)]">
              {{ t("erpPage.demo.company") }}
            </span>
            <input
              v-model="company"
              required
              autocomplete="organization"
              class="h-[52px] rounded-[16px] border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-4 font-body text-[14px] text-[color:var(--color-text)] outline-none placeholder:text-[color:var(--color-text-soft)] focus:border-[color:var(--color-primary)]"
              :placeholder="t('erpPage.demo.companyPlaceholder')"
            >
          </label>
          <label class="grid gap-1.5">
            <span class="font-body text-[13px] font-medium text-[color:var(--color-text)]">
              {{ t("erpPage.demo.phone") }}
            </span>
            <input
              v-model="phone"
              required
              type="tel"
              autocomplete="tel"
              class="h-[52px] rounded-[16px] border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-4 font-body text-[14px] text-[color:var(--color-text)] outline-none placeholder:text-[color:var(--color-text-soft)] focus:border-[color:var(--color-primary)]"
              :placeholder="t('erpPage.demo.phonePlaceholder')"
            >
          </label>
          <label class="grid gap-1.5">
            <span class="font-body text-[13px] font-medium text-[color:var(--color-text)]">
              {{ t("erpPage.demo.email") }}
            </span>
            <input
              v-model="email"
              required
              type="email"
              autocomplete="email"
              class="h-[52px] rounded-[16px] border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-4 font-body text-[14px] text-[color:var(--color-text)] outline-none placeholder:text-[color:var(--color-text-soft)] focus:border-[color:var(--color-primary)]"
              :placeholder="t('erpPage.demo.emailPlaceholder')"
            >
          </label>
          <label class="grid gap-1.5">
            <span class="font-body text-[13px] font-medium text-[color:var(--color-text)]">
              {{ t("erpPage.demo.business") }}
            </span>
            <textarea
              v-model="business"
              required
              rows="3"
              class="resize-none rounded-[16px] border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-4 py-3 font-body text-[14px] text-[color:var(--color-text)] outline-none placeholder:text-[color:var(--color-text-soft)] focus:border-[color:var(--color-primary)]"
              :placeholder="t('erpPage.demo.businessPlaceholder')"
            />
          </label>
          <!-- Honeypot: leave empty -->
          <div class="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
            <label>
              Website
              <input v-model="website" type="text" tabindex="-1" autocomplete="off">
            </label>
          </div>
          <p v-if="error" class="font-body text-[13px] leading-[1.45] text-[color:var(--color-error)]">
            {{ error }}
          </p>
          <BaseButton type="submit" class="mt-1 w-full" :disabled="submitting">
            {{ submitting ? t("erpPage.demo.sending") : t("erpPage.demo.submit") }}
          </BaseButton>
        </form>

        <div v-else class="px-6 py-6">
          <p class="font-body text-[15px] leading-[1.6] text-[color:var(--color-text)]">
            {{ t("erpPage.demo.success") }}
          </p>
          <BaseButton class="mt-5 w-full" @click="close">
            {{ t("erpPage.demo.done") }}
          </BaseButton>
        </div>

        <div class="border-t border-[color:var(--color-border)] bg-[color:var(--color-mint-wash)] px-6 py-4">
          <p class="font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-text-soft)]">
            {{ t("erpPage.demo.or") }}
          </p>
          <div class="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            <a
              :href="`tel:${SITE.phone}`"
              class="inline-flex items-center gap-2 font-body text-[14px] font-semibold text-[color:var(--color-text)] hover:text-[color:var(--color-primary)]"
            >
              <Icon name="Phone" :size="15" />
              {{ SITE.phoneDisplay }}
            </a>
            <a
              :href="`mailto:${SITE.contactEmail}`"
              class="inline-flex items-center gap-2 font-body text-[14px] font-semibold text-[color:var(--color-text)] hover:text-[color:var(--color-primary)]"
            >
              <Icon name="Mail" :size="15" />
              {{ t("erpPage.demo.emailLink") }}
            </a>
            <a
              :href="SITE.viberUrl"
              class="inline-flex items-center gap-2 font-body text-[14px] font-semibold text-[color:var(--color-text)] hover:text-[color:var(--color-primary)]"
            >
              <Icon name="MessageCircle" :size="15" />
              {{ t("erpPage.demo.viber") }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { SITE } from "~/constants/site"

const { t } = useLocale()
const { open, close } = useErpDemoModal()

const titleId = "erp-demo-modal-title"
const company = ref("")
const phone = ref("")
const email = ref("")
const business = ref("")
const website = ref("")
const sent = ref(false)
const submitting = ref(false)
const error = ref("")

watch(open, (isOpen) => {
  if (!import.meta.client) return
  document.body.style.overflow = isOpen ? "hidden" : ""
  if (!isOpen) return
  sent.value = false
  submitting.value = false
  error.value = ""
  website.value = ""
})

onBeforeUnmount(() => {
  if (!import.meta.client) return
  document.body.style.overflow = ""
})

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape" && open.value) close()
}

onMounted(() => {
  window.addEventListener("keydown", onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown)
})

const submit = async () => {
  if (submitting.value) return
  submitting.value = true
  error.value = ""

  try {
    await $fetch("/api/demo", {
      method: "POST",
      body: {
        source: "erp",
        company: company.value,
        phone: phone.value,
        email: email.value,
        business: business.value,
        website: website.value,
      },
    })
    sent.value = true
    company.value = ""
    phone.value = ""
    email.value = ""
    business.value = ""
    website.value = ""
  } catch (err: unknown) {
    const status = typeof err === "object" && err && "statusCode" in err
      ? Number((err as { statusCode?: number }).statusCode)
      : 0
    error.value = status === 429
      ? t("erpPage.demo.rateLimited")
      : t("erpPage.demo.error")
  } finally {
    submitting.value = false
  }
}
</script>
