import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre_usuario: "",
        email: "",
        pass: ""
    });
    const [loading, setLoading] = useState(false);
    const API_URL = "http://localhost:3000/api";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/usuario`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.success) {
                alert("Cuenta creada correctamente. Ahora puedes iniciar sesión.");
                navigate("/login");
            } else {
                alert("Error: " + data.error);
            }
        } catch (error) {
            console.error("Error al registrar:", error);
            alert("Error de conexión al servidor");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen w-full flex justify-center items-center bg-background">
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-4xl font-bold  tracking-tighter">SHENATI</h1>
                <h2 className="text-xl">Crear Cuenta Nueva</h2>
                <p className="text-sm text-muted-foreground ">Únete a nuestra familia Shenatina</p>
                <Card className="w-[350px] shadow-xl">
                    <CardHeader></CardHeader>
                    <CardContent className="space-y-4">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-sm mb-1">Usuario</h4>
                                <Input
                                    name="nombre_usuario"
                                    placeholder="Usuario"
                                    required
                                    value={formData.nombre_usuario}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm mb-1">Correo Electrónico</h4>
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="Correo electrónico"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm mb-1">Contraseña</h4>
                                <Input
                                    name="pass"
                                    type="password"
                                    placeholder="Contraseña"
                                    required
                                    value={formData.pass}
                                    onChange={handleChange}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full  hover:bg-[#9999] py-5 text-lg "
                                disabled={loading}
                            >
                                {loading ? "Registrando..." : "Crear Cuenta"}
                            </Button>
                        </form>
                        <div className="text-center pt-2">
                            <button
                                onClick={() => navigate("/login")}
                                className="text-sm text-slate-900 hover:underline"
                            >
                                ¿Ya tienes cuenta? Inicia sesión aquí
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
