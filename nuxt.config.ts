// https://nuxt.com/docs/api/configuration/nuxt-config
import { SITE } from "./constants/site"

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/css/app.css"],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  ssr: true,
  runtimeConfig: {
    // Server-only. Override with NUXT_RESEND_* only.
    // Defaults are empty so staging never inherits production credentials.
    resendApiKey: "",
    resendFrom: "",
    resendTo: "",
    public: {
      // Production defaults when env is unset. Staging Cloud Run MUST set:
      // NUXT_PUBLIC_SITE_URL=https://staging.nexaxtech.com
      // NUXT_PUBLIC_GTM_ID=   (empty string disables GTM; do not omit)
      // Configure those BEFORE the first CI deploy (see docs/DEPLOYMENT.md).
      siteUrl: SITE.siteUrl,
      gtmId: "GTM-PQP878R2",
    },
  },
  routeRules: {
    "/regify": { redirect: { to: SITE.regifyUrl, statusCode: 301 } },
  },
  nitro: {
    // Host-based redirects must run before static HTML. Prerendering `/` and
    // `/erp` made Nitro serve those pages as assets and skip the redirect.
    prerender: {
      crawlLinks: false,
      routes: [],
    },
  },
  app: {
    head: {
      title: "NexaXTech",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { name: "theme-color", content: "#FCFAF7" },
      ],
      // Page titles, descriptions, and canonical URLs are set per route.
      // A homepage canonical here is inherited by error.vue and would
      // point 404s at /.
      link: [
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "48x48",
          href: "/favicon-48.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "192x192",
          href: "/favicon-192.png",
        },
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Myanmar:wght@400;500;600;700&display=swap",
        },
      ],
    },
  },
  vite: {
    optimizeDeps: {
      include: ["lucide-vue-next"],
    },
  },
})
