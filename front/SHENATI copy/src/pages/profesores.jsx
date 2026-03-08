import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/shared/Layout";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomModal from "@/components/shared/CustomModal";

export default function Profesores() {
    const [profesores, setProfesores] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [currentProfesor, setCurrentProfesor] = useState({ nombre_profesor: "", especialidad: "" });
    const navigate = useNavigate();
    const API_URL = "http://localhost:3000/api";

    const cargarProfesores = async () => {
        try {
            const response = await fetch(`${API_URL}/profesores`);
            const result = await response.json();
            if (result.success) {
                setProfesores(result.data);
            }
        } catch (error) {
            console.error("Error al cargar profesores:", error);
        }
    };

    useEffect(() => {
        cargarProfesores();
    }, []);

    const handleOpenModal = (mode, prof = { nombre_profesor: "", especialidad: "" }) => {
        setModalMode(mode);
        setCurrentProfesor(prof);
        setIsModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const method = modalMode === "create" ? "POST" : "PUT";
        const url = modalMode === "create" ? `${API_URL}/profesores` : `${API_URL}/profesores/${currentProfesor.id_profesor}`;

        const userObj = JSON.parse(localStorage.getItem("user") || "{}");
        const userName = userObj.nombre_usuario || "Sistema";

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "X-User-Name": userName
                },
                body: JSON.stringify(currentProfesor)
            });
            const result = await response.json();
            if (result.success) {
                setIsModalOpen(false);
                cargarProfesores();
            } else {
                alert("Error: " + result.error);
            }
        } catch (error) {
            console.error("Error al guardar profesor:", error);
        }
    };

    const handleDelete = async (id) => {
        const userObj = JSON.parse(localStorage.getItem("user") || "{}");
        const userName = userObj.nombre_usuario || "Sistema";

        try {
            const response = await fetch(`${API_URL}/profesores/${id}`, {
                method: "DELETE",
                headers: { "X-User-Name": userName }
            });
            const result = await response.json();
            if (result.success) {
                cargarProfesores();
            } else {
                alert("Error: " + result.error);
            }
        } catch (error) {
            console.error("Error al eliminar profesor:", error);
        }
    };

    const profesoresFiltrados = profesores.filter(prof =>
        prof.nombre_profesor.toLowerCase().includes(filtro.toLowerCase()) ||
        (prof.especialidad && prof.especialidad.toLowerCase().includes(filtro.toLowerCase()))
    );

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-6">Profesores Shenati</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader><CardTitle>Total Docentes</CardTitle></CardHeader>
                    <CardContent><p className="text-2xl font-bold">{profesores.length}</p></CardContent>
                </Card>
                <div className="flex items-end pb-2">
                    <Button
                        variant="outline"
                        className="w-full "
                        onClick={() => handleOpenModal("create")}
                    >
                        + Añadir nuevo Profesor
                    </Button>
                </div>
            </div>

            <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Panel de Profesores</h2>
                    <Input
                        placeholder="Buscar por nombre o especialidad..."
                        className="max-w-xs"
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                </div>

                <Table>
                    <TableCaption>Listado de profesores en Shenati</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Nombres y Apellidos</TableHead>
                            <TableHead>Especialidad</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {profesoresFiltrados.length > 0 ? (
                            profesoresFiltrados.map((prof) => (
                                <TableRow key={prof.id_profesor}>
                                    <TableCell className="font-medium">{prof.id_profesor}</TableCell>
                                    <TableCell>{prof.nombre_profesor}</TableCell>
                                    <TableCell>{prof.especialidad || "N/A"}</TableCell>
                                    <TableCell className="text-right flex gap-2 justify-end">
                                        <Button variant="outline" size="sm" onClick={() => navigate(`/detalle_profesor/${prof.id_profesor}`)}>Ver Detalles</Button>
                                        <Button variant="outline" size="sm" onClick={() => handleOpenModal("edit", prof)}>Editar</Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(prof.id_profesor)}>Eliminar</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-10 text-gray-400">No se encontraron profesores.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <CustomModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalMode === "create" ? "Registrar Nuevo Profesor" : "Editar Datos del Profesor"}
            >
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="text-xs font-bold mb-1 block text-slate-500 uppercase tracking-wider border-b pb-1">Nombres y Apellidos</label>
                        <Input
                            className="focus:ring-1 focus:ring-slate-400 outline-none"
                            value={currentProfesor.nombre_profesor}
                            onChange={(e) => setCurrentProfesor({ ...currentProfesor, nombre_profesor: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold mb-1 block text-slate-500 uppercase tracking-wider border-b pb-1">Especialidad</label>
                        <Input
                            className="focus:ring-1 focus:ring-slate-400 outline-none"
                            value={currentProfesor.especialidad}
                            onChange={(e) => setCurrentProfesor({ ...currentProfesor, especialidad: e.target.value })}
                            required
                        />
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
