import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/shared/Layout";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomModal from "@/components/shared/CustomModal";

export default function Cursos() {
    const [cursos, setCursos] = useState([]);
    const [profesores, setProfesores] = useState([]);
    const [carreras, setCarreras] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [currentCurso, setCurrentCurso] = useState({
        nombre_curso: "",
        id_profesor: "",
        id_carrera: ""
    });
    const navigate = useNavigate();
    const API_URL = "http://localhost:3000/api";

    const cargarDatos = async () => {
        try {
            const [resCur, resProf, resCar] = await Promise.all([
                fetch(`${API_URL}/cursos`),
                fetch(`${API_URL}/profesores`),
                fetch(`${API_URL}/carreras`)
            ]);
            const dataCur = await resCur.json();
            const dataProf = await resProf.json();
            const dataCar = await resCar.json();

            if (dataCur.success) setCursos(dataCur.data);
            if (dataProf.success) setProfesores(dataProf.data);
            if (dataCar.success) setCarreras(dataCar.data);
        } catch (error) {
            console.error("Error al cargar datos:", error);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const handleOpenModal = (mode, cur = null) => {
        setModalMode(mode);
        if (cur) {
            setCurrentCurso({
                id_curso: cur.id_curso,
                nombre_curso: cur.nombre_curso,
                id_profesor: cur.id_profesor || "",
                id_carrera: cur.id_carrera || ""
            });
        } else {
            setCurrentCurso({
                nombre_curso: "",
                id_profesor: "",
                id_carrera: ""
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const method = modalMode === "create" ? "POST" : "PUT";
        const url = modalMode === "create" ? `${API_URL}/cursos` : `${API_URL}/cursos/${currentCurso.id_curso}`;

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "X-User-Name": localStorage.getItem("userName") || "Sistema"
                },
                body: JSON.stringify(currentCurso)
            });
            const result = await response.json();
            if (result.success) {
                setIsModalOpen(false);
                cargarDatos();
            } else {
                alert("Error: " + result.error);
            }
        } catch (error) {
            console.error("Error al guardar curso:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("¿Está seguro de eliminar este curso?")) return;
        try {
            const response = await fetch(`${API_URL}/cursos/${id}`, {
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
            console.error("Error al eliminar curso:", error);
        }
    };

    const cursosFiltrados = cursos.filter(cur =>
        cur.nombre_curso.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-6">Cursos Shenati</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader><CardTitle>Total Cursos Ofertados</CardTitle></CardHeader>
                    <CardContent><p className="text-2xl font-bold">{cursos.length}</p></CardContent>
                </Card>
                <div className="flex items-end pb-2">
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleOpenModal("create")}
                    >
                        + Añadir nuevo Curso
                    </Button>
                </div>
            </div>

            <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Panel de Cursos</h2>
                    <Input
                        placeholder="Buscar curso por nombre..."
                        className="max-w-xs"
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                </div>

                <Table>
                    <TableCaption>Listado de cursos en Shenati</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Nombre del Curso</TableHead>
                            <TableHead>Carrera</TableHead>
                            <TableHead>Docente</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cursosFiltrados.length > 0 ? (
                            cursosFiltrados.map((cur) => (
                                <TableRow key={cur.id_curso}>
                                    <TableCell className="font-medium">{cur.id_curso}</TableCell>
                                    <TableCell>{cur.nombre_curso}</TableCell>
                                    <TableCell>{cur.nombre_carrera || "N/A"}</TableCell>
                                    <TableCell>{cur.nombre_profesor || "N/A"}</TableCell>
                                    <TableCell className="text-right flex gap-2 justify-end">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => navigate(`/detalle_curso/${cur.id_curso}`)}
                                        >
                                            Ver Detalles
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleOpenModal("edit", cur)}>Editar</Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(cur.id_curso)}>Eliminar</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10 text-gray-400">No se encontraron cursos.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <CustomModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalMode === "create" ? "Registrar Nuevo Curso" : "Editar Datos del Curso"}
            >
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="text-xs font-bold mb-1 block text-slate-500 uppercase tracking-wider border-b pb-1">Nombre del Curso</label>
                        <Input
                            value={currentCurso.nombre_curso}
                            onChange={(e) => setCurrentCurso({ ...currentCurso, nombre_curso: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold mb-1 block text-slate-500 uppercase tracking-wider border-b pb-1">Docente Asignado</label>
                        <select
                            className="w-full p-2 border rounded-md focus:ring-1 focus:ring-slate-400 outline-none"
                            value={currentCurso.id_profesor}
                            onChange={(e) => setCurrentCurso({ ...currentCurso, id_profesor: e.target.value })}
                            required
                        >
                            <option value="">Seleccione un profesor</option>
                            {profesores.map(prof => (
                                <option key={prof.id_profesor} value={prof.id_profesor}>
                                    {prof.nombre_profesor}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-bold mb-1 block text-slate-500 uppercase tracking-wider border-b pb-1">Carrera</label>
                        <select
                            className="w-full p-2 border rounded-md focus:ring-1 focus:ring-slate-400 outline-none"
                            value={currentCurso.id_carrera}
                            onChange={(e) => setCurrentCurso({ ...currentCurso, id_carrera: e.target.value })}
                            required
                        >
                            <option value="">Seleccione una carrera</option>
                            {carreras.map(car => (
                                <option key={car.id_carrera} value={car.id_carrera}>
                                    {car.nombre_carrera}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex gap-4 pt-4">
                        <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                        <Button type="submit" className="flex-1 bg-slate-900 hover:bg-slate-800 font-bold">
                            {modalMode === "create" ? "Guardar" : "Actualizar"}
                        </Button>
                    </div>
                </form>
            </CustomModal>
        </Layout>
    );
}
