<template>
  <section id="contact" class="scroll-mt-24">
    <div class="page-shell py-16 md:py-24">
      <div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p class="reveal font-body text-[12px] font-semibold tracking-[0.16em] uppercase text-[color:var(--color-gold)]">
            {{ t("next.kicker") }}
          </p>
          <h2 class="reveal reveal-delay-1 mt-3 font-heading font-bold text-[36px] md:text-[52px] leading-tight">
            {{ t("next.title") }}
          </h2>
          <p class="reveal reveal-delay-1 mt-5 font-body text-[16px] md:text-[18px] leading-7 text-[color:var(--color-text-soft)] max-w-xl">
            {{ t("next.body") }}
          </p>
          <p class="reveal reveal-delay-1 mt-4 font-body text-[16px] md:text-[18px] leading-7 text-[color:var(--color-text-soft)] max-w-xl">
            {{ t("next.invite") }}
          </p>
        </div>

        <div class="reveal reveal-delay-2 rounded-[28px] bg-[color:var(--color-gold-soft)] px-7 py-8 md:px-8 md:py-10">
          <ul class="grid gap-5">
            <li>
              <a
                :href="`mailto:${SITE.contactEmail}`"
                class="flex items-center gap-4 text-[color:var(--color-text)] hover:text-[color:var(--color-stage)]"
              >
                <span class="h-11 w-11 shrink-0 rounded-full bg-[color:var(--color-surface)] flex items-center justify-center">
                  <Icon name="Mail" :size="18" />
                </span>
                <span class="min-w-0">
                  <span class="block font-body text-[12px] font-semibold tracking-[0.12em] uppercase text-[color:var(--color-text-soft)]">
                    {{ t("next.email") }}
                  </span>
                  <span class="mt-1 block font-heading font-semibold text-[16px] md:text-[18px] truncate">
                    {{ SITE.contactEmail }}
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                :href="`tel:${SITE.phone}`"
                class="flex items-center gap-4 text-[color:var(--color-text)] hover:text-[color:var(--color-stage)]"
              >
                <span class="h-11 w-11 shrink-0 rounded-full bg-[color:var(--color-surface)] flex items-center justify-center">
                  <Icon name="Phone" :size="18" />
                </span>
                <span class="min-w-0">
                  <span class="block font-body text-[12px] font-semibold tracking-[0.12em] uppercase text-[color:var(--color-text-soft)]">
                    {{ t("next.phone") }}
                  </span>
                  <span class="mt-1 block font-heading font-semibold text-[16px] md:text-[18px] tabular-nums">
                    {{ SITE.phoneDisplay }}
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                :href="SITE.facebookUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-4 text-[color:var(--color-text)] hover:text-[color:var(--color-stage)]"
              >
                <span class="h-11 w-11 shrink-0 rounded-full bg-[color:var(--color-surface)] flex items-center justify-center">
                  <Icon name="Facebook" :size="18" />
                </span>
                <span class="min-w-0">
                  <span class="block font-body text-[12px] font-semibold tracking-[0.12em] uppercase text-[color:var(--color-text-soft)]">
                    {{ t("next.facebook") }}
                  </span>
                  <span class="mt-1 block font-heading font-semibold text-[16px] md:text-[18px]">
                    {{ t("next.facebookName") }}
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { SITE } from "~/constants/site"

const { t } = useLocale()
</script>
