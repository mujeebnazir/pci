"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Chart configuration
const chartConfig = {
  TotalUsers: {
    label: "Users",
  },
  TotalOrders: {
    label: "Orders",
    color: "hsl(var(--chart-1))",
  },
  CancelledOrders: {
    label: "Cancelled Orders",
    color: "hsl(var(--chart-2))",
  },
  DeliveredOrders: {
    label: "Delivered Orders",
    color: "hsl(var(--chart-3))",
  },
  OnTheWayOrders: {
    label: "On The Way Orders",
    color: "hsl(var(--chart-4))",
  },
  PendingOrders: {
    label: "Pending Orders",
    color: "hsl(var(--chart-5))",
  },
  ProcessingOrders: {
    label: "Processing Orders",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig;

export function AdminInsightsPieChart({ data }: { data: any }) {
  const {
    cancelledOrders,
    deliveredOrders,
    onTheWayOrders,
    pendingOrders,
    processingOrders,
    totalUsers,
  } = data;

  // Prepare updated chart data
  const updatedChartData = [
    {
      name: chartConfig.CancelledOrders.label,
      value: cancelledOrders === 0 ? 1 : cancelledOrders,
      fill: chartConfig.CancelledOrders.color,
    },
    {
      name: chartConfig.DeliveredOrders.label,
      value: deliveredOrders === 0 ? 1 : deliveredOrders,
      fill: chartConfig.DeliveredOrders.color,
    },
    {
      name: chartConfig.OnTheWayOrders.label,
      value: onTheWayOrders === 0 ? 1 : onTheWayOrders,
      fill: chartConfig.OnTheWayOrders.color,
    },
    {
      name: chartConfig.PendingOrders.label,
      value: pendingOrders === 0 ? 1 : pendingOrders,
      fill: chartConfig.PendingOrders.color,
    },
    {
      name: chartConfig.ProcessingOrders.label,
      value: processingOrders === 0 ? 1 : processingOrders,
      fill: chartConfig.ProcessingOrders.color,
    },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Order Insights</CardTitle>
        <CardDescription>Data Overview: January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={updatedChartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalUsers.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Users
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Growth Rate:{" "}
          {totalUsers > 0
            ? (
                ((totalUsers / (totalUsers - totalUsers * 0.052)) * 100) |
                0
              ).toFixed(2)
            : 0}
          % this month
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Insights are based on Api data.
        </div>
      </CardFooter>
    </Card>
  );
}
