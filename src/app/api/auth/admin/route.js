import { getAdminUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const admin = await getAdminUser();

  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({
    id: admin.id,
    email: admin.email,
    role: admin.role,
  });
}
