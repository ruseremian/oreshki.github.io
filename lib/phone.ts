const PHONE_ALLOWED_CHARACTERS = /^[+\d\s()-]+$/;
const FRENCH_PHONE_NUMBER = /^\+33([1-9])(\d{2})(\d{2})(\d{2})(\d{2})$/;

export function formatPhoneInput(value: string) {
  const sanitized = sanitizePhoneInput(value);
  const normalized = normalizePhoneNumber(sanitized);

  if (normalized) {
    const frenchMatch = normalized.match(FRENCH_PHONE_NUMBER);

    if (frenchMatch) {
      return `+33 ${frenchMatch[1]} ${frenchMatch[2]} ${frenchMatch[3]} ${frenchMatch[4]} ${frenchMatch[5]}`;
    }
  }

  return sanitized;
}

export function normalizePhoneNumber(value: string) {
  const rawValue = value.trim();

  if (!isAllowedPhoneInput(rawValue)) {
    return null;
  }

  const digits = rawValue.replace(/\D/g, "");

  if (!digits) {
    return null;
  }

  let normalizedDigits = digits;

  if (rawValue.startsWith("+")) {
    normalizedDigits = digits;
  } else if (digits.startsWith("00")) {
    normalizedDigits = digits.slice(2);
  } else if (digits.startsWith("0")) {
    normalizedDigits = `33${digits.slice(1)}`;
  } else if (/^[67]\d{8}$/.test(digits)) {
    normalizedDigits = `33${digits}`;
  }

  if (normalizedDigits.length < 8 || normalizedDigits.length > 15) {
    return null;
  }

  return `+${normalizedDigits}`;
}

export function isValidPhoneNumber(value: string) {
  return normalizePhoneNumber(value) !== null;
}

function sanitizePhoneInput(value: string) {
  const withoutInvalidCharacters = value.replace(/[^\d\s+()-]/g, "");
  const startsWithPlus = withoutInvalidCharacters.trimStart().startsWith("+");
  const withoutPlus = withoutInvalidCharacters.replace(/\+/g, "");
  const withSinglePlus = startsWithPlus ? `+${withoutPlus}` : withoutPlus;

  return withSinglePlus.replace(/\s+/g, " ").trimStart();
}

function isAllowedPhoneInput(value: string) {
  if (!value || !PHONE_ALLOWED_CHARACTERS.test(value)) {
    return false;
  }

  return /^\+?[\d\s()-]+$/.test(value);
}
