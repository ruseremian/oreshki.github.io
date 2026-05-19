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
});
