import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function VisitorsChart({ data, topCareers = [] }) {
    if (!data || data.length === 0) {
        return (
            <Card className="h-[400px] flex items-center justify-center border-none shadow-none bg-slate-50/50">
                <p className="text-muted-foreground animate-pulse">Cargando analíticas de registros...</p>
            </Card>
        );
    }

    const colors = ["#003dcbff", "#2563EB", "#60A5FA", "#93C5FD", "#BFDBFE"];

    return (
        <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0">
                <CardTitle className="text-xl font-bold text-slate-800">Registros por Carrera</CardTitle>
                <CardDescription>Estudiantes inscritos en los últimos 7 días</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
                <div className="h-[320px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis
                                dataKey="fecha"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 12 }}
                            />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: '12px',
                                    border: '1px solid #e2e8f0',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                    padding: '12px'
                                }}
                                itemStyle={{ fontSize: '12px', fontWeight: '600' }}
                            />
                            <Legend
                                verticalAlign="top"
                                align="right"
                                iconType="circle"
                                wrapperStyle={{ paddingBottom: '20px', fontSize: '12px', fontWeight: '500' }}
                            />
                            {topCareers.map((career, index) => (
                                <Line
                                    key={career}
                                    type="monotone"
                                    dataKey={career}
                                    name={career}
                                    stroke={colors[index % colors.length]}
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: colors[index % colors.length], strokeWidth: 2, stroke: '#fff' }}
                                    activeDot={{ r: 6, strokeWidth: 0 }}
                                    animationDuration={1500}
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
