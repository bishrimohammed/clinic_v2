"use client";
import PatientChart from "@/components/dashboard/PatientChart";
import UserChart from "@/components/dashboard/UserChart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getDashBoardWidgetData } from "@/lib/api/dashaboard";
import { useQuery } from "@tanstack/react-query";
import { format, parse, parseISO } from "date-fns";
// import { useAuth } from "@/context/auth-store";
// import { useUserSession } from "@/store/auth";
import { CircleCheck, CircleX, Clock, User2 } from "lucide-react";
import { Suspense } from "react";
const Dashboard = ({ initialData }: { initialData?: any }) => {
  // const { user } = useUserSession();
  // console.log("client user");
  const { data, isPending } = useQuery({
    queryKey: ["dashboard-main"],
    queryFn: getDashBoardWidgetData,
    // initialData,
  });
  if (isPending) return <div>Loading...</div>;
  console.log(data);

  return (
    <div className=" flex-col flex">
      <div className="flex-1 space-y-2 ">
        {/* <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
           
            <Button>Download</Button>
          </div>
        </div> */}

        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-none border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Patient
              </CardTitle>
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg> */}
              <User2
                className="h-4 w-4 text-muted-foreground"
                strokeWidth={2}
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.totalPatient}</div>
              <p className="text-xs text-muted-foreground">patients</p>
            </CardContent>
          </Card>
          <Card className="shadow-none border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Appointments
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data?.totalUpcomingAppointment}
              </div>
              <p className="text-xs text-muted-foreground">
                Total Appointments
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-none border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.totalUser}</div>
              <p className="text-xs text-muted-foreground">
                {data?.totalUser} users have used this system.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-none border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completed Lab
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data?.totalCompletedLab}
              </div>
              <p className="text-xs text-muted-foreground">
                {data?.totalCompletedLab} lab investigations are completed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* <div className="flex lg:flex-row flex-col gap-4 ">
          <div className="lg:w-3/4 w-full space-y-3">
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
              <Card className="flex flex-col border-none">
                <CardHeader className="items-center pb-0">
                  <CardTitle>Pie Chart - Donut with Text</CardTitle>
                  <CardDescription>January - June 2024</CardDescription>
                </CardHeader>
                <CardContent className="">
                  <Suspense fallback={<div>Loading...</div>}>
                    <UserChart data={data?.userGroupByRoleAndCount} />
                  </Suspense>
                </CardContent>
              </Card>

              <Card className="flex flex-grow  border-none flex-col h-[300px]">
                <CardHeader className="items-center pb-0">
                  <CardTitle>Pie Chart - Donut with Text</CardTitle>
                  <CardDescription>
                    <div className="flex items-center justify-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 shrink-0 rounded-[2px] bg-chart-1" />
                        Male
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 shrink-0 rounded-[2px] bg-chart-2" />
                        Female
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div>Loading...</div>}>
                  
                    <PatientChart />
                  </Suspense>
                </CardContent>
              </Card>
            </div>
            <div className="w-full"></div>
          </div>
          <div className="lg:w-1/4 w-auto space-y-2">
            <Card className="shadow-none border-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium ">
                  Today Appointments
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-1">
                <div className="max-h-[225px] overflow-y-auto scrollbar-width5 ps-4">
                  <div className="border-l-[3px]  flex flex-col gap-y-4 ">
                    {data?.appointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="-ms-[17px] flex items-center gap-4"
                      >
                        {appointment.status === "upcoming" && (
                          <div className="p-[6px] rounded-full bg-orange-300 bg-opacity-50">
                            <div className="">
                              <Clock
                                size={18}
                                className="overflow-hidden"
                                fill="orange"
                                color="white"
                              />
                            </div>
                          </div>
                        )}
                        {appointment.status === "overdue" && (
                          <div className="p-[6px] rounded-full bg-green-300 bg-opacity-50">
                            <div className="">
                              <CircleCheck
                                size={18}
                                className="overflow-hidden border-0"
                                fill="green"
                                color="white"
                              />
                            </div>
                          </div>
                        )}
                        {appointment.status === "cancelled" && (
                          <div className="p-[6px] rounded-full bg-red-400 bg-opacity-50">
                            <div className="">
                              <CircleX
                                size={18}
                                className="overflow-hidden"
                                fill="red"
                                fillRule="nonzero"
                                color="white"
                              />
                            </div>
                          </div>
                        )}

                        <div className="flex flex-col ">
                          <p className="text-sm">{appointment.patient_name}</p>
                          <p className="text-gray-400  text-xs">
                            {format(
                              parseISO(
                                `${appointment.appointment_date}T${appointment.appointment_time}`
                              ),
                              "hh:mm a"
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div> */}

        <div className="grid md:grid-cols-4 grid-cols-1 gap-2 ">
          <div className="md:col-span-3 ">
            <div className="grid gap-2 md:grid-cols-1 lg:grid-cols-2">
              <Card className="flex flex-col border-none h-[300px]">
                <CardHeader className="items-center pb-0">
                  <CardTitle>Pie Chart - Donut with Text</CardTitle>
                  <CardDescription>January - June 2024</CardDescription>
                </CardHeader>
                <CardContent className="">
                  <Suspense fallback={<div>Loading...</div>}>
                    <UserChart data={data?.userGroupByRoleAndCount} />
                  </Suspense>
                </CardContent>
              </Card>

              <Card className="flex flex-grow  border-none flex-col h-[300px]">
                <CardHeader className="items-center pb-0">
                  <CardTitle>Pie Chart - Donut with Text</CardTitle>
                  <CardDescription>
                    <div className="flex items-center justify-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 shrink-0 rounded-[2px] bg-chart-1" />
                        Male
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 shrink-0 rounded-[2px] bg-chart-2" />
                        Female
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div>Loading...</div>}>
                    {/* <UserChart data={data?.userGroupByRoleAndCount} /> */}
                    <PatientChart />
                  </Suspense>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <Card className="shadow-none border-none h-[300px]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium ">
                  Today Appointments
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-1">
                <div className="max-h-[225px] overflow-y-auto scrollbar-width5 ps-4">
                  <div className="border-l-[3px]  flex flex-col gap-y-4 ">
                    {data?.appointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="-ms-[17px] flex items-center gap-4"
                      >
                        {appointment.status === "upcoming" && (
                          <div className="p-[6px] rounded-full bg-orange-300 bg-opacity-50">
                            <div className="">
                              <Clock
                                size={18}
                                className="overflow-hidden"
                                fill="orange"
                                color="white"
                              />
                            </div>
                          </div>
                        )}
                        {appointment.status === "overdue" && (
                          <div className="p-[6px] rounded-full bg-green-300 bg-opacity-50">
                            <div className="">
                              <CircleCheck
                                size={18}
                                className="overflow-hidden border-0"
                                fill="green"
                                color="white"
                              />
                            </div>
                          </div>
                        )}
                        {appointment.status === "cancelled" && (
                          <div className="p-[6px] rounded-full bg-red-400 bg-opacity-50">
                            <div className="">
                              <CircleX
                                size={18}
                                className="overflow-hidden"
                                fill="red"
                                fillRule="nonzero"
                                color="white"
                              />
                            </div>
                          </div>
                        )}

                        <div className="flex flex-col ">
                          <p className="text-sm">{appointment.patient_name}</p>
                          <p className="text-gray-400  text-xs">
                            {format(
                              parseISO(
                                `${appointment.appointment_date}T${appointment.appointment_time}`
                              ),
                              "hh:mm a"
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid md:grid-cols-4 grid-cols-1 gap-2 ]">
          <div className="md:col-span-3 max-h-[350px">
            <Card className="border-none">
              <CardHeader>
                <CardTitle>
                  <div className="flex justify-between items-center">
                    <p>Active Patient Visits</p>
                    <Button variant={"ghost"} className="bg-transparent">
                      View All
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-[250px] overflow-y-auto scrollbar-width5">
                  <Table>
                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>Visit Date</TableHead>
                        {/* <TableHead>Visit </TableHead> */}
                        {/* <TableHead className="text-right">Amount</TableHead> */}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data?.active_Visits.map((visit) => (
                        <TableRow key={visit.id}>
                          <TableCell>{visit.patient.card_number}</TableCell>
                          <TableCell>
                            {visit.patient.firstName +
                              " " +
                              visit.patient.middleName}
                          </TableCell>
                          <TableCell>{visit.patient.gender}</TableCell>
                          <TableCell>
                            {format(
                              parseISO(
                                `${visit.visit_date}T${visit.visit_time}`
                              ),
                              "MM/dd/yyyy hh:m a"
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="">
            <Card className="shadow-none border-none">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium ">
                  Today Appointments
                </CardTitle>
              </CardHeader>
              <CardContent className="">
                <div className="max-h-[250px] overflow-y-auto scrollbar-width5 h-[100%] ps-4 pt-3">
                  <div className="border-l-[3px]  flex flex-col gap-y-4 ">
                    {data?.appointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="-ms-[17px] flex items-center gap-4"
                      >
                        <div className="p-[6px] rounded-full bg-orange-300 bg-opacity-50">
                          <div className="">
                            <Clock
                              size={18}
                              className="overflow-hidden"
                              fill="orange"
                              color="white"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col ">
                          <p className="text-sm">{appointment.patient_name}</p>
                          <p className="text-gray-400  text-xs">
                            {format(
                              parseISO(
                                `${appointment.appointment_date}T${appointment.appointment_time}`
                              ),
                              "hh:mm a"
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
