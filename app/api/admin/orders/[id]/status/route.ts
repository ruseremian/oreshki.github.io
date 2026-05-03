import { NextRequest, NextResponse } from "next/server";

import { hasAdminSession } from "@/lib/admin-auth";
import {
  createSupabaseAdmin,
  MissingSupabaseEnvError
} from "@/lib/supabase-admin";

export const runtime = "nodejs";

const ORDER_STATUSES = [
  "new",
  "confirmed",
  "preparing",
  "ready",
  "delivered",
  "cancelled"
] as const;

type OrderStatus = (typeof ORDER_STATUSES)[number];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await hasAdminSession())) {
    return NextResponse.json(
      { success: false, error: "Non autorise." },
      { status: 401 }
    );
  }

  const { id } = await params;
  const { status } = (await request.json().catch(() => ({}))) as {
    status?: string;
  };

  if (!ORDER_STATUSES.includes(status as OrderStatus)) {
    return NextResponse.json(
      { success: false, error: "Statut invalide." },
      { status: 400 }
    );
  }

  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id)
      .select("id, status")
      .single();

    if (error || !data) {
      return NextResponse.json(
        {
          success: false,
          error: error?.message || "Commande introuvable."
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, order: data });
  } catch (error) {
    if (error instanceof MissingSupabaseEnvError) {
      return NextResponse.json(
        {
          success: false,
          error: `Variables Supabase manquantes: ${error.missingVariables.join(", ")}`
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Impossible de mettre a jour le statut." },
      { status: 500 }
    );
  }
}
