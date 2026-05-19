import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  formatAdminOrderLanguage,
  normalizeOrderLanguage,
  parseStoredOrderLanguage
} from "@/lib/order-language";

describe("order language", () => {
  it("normalizes new order language values to the supported storefront languages", () => {
    assert.equal(normalizeOrderLanguage("fr"), "fr");
    assert.equal(normalizeOrderLanguage("ru"), "ru");
    assert.equal(normalizeOrderLanguage(undefined), "fr");
    assert.equal(normalizeOrderLanguage("en"), "fr");
  });

  it("parses stored order language without breaking old orders", () => {
    assert.equal(parseStoredOrderLanguage("fr"), "fr");
    assert.equal(parseStoredOrderLanguage("ru"), "ru");
    assert.equal(parseStoredOrderLanguage(null), null);
    assert.equal(parseStoredOrderLanguage(""), null);
  });

  it("formats admin language labels with a safe fallback", () => {
    assert.equal(formatAdminOrderLanguage("fr"), "Francais");
    assert.equal(formatAdminOrderLanguage("ru"), "Russe");
    assert.equal(formatAdminOrderLanguage(null), "Non renseignee");
  });
});
