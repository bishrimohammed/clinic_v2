// "use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { useAuth } from "@/context/auth-store";
import { Suspense } from "react";
import Dashboard from "../_component/dashboard";
import { getServerUser } from "@/actions/auth";
// import { NextRequest, NextResponse } from "next/server";
// import { useRouter } from "next/router";
// import { useRouter } from "next/navigation";
// import React from "react";

export default async function DashboardPage() {
  // const user = useAuth((s) => s.user);
  // console.log(user);
  const user = await getServerUser();

  console.log(user);

  return (
    <>
      <Suspense>
        <Dashboard />
      </Suspense>
    </>
  );
}
