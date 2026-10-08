import assert from "node:assert/strict"
import { describe, it } from "node:test"
import {
  APEX_HOSTNAME,
  CANONICAL_ORIGIN,
  buildErpCanonicalUrl,
  buildTrailingSlashCanonicalUrl,
  buildWwwRedirectUrl,
  normalizeHostname,
  shouldRedirectApexToWww,
  shouldRedirectErpTrailingSlash,
  trailingSlashTarget,
} from "./canonicalHost.mjs"

describe("normalizeHostname", () => {
  it("lowercases and strips port", () => {
    assert.equal(normalizeHostname("NexaXTech.com:443"), APEX_HOSTNAME)
  })

  it("uses the first X-Forwarded-Host value", () => {
    assert.equal(
      normalizeHostname("nexaxtech.com, www.nexaxtech.com"),
      APEX_HOSTNAME,
    )
  })

  it("handles bracketed IPv6", () => {
    assert.equal(normalizeHostname("[::1]:3000"), "::1")
  })

  it("strips a trailing DNS dot", () => {
    assert.equal(normalizeHostname("nexaxtech.com."), APEX_HOSTNAME)
  })

  it("returns empty for blank input", () => {
    assert.equal(normalizeHostname(""), "")
    assert.equal(normalizeHostname(null), "")
  })
})

describe("shouldRedirectApexToWww", () => {
  it("redirects only the bare apex", () => {
    assert.equal(shouldRedirectApexToWww("nexaxtech.com"), true)
    assert.equal(shouldRedirectApexToWww("NEXAXTECH.COM"), true)
    assert.equal(shouldRedirectApexToWww("nexaxtech.com:443"), true)
  })

  it("does not redirect www or other hosts", () => {
    assert.equal(shouldRedirectApexToWww("www.nexaxtech.com"), false)
    assert.equal(shouldRedirectApexToWww("localhost"), false)
    assert.equal(shouldRedirectApexToWww("nexax-website-xyz.a.run.app"), false)
    assert.equal(shouldRedirectApexToWww("regify.nexaxtech.com"), false)
  })
})

describe("buildWwwRedirectUrl", () => {
  it("preserves path and query on the www origin", () => {
    assert.equal(buildWwwRedirectUrl("/"), `${CANONICAL_ORIGIN}/`)
    assert.equal(buildWwwRedirectUrl("/erp"), `${CANONICAL_ORIGIN}/erp`)
    assert.equal(
      buildWwwRedirectUrl("/contact?source=facebook"),
      `${CANONICAL_ORIGIN}/contact?source=facebook`,
    )
  })
})

describe("ERP trailing slash", () => {
  it("matches only /erp/", () => {
    assert.equal(shouldRedirectErpTrailingSlash("/erp/"), true)
    assert.equal(shouldRedirectErpTrailingSlash("/erp"), false)
    assert.equal(shouldRedirectErpTrailingSlash("/"), false)
    assert.equal(shouldRedirectErpTrailingSlash("/erp/extra"), false)
  })

  it("builds the slash-free www URL and keeps the query", () => {
    assert.equal(buildErpCanonicalUrl(""), `${CANONICAL_ORIGIN}/erp`)
    assert.equal(buildErpCanonicalUrl("?"), `${CANONICAL_ORIGIN}/erp`)
    assert.equal(
      buildErpCanonicalUrl("?source=facebook"),
      `${CANONICAL_ORIGIN}/erp?source=facebook`,
    )
  })
})

describe("localized trailing slash", () => {
  it("301 targets are only the known slash copies", () => {
    assert.equal(trailingSlashTarget("/erp/"), "/erp")
    assert.equal(trailingSlashTarget("/my/"), "/my")
    assert.equal(trailingSlashTarget("/my/erp/"), "/my/erp")
    assert.equal(trailingSlashTarget("/my/erp"), null)
    assert.equal(trailingSlashTarget("/my"), null)
    assert.equal(trailingSlashTarget("/"), null)
    assert.equal(shouldRedirectErpTrailingSlash("/my/erp/"), false)
  })

  it("builds www URLs and keeps the query", () => {
    assert.equal(
      buildTrailingSlashCanonicalUrl("/my/erp/", "?source=facebook"),
      `${CANONICAL_ORIGIN}/my/erp?source=facebook`,
    )
    assert.equal(
      buildTrailingSlashCanonicalUrl("/my/", ""),
      `${CANONICAL_ORIGIN}/my`,
    )
  })
})
