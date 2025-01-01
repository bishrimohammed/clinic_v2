"use client";
import { UserGroupByRole } from "@/lib/api/dashaboard";

import { Bar, BarChart, PieChart, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tooltip } from "@radix-ui/react-tooltip";

const chartConfig = {
  role: {
    label: "Role",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const UserChart = ({ data }: { data?: UserGroupByRole[] }) => {
  const users =
    data?.map((u) => ({
      role: u.role.name,
      value: u.count,
    })) || [];
  // console.log(users);

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square h-[200px] w-full"
    >
      <BarChart accessibilityLayer data={users} margin={{ top: 30 }}>
        <XAxis
          dataKey="role"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          hide={true}
        />

        {/* <YAxis />  */}
        <ChartTooltip content={<ChartTooltipContent />} />
        {/* <ChartLegend content={<ChartLegendContent />} /> */}
        <Bar dataKey="value" fill="var(--color-role)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

export default UserChart;
