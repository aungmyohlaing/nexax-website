import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { isResendConfigured, resolveResendConfig } from "./resendConfig.mjs"

describe("resolveResendConfig", () => {
  it("reads trimmed Nuxt runtime config values only", () => {
    assert.deepEqual(
      resolveResendConfig({
        resendApiKey: "  re_test  ",
        resendFrom: " NexaX <noreply@example.com> ",
        resendTo: " qa@example.com ",
      }),
      {
        apiKey: "re_test",
        from: "NexaX <noreply@example.com>",
        to: "qa@example.com",
      },
    )
  })

  it("does not invent defaults when values are missing", () => {
    assert.deepEqual(resolveResendConfig({}), {
      apiKey: "",
      from: "",
      to: "",
    })
    assert.deepEqual(resolveResendConfig(undefined), {
      apiKey: "",
      from: "",
      to: "",
    })
  })
})

describe("isResendConfigured", () => {
  it("requires api key, from, and to", () => {
    assert.equal(
      isResendConfigured({
        apiKey: "re_test",
        from: "NexaX <noreply@example.com>",
        to: "qa@example.com",
      }),
      true,
    )
    assert.equal(
      isResendConfigured({ apiKey: "re_test", from: "a@b.c", to: "" }),
      false,
    )
    assert.equal(
      isResendConfigured({ apiKey: "", from: "a@b.c", to: "qa@example.com" }),
      false,
    )
  })
})
