const GTM_ID_PATTERN = /^GTM-[A-Z0-9]+$/

/**
 * Official Google Tag Manager install, rendered into the initial HTML.
 * No GA4 tag is added here; tags stay in the GTM container.
 */
export default defineNuxtPlugin({
  name: "google-tag-manager",
  enforce: "pre",
  setup() {
    const configuredId = String(useRuntimeConfig().public.gtmId ?? "").trim()
    if (!GTM_ID_PATTERN.test(configuredId)) return

    useHead({
      script: [
        {
          key: "gtm",
          tagPriority: "critical",
          innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${configuredId}');`,
        },
      ],
      noscript: [
        {
          key: "gtm-noscript",
          tagPosition: "bodyOpen",
          innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=${configuredId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        },
      ],
    })
  },
})
