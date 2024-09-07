"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  LabelList,
  Line,
  LineChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  Rectangle,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"


import { ScoreChart } from "@/components/ui/LineChart"

export const description = "A collection of health charts."

export function Charts() {
  return (
    <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
      <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
        <ScoreChart/>
        
      </div>
     
            
      <div className="grid w-full flex-1 gap-6">
      <Card className="max-w-xs h-80" x-chunk="candidate-status-02">
        <CardContent className="flex gap-4 p-4">
            <div className="grid items-center gap-4">
            <div className="grid flex-1 auto-rows-min gap-2">
                <div className="text-sm text-muted-foreground">Elected</div>
                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                40/100
                <span className="text-sm font-normal text-muted-foreground">
                    candidates
                </span>
                </div>
            </div>
            <div className="grid flex-1 auto-rows-min gap-2">
                <div className="text-sm text-muted-foreground">Not Elected</div>
                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                30/100
                <span className="text-sm font-normal text-muted-foreground">
                    candidates
                </span>
                </div>
            </div>
            <div className="grid flex-1 auto-rows-min gap-2">
                <div className="text-sm text-muted-foreground">On Waiting List</div>
                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                30/100
                <span className="text-sm font-normal text-muted-foreground">
                    candidates
                </span>
                </div>
            </div>
            </div>
            <ChartContainer
            config={{
                elected: {
                label: "Elected",
                color: "hsl(var(--chart-1))",
                },
                notElected: {
                label: "Not Elected",
                color: "hsl(var(--chart-2))",
                },
                waiting: {
                label: "On Waiting List",
                color: "hsl(var(--chart-3))",
                },
            }}
            className="mx-auto aspect-square w-full max-w-[80%]"
            >
            <RadialBarChart
                margin={{
                left: -10,
                right: -10,
                top: -10,
                bottom: -10,
                }}
                data={[
                {
                    activity: "elected",
                    value: (40 / 100) * 100,
                    fill: "var(--color-elected)",
                },
                {
                    activity: "notElected",
                    value: (30 / 100) * 100,
                    fill: "var(--color-notElected)",
                },
                {
                    activity: "waiting",
                    value: (30 / 100) * 100,
                    fill: "var(--color-waiting)",
                },
                ]}
                innerRadius="20%"
                barSize={24}
                startAngle={90}
                endAngle={450}
            >
                <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                dataKey="value"
                tick={false}
                />
                <RadialBar dataKey="value" background cornerRadius={5} />
            </RadialBarChart>
            </ChartContainer>
        </CardContent>
        </Card>

        
       
      </div>
    </div>
  )
}
