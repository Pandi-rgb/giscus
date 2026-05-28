import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="-mx-4 flex flex-col sm:-mx-6 lg:-mx-8 lg:flex-row">
      <DashboardSidebar />

      <div className="min-w-0 flex-1 px-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}
