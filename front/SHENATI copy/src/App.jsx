import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Estudiantes from "./pages/estudiantes";
import Profesores from "./pages/profesores";
import Cursos from "./pages/cursos";
import Bloques from "./pages/bloques";
import Carreras from "./pages/carreras";
import Notas from "./pages/notas";
import DetalleEstudiantes from "./pages/detalles/detalleEstudiantes";
import DetalleCarrera from "./pages/detalles/detalleCarrera";
import DetalleBloque from "./pages/detalles/detalleBloque";
import DetalleCurso from "./pages/detalles/detalleCurso";
import DetalleProfesor from "./pages/detalles/detalleProfesor";
import Register from "./pages/register";
import Historial from "./pages/historial";
import DetalleHistorial from "./pages/detalles/detalleHistorial";
import ProtectedRoute from "./components/shared/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/estudiantes" element={<ProtectedRoute><Estudiantes /></ProtectedRoute>} />
        <Route path="/profesores" element={<ProtectedRoute><Profesores /></ProtectedRoute>} />
        <Route path="/cursos" element={<ProtectedRoute><Cursos /></ProtectedRoute>} />
        <Route path="/bloques" element={<ProtectedRoute><Bloques /></ProtectedRoute>} />
        <Route path="/carreras" element={<ProtectedRoute><Carreras /></ProtectedRoute>} />
        <Route path="/notas" element={<ProtectedRoute><Notas /></ProtectedRoute>} />
        <Route path="/historial" element={<ProtectedRoute><Historial /></ProtectedRoute>} />
        <Route path="/detalle_estudiante/:id" element={<ProtectedRoute><DetalleEstudiantes /></ProtectedRoute>} />
        <Route path="/detalle_carrera/:id" element={<ProtectedRoute><DetalleCarrera /></ProtectedRoute>} />
        <Route path="/detalle_bloque/:id" element={<ProtectedRoute><DetalleBloque /></ProtectedRoute>} />
        <Route path="/detalle_curso/:id" element={<ProtectedRoute><DetalleCurso /></ProtectedRoute>} />
        <Route path="/detalle_profesor/:id" element={<ProtectedRoute><DetalleProfesor /></ProtectedRoute>} />
        <Route path="/detalle_historial/:id" element={<ProtectedRoute><DetalleHistorial /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}