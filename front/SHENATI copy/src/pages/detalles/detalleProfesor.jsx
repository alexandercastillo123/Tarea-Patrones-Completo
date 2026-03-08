import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/shared/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DetalleProfesor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [profesor, setProfesor] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_URL = "http://localhost:3000/api";

    useEffect(() => {
        const cargarProfesor = async () => {
            try {
                const response = await fetch(`${API_URL}/profesores`);
                const result = await response.json();
                const prof = result.data.find(p => p.id_profesor == id);
                setProfesor(prof);
            } catch (error) {
                console.error("Error al cargar profesor:", error);
            } finally {
                setLoading(false);
            }
        };
        if (id) cargarProfesor();
    }, [id]);

    if (loading) return <Layout><p className="p-8 text-center text-xl">Cargando datos del docente...</p></Layout>;
    if (!profesor) return <Layout><p className="p-8 text-center text-xl text-red-600">Docente no encontrado</p></Layout>;

    return (
        <Layout>
            <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-xl overflow-hidden border">
                <div className="p-6 text-center border-b">
                    <h1 className="text-2xl font-bold uppercase tracking-wide">Detalle del Docente</h1>
                </div>

                <div className="p-10">
                    <h2 className="text-xl font-bold border-b pb-2 mb-6 uppercase tracking-tight">Información General</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        <div className="bg-slate-50 p-4 border-l-4 border-slate-400 rounded">
                            <p className="text-xs font-bold mb-1">Nombre Completo</p>
                            <p className="text-xl font-bold text-slate-800">{profesor.nombre_profesor}</p>
                        </div>
                        <div className="bg-slate-50 p-4 border-l-4 border-slate-400 rounded">
                            <p className="text-xs font-bold mb-1">ID del Docente</p>
                            <p className="text-xl font-bold text-slate-800">{profesor.id_profesor}</p>
                        </div>
                        <div className="bg-slate-50 p-4 border-l-4 border-slate-400 rounded">
                            <p className="text-xs font-bold mb-1">Especialidad Académica</p>
                            <p className="text-xl font-bold text-slate-800">{profesor.especialidad || "No especificada"}</p>
                        </div>
                        <div className="bg-slate-50 p-4 border-l-4 border-slate-400 rounded">
                            <p className="text-xs font-bold mb-1">Fecha de Registro</p>
                            <p className="text-sm font-bold text-slate-800">{profesor.fecha_creacion ? new Date(profesor.fecha_creacion).toLocaleString() : '---'}</p>
                        </div>
                        <div className="bg-slate-50 p-4 border-l-4 border-slate-400 rounded">
                            <p className="text-xs font-bold mb-1">Última Actualización</p>
                            <p className="text-sm font-bold text-slate-800">
                                {profesor.fecha_actualizacion && profesor.fecha_actualizacion !== profesor.fecha_creacion
                                    ? new Date(profesor.fecha_actualizacion).toLocaleString()
                                    : '---'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-slate-50 border-t text-center">
                    <Button
                        variant="outline"
                        className="border-slate-300 font-bold transition-all px-10"
                        onClick={() => navigate("/profesores")}
                    >
                        Volver
                    </Button>
                </div>
            </div>
        </Layout>
    );
}