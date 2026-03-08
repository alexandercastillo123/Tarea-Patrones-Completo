import { useState, useEffect } from "react";
import Layout from "@/components/shared/Layout";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Historial() {
    const [historial, setHistorial] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const API_URL = "http://localhost:3000/api";

    const fetchHistorial = async () => {
        try {
            const res = await fetch(`${API_URL}/historial`);
            const json = await res.json();
            if (json.success) {
                setHistorial(json.data);
            }
        } catch (error) {
            console.error("Error al cargar historial:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistorial();
    }, []);

    const handleVerDetalle = (item) => {
        if (item.id_historial) {
            navigate(`/detalle_historial/${item.id_historial}`);
        }
    };

    return (
        <Layout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-6">Historial de Actividades</h1>
                <p className="text-slate-500">Registro detallado de acciones realizadas en el sistema</p>
            </div>

            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg">Registro de Auditoría</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption>Listado de acciones registradas</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[180px]">Fecha y Hora</TableHead>
                                <TableHead>Usuario</TableHead>
                                <TableHead>Acción</TableHead>
                                <TableHead>Descripción</TableHead>
                                <TableHead className="text-right">Detalles</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10">Cargando historial...</TableCell>
                                </TableRow>
                            ) : historial.length > 0 ? (
                                historial.map((h) => (
                                    <TableRow key={h.id_historial}>
                                        <TableCell className="text-xs font-medium">{new Date(h.fecha_hora).toLocaleString()}</TableCell>
                                        <TableCell>
                                            <span className="text-slate-700">{h.usuario}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-slate-600">
                                                {h.accion}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-sm">{h.detalle}</TableCell>
                                        <TableCell className="text-right">
                                            {h.accion !== 'Eliminación' && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleVerDetalle(h)}
                                                >
                                                    Ver Detalles
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10 text-gray-400">No hay registros de actividad todavía.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </Layout>
    );
}
