import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/shared/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DetalleBloque() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bloque, setBloque] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_URL = "http://localhost:3000/api";

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const response = await fetch(`${API_URL}/bloques`);
                const result = await response.json();

                const bloq = result.data.find(b => b.id_bloque == id);
                if (bloq) {
                    setBloque(bloq);
                }
            } catch (error) {
                console.error("Error al cargar bloque:", error);
            } finally {
                setLoading(false);
            }
        };
        if (id) cargarDatos();
    }, [id]);

    if (loading) return <Layout><p className="p-8 text-center text-xl">Cargando datos del bloque...</p></Layout>;
    if (!bloque) return <Layout><p className="p-8 text-center text-xl text-red-600">Bloque no encontrado</p></Layout>;

    return (
        <Layout>
            <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-xl overflow-hidden border">
                <div className="p-6 text-center border-b">
                    <h1 className="text-2xl font-bold uppercase tracking-wide">Detalle del Bloque</h1>
                </div>

                <div className="p-10">
                    <h2 className="text-xl font-bold border-b pb-2 mb-6 uppercase tracking-tight">Información General</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        <div className="bg-slate-50 p-4 border-l-4 border-slate-400 rounded">
                            <p className="text-xs font-bold mb-1">Nombre del Bloque</p>
                            <p className="text-xl font-bold text-slate-800">{bloque.nombre_bloque}</p>
                        </div>
                        <div className="bg-slate-50 p-4 border-l-4 border-slate-400 rounded">
                            <p className="text-xs font-bold mb-1">ID del Bloque</p>
                            <p className="text-xl font-bold text-slate-800">{bloque.id_bloque}</p>
                        </div>
                        <div className="bg-slate-50 p-4 border-l-4 border-slate-400 rounded">
                            <p className="text-xs font-bold mb-1">Carrera Vinculada</p>
                            <p className="text-xl font-bold text-slate-800">{bloque.nombre_carrera || "N/A"}</p>
                        </div>
                        <div className="bg-slate-50 p-4 border-l-4 border-slate-400 rounded">
                            <p className="text-xs font-bold mb-1">Profesor Tutor / Instructor</p>
                            <p className="text-xl font-bold text-slate-800">{bloque.nombre_profesor || "Sin tutor asignado"}</p>
                        </div>
                        <div className="bg-slate-50 p-4 border-l-4 border-slate-400 rounded">
                            <p className="text-xs font-bold mb-1">Fecha de Registro</p>
                            <p className="text-sm font-bold text-slate-800">{bloque.fecha_creacion ? new Date(bloque.fecha_creacion).toLocaleString() : '---'}</p>
                        </div>
                        <div className="bg-slate-50 p-4 border-l-4 border-slate-400 rounded">
                            <p className="text-xs font-bold mb-1">Última Actualización</p>
                            <p className="text-sm font-bold text-slate-800">
                                {bloque.fecha_actualizacion && bloque.fecha_actualizacion !== bloque.fecha_creacion
                                    ? new Date(bloque.fecha_actualizacion).toLocaleString()
                                    : '---'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-slate-50 border-t text-center">
                    <Button
                        variant="outline"
                        className="border-slate-300 font-bold transition-all px-10"
                        onClick={() => navigate("/bloques")}
                    >
                        Volver
                    </Button>
                </div>
            </div>
        </Layout>
    );
}