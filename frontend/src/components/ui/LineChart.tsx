import React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Define the type for the chart data
interface ChartData {
  month: string;
  relevance: number;
  expertiseMatch: number;
}

export const ScoreChart: React.FC = () => {
  const chartData: ChartData[] = [
    { month: "2024-01", relevance: 78, expertiseMatch: 65 },
    { month: "2024-02", relevance: 85, expertiseMatch: 70 },
    { month: "2024-03", relevance: 60, expertiseMatch: 58 },
    { month: "2024-04", relevance: 72, expertiseMatch: 63 },
    { month: "2024-05", relevance: 80, expertiseMatch: 75 },
    { month: "2024-06", relevance: 82, expertiseMatch: 78 },
    { month: "2024-07", relevance: 90, expertiseMatch: 85 },
  ];

  return (
    <Card className="flex flex-col max-w-[300px]">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
        <div>
          <CardDescription>Expert Relevance</CardDescription>
          <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
            90%
          </CardTitle>
        </div>
        <div>
          <CardDescription>Expertise Match</CardDescription>
          <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
            85%
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 items-center">
        <ChartContainer
          config={{
            relevance: {
              label: "Relevance",
              color: "hsl(var(--chart-1))",
            },
            expertiseMatch: {
              label: "Expertise Match",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="w-full"
        >
          <ResponsiveContainer width="100%" height={200}>
            <RechartsLineChart
              data={chartData}
              
            >
              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="hsl(var(--muted-foreground))"
                strokeOpacity={0.5}
              />
              <YAxis hide domain={[50, 100]} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value: string) =>
                  new Date(value + "-01").toLocaleDateString("en-US", {
                    month: "short",
                  })
                }
              />
              <Line
                dataKey="relevance"
                type="natural"
                stroke="var(--color-relevance)"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  fill: "var(--color-relevance)",
                  stroke: "var(--color-relevance)",
                  r: 4,
                }}
              />
              <Line
                dataKey="expertiseMatch"
                type="natural"
                stroke="var(--color-expertise)"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  fill: "var(--color-expertise)",
                  stroke: "var(--color-expertise)",
                  r: 4,
                }}
              />
              <Tooltip
                content={({ label, payload }) => (
                  <ChartTooltipContent
                    indicator="line"
                    label={new Date(label + "-01").toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                    payload={payload}
                  />
                )}
                cursor={false}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};