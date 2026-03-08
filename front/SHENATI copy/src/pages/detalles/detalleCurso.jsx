import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/shared/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DetalleCurso() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [curso, setCurso] = useState(null);
    const [bloquesAsociados, setBloquesAsociados] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_URL = "http://localhost:3000/api";

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [resCur, resBloq] = await Promise.all([
                    fetch(`${API_URL}/cursos`),
                    fetch(`${API_URL}/bloques`)
                ]);
                const dataCur = await resCur.json();
                const dataBloq = await resBloq.json();

                const cur = dataCur.data.find(c => c.id_curso == id);
                if (cur) {
                    setCurso(cur);
                    const blqs = dataBloq.data.filter(b => b.id_carrera == cur.id_carrera && b.id_profesor == cur.id_profesor);
                    setBloquesAsociados(blqs);
                }
            } catch (error) {
                console.error("Error al cargar curso:", error);
            } finally {
                setLoading(false);
            }
        };
        if (id) cargarDatos();
    }, [id]);

    if (loading) return <Layout><p className="p-8 text-center text-xl">Cargando información del curso...</p></Layout>;
    if (!curso) return <Layout><p className="p-8 text-center text-xl text-red-600">Curso no encontrado</p></Layout>;

    return (
        <Layout>
            <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-xl overflow-hidden border">
                <div className="p-6 text-center border-b">
                    <h1 className="text-2xl font-bold uppercase tracking-wide">Detalle del Curso</h1>
                </div>

                <div className="p-10">
                    <h2 className="text-xl font-bold border-b pb-2 mb-6 uppercase tracking-tight">Información General</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        <div className="bg-slate-50 p-4 border-l-4 border-slate-400 rounded">
                            <p className="text-xs font-bold mb-1">Nombre del Curso</p>
                            <p className="text-xl font-bold text-slate-800">{curso.nombre_curso}</p>
                        </div>
                        <div className="bg-slate-50 p-4 border-l-4 border-slate-400 rounded">
                            <p className="text-xs font-bold mb-1">ID del Curso</p>
                            <p className="text-xl font-bold text-slate-800">{curso.id_curso}</p>
                        </div>
                        <div className="bg-slate-50 p-4 border-l-4 border-slate-400 rounded">
                            <p className="text-xs font-bold mb-1">Carrera Perteneciente</p>
                            <p className="text-xl font-bold text-slate-800">{curso.nombre_carrera || "N/A"}</p>
                        </div>
                        <div className="bg-slate-50 p-4 border-l-4 border-slate-400 rounded">
                            <p className="text-xs font-bold mb-1">Docente Principal</p>
                            <p className="text-xl font-bold text-slate-800">{curso.nombre_profesor || "No asignado"}</p>
                        </div>
                        <div className="bg-slate-50 p-4 border-l-4 border-slate-400 rounded">
                            <p className="text-xs font-bold mb-1">Fecha de Registro</p>
                            <p className="text-sm font-bold text-slate-800">{curso.fecha_creacion ? new Date(curso.fecha_creacion).toLocaleString() : '---'}</p>
                        </div>
                        <div className="bg-slate-50 p-4 border-l-4 border-slate-400 rounded">
                            <p className="text-xs font-bold mb-1">Última Actualización</p>
                            <p className="text-sm font-bold text-slate-800">
                                {curso.fecha_actualizacion && curso.fecha_actualizacion !== curso.fecha_creacion
                                    ? new Date(curso.fecha_actualizacion).toLocaleString()
                                    : '---'}
                            </p>
                        </div>
                    </div>

                    <h2 className="text-xl font-bold border-b pb-2 mb-6 uppercase tracking-tight">Bloques Asociados</h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {bloquesAsociados.length > 0 ? (
                            bloquesAsociados.map(b => (
                                <span key={b.id_bloque} className="px-4 py-2 bg-slate-100 border rounded font-bold text-slate-800">
                                    {b.nombre_bloque}
                                </span>
                            ))
                        ) : (
                            <p className="text-gray-500">No hay bloques con este curso y profesor activo.</p>
                        )}
                    </div>
                </div>

                <div className="p-6 bg-slate-50 border-t text-center">
                    <Button
                        variant="outline"
                        className="border-slate-300 font-bold transition-all px-10"
                        onClick={() => navigate("/cursos")}
                    >
                        Volver
                    </Button>
                </div>
            </div>
        </Layout>
    );
}