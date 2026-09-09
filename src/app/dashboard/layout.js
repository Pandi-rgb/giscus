import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col pt-16 lg:flex-row">
      <DashboardSidebar />
      <main className="min-w-0 flex-1 bg-muted/20 px-4 py-6 sm:px-8">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
