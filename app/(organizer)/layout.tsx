import { Sidebar } from "./dashboard/_components/sidebar";
import { Header } from "./dashboard/dashboard-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen h-screen flex flex-col items-center relative">
      <div className="flex-1 w-full flex flex-col items-center">
        <div className="flex flex-col flex-1 w-full relative ">
          <Header />
          <div className="flex h-full">
            <Sidebar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
