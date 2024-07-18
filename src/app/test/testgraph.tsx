"use client";

import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { getData } from '@/app/api/getNumCardsReviewedByDay';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig: ChartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
};

export function TestChart() {
    const [chartData, setChartData] = useState<{ month: string; amount: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getData();
                const monthlyData: Record<string, number> = {};

                data.forEach(entry => {
                    const date = new Date(entry.date);
                    const month = date.toLocaleString('default', { month: 'long', year: 'numeric' });
                    if (!monthlyData[month]) {
                        monthlyData[month] = 0;
                    }
                    monthlyData[month] += entry.amount;
                });

                const formattedData = Object.keys(monthlyData)
                    .map(month => {
                        const [monthName, year] = month.split(' ');
                        const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth();
                        const dateObj = new Date(Number(year), monthIndex);
                        return { month, amount: monthlyData[month] ?? 0, dateObj };
                    })
                    .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())
                    .map(item => ({ month: item.month, amount: item.amount })); // Remove dateObj after sorting

                setChartData(formattedData);
            } catch (error) {
                setError(error instanceof Error ? error : new Error('Unknown error'));
            } finally {
                setLoading(false);
            }
        };

        void fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

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
    );
}
