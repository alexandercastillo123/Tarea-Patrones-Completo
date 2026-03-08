import { useState, useEffect } from "react";
import Layout from "@/components/shared/Layout";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomModal from "@/components/shared/CustomModal";

export default function Notas() {
    const [notas, setNotas] = useState([]);
    const [dataEstudiantes, setDataEstudiantes] = useState([]);
    const [dataCursos, setDataCursos] = useState([]);
    const [cursosFiltrados, setCursosFiltrados] = useState([]);
    const [estudiantesMap, setEstudiantesMap] = useState({});
    const [cursosMap, setCursosMap] = useState({});
    const [filtro, setFiltro] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [currentNota, setCurrentNota] = useState({
        id_estudiante: "",
        id_curso: "",
        nota: ""
    });
    const API_URL = "http://localhost:3000/api";

    const cargarDatos = async () => {
        try {
            const [resN, resE, resC] = await Promise.all([
                fetch(`${API_URL}/notas`),
                fetch(`${API_URL}/estudiantes`),
                fetch(`${API_URL}/cursos`)
            ]);

            const dataN = await resN.json();
            const dataE = await resE.json();
            const dataC = await resC.json();

            if (dataN.success) setNotas(dataN.data);

            if (dataE.success) {
                setDataEstudiantes(dataE.data);
                const eMap = {};
                dataE.data.forEach(e => {
                    eMap[e.id_estudiante] = {
                        nombre: `${e.nombre_estudiante} ${e.apellido_estudiante}`,
                        id_carrera: e.id_carrera
                    };
                });
                setEstudiantesMap(eMap);
            }

            if (dataC.success) {
                setDataCursos(dataC.data);
                const cMap = {};
                dataC.data.forEach(c => {
                    cMap[c.id_curso] = c.nombre_curso;
                });
                setCursosMap(cMap);
            }
        } catch (error) {
            console.error("Error al cargar notas:", error);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    useEffect(() => {
        if (currentNota.id_estudiante && estudiantesMap[currentNota.id_estudiante]) {
            const idCarrera = estudiantesMap[currentNota.id_estudiante].id_carrera;
            const filtrados = dataCursos.filter(c => c.id_carrera == idCarrera);
            setCursosFiltrados(filtrados);
        } else {
            setCursosFiltrados([]);
        }
    }, [currentNota.id_estudiante, dataCursos, estudiantesMap]);

    const handleOpenModal = (mode, nota = null) => {
        setModalMode(mode);
        if (nota) {
            setCurrentNota({
                id_nota: nota.id_nota,
                id_estudiante: nota.id_estudiante,
                id_curso: nota.id_curso,
                nota: nota.nota
            });
        } else {
            setCurrentNota({ id_estudiante: "", id_curso: "", nota: "" });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const method = modalMode === "create" ? "POST" : "PUT";
        const url = modalMode === "create" ? `${API_URL}/notas` : `${API_URL}/notas/${currentNota.id_nota}`;

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "X-User-Name": localStorage.getItem("userName") || "Sistema"
                },
                body: JSON.stringify(currentNota)
            });
            const result = await response.json();
            if (result.success) {
                setIsModalOpen(false);
                cargarDatos();
            } else {
                alert("Error: " + result.error);
            }
        } catch (error) {
            console.error("Error al guardar nota:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("¿Está seguro de eliminar esta calificación?")) return;
        try {
            const response = await fetch(`${API_URL}/notas/${id}`, {
                method: "DELETE",
                headers: {
                    "X-User-Name": localStorage.getItem("userName") || "Sistema"
                }
            });
            const result = await response.json();
            if (result.success) {
                cargarDatos();
            } else {
                alert("Error: " + result.error);
            }
        } catch (error) {
            console.error("Error al eliminar nota:", error);
        }
    };

    const notasFiltradas = notas.filter(n => {
        const estInfo = estudiantesMap[n.id_estudiante];
        const nombreEst = estInfo ? estInfo.nombre.toLowerCase() : "";
        const nombreCur = (cursosMap[n.id_curso] || "").toLowerCase();
        return nombreEst.includes(filtro.toLowerCase()) || nombreCur.includes(filtro.toLowerCase());
    });

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-6">Gestión de Notas SHENATI</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader><CardTitle className="text-sm font-semibold text-gray-500 uppercase">Notas Registradas</CardTitle></CardHeader>
                    <CardContent><p className="text-3xl font-bold">{notas.length}</p></CardContent>
                </Card>
                <div className="flex items-end pb-2">
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleOpenModal("create")}
                    >
                        + Registrar Nota
                    </Button>
                </div>
            </div>

            <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Listado de Notas</h2>
                    <Input
                        placeholder="Buscar por estudiante o curso..."
                        className="max-w-xs"
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                </div>

                <Table>
                    <TableCaption>Listado de calificaciones en Shenati</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Estudiante</TableHead>
                            <TableHead>Curso</TableHead>
                            <TableHead>Nota</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {notasFiltradas.length > 0 ? (
                            notasFiltradas.map((n) => (
                                <TableRow key={n.id_nota}>
                                    <TableCell className="font-medium">{n.id_nota}</TableCell>
                                    <TableCell>{estudiantesMap[n.id_estudiante]?.nombre || "N/A"}</TableCell>
                                    <TableCell>{cursosMap[n.id_curso] || "N/A"}</TableCell>
                                    <TableCell>
                                        <span className={`font-bold ${parseFloat(n.nota) >= 11.5 ? 'text-green-600' : 'text-red-600'}`}>
                                            {n.nota}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right flex gap-2 justify-end">
                                        <Button variant="outline" size="sm" onClick={() => handleOpenModal("edit", n)}>Editar</Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(n.id_nota)}>Eliminar</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10 text-gray-400">No se encontraron calificaciones.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <CustomModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalMode === "create" ? "Registrar Calificación" : "Editar Calificación"}
            >
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="text-xs font-bold mb-1 block text-slate-500 uppercase tracking-wider border-b pb-1">Seleccionar Estudiante</label>
                        <select
                            className="w-full p-2 border rounded-md focus:ring-1 focus:ring-slate-400 outline-none"
                            value={currentNota.id_estudiante}
                            onChange={(e) => setCurrentNota({ ...currentNota, id_estudiante: e.target.value })}
                            required
                        >
                            <option value="">-- Eliga un estudiante --</option>
                            {dataEstudiantes.map(est => (
                                <option key={est.id_estudiante} value={est.id_estudiante}>
                                    {est.nombre_estudiante} {est.apellido_estudiante} (DNI: {est.dni_estudiante})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-bold mb-1 block text-slate-500 uppercase tracking-wider border-b pb-1">Seleccionar Curso</label>
                        <select
                            className="w-full p-2 border rounded-md focus:ring-1 focus:ring-slate-400 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                            value={currentNota.id_curso}
                            onChange={(e) => setCurrentNota({ ...currentNota, id_curso: e.target.value })}
                            required
                            disabled={!currentNota.id_estudiante}
                        >
                            <option value="">{currentNota.id_estudiante ? "-- Eliga un curso --" : "Primero seleccione un estudiante"}</option>
                            {cursosFiltrados.map(cur => (
                                <option key={cur.id_curso} value={cur.id_curso}>
                                    {cur.nombre_curso}
                                </option>
                            ))}
                        </select>
                        {currentNota.id_estudiante && cursosFiltrados.length === 0 && (
                            <p className="text-xs text-red-500 mt-1">No hay cursos registrados para la carrera de este estudiante.</p>
                        )}
                    </div>
                    <div>
                        <label className="text-xs font-bold mb-1 block text-slate-500 uppercase tracking-wider border-b pb-1">Calificación Obtenida (0-20)</label>
                        <Input
                            type="number"
                            step="0.1"
                            min="0"
                            max="20"
                            className="text-lg font-bold"
                            value={currentNota.nota}
                            onChange={(e) => setCurrentNota({ ...currentNota, nota: e.target.value })}
                            required
                        />
                    </div>
                    <div className="flex gap-4 pt-4">
                        <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                        <Button type="submit" className="flex-1 bg-slate-900 hover:bg-slate-800 font-bold">
                            {modalMode === "create" ? "Grabar Nota" : "Actualizar Nota"}
                        </Button>
                    </div>
                </form>
            </CustomModal>
        </Layout>
    );
}
