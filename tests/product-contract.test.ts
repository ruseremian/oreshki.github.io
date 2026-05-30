import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { productById, type ProductId } from "@/lib/products";
import { siteContent, type Language } from "@/lib/site-data";

type ContentProduct = {
  id: string;
  quantity: string;
  tags?: readonly string[];
  variants?: { id: string }[];
};

function getContentProducts(language: Language) {
  const products = siteContent[language].products;

  return [
    ...products.items,
    ...products.specialties.items
  ] as ContentProduct[];
}

function getVisibleTags(product: ContentProduct) {
  return product.tags ?? [product.quantity];
}

function sortedKeys(value: object) {
  return Object.keys(value).sort();
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

  it("keeps French and Russian storefront product structures aligned", () => {
    const frenchProducts = getContentProducts("fr");
    const russianProducts = getContentProducts("ru");

    assert.deepEqual(
      russianProducts.map((product) => product.id),
      frenchProducts.map((product) => product.id)
    );

    for (let index = 0; index < frenchProducts.length; index += 1) {
      const frenchProduct = frenchProducts[index];
      const russianProduct = russianProducts[index];

      assert.deepEqual(
        (russianProduct.variants ?? []).map((variant) => variant.id),
        (frenchProduct.variants ?? []).map((variant) => variant.id),
        `${russianProduct.id} should expose the same variants in both languages`
      );
    }
  });

  it("keeps localized customer-facing content sections structurally aligned", () => {
    for (const section of ["nav", "hero", "products", "about", "reviews", "cart", "contact", "footer"] as const) {
      assert.deepEqual(
        sortedKeys(siteContent.ru[section]),
        sortedKeys(siteContent.fr[section]),
        `${section} should have matching French and Russian keys`
      );
    }

    assert.deepEqual(
      sortedKeys(siteContent.ru.cart.errors),
      sortedKeys(siteContent.fr.cart.errors)
    );
    assert.deepEqual(
      sortedKeys(siteContent.ru.cart.methods),
      sortedKeys(siteContent.fr.cart.methods)
    );
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

  it("adds the frozen tag only to eligible savory storefront products", () => {
    for (const language of ["fr", "ru"] as const) {
      const sweetProducts = siteContent[language].products.items as readonly ContentProduct[];
      const savoryProducts = siteContent[language].products.specialties.items as readonly ContentProduct[];
      const frozenTag = language === "fr" ? "Surgelé" : "Замороженные";

      for (const product of savoryProducts) {
        const tags = getVisibleTags(product);

        assert.ok(
          tags.includes(product.quantity),
          `${language} ${product.id} should keep its existing quantity tag`
        );
        assert.equal(
          tags.includes(frozenTag),
          product.id !== "pirojki",
          `${language} ${product.id} should follow the savory frozen tag rule`
        );
      }

      for (const product of sweetProducts) {
        const tags = getVisibleTags(product);

        assert.equal(
          tags.includes(frozenTag),
          false,
          `${language} sweet product ${product.id} should not show the frozen tag`
        );
      }
    }
  });

  it("shows Oreshki as one storefront product with three orderable variants", () => {
    for (const language of ["fr", "ru"] as const) {
      const items = siteContent[language].products.items;
      const oreshkiCards = items.filter((product) =>
        ["pieces12", "pieces24", "pieces48"].includes(product.id)
      );

      assert.equal(
        oreshkiCards.length,
        1,
        `${language} storefront should show one Oreshki card`
      );

      const [oreshki] = oreshkiCards;
      const variants = oreshki && "variants" in oreshki
        ? oreshki.variants
        : [];

      assert.deepEqual(
        variants.map((variant) => variant.id),
        ["pieces12", "pieces24", "pieces48"],
        `${language} Oreshki card should expose all size variants`
      );

      for (const variant of variants) {
        const orderName = productById.get(variant.id)?.orderName[language];

        assert.equal(
          variant.label,
          orderName,
          `${language} ${variant.id} button label should match the catalog order name`
        );
        assert.equal(
          variant.fullName,
          orderName,
          `${language} ${variant.id} fullName should match the catalog order name`
        );
        assert.equal(
          variant.basePrice,
          productById.get(variant.id)?.price,
          `${language} ${variant.id} should keep its catalog price`
        );
        assert.equal(
          productById.get(variant.id)?.available,
          true,
          `${language} ${variant.id} should remain orderable`
        );
      }
    }
  });
});
