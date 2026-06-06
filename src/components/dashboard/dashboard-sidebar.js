"use client";

import Link from "next/link";
import { FileText, Home, PlusCircle, Settings, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/dashboard/logout-button";

import { cn } from "@/lib/utils";

const navigationItems = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: Home,
  },
  {
    href: "/dashboard/articles/new",
    label: "New Article",
    icon: PlusCircle,
  },
  {
    href: "/articles",
    label: "Public Articles",
    icon: FileText,
  },
  {
    href: "../../app/login/page.js",
    label: "Logout",
    icon: LogOut,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-b shadow-sm border-r lg:min-h-[calc(100vh-73px)] lg:w-64 lg:border-b-0 lg:border-r mt-0 bg-slate-800">
      <div className="flex h-full flex-col gap-6 p-4 lg:sticky lg:top-0 lg:p-6">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Admin</p>
          <h2 className="text-xl text-slate-200 font-semibold">Dashboard</h2>
        </div>

        <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/dashboard"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-muted",
                  isActive
                    ? "bg-black text-white hover:bg-black"
                    : "text-muted-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto hidden rounded-lg border p-4 text-sm text-muted-foreground lg:block">
          <div className="mb-2 flex items-center gap-2 font-medium text-slate-200">
            <Settings className="h-4 w-4" />
            Content tools
          </div>
          Manage articles, files, categories, and tags from one workspace.
        </div>
        
      </div>
    </aside>
  );
}
