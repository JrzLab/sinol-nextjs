"use client";

import { BarChart, Bar, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { date: "2024-04-01", attendance: 5 },
  { date: "2024-04-02", attendance: 4 },
  { date: "2024-04-03", attendance: 6 },
  { date: "2024-04-04", attendance: 7 },
  { date: "2024-04-05", attendance: 8 },
  { date: "2024-04-06", attendance: 9 },
  { date: "2024-04-07", attendance: 6 },
  { date: "2024-04-08", attendance: 9 },
  { date: "2024-04-09", attendance: 3 },
  { date: "2024-04-10", attendance: 7 },
  { date: "2024-04-11", attendance: 8 },
  { date: "2024-04-12", attendance: 6 },
  { date: "2024-04-13", attendance: 10 },
  { date: "2024-04-14", attendance: 5 },
  { date: "2024-04-15", attendance: 4 },
  { date: "2024-04-16", attendance: 5 },
  { date: "2024-04-17", attendance: 10 },
  { date: "2024-04-18", attendance: 9 },
  { date: "2024-04-19", attendance: 6 },
  { date: "2024-04-20", attendance: 4 },
  { date: "2024-04-21", attendance: 5 },
  { date: "2024-04-22", attendance: 6 },
  { date: "2024-04-23", attendance: 7 },
  { date: "2024-04-24", attendance: 9 },
  { date: "2024-04-25", attendance: 8 },
  { date: "2024-04-26", attendance: 4 },
  { date: "2024-04-27", attendance: 10 },
  { date: "2024-04-28", attendance: 5 },
  { date: "2024-04-29", attendance: 8 },
  { date: "2024-04-30", attendance: 9 },
  { date: "2024-05-01", attendance: 6 },
  { date: "2024-05-02", attendance: 8 },
  { date: "2024-05-03", attendance: 7 },
  { date: "2024-05-04", attendance: 10 },
  { date: "2024-05-05", attendance: 10 },
  { date: "2024-05-06", attendance: 11 },
  { date: "2024-05-07", attendance: 9 },
  { date: "2024-05-08", attendance: 5 },
  { date: "2024-05-09", attendance: 6 },
  { date: "2024-05-10", attendance: 8 },
  { date: "2024-05-11", attendance: 7 },
  { date: "2024-05-12", attendance: 6 },
  { date: "2024-05-13", attendance: 5 },
  { date: "2024-05-14", attendance: 10 },
  { date: "2024-05-15", attendance: 10 },
  { date: "2024-05-16", attendance: 9 },
  { date: "2024-05-17", attendance: 11 },
  { date: "2024-05-18", attendance: 8 },
  { date: "2024-05-19", attendance: 6 },
  { date: "2024-05-20", attendance: 7 },
  { date: "2024-05-21", attendance: 4 },
  { date: "2024-05-22", attendance: 3 },
  { date: "2024-05-23", attendance: 8 },
  { date: "2024-05-24", attendance: 7 },
  { date: "2024-05-25", attendance: 7 },
  { date: "2024-05-26", attendance: 5 },
  { date: "2024-05-27", attendance: 10 },
  { date: "2024-05-28", attendance: 6 },
  { date: "2024-05-29", attendance: 4 },
  { date: "2024-05-30", attendance: 8 },
  { date: "2024-05-31", attendance: 7 },
];

const chartConfig = {
  attendance: {
    label: "Attendance",
    color: "#2563eb",
  },
} satisfies ChartConfig;

const AttendanceChart = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <h1 className="text-xl font-bold">Attendance</h1>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <BarChart
              margin={{
                left: 12,
                right: 12,
              }}
              accessibilityLayer
              data={chartData}
            >
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="views"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                    }}
                  />
                }
              />
              <Bar dataKey="attendance" fill="var(--color-attendance)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default AttendanceChart;
