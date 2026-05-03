import { NextRequest, NextResponse } from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  getAdminSessionToken,
  verifyAdminPassword
} from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const { password } = (await request.json().catch(() => ({}))) as {
    password?: string;
  };

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { success: false, error: "ADMIN_PASSWORD n'est pas configure." },
      { status: 500 }
    );
  }

  if (!password || !verifyAdminPassword(password)) {
    return NextResponse.json(
      { success: false, error: "Mot de passe incorrect." },
      { status: 401 }
    );
  }

  const token = getAdminSessionToken();

  if (!token) {
    return NextResponse.json(
      { success: false, error: "Session admin indisponible." },
      { status: 500 }
    );
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });

  return response;
}
