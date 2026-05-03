import "server-only";

import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "oreshki_admin_session";

const TOKEN_SALT = "oreshki-admin-session";

export function getAdminSessionToken() {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    return null;
  }

  return createHash("sha256")
    .update(`${TOKEN_SALT}:${password}`)
    .digest("hex");
}

export function verifyAdminPassword(password: string) {
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedPassword) {
    return false;
  }

  return safeEqual(password, expectedPassword);
}

export async function hasAdminSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const expectedToken = getAdminSessionToken();

  if (!sessionCookie || !expectedToken) {
    return false;
  }

  return safeEqual(sessionCookie, expectedToken);
}

function safeEqual(value: string, expected: string) {
  const valueBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);

  if (valueBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(valueBuffer, expectedBuffer);
}
