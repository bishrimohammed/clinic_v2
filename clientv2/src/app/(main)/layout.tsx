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
          <main className="w-full">
            <Header />
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
