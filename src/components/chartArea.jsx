"use client"

import React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

/* =========================
   Daily Expansion Logic
========================= */

const DAY_WEIGHTS = [1.1, 1.05, 1, 1, 1.05, 0.9, 0.9]

function expandWeekToDays(year, week, total) {
    const start = new Date(year, 0, 1 + (week - 1) * 7)
    const weightSum = DAY_WEIGHTS.reduce((a, b) => a + b, 0)

    return DAY_WEIGHTS.map((weight, i) => {
        const date = new Date(start)
        date.setDate(start.getDate() + i)

        return {
            date: date.toISOString().split("T")[0],
            visitors: Math.round((total * weight) / weightSum),
        }
    })
}

function expandMonthToDays(year, month, total) {
    const daysInMonth = new Date(year, month, 0).getDate()
    const base = total / daysInMonth

    return Array.from({ length: daysInMonth }, (_, i) => {
        const date = new Date(year, month - 1, i + 1)
        return {
            date: date.toISOString().split("T")[0],
            visitors: Math.round(base),
        }
    })
}

/* =========================
   Component
========================= */

export default function ChartAreaInteractiveCard({ initialData }) {
    const [timeRange, setTimeRange] = React.useState("90d")

    const chartData = React.useMemo(() => {
        if (!initialData) return []

        const year = new Date().getFullYear()

        if (timeRange === "7d") {
            return initialData.weekly.flatMap(w =>
                expandWeekToDays(year, w.week, w.visitors)
            )
        }

        if (timeRange === "30d") {
            return initialData.monthly.flatMap(m =>
                expandMonthToDays(year, m.month, m.visitors)
            )
        }

        return initialData.last3Months.flatMap(m =>
            expandMonthToDays(m.year, m.month, m.visitors)
        )
    }, [initialData, timeRange])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Total Visitors: {initialData.totalVisitors}</CardTitle>
                <CardDescription>Visitors over time</CardDescription>

                <CardAction>
                    <ToggleGroup
                        type="single"
                        value={timeRange}
                        onValueChange={setTimeRange}
                        variant="outline">
                        <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
                        <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
                        <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
                    </ToggleGroup>
                </CardAction>
            </CardHeader>

            <CardContent>
                <ChartContainer
                    config={{
                        visitors: { label: "Visitors", color: "var(--primary)" },
                    }}
                    className="h-[250px] w-full">
                    <AreaChart data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="date" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                            type="natural"
                            dataKey="visitors"
                            stroke="var(--color-visitors)"
                            fill="var(--color-visitors)"
                            fillOpacity={0.2}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
