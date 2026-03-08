import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/shared/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function DetalleEstudiantes() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [estudiante, setEstudiante] = useState(null);
    const [carrera, setCarrera] = useState("Cargando...");
    const [bloque, setBloque] = useState("Cargando...");
    const [notas, setNotas] = useState([]);
    const [cursosCarrera, setCursosCarrera] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_URL = "http://localhost:3000/api";

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [resE, resC, resB, resCur] = await Promise.all([
                    fetch(`${API_URL}/estudiantes`),
                    fetch(`${API_URL}/carreras`),
                    fetch(`${API_URL}/bloques`),
                    fetch(`${API_URL}/cursos`)
                ]);
                const dataE = await resE.json();
                const dataC = await resC.json();
                const dataB = await resB.json();
                const dataCur = await resCur.json();

                const est = dataE.data.find(e => e.id_estudiante == id);
                if (est) {
                    setEstudiante(est);
                    const miCarrera = dataC.data.find(c => c.id_carrera == est.id_carrera);
                    setCarrera(miCarrera ? miCarrera.nombre_carrera : "No asignada");
                    const miBloque = dataB.data.find(b => b.id_bloque == est.id_bloque);
                    setBloque(miBloque ? miBloque.nombre_bloque : "No asignado");

                    if (dataCur.success) {
                        const cursosFiltrados = dataCur.data.filter(c => c.id_carrera == est.id_carrera);
                        setCursosCarrera(cursosFiltrados);
                    }
                }

                const resN = await fetch(`${API_URL}/estudiantes/${id}/notas`);
                const resultN = await resN.json();
                if (resultN.success) {
                    setNotas(resultN.data);
                }
            } catch (error) {
                console.error("Error al cargar expediente:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) cargarDatos();
    }, [id]);

    if (loading) return <Layout><p className="p-8 text-center text-xl">Consultando historial...</p></Layout>;
    if (!estudiante) return <Layout><p className="p-8 text-center text-xl text-red-600">Estudiante no encontrado</p></Layout>;

    return (
        <Layout>
            <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-xl overflow-hidden border">
                <div className="p-6 text-center border-b">
                    <h1 className="text-2xl font-bold uppercase tracking-wide">Detalle del Estudiante</h1>
                </div>

                <div className="p-10">
                    <h2 className="text-xl font-bold border-b pb-2 mb-6 uppercase tracking-tight">Información General</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        <div className="bg-slate-50 p-4 border-l-4 border-slate-400 rounded">
                            <p className="text-xs font-bold mb-1">Nombre Completo</p>
                            <p className="text-xl font-bold text-slate-800">{estudiante.nombre_estudiante} {estudiante.apellido_estudiante}</p>
                        </div>
                        <div className="bg-slate-50 p-4 border-l-4 border-slate-400 rounded">
                            <p className="text-xs font-bold mb-1">Carrera Técnica</p>
                            <p className="text-xl font-bold text-slate-800">{carrera}</p>
                        </div>
                        <div className="bg-slate-50 p-4 border-l-4 border-slate-400 rounded">
                            <p className="text-xs font-bold mb-1">Bloque Asignado</p>
                            <p className="text-xl font-bold text-slate-800">{bloque}</p>
                        </div>
                        <div className="bg-slate-50 p-4 border-l-4 border-slate-400 rounded">
                            <p className="text-xs font-bold mb-1">Documento (DNI)</p>
                            <p className="text-xl font-bold text-slate-800">{estudiante.dni_estudiante}</p>
                        </div>
                        <div className="bg-slate-50 p-4 border-l-4 border-slate-400 rounded">
                            <p className="text-xs font-bold mb-1">ID Estudiante</p>
                            <p className="text-xl font-bold text-slate-800">{estudiante.id_estudiante}</p>
                        </div>
                        <div className="bg-slate-50 p-4 border-l-4 border-slate-400 rounded">
                            <p className="text-xs font-bold mb-1">Fecha de Registro</p>
                            <p className="text-sm font-bold text-slate-800">{estudiante.fecha_creacion ? new Date(estudiante.fecha_creacion).toLocaleString() : '---'}</p>
                        </div>
                        <div className="bg-slate-50 p-4 border-l-4 border-slate-400 rounded">
                            <p className="text-xs font-bold mb-1">Última Actualización</p>
                            <p className="text-sm font-bold text-slate-800">
                                {estudiante.fecha_actualizacion && estudiante.fecha_actualizacion !== estudiante.fecha_creacion
                                    ? new Date(estudiante.fecha_actualizacion).toLocaleString()
                                    : '---'}
                            </p>
                        </div>
                    </div>

                    <h2 className="text-xl font-bold text-slate-800 border-b pb-2 mb-6 uppercase tracking-tight">Rendimiento Académico</h2>
                    <Table>
                        <TableHeader className="bg-slate-100">
                            <TableRow>
                                <TableHead className="font-bold text-slate-800 uppercase text-xs">Materia / Curso</TableHead>
                                <TableHead className="font-bold text-slate-800 uppercase text-xs">Calificación</TableHead>
                                <TableHead className="font-bold text-slate-800 uppercase text-xs text-right">Estado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cursosCarrera.length > 0 ? (
                                cursosCarrera.map((curso, idx) => {
                                    const notaRegistrada = notas.find(n => n.id_curso == curso.id_curso);

                                    if (notaRegistrada) {
                                        const esAprobado = notaRegistrada.nota >= 10.5;
                                        return (
                                            <TableRow key={idx}>
                                                <TableCell className="font-medium">{curso.nombre_curso}</TableCell>
                                                <TableCell className={`font-bold ${esAprobado ? 'text-green-600' : 'text-red-600'}`}>
                                                    {notaRegistrada.nota}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <span className={`font-bold ${esAprobado ? 'text-green-600' : 'text-red-600'}`}>
                                                        {esAprobado ? 'Aprobado' : 'Desaprobado'}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    } else {
                                        return (
                                            <TableRow key={idx}>
                                                <TableCell className="font-medium text-gray-500">{curso.nombre_curso}</TableCell>
                                                <TableCell className="font-bold text-gray-400">--</TableCell>
                                                <TableCell className="text-right">
                                                    <span className="font-bold text-yellow-600">Pendiente</span>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    }
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center py-6 text-gray-500">
                                        No hay cursos registrados para la carrera técnica de este estudiante.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="p-6 bg-slate-50 border-t text-center">
                    <Button
                        variant="outline"
                        className="border-slate-300 font-bold transition-all px-10"
                        onClick={() => navigate("/estudiantes")}
                    >
                        Volver
                    </Button>
                </div>
            </div>
        </Layout>
    );
}
