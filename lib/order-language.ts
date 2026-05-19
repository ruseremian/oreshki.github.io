export type OrderLanguage = "fr" | "ru";

export function normalizeOrderLanguage(value: string | null | undefined): OrderLanguage {
  return value === "ru" ? "ru" : "fr";
}

export function parseStoredOrderLanguage(
  value: string | null | undefined
): OrderLanguage | null {
  if (value === "fr" || value === "ru") {
    return value;
  }

  return null;
}

export function formatAdminOrderLanguage(value: string | null | undefined) {
  const language = parseStoredOrderLanguage(value);

  if (language === "fr") return "Francais";
  if (language === "ru") return "Russe";

  return "Non renseignee";
}
