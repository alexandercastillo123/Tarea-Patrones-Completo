import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/shared/Layout";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomModal from "@/components/shared/CustomModal";

export default function Bloques() {
    const [bloques, setBloques] = useState([]);
    const [profesores, setProfesores] = useState([]);
    const [carreras, setCarreras] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [currentBloque, setCurrentBloque] = useState({
        nombre_bloque: "",
        id_profesor: "",
        id_carrera: ""
    });
    const navigate = useNavigate();
    const API_URL = "http://localhost:3000/api";

    const cargarDatos = async () => {
        try {
            const [resB, resP, resC] = await Promise.all([
                fetch(`${API_URL}/bloques`),
                fetch(`${API_URL}/profesores`),
                fetch(`${API_URL}/carreras`)
            ]);
            const dataB = await resB.json();
            const dataP = await resP.json();
            const dataC = await resC.json();

            if (dataB.success) setBloques(dataB.data);
            if (dataP.success) setProfesores(dataP.data);
            if (dataC.success) setCarreras(dataC.data);
        } catch (error) {
            console.error("Error al cargar datos:", error);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const handleOpenModal = (mode, bloq = null) => {
        setModalMode(mode);
        if (bloq) {
            setCurrentBloque({
                id_bloque: bloq.id_bloque,
                nombre_bloque: bloq.nombre_bloque,
                id_profesor: bloq.id_profesor || "",
                id_carrera: bloq.id_carrera || ""
            });
        } else {
            setCurrentBloque({ nombre_bloque: "", id_profesor: "", id_carrera: "" });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const method = modalMode === "create" ? "POST" : "PUT";
        const url = modalMode === "create" ? `${API_URL}/bloques` : `${API_URL}/bloques/${currentBloque.id_bloque}`;

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "X-User-Name": localStorage.getItem("userName") || "Sistema"
                },
                body: JSON.stringify(currentBloque)
            });
            const result = await response.json();
            if (result.success) {
                setIsModalOpen(false);
                cargarDatos();
            } else {
                alert("Error: " + result.error);
            }
        } catch (error) {
            console.error("Error al guardar bloque:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("¿Está seguro de eliminar este bloque?")) return;
        try {
            const response = await fetch(`${API_URL}/bloques/${id}`, {
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
            console.error("Error al eliminar bloque:", error);
        }
    };

    const bloquesFiltrados = bloques.filter(bloq =>
        bloq.nombre_bloque.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-6">Bloques Shenati</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader><CardTitle>Total Bloques configurados</CardTitle></CardHeader>
                    <CardContent><p className="text-2xl font-bold">{bloques.length}</p></CardContent>
                </Card>
                <div className="flex items-end pb-2">
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleOpenModal("create")}
                    >
                        + Añadir nuevo Bloque
                    </Button>
                </div>
            </div>

            <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Panel de Bloques</h2>
                    <Input
                        placeholder="Buscar bloque..."
                        className="max-w-xs"
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                </div>

                <Table>
                    <TableCaption>Listado de bloques en Shenati</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Nombre Bloque</TableHead>
                            <TableHead>Tutor</TableHead>
                            <TableHead>Carrera</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bloquesFiltrados.length > 0 ? (
                            bloquesFiltrados.map((bloq) => (
                                <TableRow key={bloq.id_bloque}>
                                    <TableCell className="font-medium">{bloq.id_bloque}</TableCell>
                                    <TableCell>{bloq.nombre_bloque}</TableCell>
                                    <TableCell>{bloq.nombre_profesor || "N/A"}</TableCell>
                                    <TableCell>{bloq.nombre_carrera || "N/A"}</TableCell>
                                    <TableCell className="text-right flex gap-2 justify-end">
                                        <Button variant="outline" size="sm" onClick={() => navigate(`/detalle_bloque/${bloq.id_bloque}`)}>Ver Detalles</Button>
                                        <Button variant="outline" size="sm" onClick={() => handleOpenModal("edit", bloq)}>Editar</Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(bloq.id_bloque)}>Eliminar</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10 text-gray-400 ">No se encontraron bloques.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <CustomModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalMode === "create" ? "Registrar Nuevo Bloque" : "Editar Datos del Bloque"}
            >
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="text-xs font-bold mb-1 block text-slate-500 uppercase tracking-wider border-b pb-1">Nombre del Bloque</label>
                        <Input
                            value={currentBloque.nombre_bloque}
                            onChange={(e) => setCurrentBloque({ ...currentBloque, nombre_bloque: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold mb-1 block text-slate-500 uppercase tracking-wider border-b pb-1">Tutor Asignado</label>
                        <select
                            className="w-full p-2 border rounded-md focus:ring-1 focus:ring-slate-400 outline-none"
                            value={currentBloque.id_profesor}
                            onChange={(e) => setCurrentBloque({ ...currentBloque, id_profesor: e.target.value })}
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
                        <label className="text-xs font-bold mb-1 block text-slate-500 uppercase tracking-wider border-b pb-1">Carrera Relacionada</label>
                        <select
                            className="w-full p-2 border rounded-md focus:ring-1 focus:ring-slate-400 outline-none"
                            value={currentBloque.id_carrera}
                            onChange={(e) => setCurrentBloque({ ...currentBloque, id_carrera: e.target.value })}
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
