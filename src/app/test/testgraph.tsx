"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { getData } from '@/app/api/getNumCardsReviewedByDay';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

// Summarize data into months and sort from oldest to newest
let chartData: { month: string; amount: number }[] = [];
void getData().then(data => {
    const monthlyData: Record<string, number> = {};
    data.forEach(entry => {
        const month = new Date(entry.date).toLocaleString('default', { month: 'long', year: 'numeric' });
        if (!monthlyData[month]) {
            monthlyData[month] = 0;
        }
        monthlyData[month] += entry.amount;
    });

    chartData = Object.keys(monthlyData)
        .map(month => ({ month, amount: monthlyData[month] ?? 0 }))
        .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
}).catch((error: unknown) => {
    console.error("Failed to fetch data:", error)
});

const chartConfig: ChartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
};

export function TestChart() {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Anki Cards Done</CardTitle>
                    <CardDescription>
                        Showing total cards done for the last 6 months
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                    <ChartContainer config={chartConfig}>
                        <AreaChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value: string) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="line" />}
                            />
                            <Area
                                dataKey="amount"
                                name="Cards Done"
                                type="natural"
                                fill="var(--color-desktop)"
                                fillOpacity={0.4}
                                stroke="var(--color-desktop)"
                            />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}
