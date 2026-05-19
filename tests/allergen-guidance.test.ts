import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { siteContent } from "@/lib/site-data";

describe("allergen and home-kitchen guidance", () => {
  it("keeps approved French allergen guidance visible near products", () => {
    const products = siteContent.fr.products;
    const text = [
      products.artisanDisclaimer,
      products.allergenDisclaimer
    ].join(" ");

    assert.match(text, /faits maison/i);
    assert.match(text, /gluten/i);
    assert.match(text, /oeufs/i);
    assert.match(text, /lait/i);
    assert.match(text, /fruits à coque/i);
    assert.match(text, /contactez-nous avant de commander/i);
  });

  it("keeps equivalent Russian allergen guidance visible near products", () => {
    const products = siteContent.ru.products;
    const text = [
      products.artisanDisclaimer,
      products.allergenDisclaimer
    ].join(" ");

    assert.match(text, /домашн/i);
    assert.match(text, /глютен/i);
    assert.match(text, /яйц/i);
    assert.match(text, /молоко/i);
    assert.match(text, /орех/i);
    assert.match(text, /перед заказом/i);
  });
});
