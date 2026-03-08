import { TrendingUp } from "lucide-react"
import { LabelList, Pie, PieChart } from "recharts"

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

export default function CarreraPieChart({ data }) {
    const chartConfig = {
        visitors: { label: "Estudiantes" },
    }

    const colors = ["#003dcbff", "#2563EB", "#60A5FA"];

    const processedData = [...data]
        .sort((a, b) => b.value - a.value)
        .slice(0, 3)
        .map((item, index) => ({
            career: item.name,
            visitors: item.value,
            fill: colors[index % colors.length]
        }));

    return (
        <Card className="flex flex-col border-none shadow-none">
            <CardHeader className="items-center pb-0">
                <CardTitle>Top 3 Carreras</CardTitle>
                <CardDescription>Carreras con mayor cantidad de alumnos de Shenati</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[300px]"
                >
                    <PieChart>
                        <ChartTooltip
                            content={<ChartTooltipContent nameKey="visitors" hideLabel />}
                        />
                        <Pie
                            data={processedData}
                            dataKey="visitors"
                            nameKey="career"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <LabelList
                                dataKey="career"
                                className="fill-foreground font-medium"
                                stroke="none"
                                fontSize={11}
                                offset={15}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                    Principales carreras en Senati <TrendingUp className="h-4 w-4" />
                </div>
            </CardFooter>
        </Card>
    )
}