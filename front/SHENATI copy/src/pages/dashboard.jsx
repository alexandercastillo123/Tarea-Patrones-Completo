import { useState, useEffect } from "react";
import Layout from "@/components/shared/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VisitorsChart } from "@/components/dashboard/VisitorsChart";
import CarreraPieChart from "@/components/dashboard/CarreraPieChart";

export default function Dashboard() {
    const [stats, setStats] = useState({
        totales: { estudiantes: 0, profesores: 0, cursos: 0, notas: 0 },
        distribucionCarreras: [],
        historialRegistro: [],
        topCarreras: []
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/dashboard/stats');
                const json = await res.json();
                if (json.success) {
                    setStats(json.data);
                }
            } catch (err) {
                console.error("Error al cargar estadísticas:", err);
            }
        };
        fetchStats();
    }, []);

    const lineColors = ["#003dcbff", "#2563EB", "#60A5FA"];

    return (
        <Layout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold   ">Bienvenido a Shenati</h1>
                <p className="text-slate-500">Gestión de Shenati, potencia mundial xd</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card className="shadow-sm">
                    <CardHeader className="pb-2 text-slate-500 text-xs uppercase font-bold tracking-wider">Estudiantes</CardHeader>
                    <CardContent><p className="text-3xl font-bold">{stats.totales.estudiantes}</p></CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader className="pb-2 text-slate-500 text-xs uppercase font-bold tracking-wider">Profesores</CardHeader>
                    <CardContent><p className="text-3xl font-bold">{stats.totales.profesores}</p></CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader className="pb-2 text-slate-500 text-xs uppercase font-bold tracking-wider">Cursos</CardHeader>
                    <CardContent><p className="text-3xl font-bold">{stats.totales.cursos}</p></CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader className="pb-2 text-slate-500 text-xs uppercase font-bold tracking-wider">Notas</CardHeader>
                    <CardContent><p className="text-3xl font-bold">{stats.totales.notas}</p></CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 mb-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Último Registro</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {stats.ultimoRegistro ? (
                            <div className="flex justify-between items-center">
                                <div>
                                    <p>Tabla: {stats.ultimoRegistro.tabla_afectada}</p>
                                    <p>Usuario: {stats.ultimoRegistro.usuario}</p>
                                    <p>Fecha: {new Date(stats.ultimoRegistro.fecha_hora).toLocaleDateString()}</p>
                                </div>
                                <Button
                                    size="sm"
                                    onClick={() => window.location.href = `/detalle_historial/${stats.ultimoRegistro.id_historial}`}
                                >
                                    Ver Detalle
                                </Button>
                            </div>
                        ) : (
                            <p>No hay registros recientes.</p>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Último Actualizado</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {stats.ultimoActualizado ? (
                            <div className="flex justify-between items-center">
                                <div>
                                    <p>Tabla: {stats.ultimoActualizado.tabla_afectada}</p>
                                    <p>Usuario: {stats.ultimoActualizado.usuario}</p>
                                    <p>Fecha: {new Date(stats.ultimoActualizado.fecha_hora).toLocaleDateString()}</p>
                                </div>
                                <Button
                                    size="sm"
                                    onClick={() => window.location.href = `/detalle_historial/${stats.ultimoActualizado.id_historial}`}
                                >
                                    Ver Detalle
                                </Button>
                            </div>
                        ) : (
                            <p>No hay actualizaciones recientes.</p>
                        )}
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Columna Izquierda: Gráficas */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl border shadow-sm">
                        <VisitorsChart data={stats.historialRegistro} topCareers={stats.topCarreras} />
                    </div>
                </div>

                {/* Columna Derecha: Resumen de Carreras y Distribución Circular */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border shadow-sm">
                        <h2 className="text-lg font-bold mb-4">Top Carreras</h2>
                        <div className="space-y-4">
                            {stats.distribucionCarreras.slice(0, 3).map((career, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="w-1 h-12 rounded-full" style={{ backgroundColor: lineColors[idx % 5] }}></div>
                                    <div className="flex-1">
                                        <div className="text-sm font-semibold">{career.name}</div>
                                        <div className="text-xs text-slate-500">{career.value} Alumnos inscritos</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border shadow-sm">
                        <CarreraPieChart data={stats.distribucionCarreras} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
