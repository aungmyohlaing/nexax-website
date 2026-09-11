export const SITE = {
  name: "NexaXTech",
  fullName: "NexaX Technologies",
  logoUrl: "/brand/nexax_icon.png",
  contactEmail: "amhlaing@gmail.com",
  phone: "+959449546778",
  phoneDisplay: "+95 9 449 546 778",
  facebookUrl: "https://www.facebook.com/profile.php?id=61593891755265",
  localeCookie: "nexax-preferred-locale",
  viberUrl: "viber://chat?number=%2B959449546778",
  regifyUrl: "https://regify.nexaxtech.com",
  erpVideoUrl: "/video/nexax-erp-website.mp4",
} as const

export const WORKFLOW_STEPS = [
  "sale",
  "stock",
  "payment",
  "accounting",
  "report",
] as const

export const ERP_TEASERS = [
  "sales",
  "inventory",
  "payments",
  "accounting",
  "reports",
] as const

export const ERP_PILLARS = [
  "singleShop",
  "multiShop",
  "branding",
  "operations",
  "accounting",
] as const

export const BUILD_STEPS = [
  "understand",
  "build",
  "learn",
  "improve",
] as const

export const WHY_PRINCIPLES = [
  "workflow",
  "connected",
  "evolve",
] as const

export const ERP_LEDGER_ROWS = [
  { sku: "NX-104", product: "rice", batch: "FIFO-08", qty: 48, unitCost: 42500, branch: "bahan" },
  { sku: "NX-221", product: "oil", batch: "FIFO-12", qty: 120, unitCost: 8800, branch: "tamwe" },
  { sku: "NX-018", product: "sugar", batch: "FIFO-03", qty: 86, unitCost: 3450, branch: "hledan" },
  { sku: "NX-330", product: "coffee", batch: "FIFO-01", qty: 24, unitCost: 18600, branch: "bahan" },
] as const

export const ERP_POS_LINES = [
  { product: "rice", qty: 2, unitPrice: 42500 },
  { product: "oil", qty: 4, unitPrice: 8800 },
] as const

export const ERP_BRANCH_ROWS = [
  { product: "rice", bahan: 48, tamwe: 12, hledan: 6, low: "hledan" },
  { product: "oil", bahan: 40, tamwe: 120, hledan: 18, low: null },
  { product: "sugar", bahan: 22, tamwe: 9, hledan: 86, low: "tamwe" },
  { product: "coffee", bahan: 24, tamwe: 4, hledan: 3, low: "hledan" },
] as const
