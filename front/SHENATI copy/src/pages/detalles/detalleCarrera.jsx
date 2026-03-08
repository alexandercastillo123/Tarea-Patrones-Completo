import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/shared/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DetalleCarrera() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [carrera, setCarrera] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_URL = "http://localhost:3000/api";

    useEffect(() => {
        const cargarCarrera = async () => {
            try {
                const response = await fetch(`${API_URL}/carreras`);
                const result = await response.json();
                const car = result.data.find(c => c.id_carrera == id);
                setCarrera(car);
            } catch (error) {
                console.error("Error al cargar carrera:", error);
            } finally {
                setLoading(false);
            }
        };
        if (id) cargarCarrera();
    }, [id]);

    if (loading) return <Layout><p className="p-8 text-center text-xl">Cargando datos de la carrera...</p></Layout>;
    if (!carrera) return <Layout><p className="p-8 text-center text-xl text-red-600">Carrera no encontrada</p></Layout>;

    return (
        <Layout>
            <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-xl overflow-hidden border">
                <div className="p-6 text-center border-b">
                    <h1 className="text-2xl font-bold uppercase tracking-wide">Detalle de la Carrera</h1>
                </div>

                <div className="p-10">
                    <h2 className="text-xl font-bold border-b pb-2 mb-6 uppercase tracking-tight">Información General</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        <div className="bg-slate-50 p-4 border-l-4 border-slate-400 rounded">
                            <p className="text-xs font-bold mb-1">Nombre / Especialidad</p>
                            <p className="text-xl font-bold text-slate-800">{carrera.nombre_carrera}</p>
                        </div>
                        <div className="bg-slate-50 p-4 border-l-4 border-slate-400 rounded">
                            <p className="text-xs font-bold mb-1">Código de Carrera (ID)</p>
                            <p className="text-xl font-bold text-slate-800">{carrera.id_carrera}</p>
                        </div>
                        <div className="bg-slate-50 p-4 border-l-4 border-slate-400 rounded">
                            <p className="text-xs font-bold mb-1">Fecha de Registro</p>
                            <p className="text-sm font-bold text-slate-800">{carrera.fecha_creacion ? new Date(carrera.fecha_creacion).toLocaleString() : '---'}</p>
                        </div>
                        <div className="bg-slate-50 p-4 border-l-4 border-slate-400 rounded">
                            <p className="text-xs font-bold mb-1">Última Actualización</p>
                            <p className="text-sm font-bold text-slate-800">
                                {carrera.fecha_actualizacion && carrera.fecha_actualizacion !== carrera.fecha_creacion
                                    ? new Date(carrera.fecha_actualizacion).toLocaleString()
                                    : '---'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-slate-50 border-t text-center">
                    <Button
                        variant="outline"
                        className="border-slate-300 font-bold transition-all px-10"
                        onClick={() => navigate("/carreras")}
                    >
                        Volver
                    </Button>
                </div>
            </div>
        </Layout>
    );
}