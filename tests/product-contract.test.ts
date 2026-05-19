import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { productById, type ProductId } from "@/lib/products";
import { siteContent, type Language } from "@/lib/site-data";

type ContentProduct = {
  id: string;
  variants?: { id: string }[];
};

function getContentProducts(language: Language) {
  const products = siteContent[language].products;

  return [
    ...products.items,
    ...products.specialties.items
  ] as ContentProduct[];
}

function hasProduct(id: string): id is ProductId {
  return productById.has(id as ProductId);
}

describe("product content contract", () => {
  it("resolves every product and variant referenced by storefront content", () => {
    for (const language of ["fr", "ru"] as const) {
      for (const product of getContentProducts(language)) {
        assert.ok(hasProduct(product.id), `${language} content references missing product ${product.id}`);

        for (const variant of product.variants ?? []) {
          assert.ok(
            hasProduct(variant.id),
            `${language} content references missing variant ${variant.id}`
          );
        }
      }
    }
  });

  it("keeps every visible variant orderable", () => {
    for (const language of ["fr", "ru"] as const) {
      for (const product of getContentProducts(language)) {
        for (const variant of product.variants ?? []) {
          assert.ok(hasProduct(variant.id), `${language} content references missing variant ${variant.id}`);
          assert.equal(productById.get(variant.id)?.available, true, `${language} variant ${variant.id} should be available`);
        }
      }
    }
  });

  it("shows Blinchiki as one storefront product with three same-price variants", () => {
    const blinchiki = siteContent.fr.products.specialties.items.find(
      (product) => product.id === "blinchiki"
    );

    assert.ok(blinchiki, "French storefront should include Blinchiki");

    const variants = blinchiki && "variants" in blinchiki
      ? blinchiki.variants
      : [];

    assert.deepEqual(
      variants.map((variant) => variant.label),
      ["Viande", "Fromage", "Champignons"]
    );
    assert.deepEqual(
      variants.map((variant) => variant.id),
      ["blinchiki-viande", "blinchiki-fromage", "blinchiki-champignons"]
    );

    for (const variant of variants) {
      assert.equal(
        productById.get(variant.id)?.price,
        productById.get("blinchiki")?.price
      );
      assert.equal(variant.basePrice, productById.get("blinchiki")?.price);
    }
  });
});
