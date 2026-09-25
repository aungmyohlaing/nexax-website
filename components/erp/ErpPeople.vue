<template>
  <section id="erp-people" class="scroll-mt-24 overflow-x-clip bg-[color:var(--color-mint-wash)]">
    <div class="page-shell py-12 md:py-24">
      <h2 class="reveal max-w-2xl font-heading text-[28px] font-semibold leading-[1.15] md:text-[44px]">
        {{ t("erpPage.people.title") }}
      </h2>

      <div class="mt-8 lg:mt-14 lg:grid lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start lg:gap-10">
        <div>
          <div
            class="reveal erp-bleed lg:overflow-visible"
            role="tablist"
            :aria-label="t('erpPage.people.title')"
          >
            <div class="erp-flow-rail px-[var(--page-pad)] lg:flex-col lg:overflow-visible lg:px-0">
              <button
                v-for="role in roles"
                :key="role.id"
                type="button"
                role="tab"
                class="min-h-[44px] shrink-0 rounded-full border px-4 py-2 text-left transition-colors lg:w-full"
                :class="role.id === selectedId
                  ? 'border-[color:var(--color-stage)] bg-[color:var(--color-stage)] text-[color:var(--color-on-dark)]'
                  : 'border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text)]'"
                :aria-selected="role.id === selectedId"
                @click="choose(role.id)"
              >
                <span class="block font-heading text-[15px] font-semibold">{{ role.name }}</span>
                <span
                  class="mt-0.5 block font-body text-[13px]"
                  :class="role.id === selectedId ? 'text-[color:var(--color-on-dark-soft)]' : 'text-[color:var(--color-text-soft)]'"
                >
                  {{ role.hint }}
                </span>
              </button>
            </div>
          </div>
          <p class="reveal reveal-delay-1 mt-4 font-body text-[14px] leading-[1.55] text-[color:var(--color-text-soft)] md:text-[15px]" aria-live="polite">
            {{ selected?.name }} — {{ t("erpPage.people.note") }}
          </p>
        </div>

        <div class="reveal reveal-delay-2 mt-6 min-w-0 lg:mt-0">
          <div class="erp-bleed lg:hidden">
            <div class="erp-rail px-[var(--page-pad)]">
              <figure class="erp-depth w-[88%] overflow-hidden rounded-[20px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
                <img
                  src="/images/erp/roles.png"
                  :alt="t('erpPage.people.rolesAlt')"
                  width="1919"
                  height="1079"
                  loading="lazy"
                  decoding="async"
                  class="block h-[min(50vw,250px)] w-full object-cover object-left-top"
                >
              </figure>
              <figure
                class="erp-depth w-[88%] overflow-hidden rounded-[20px] border-2 bg-[color:var(--color-surface)]"
                :class="shifting ? 'erp-nudge border-[color:var(--color-gold)]' : 'border-[color:var(--color-border)]'"
              >
                <figcaption class="flex items-center justify-between gap-3 border-b border-[color:var(--color-border)] px-4 py-3">
                  <span class="font-heading text-[15px] font-semibold">{{ selected?.name }}</span>
                  <span class="font-body text-[13px] text-[color:var(--color-text-soft)]">{{ selected?.hint }}</span>
                </figcaption>
                <img
                  src="/images/erp/permissions.png"
                  :alt="t('erpPage.people.permissionsAlt')"
                  width="1919"
                  height="1079"
                  loading="lazy"
                  decoding="async"
                  class="block h-[min(50vw,250px)] w-full object-cover object-left-top"
                >
              </figure>
            </div>
          </div>

          <div class="relative hidden min-w-0 lg:block lg:pb-16">
            <figure class="erp-depth w-[86%] overflow-hidden rounded-[24px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
              <img
                src="/images/erp/roles.png"
                :alt="t('erpPage.people.rolesAlt')"
                width="1919"
                height="1079"
                loading="lazy"
                decoding="async"
                class="block h-auto w-full"
              >
            </figure>
            <figure
              class="erp-depth absolute bottom-0 right-0 z-10 w-[72%] overflow-hidden rounded-[20px] border-2 bg-[color:var(--color-surface)]"
              :class="shifting ? 'erp-nudge border-[color:var(--color-gold)]' : 'border-[color:var(--color-border)]'"
            >
              <figcaption class="flex items-center justify-between gap-3 border-b border-[color:var(--color-border)] px-4 py-3">
                <span class="font-heading text-[15px] font-semibold">{{ selected?.name }}</span>
                <span class="font-body text-[13px] text-[color:var(--color-text-soft)]">{{ selected?.hint }}</span>
              </figcaption>
              <img
                src="/images/erp/permissions.png"
                :alt="t('erpPage.people.permissionsAlt')"
                width="1919"
                height="1079"
                loading="lazy"
                decoding="async"
                class="block h-auto w-full"
              >
            </figure>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useLocale()

const roles = computed(() => [
  { id: "owner", name: t("erpPage.people.owner"), hint: t("erpPage.people.ownerHint") },
  { id: "manager", name: t("erpPage.people.manager"), hint: t("erpPage.people.managerHint") },
  { id: "cashier", name: t("erpPage.people.cashier"), hint: t("erpPage.people.cashierHint") },
  { id: "accountant", name: t("erpPage.people.accountant"), hint: t("erpPage.people.accountantHint") },
  { id: "viewer", name: t("erpPage.people.viewer"), hint: t("erpPage.people.viewerHint") },
])

const selectedId = ref("owner")
const shifting = ref(false)

const selected = computed(() => roles.value.find((role) => role.id === selectedId.value))

const choose = async (id: string) => {
  if (id === selectedId.value) return
  selectedId.value = id
  shifting.value = false
  await nextTick()
  shifting.value = true
}
</script>
