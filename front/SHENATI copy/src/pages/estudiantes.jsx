import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/shared/Layout";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomModal from "@/components/shared/CustomModal";

export default function Estudiantes() {
    const [estudiantes, setEstudiantes] = useState([]);
    const [carreras, setCarreras] = useState([]);
    const [dataBloques, setDataBloques] = useState([]);
    const [bloquesFiltrados, setBloquesFiltrados] = useState([]);
    const [bloquesMap, setBloquesMap] = useState({});
    const [filtro, setFiltro] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [currentEstudiante, setCurrentEstudiante] = useState({
        nombre_estudiante: "",
        apellido_estudiante: "",
        dni_estudiante: "",
        id_carrera: "",
        id_bloque: ""
    });
    const navigate = useNavigate();
    const API_URL = "http://localhost:3000/api";

    const cargarDatos = async () => {
        try {
            const [resEst, resCar, resBloques] = await Promise.all([
                fetch(`${API_URL}/estudiantes`),
                fetch(`${API_URL}/carreras`),
                fetch(`${API_URL}/bloques`)
            ]);
            const dataEst = await resEst.json();
            const dataCar = await resCar.json();
            const dataBloq = await resBloques.json();

            if (dataEst.success) setEstudiantes(dataEst.data);
            if (dataCar.success) setCarreras(dataCar.data);
            if (dataBloq.success) {
                setDataBloques(dataBloq.data);
                const mapBloques = {};
                dataBloq.data.forEach(b => { mapBloques[b.id_bloque] = b.nombre_bloque; });
                setBloquesMap(mapBloques);
            }
        } catch (error) {
            console.error("Error al cargar datos:", error);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    useEffect(() => {
        if (currentEstudiante.id_carrera) {
            const filtrados = dataBloques.filter(b => b.id_carrera == currentEstudiante.id_carrera);
            setBloquesFiltrados(filtrados);
        } else {
            setBloquesFiltrados([]);
        }
    }, [currentEstudiante.id_carrera, dataBloques]);

    const handleOpenModal = (mode, est = null) => {
        setModalMode(mode);
        if (est) {
            setCurrentEstudiante(est);
        } else {
            setCurrentEstudiante({
                nombre_estudiante: "",
                apellido_estudiante: "",
                dni_estudiante: "",
                id_carrera: "",
                id_bloque: ""
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const userObj = JSON.parse(localStorage.getItem("user") || "{}");
        const userName = userObj.nombre_usuario || "Sistema";

        const method = modalMode === "create" ? "POST" : "PUT";
        const url = modalMode === "create" ? `${API_URL}/estudiantes` : `${API_URL}/estudiantes/${currentEstudiante.id_estudiante}`;

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "X-User-Name": userName
                },
                body: JSON.stringify(currentEstudiante)
            });
            const result = await response.json();
            if (result.success) {
                setIsModalOpen(false);
                cargarDatos();
            } else {
                alert("Error: " + result.error);
            }
        } catch (error) {
            console.error("Error al guardar estudiante:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("¿Está seguro de eliminar este estudiante?")) return;
        const userObj = JSON.parse(localStorage.getItem("user") || "{}");
        const userName = userObj.nombre_usuario || "Sistema";

        try {
            const response = await fetch(`${API_URL}/estudiantes/${id}`, {
                method: "DELETE",
                headers: { "X-User-Name": userName }
            });
            const result = await response.json();
            if (result.success) {
                cargarDatos();
            } else {
                alert("Error: " + result.error);
            }
        } catch (error) {
            console.error("Error al eliminar estudiante:", error);
        }
    };

    const estudiantesFiltrados = estudiantes.filter(est =>
        est.nombre_estudiante.toLowerCase().includes(filtro.toLowerCase()) ||
        est.apellido_estudiante.toLowerCase().includes(filtro.toLowerCase()) ||
        est.dni_estudiante.includes(filtro)
    );

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-6">Estudiantes Shenati</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader><CardTitle>Total Estudiantes</CardTitle></CardHeader>
                    <CardContent><p className="text-2xl font-bold">{estudiantes.length}</p></CardContent>
                </Card>
                <div className="flex items-end pb-2">
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleOpenModal("create")}
                    >
                        + Añadir nuevo Estudiante
                    </Button>
                </div>
            </div>

            <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Listado de Estudiantes</h2>
                    <Input
                        placeholder="Buscar por nombre o DNI..."
                        className="max-w-xs"
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                </div>

                <Table>
                    <TableCaption>Listado de estudiantes en Shenati</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Nombres y Apellidos</TableHead>
                            <TableHead>DNI</TableHead>
                            <TableHead>Bloque</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {estudiantesFiltrados.length > 0 ? (
                            estudiantesFiltrados.map((est) => (
                                <TableRow key={est.id_estudiante}>
                                    <TableCell className="font-medium">{est.id_estudiante}</TableCell>
                                    <TableCell>{est.nombre_estudiante} {est.apellido_estudiante}</TableCell>
                                    <TableCell>{est.dni_estudiante}</TableCell>
                                    <TableCell>{bloquesMap[est.id_bloque] || "N/A"}</TableCell>
                                    <TableCell className="text-right flex gap-2 justify-end">
                                        <Button variant="outline" size="sm" onClick={() => navigate(`/detalle_estudiante/${est.id_estudiante}`)}>Ver Detalles</Button>
                                        <Button variant="outline" size="sm" onClick={() => handleOpenModal("edit", est)}>Editar</Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(est.id_estudiante)}>Eliminar</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-10 text-gray-400">No se encontraron estudiantes.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <CustomModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalMode === "create" ? "Registrar Nuevo Estudiante" : "Editar Datos del Estudiante"}
            >
                <form onSubmit={handleSave} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold mb-1 block text-slate-500 uppercase tracking-wider border-b pb-1">Nombre Completo</label>
                            <Input
                                value={currentEstudiante.nombre_estudiante}
                                onChange={(e) => setCurrentEstudiante({ ...currentEstudiante, nombre_estudiante: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold mb-1 block text-slate-500 uppercase tracking-wider border-b pb-1">Apellidos</label>
                            <Input
                                value={currentEstudiante.apellido_estudiante}
                                onChange={(e) => setCurrentEstudiante({ ...currentEstudiante, apellido_estudiante: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold mb-1 block text-slate-500 uppercase tracking-wider border-b pb-1">DNI</label>
                        <Input
                            value={currentEstudiante.dni_estudiante}
                            onChange={(e) => setCurrentEstudiante({ ...currentEstudiante, dni_estudiante: e.target.value })}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold mb-1 block text-slate-500 uppercase tracking-wider border-b pb-1">Especialidad / Carrera</label>
                            <select
                                className="w-full p-2 border rounded-md focus:ring-1 focus:ring-slate-400 outline-none"
                                value={currentEstudiante.id_carrera}
                                onChange={(e) => setCurrentEstudiante({ ...currentEstudiante, id_carrera: e.target.value, id_bloque: "" })}
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
                        <div>
                            <label className="text-xs font-bold mb-1 block text-slate-500 uppercase tracking-wider border-b pb-1">Bloque</label>
                            <select
                                className="w-full p-2 border rounded-md focus:ring-1 focus:ring-slate-400 outline-none disabled:bg-slate-100 disabled:cursor-not-allowed"
                                value={currentEstudiante.id_bloque}
                                onChange={(e) => setCurrentEstudiante({ ...currentEstudiante, id_bloque: e.target.value })}
                                required
                                disabled={!currentEstudiante.id_carrera}
                            >
                                <option value="">Seleccione un bloque</option>
                                {bloquesFiltrados.map(b => (
                                    <option key={b.id_bloque} value={b.id_bloque}>
                                        {b.nombre_bloque}
                                    </option>
                                ))}
                            </select>
                        </div>
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
