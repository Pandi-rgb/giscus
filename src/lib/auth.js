import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function getAdminUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return null;
  }

  const admin = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (admin?.role !== "ADMIN") {
    return null;
  }

  return admin;
}

export async function requireAdmin() {
  const admin = await getAdminUser();

  if (!admin) {
    throw new Error("ADMIN_REQUIRED");
  }

  return admin;
}
