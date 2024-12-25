"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

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

export function ProductChart({ data }: { data: any }) {
  const colorMap: { [key: string]: string } = {
    Mens: "hsl(var(--chart-1))",
    Women: "hsl(var(--chart-2))",
    Coats: "hsl(var(--chart-3))",
    Shawls: "hsl(var(--chart-4))",
  };
  // Transform received data into chart-compatible format
  const chartData = Object.entries(data).map(([key, value]: [string, any]) => ({
    category: key,
    totalRevenue: value.totalRevenue || 0,
    totalProducts: value.totalProducts || 0,
    fill: colorMap[key], // Customize colors dynamically if needed
  }));
  // Define a color map for different categories (adjust as necessary)

  const chartConfig = {
    totalRevenue: {
      label: "Total Revenue",
    },
    totalProducts: {
      label: "Total Products",
      // generate dynamic colors
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Chart - Product & Category Insights</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="totalProducts"
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                );
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
