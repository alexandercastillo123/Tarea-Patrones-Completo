import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/shared/Layout";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomModal from "@/components/shared/CustomModal";

export default function Carreras() {
    const [carreras, setCarreras] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [currentCarrera, setCurrentCarrera] = useState({
        nombre_carrera: ""
    });
    const navigate = useNavigate();
    const API_URL = "http://localhost:3000/api";

    const cargarCarreras = async () => {
        try {
            const response = await fetch(`${API_URL}/carreras`);
            const result = await response.json();
            if (result.success) {
                setCarreras(result.data);
            }
        } catch (error) {
            console.error("Error al cargar carreras:", error);
        }
    };

    useEffect(() => {
        cargarCarreras();
    }, []);

    const handleOpenModal = (mode, car = null) => {
        setModalMode(mode);
        if (car) {
            setCurrentCarrera(car);
        } else {
            setCurrentCarrera({ nombre_carrera: "" });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const method = modalMode === "create" ? "POST" : "PUT";
        const url = modalMode === "create" ? `${API_URL}/carreras` : `${API_URL}/carreras/${currentCarrera.id_carrera}`;

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "X-User-Name": localStorage.getItem("userName") || "Sistema"
                },
                body: JSON.stringify(currentCarrera)
            });
            const result = await response.json();
            if (result.success) {
                setIsModalOpen(false);
                cargarCarreras();
            } else {
                alert("Error: " + result.error);
            }
        } catch (error) {
            console.error("Error al guardar carrera:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("¿Está seguro de eliminar esta carrera?")) return;
        try {
            const response = await fetch(`${API_URL}/carreras/${id}`, {
                method: "DELETE",
                headers: {
                    "X-User-Name": localStorage.getItem("userName") || "Sistema"
                }
            });
            const result = await response.json();
            if (result.success) {
                cargarCarreras();
            } else {
                alert("Error: " + result.error);
            }
        } catch (error) {
            console.error("Error al eliminar carrera:", error);
        }
    };

    const carrerasFiltrados = carreras.filter(car =>
        car.nombre_carrera.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-6">Carreras Shenati</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader><CardTitle>Total Especialidades</CardTitle></CardHeader>
                    <CardContent><p className="text-2xl font-bold">{carreras.length}</p></CardContent>
                </Card>
                <div className="flex items-end pb-2">
                    <Button
                        variant="outline"
                        className="w-full "
                        onClick={() => handleOpenModal("create")}
                    >
                        + Añadir nueva Carrera
                    </Button>
                </div>
            </div>

            <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Listado de Carreras</h2>
                    <Input
                        placeholder="Buscar carrera..."
                        className="max-w-xs"
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                </div>

                <Table>
                    <TableCaption>Listado de carreras en Shenati</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Nombre de la Carrera</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {carrerasFiltrados.length > 0 ? (
                            carrerasFiltrados.map((car) => (
                                <TableRow key={car.id_carrera}>
                                    <TableCell className="font-medium">{car.id_carrera}</TableCell>
                                    <TableCell>{car.nombre_carrera}</TableCell>
                                    <TableCell className="text-right flex gap-2 justify-end">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => navigate(`/detalle_carrera/${car.id_carrera}`)}
                                        >
                                            Ver Detalles
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleOpenModal("edit", car)}>Editar</Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(car.id_carrera)}>Eliminar</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center py-10 text-gray-400">No se encontraron carreras.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <CustomModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalMode === "create" ? "Registrar Nueva Carrera" : "Editar Datos de la Carrera"}
            >
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="text-xs font-bold mb-1 block text-slate-500 uppercase tracking-wider border-b pb-1">Nombre de la Carrera</label>
                        <Input
                            value={currentCarrera.nombre_carrera}
                            onChange={(e) => setCurrentCarrera({ ...currentCarrera, nombre_carrera: e.target.value })}
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
