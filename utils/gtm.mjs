/** Official GTM container ID pattern. */
export const GTM_ID_PATTERN = /^GTM-[A-Z0-9]+$/

/**
 * True when the configured public GTM ID should inject the snippet.
 * Empty, whitespace, or invalid values disable GTM.
 * @param {unknown} value
 */
export const isValidGtmId = (value) =>
  GTM_ID_PATTERN.test(String(value ?? "").trim())
