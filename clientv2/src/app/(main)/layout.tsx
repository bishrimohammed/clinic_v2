import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ASidebar from "./_component/ASidebar";
import Header from "./_component/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-auto">
      {/* {children}{" "} */}
      <SidebarProvider>
        <ASidebar />
        <SidebarInset>
          <main className="w-full min-h-[100vh] bg-muted/90">
            <Header />
            <div className="p-2 max-h-[calc(100vh-80px)] overflow-y-auto  ">
              {children}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
