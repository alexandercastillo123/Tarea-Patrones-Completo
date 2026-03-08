import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Layout({ children }) {
    return (
        <div className="flex min-h-screen">
            <aside className="w-64 border-r bg-slate-50 p-6 flex flex-col gap-3">
                <h2 className="font-bold text-2xl mb-6 tracking-tight">SHENATI</h2>
                <nav className="flex flex-col gap-1">
                    <Button variant="ghost" className="justify-start text-slate-600 hover:text-slate-900" asChild><Link to="/dashboard">Inicio</Link></Button>
                    <Button variant="ghost" className="justify-start text-slate-600 hover:text-slate-900" asChild><Link to="/estudiantes">Estudiantes</Link></Button>
                    <Button variant="ghost" className="justify-start text-slate-600 hover:text-slate-900" asChild><Link to="/profesores">Profesores</Link></Button>
                    <Button variant="ghost" className="justify-start text-slate-600 hover:text-slate-900" asChild><Link to="/cursos">Cursos</Link></Button>
                    <Button variant="ghost" className="justify-start text-slate-600 hover:text-slate-900" asChild><Link to="/bloques">Bloques</Link></Button>
                    <Button variant="ghost" className="justify-start text-slate-600 hover:text-slate-900" asChild><Link to="/carreras">Carreras</Link></Button>
                    <Button variant="ghost" className="justify-start text-slate-600 hover:text-slate-900" asChild><Link to="/notas">Notas</Link></Button>
                    <Button variant="ghost" className="justify-start text-slate-600 hover:text-slate-900" asChild><Link to="/historial">Historial</Link></Button>
                    <Button variant="ghost" className="justify-start text-red-500 hover:text-red-700 hover:bg-red-50" asChild><Link to="/login">Cerrar Sesión</Link></Button>
                </nav>
            </aside>

            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}