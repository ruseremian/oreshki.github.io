import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { productById, type ProductId } from "@/lib/products";
import { siteContent, type Language } from "@/lib/site-data";

type PreparationAdvice = {
  conservation: string;
  cooking: string;
  serving: string;
};

type LocalizedProduct = {
  id: ProductId;
  title: string;
  fullName: string;
  preparation?: PreparationAdvice;
  variants?: readonly {
    id: ProductId;
    label: string;
    fullName: string;
  }[];
};

const preparationProductIds = [
  "pelmeni",
  "kotleti-kievski",
  "vareniki-fromage",
  "blinchiki",
  "golubci"
] as const;

function getProducts(language: Language) {
  const products = siteContent[language].products;

  return [
    ...products.items,
    ...products.specialties.items
  ] as readonly LocalizedProduct[];
}

describe("localized preparation guidance", () => {
  it("uses concise preparation labels in French and Russian", () => {
    assert.deepEqual(siteContent.fr.products.preparationGuide, {
      summary: "Conseils de préparation",
      conservation: "Conservation",
      cooking: "Préparation",
      serving: "Service"
    });
    assert.deepEqual(siteContent.ru.products.preparationGuide, {
      summary: "Советы по приготовлению",
      conservation: "Хранение",
      cooking: "Приготовление",
      serving: "Подача"
    });
  });

  it("adds complete advice to the same five frozen product families in both languages", () => {
    for (const language of ["fr", "ru"] as const) {
      const productsWithAdvice = getProducts(language).filter(
        (product) => product.preparation
      );

      assert.deepEqual(
        productsWithAdvice.map((product) => product.id),
        [...preparationProductIds]
      );

      for (const product of productsWithAdvice) {
        assert.ok(product.preparation);
        assert.deepEqual(
          Object.keys(product.preparation).sort(),
          ["conservation", "cooking", "serving"]
        );
        assert.match(product.preparation.conservation, /−18 °C/);

        for (const advice of Object.values(product.preparation)) {
          assert.ok(advice.trim().length > 20, `${language} ${product.id} advice should be useful`);
        }
      }
    }
  });

  it("keeps every Russian product title and order-facing name in Cyrillic", () => {
    const russianProducts = getProducts("ru");
    const expectedTitles = [
      ["oreshki-classiques-12", "Классические орешки"],
      ["oreshki-pistache-12", "Орешки с фисташкой"],
      ["oreshki-kadaifi-12", "Орешки с кадаифом и фисташкой"],
      ["oreshki-framboise-12", "Орешки с малиной"],
      ["sigaretki", "Сигаретки"],
      ["napoleon-blanc", "Пирожные"],
      ["pelmeni", "Пельмени"],
      ["kotleti-kievski", "Котлеты по-киевски"],
      ["vareniki-fromage", "Вареники"],
      ["blinchiki", "Блинчики"],
      ["golubci", "Голубцы"],
      ["pirojki", "Пирожки"]
    ];

    assert.deepEqual(
      russianProducts.map((product) => [product.id, product.title]),
      expectedTitles
    );

    for (const product of russianProducts) {
      assert.doesNotMatch(product.title, /\p{Script=Latin}/u);
      assert.equal(product.fullName, productById.get(product.id)?.orderName.ru);

      for (const variant of product.variants ?? []) {
        assert.doesNotMatch(variant.label, /\p{Script=Latin}/u);
        assert.doesNotMatch(variant.fullName, /\p{Script=Latin}/u);
        assert.equal(variant.fullName, productById.get(variant.id)?.orderName.ru);
      }
    }
  });
});
