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
    resendApiKey: "",
    resendFrom: "",
    resendTo: SITE.contactEmail,
    public: {
      siteUrl: SITE.siteUrl,
    },
  },
  routeRules: {
    "/regify": { redirect: { to: SITE.regifyUrl, statusCode: 301 } },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/", "/erp"],
    },
  },
  app: {
    head: {
      title: "NexaXTech",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        {
          name: "description",
          content: "NexaXTech builds software around real business problems.",
        },
        { name: "theme-color", content: "#FCFAF7" },
      ],
      link: [
        {
          rel: "canonical",
          href: `${SITE.siteUrl}/`,
        },
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
