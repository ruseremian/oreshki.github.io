import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  getMinimumPreferredDateInputValue,
  isPreferredDateAllowed,
  normalizePreferredDate
} from "@/lib/preferred-date";

describe("preferred date validation", () => {
  it("uses a three-day minimum lead time in the Paris business timezone", () => {
    const from = new Date("2026-05-19T10:00:00.000Z");

    assert.equal(getMinimumPreferredDateInputValue(from), "2026-05-22");
  });

  it("rejects dates earlier than the minimum and keeps allowed dates unchanged", () => {
    assert.equal(isPreferredDateAllowed("2026-05-21", "2026-05-22"), false);
    assert.equal(isPreferredDateAllowed("2026-05-22", "2026-05-22"), true);
    assert.equal(normalizePreferredDate("2026-05-21", "2026-05-22"), "2026-05-22");
    assert.equal(normalizePreferredDate("2026-05-25", "2026-05-22"), "2026-05-25");
  });
});
