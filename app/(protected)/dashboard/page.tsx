import DashboardStats from "@/components/features/DashboardStats";
import AuthGuard from "@/components/layout/AuthGuard";

export default function DashboardPage() {
  return (
    <AuthGuard>
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
        <DashboardStats />
      </main>
    </AuthGuard>
  );

}