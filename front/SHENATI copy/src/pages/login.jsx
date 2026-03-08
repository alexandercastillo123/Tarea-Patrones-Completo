import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuario, pass })
            });

            const json = await res.json();
            if (json.success) {
                localStorage.setItem("user", JSON.stringify(json.data));
                navigate("/dashboard");
            } else {
                setError(json.mensaje || "Credenciales inválidas");
            }
        } catch (err) {
            setError("Error de conexión con el servidor");
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen w-full flex justify-center items-center bg-background">
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-4xl font-bold">SHENATI</h1>
                <h5 className="text-xl ">Bienvenido</h5>
                <h6 className="text-sm text-muted-foreground">Inicia sesión para continuar</h6>

                <Card className="w-[350px] shadow-xl border-none">
                    <CardHeader>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-sm mb-1">Usuario</h4>
                                <Input
                                    placeholder="Nombre de usuario o email"
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm mb-1">Contraseña</h4>
                                <Input
                                    type="password"
                                    placeholder="Contraseña"
                                    value={pass}
                                    onChange={(e) => setPass(e.target.value)}
                                    required
                                />
                            </div>

                            {error && <p className="text-red-500 text-xs text-center font-medium bg-red-50 p-2 rounded">{error}</p>}

                            <Button
                                type="submit"
                                className="w-full  hover:bg-[#9999] py-5 text-lg "
                                disabled={loading}
                            >
                                {loading ? "Iniciando..." : "Iniciar sesión"}
                            </Button>
                        </form>
                        <div className="text-center pt-2">
                            <button
                                onClick={() => navigate("/register")}
                                className="text-sm text-[#003366] hover:underline"
                            >
                                ¿No tienes cuenta? Regístrate aquí
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
