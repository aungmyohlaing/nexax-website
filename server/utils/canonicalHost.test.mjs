import assert from "node:assert/strict"
import { describe, it } from "node:test"
import {
  APEX_HOSTNAME,
  CANONICAL_ORIGIN,
  STAGING_HOSTNAME,
  STAGING_ORIGIN,
  WWW_HOSTNAME,
  buildErpCanonicalUrl,
  buildTrailingSlashCanonicalUrl,
  buildWwwRedirectUrl,
  normalizeHostname,
  resolveRequestHostname,
  resolveTrustedOrigin,
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

describe("resolveTrustedOrigin", () => {
  it("maps production and staging hosts to fixed origins", () => {
    assert.equal(resolveTrustedOrigin(APEX_HOSTNAME), CANONICAL_ORIGIN)
    assert.equal(resolveTrustedOrigin(WWW_HOSTNAME), CANONICAL_ORIGIN)
    assert.equal(resolveTrustedOrigin("WWW.NEXAXTECH.COM:443"), CANONICAL_ORIGIN)
    assert.equal(resolveTrustedOrigin(STAGING_HOSTNAME), STAGING_ORIGIN)
    assert.equal(resolveTrustedOrigin("staging.nexaxtech.com:443"), STAGING_ORIGIN)
  })

  it("rejects Cloud Run, local, and unknown hosts", () => {
    assert.equal(resolveTrustedOrigin("nexax-website-xyz.a.run.app"), null)
    assert.equal(resolveTrustedOrigin("localhost"), null)
    assert.equal(resolveTrustedOrigin("127.0.0.1"), null)
    assert.equal(resolveTrustedOrigin("evil.example"), null)
    assert.equal(resolveTrustedOrigin(""), null)
  })
})

describe("shouldRedirectApexToWww", () => {
  it("redirects only the bare production apex", () => {
    assert.equal(shouldRedirectApexToWww("nexaxtech.com"), true)
    assert.equal(shouldRedirectApexToWww("NEXAXTECH.COM"), true)
    assert.equal(shouldRedirectApexToWww("nexaxtech.com:443"), true)
  })

  it("does not redirect www, staging, Cloud Run, or local hosts", () => {
    assert.equal(shouldRedirectApexToWww("www.nexaxtech.com"), false)
    assert.equal(shouldRedirectApexToWww(STAGING_HOSTNAME), false)
    assert.equal(shouldRedirectApexToWww("localhost"), false)
    assert.equal(shouldRedirectApexToWww("nexax-website-xyz.a.run.app"), false)
    assert.equal(shouldRedirectApexToWww("regify.nexaxtech.com"), false)
  })
})

describe("buildWwwRedirectUrl", () => {
  it("preserves path and query on the production www origin", () => {
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

  it("builds the slash-free production www URL and keeps the query", () => {
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

  it("builds production www URLs and keeps the query", () => {
    assert.equal(
      buildTrailingSlashCanonicalUrl("/my/erp/", "?source=facebook", WWW_HOSTNAME),
      `${CANONICAL_ORIGIN}/my/erp?source=facebook`,
    )
    assert.equal(
      buildTrailingSlashCanonicalUrl("/my/", "", WWW_HOSTNAME),
      `${CANONICAL_ORIGIN}/my`,
    )
  })

  it("apex trailing-slash redirects land on production www", () => {
    assert.equal(
      buildTrailingSlashCanonicalUrl("/erp/", "?ref=1", APEX_HOSTNAME),
      `${CANONICAL_ORIGIN}/erp?ref=1`,
    )
  })
})

describe("staging hostname preservation", () => {
  it("keeps trailing-slash redirects on the staging origin", () => {
    assert.equal(
      buildTrailingSlashCanonicalUrl("/erp/", "", STAGING_HOSTNAME),
      `${STAGING_ORIGIN}/erp`,
    )
    assert.equal(
      buildTrailingSlashCanonicalUrl("/my/erp/", "?source=facebook", STAGING_HOSTNAME),
      `${STAGING_ORIGIN}/my/erp?source=facebook`,
    )
  })

  it("never applies apex-to-www for staging", () => {
    assert.equal(shouldRedirectApexToWww(STAGING_HOSTNAME), false)
    assert.notEqual(resolveTrustedOrigin(STAGING_HOSTNAME), CANONICAL_ORIGIN)
  })
})

describe("untrusted hosts", () => {
  it("uses relative trailing-slash redirects for Cloud Run default hostname", () => {
    assert.equal(
      buildTrailingSlashCanonicalUrl(
        "/erp/",
        "?source=facebook",
        "nexax-website-xyz.asia-southeast1.run.app",
      ),
      "/erp?source=facebook",
    )
  })

  it("uses relative trailing-slash redirects for local development", () => {
    assert.equal(buildTrailingSlashCanonicalUrl("/my/", "", "localhost:3002"), "/my")
    assert.equal(buildTrailingSlashCanonicalUrl("/erp/", "?x=1", "127.0.0.1"), "/erp?x=1")
  })

  it("does not trust arbitrary Host values as absolute origins", () => {
    assert.equal(
      buildTrailingSlashCanonicalUrl("/erp/", "", "evil.example"),
      "/erp",
    )
    assert.equal(resolveTrustedOrigin("evil.example"), null)
  })
})

describe("resolveRequestHostname", () => {
  it("prefers Host over X-Forwarded-Host", () => {
    assert.equal(
      resolveRequestHostname(STAGING_HOSTNAME, APEX_HOSTNAME),
      STAGING_HOSTNAME,
    )
    assert.equal(
      resolveRequestHostname(WWW_HOSTNAME, STAGING_HOSTNAME),
      WWW_HOSTNAME,
    )
  })

  it("ignores spoofed apex X-Forwarded-Host on staging and run.app Hosts", () => {
    assert.equal(
      resolveRequestHostname(STAGING_HOSTNAME, "nexaxtech.com"),
      STAGING_HOSTNAME,
    )
    assert.equal(
      shouldRedirectApexToWww(
        resolveRequestHostname(
          "nexax-website-xyz.asia-southeast1.run.app",
          APEX_HOSTNAME,
        ),
      ),
      false,
    )
    assert.equal(
      buildTrailingSlashCanonicalUrl(
        "/erp/",
        "",
        resolveRequestHostname(
          "nexax-website-xyz.asia-southeast1.run.app",
          APEX_HOSTNAME,
        ),
      ),
      "/erp",
    )
  })

  it("uses allowlisted X-Forwarded-Host only when Host is absent", () => {
    assert.equal(resolveRequestHostname("", STAGING_HOSTNAME), STAGING_HOSTNAME)
    assert.equal(resolveRequestHostname(null, WWW_HOSTNAME), WWW_HOSTNAME)
    assert.equal(resolveRequestHostname("", "evil.example"), "")
  })
})
