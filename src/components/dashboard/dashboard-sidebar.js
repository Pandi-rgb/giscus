"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  FileText,
  LayoutDashboard,
  PlusCircle,
  ExternalLink,
  LogOut,
  Sparkles,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    href: "/dashboard",
    label: "Beranda Dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/dashboard/articles/new",
    label: "Tulis Artikel Baru",
    icon: PlusCircle,
  },
  {
    href: "/articles",
    label: "Lihat Web Publik",
    icon: ExternalLink,
    external: true,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    try {
      await supabase.auth.signOut();
      toast.success("Berhasil keluar dari akun admin.");
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/login");
    }
  }

  return (
    <aside className="border-b bg-card lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r">
      <div className="flex h-full flex-col justify-between p-4 lg:p-6">
        <div className="space-y-6">
          <div>
            <span className="inline-flex items-center gap-1 rounded-md bg-cyan-100 px-2 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300">
              <Sparkles className="h-3 w-3" />
              Admin Portal
            </span>
            <h2 className="mt-2 text-lg font-bold text-foreground">
              Posisi 21 Media
            </h2>
            <p className="text-xs text-muted-foreground">
              Sistem Manajemen Riset
            </p>
          </div>

          <nav className="flex flex-row gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  className={cn(
                    "flex items-center gap-2.5 whitespace-nowrap rounded-xl px-3.5 py-2.5 text-sm font-medium transition",
                    isActive
                      ? "bg-cyan-600 text-white shadow-xs"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout Section */}
        <div className="mt-6 border-t pt-4">
          <button
            onClick={handleLogout}
            className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Keluar (Logout)
          </button>
        </div>
      </div>
    </aside>
  );
}
