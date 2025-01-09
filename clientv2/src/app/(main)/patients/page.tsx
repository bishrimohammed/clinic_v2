import { getServerUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function Home() {
  const user = await getServerUser();
  if (!user) redirect("/login");
  return <div className="text-yellow-700">patient page</div>;
}
