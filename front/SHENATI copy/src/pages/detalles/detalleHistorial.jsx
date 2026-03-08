import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/shared/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DetalleHistorial() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [actividad, setActividad] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_URL = "http://localhost:3000/api";

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const res = await fetch(`${API_URL}/historial`);
                const json = await res.json();
                if (json.success) {
                    const item = json.data.find(h => h.id_historial == id);
                    setActividad(item);
                }
            } catch (error) {
                console.error("Error al cargar detalle de historial:", error);
            } finally {
                setLoading(false);
            }
        };
        if (id) cargarDatos();
    }, [id]);

    if (loading) return <Layout><p className="p-8 text-center text-xl">Cargando detalles de la actividad...</p></Layout>;
    if (!actividad) return <Layout><p className="p-8 text-center text-xl text-red-600">Registro de historial no encontrado</p></Layout>;

    return (
        <Layout>
            <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-xl overflow-hidden border">
                <div className="p-6 text-center border-b">
                    <p className="text-xs font-bold opacity-80 uppercase tracking-widest text-[#003366] mb-1">Módulo: {actividad.tabla_afectada}</p>
                    <h1 className="text-2xl font-bold uppercase tracking-wide">Detalle de Actividad</h1>
                </div>

                <div className="p-10">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold border-b pb-2 uppercase tracking-tight flex-1">Información del Registro</h2>
                        <div className="text-right ml-4">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Fecha y Hora</p>
                            <p className="font-semibold text-slate-800">{new Date(actividad.fecha_hora).toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        <div className="bg-slate-50 p-4 border-l-4 border-slate-400 rounded">
                            <p className="text-xs font-bold mb-1">Usuario Responsable</p>
                            <p className="text-xl font-bold text-slate-800">{actividad.usuario}</p>
                        </div>
                        <div className="bg-slate-50 p-4 border-l-4 border-slate-400 rounded">
                            <p className="text-xs font-bold mb-1">ID del Registro Afectado</p>
                            <p className="text-xl font-bold text-slate-800">#{actividad.id_referencia || 'N/A'}</p>
                        </div>
                        <div className="bg-slate-50 p-4 border-l-4 border-slate-400 rounded md:col-span-2">
                            <p className="text-xs font-bold mb-2">Descripción de la Acción ({actividad.accion})</p>
                            <p className="text-md text-slate-700">{actividad.detalle}</p>
                        </div>
                    </div>

                    {actividad.id_referencia && actividad.accion !== 'Eliminación' && (
                        <div className="mt-6 text-center">
                            <Button
                                className="bg-[#003366] hover:bg-[#004080] font-bold px-10"
                                onClick={() => {
                                    const routes = {
                                        'Estudiantes': '/detalle_estudiante/',
                                        'Profesores': '/detalle_profesor/',
                                        'Cursos': '/detalle_curso/',
                                        'Bloques': '/detalle_bloque/',
                                        'Carreras': '/detalle_carrera/',
                                        'Notas': '/detalle_estudiante/'
                                    };
                                    const route = routes[actividad.tabla_afectada];
                                    if (route) navigate(`${route}${actividad.id_referencia}`);
                                }}
                            >
                                Ver Registro Actual
                            </Button>
                        </div>
                    )}
                </div>

                <div className="p-6 bg-slate-50 border-t text-center">
                    <Button
                        variant="outline"
                        className="border-slate-300 font-bold transition-all px-10"
                        onClick={() => navigate("/historial")}
                    >
                        Volver
                    </Button>
                </div>
            </div>
        </Layout>
    );
}
