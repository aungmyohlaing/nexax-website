import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { isValidGtmId } from "./gtm.mjs"

describe("isValidGtmId", () => {
  it("accepts the production container id", () => {
    assert.equal(isValidGtmId("GTM-PQP878R2"), true)
  })

  it("disables GTM when the id is empty or whitespace", () => {
    assert.equal(isValidGtmId(""), false)
    assert.equal(isValidGtmId("   "), false)
    assert.equal(isValidGtmId(null), false)
    assert.equal(isValidGtmId(undefined), false)
  })

  it("rejects invalid values", () => {
    assert.equal(isValidGtmId("gtm-PQP878R2"), false)
    assert.equal(isValidGtmId("GTM"), false)
    assert.equal(isValidGtmId("UA-123"), false)
  })
})
