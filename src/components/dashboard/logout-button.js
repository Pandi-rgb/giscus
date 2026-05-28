"use client";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();

    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="
        rounded-lg
        border
        px-4
        py-2
        text-sm
        hover:bg-gray-100
        cursor-pointer
      "
    >
      Logout
    </button>
  );
}
