import { Suspense } from "react";
// import Dashboard from "./_component/dashboard";

import { getServerUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import Dashboard from "./_component/dashboard";

export default async function DashboardPage() {
  // const initialData = await getDashBoardWidgetData();
  const user = await getServerUser();
  if (!user) redirect("/login");
  return (
    <>
      <Suspense>
        <Dashboard />
      </Suspense>
    </>
  );
}
