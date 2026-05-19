import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  formatPhoneInput,
  isValidPhoneNumber,
  normalizePhoneNumber
} from "@/lib/phone";

describe("phone validation", () => {
  it("accepts and normalizes local French mobile numbers", () => {
    assert.equal(normalizePhoneNumber("06 12 34 56 78"), "+33612345678");
    assert.equal(normalizePhoneNumber("6 12 34 56 78"), "+33612345678");
  });

  it("accepts international formats and formats French numbers for display", () => {
    assert.equal(normalizePhoneNumber("0033 6 12 34 56 78"), "+33612345678");
    assert.equal(formatPhoneInput("+33612345678"), "+33 6 12 34 56 78");
  });

  it("rejects invalid phone input", () => {
    assert.equal(isValidPhoneNumber("hello"), false);
    assert.equal(isValidPhoneNumber("123"), false);
  });
});
