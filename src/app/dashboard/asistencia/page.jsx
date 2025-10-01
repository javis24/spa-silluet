"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AsistenciaPage() {
  const [registros, setRegistros] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [usuarios, setUsuarios] = useState([]); // 🔹 usuarios filtrados

  useEffect(() => {
    fetchRegistros();
    fetchUsuarios();
  }, []);

  const fetchRegistros = async () => {
    const res = await fetch(`/api/asistencia`);
    const data = await res.json();
    setRegistros(Array.isArray(data) ? data : []);
  };

  const fetchUsuarios = async () => {
    const res = await fetch(`/api/users`);
    const data = await res.json();
    // 🔹 filtrar solo admin y secretary
    const filtrados = (data.users || []).filter(
      (u) => u.role === "admin" || u.role === "secretary"
    );
    setUsuarios(filtrados);
  };

  const marcarAsistencia = async () => {
    if (!userId) {
      alert("Debes seleccionar un usuario");
      return;
    }
    const res = await fetch("/api/asistencia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    const data = await res.json();
    alert(data.message);
    setShowModal(false);
    setUserId("");
    fetchRegistros();
  };
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-purple-200 p-6">
       <button
                onClick={() => router.push("/dashboard")}
                className="mb-4 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-800 text-sm sm:text-base"
              >
                ← Volver al inicio
              </button>
      <h1 className="text-2xl font-bold text-pink-600 mb-6">Registro de Asistencia</h1>
      

      <button
        onClick={() => setShowModal(true)}
        className="px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
      >
        Marcar Asistencia
      </button>

      {/* Tabla */}
      <div className="mt-8 bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-lg font-bold text-pink-600 mb-4">Historial</h2>
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="bg-pink-100 text-pink-600">
              <th className="p-2">Usuario</th>
              <th className="p-2">Fecha</th>
              <th className="p-2">Hora Entrada</th>
              <th className="p-2">Hora Salida</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((r) => (
              <tr key={r.id} className="border-b text-pink-700">
                <td className="p-2">{r.usuario?.name }</td>
                <td className="p-2">{r.fecha}</td>
                <td className="p-2">{r.horaEntrada || "-"}</td>
                <td className="p-2">{r.horaSalida || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-pink-600 mb-4">Registrar Asistencia</h3>

            {/* Manual */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-pink-600">
                Selecciona Usuario
              </label>
              <select
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full border p-2 rounded text-black"
              >
                <option value="">-- Selecciona --</option>
                {usuarios.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.role})
                  </option>
                ))}
              </select>

              <button
                onClick={marcarAsistencia}
                className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
              >
                Guardar Asistencia
              </button>
            </div>

            {/* Huella (solo visual) */}
            <div className="mt-6 text-center border-t pt-4">
              <h4 className="text-md font-semibold text-gray-600 mb-3">Registrar con huella</h4>
              <div className="flex justify-center">
                <div className="w-24 h-24 border-4 border-pink-400 rounded-full flex items-center justify-center">
                  <span className="text-pink-500 text-5xl">🔒</span>
                </div>
              </div>
              <p className="text-gray-500 mt-2">Escáner de huella (pendiente integración)</p>
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
