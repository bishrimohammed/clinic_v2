import React, { Suspense } from "react";
import { redirect } from "next/navigation";

import { getServerUser } from "@/actions/auth";
import ClinicProfileContainer from "@/features/clinicprofile/components/ClinicProfileContainer";
import { getClinicProfile } from "@/features/clinicprofile/api/api";

export default async function ClinicProfilePage() {
  const user = await getServerUser();
  if (!user) redirect("/login");
  const data = await getClinicProfile();

  // console.log(data);

  return (
    <div className="rounded-xl bg-white p-6">
      <p className="text-2xl  border-b">Edit Clinic Profile</p>

      <Suspense fallback={<div>loading</div>}>
        <ClinicProfileContainer clinic={data} />
      </Suspense>
    </div>
  );
}
