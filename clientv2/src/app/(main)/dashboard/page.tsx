import { Suspense } from "react";
import Dashboard from "../_component/dashboard";
import { getDashBoardWidgetData } from "@/lib/api/dashaboard";

export default async function DashboardPage() {
  // const initialData = await getDashBoardWidgetData();
  return (
    <>
      <Suspense>
        <Dashboard />
      </Suspense>
    </>
  );
}
