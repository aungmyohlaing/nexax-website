import assert from "node:assert/strict"
import { describe, it } from "node:test"
import {
  CANONICAL_ORIGIN,
  canonicalUrl,
  hreflangAlternates,
  localeFromPath,
  pageKind,
  pairedLocalePath,
} from "./localePath.mjs"

describe("localeFromPath", () => {
  it("treats the URL as the only source of locale", () => {
    assert.equal(localeFromPath("/"), "en")
    assert.equal(localeFromPath("/erp"), "en")
    assert.equal(localeFromPath("/erp/"), "en")
    assert.equal(localeFromPath("/my"), "my")
    assert.equal(localeFromPath("/my/erp"), "my")
    assert.equal(localeFromPath("/my/erp/"), "my")
    assert.equal(localeFromPath("/my/does-not-exist"), "my")
    assert.equal(localeFromPath("/does-not-exist"), "en")
  })
})

describe("pairedLocalePath", () => {
  it("switches the four public pages as pairs", () => {
    assert.equal(pairedLocalePath("/", "my"), "/my")
    assert.equal(pairedLocalePath("/my", "en"), "/")
    assert.equal(pairedLocalePath("/erp", "my"), "/my/erp")
    assert.equal(pairedLocalePath("/my/erp", "en"), "/erp")
  })

  it("stays on the same page when the language already matches", () => {
    assert.equal(pairedLocalePath("/", "en"), "/")
    assert.equal(pairedLocalePath("/erp", "en"), "/erp")
    assert.equal(pairedLocalePath("/my", "my"), "/my")
    assert.equal(pairedLocalePath("/my/erp", "my"), "/my/erp")
  })

  it("sends an unknown path to that language's homepage", () => {
    assert.equal(pairedLocalePath("/does-not-exist", "my"), "/my")
    assert.equal(pairedLocalePath("/my/does-not-exist", "en"), "/")
  })
})

describe("canonicalUrl", () => {
  it("matches the four indexable URLs", () => {
    assert.equal(canonicalUrl("/"), `${CANONICAL_ORIGIN}/`)
    assert.equal(canonicalUrl("/erp"), `${CANONICAL_ORIGIN}/erp`)
    assert.equal(canonicalUrl("/my"), `${CANONICAL_ORIGIN}/my`)
    assert.equal(canonicalUrl("/my/erp"), `${CANONICAL_ORIGIN}/my/erp`)
    assert.equal(canonicalUrl("/does-not-exist"), null)
    assert.equal(canonicalUrl("/my/does-not-exist"), null)
  })
})

describe("hreflangAlternates", () => {
  it("points the homepage at both languages and the English homepage as default", () => {
    assert.deepEqual(hreflangAlternates("home"), [
      { hreflang: "en", href: `${CANONICAL_ORIGIN}/` },
      { hreflang: "my", href: `${CANONICAL_ORIGIN}/my` },
      { hreflang: "x-default", href: `${CANONICAL_ORIGIN}/` },
    ])
  })

  it("points ERP at both languages and keeps x-default on the English homepage", () => {
    assert.deepEqual(hreflangAlternates("erp"), [
      { hreflang: "en", href: `${CANONICAL_ORIGIN}/erp` },
      { hreflang: "my", href: `${CANONICAL_ORIGIN}/my/erp` },
      { hreflang: "x-default", href: `${CANONICAL_ORIGIN}/` },
    ])
    assert.equal(pageKind("/my/erp"), "erp")
    assert.equal(pageKind("/my"), "home")
  })
})
