"use client";
import { getStaticAddressesFn } from "@/lib/api/global";
import { useQuery } from "@tanstack/react-query";
import EditClinicProfileForm from "./EditClinicProfileForm";
import { clinicProfileResType } from "../schemas";

const ClinicProfileContainer = ({
  clinic,
}: {
  clinic: clinicProfileResType;
}) => {
  // const { data, isPending } = useQuery({
  //   queryKey: ["static-addresses"],
  //   queryFn: getStaticAddressesFn,
  //   staleTime: 60 * 60 * 1000,
  // });
  // if (isPending) return <div>feating static-addresses</div>;
  return (
    <EditClinicProfileForm
      clinic={clinic}
      // locations={data!}
    />
  );
};

export default ClinicProfileContainer;
