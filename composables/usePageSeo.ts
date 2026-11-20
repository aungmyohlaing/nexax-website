import { SITE } from "~/constants/site"

type JsonLdNode = Record<string, unknown>

const OG_IMAGE_PATH = "/brand/og-nexaxtech.png"
const LOGO_PATH = "/favicon-192.png"

function organizationNode(siteUrl: string): JsonLdNode {
  return {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: SITE.fullName,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}${LOGO_PATH}`,
      width: 192,
      height: 192,
    },
    email: SITE.contactEmail,
    telephone: SITE.phone,
    sameAs: [SITE.facebookUrl],
    areaServed: {
      "@type": "Country",
      name: "Myanmar",
    },
  }
}

function websiteNode(siteUrl: string): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: SITE.fullName,
    url: siteUrl,
    publisher: { "@id": `${siteUrl}/#organization` },
  }
}

function softwareNode(url: string, siteUrl: string): JsonLdNode {
  return {
    "@type": "SoftwareApplication",
    name: "NexaX ERP",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url,
    provider: { "@id": `${siteUrl}/#organization` },
  }
}

/**
 * Titles, descriptions, Open Graph, Twitter cards, and JSON-LD.
 * Canonical URLs and hreflang stay in `layouts/default.vue`.
 * The active route decides the locale; the preference cookie does not.
 */
export function usePageSeo(options: {
  title: () => string
  description: () => string
  page: "home" | "erp"
}) {
  const { locale } = useLocale()
  const siteUrl = useSiteUrl()
  const pageUrl = computed(() => {
    if (options.page === "home") {
      return locale.value === "my" ? `${siteUrl.value}/my` : `${siteUrl.value}/`
    }
    return locale.value === "my" ? `${siteUrl.value}/my/erp` : `${siteUrl.value}/erp`
  })
  const imageUrl = computed(() => `${siteUrl.value}${OG_IMAGE_PATH}`)
  const graph = computed(() => (
    options.page === "home"
      ? [organizationNode(siteUrl.value), websiteNode(siteUrl.value)]
      : [organizationNode(siteUrl.value), softwareNode(pageUrl.value, siteUrl.value)]
  ))

  useSeoMeta({
    title: () => options.title(),
    description: () => options.description(),
    ogTitle: () => options.title(),
    ogDescription: () => options.description(),
    ogUrl: pageUrl,
    ogType: "website",
    ogImage: imageUrl,
    ogImageAlt: SITE.fullName,
    ogImageType: "image/png",
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogSiteName: SITE.fullName,
    ogLocale: () => (locale.value === "my" ? "my_MM" : "en_US"),
    twitterCard: "summary_large_image",
    twitterTitle: () => options.title(),
    twitterDescription: () => options.description(),
    twitterImage: imageUrl,
    twitterImageAlt: SITE.fullName,
  })

  useHead(() => ({
    script: [
      {
        key: "ld-json",
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph.value,
        }).replace(/</g, "\\u003c"),
      },
    ],
  }))
}
