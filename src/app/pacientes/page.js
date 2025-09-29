"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";

export default function PacientesPage() {
  const [form, setForm] = useState({
    address: "",
    phoneNumber: "",
    email: "",
    evaluationDate: "",
    age: "",
    height: "",
    unwantedGain: "",
    pathologies: "",
    userId: "",
  });
  const [pacientes, setPacientes] = useState([]);
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    fetchPacientes();
    fetchUsers();
  }, []);

  const fetchPacientes = async () => {
    const res = await fetch("/api/pacientes");
    const data = await res.json();
    setPacientes(Array.isArray(data) ? data : []);
  };

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    const filtered = (data.users || []).filter((u) => u.role === "pacient");
    setUsers(filtered);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/pacientes/${editing}` : "/api/pacientes";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message || data.error);

    setForm({
      address: "",
      phoneNumber: "",
      email: "",
      evaluationDate: "",
      age: "",
      height: "",
      unwantedGain: "",
      pathologies: "",
      userId: "",
    });
    setEditing(null);
    fetchPacientes();
  };

  const handleEdit = (paciente) => {
    setForm({
      ...paciente,
      userId: paciente.userId?.toString() || "",
    });
    setEditing(paciente.uuid);
  };

  const handleDelete = async (uuid) => {
    if (!confirm("¿Seguro que deseas eliminar este paciente?")) return;

    const res = await fetch(`/api/pacientes/${uuid}`, { method: "DELETE" });
    const data = await res.json();
    alert(data.message || data.error);
    fetchPacientes();
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-pink-100 to-purple-200">
      {/* Contenido principal */}
      <div className="flex-1 p-4 sm:p-6 relative">
        {/* Formulario */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-6 text-center">
            {editing ? "Editar Paciente" : "Registro de Paciente 💖"}
          </h1>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="address"
              placeholder="Dirección"
              value={form.address}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 text-pink-800"
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Teléfono"
              value={form.phoneNumber}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 text-pink-800"
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 text-pink-800"
            />
            <input
              type="date"
              name="evaluationDate"
              value={form.evaluationDate}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 text-pink-800"
            />
            <input
              type="number"
              name="age"
              placeholder="Edad"
              value={form.age}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 text-pink-800"
            />
            <input
              type="number"
              step="0.01"
              name="height"
              placeholder="Estatura (m)"
              value={form.height}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 text-pink-800"
            />
            <input
              type="text"
              name="unwantedGain"
              placeholder="Alimento no deseado"
              value={form.unwantedGain}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 text-pink-800 sm:col-span-2"
            />
            <textarea
              name="pathologies"
              placeholder="Patologías"
              value={form.pathologies}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 text-pink-800 sm:col-span-2"
            />

            {/* Select dinámico */}
            <select
              name="userId"
              value={form.userId}
              onChange={handleChange}
              className="col-span-1 sm:col-span-2 p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 text-pink-800"
            >
              <option value="">-- Selecciona un usuario (pacient) --</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="col-span-1 sm:col-span-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold py-3 rounded-lg shadow-md hover:opacity-90 transition"
            >
              {editing ? "Actualizar Paciente" : "Guardar Paciente"}
            </button>
          </form>
        </div>

        {/* Tabla de Pacientes */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg overflow-x-auto">
          <h2 className="text-lg sm:text-2xl font-bold text-pink-600 mb-4">
            Lista de Pacientes
          </h2>
          <table className="w-full min-w-[500px] border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-pink-100 text-left text-pink-500">
                <th className="p-2">Dirección</th>
                <th className="p-2">Correo</th>
                <th className="p-2">Edad</th>
                <th className="p-2">Teléfono</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((p) => (
                <tr key={p.uuid} className="border-b text-pink-500">
                  <td className="p-2">{p.address}</td>
                  <td className="p-2">{p.email}</td>
                  <td className="p-2">{p.age}</td>
                  <td className="p-2">{p.phoneNumber}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-yellow-400 text-white px-2 sm:px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(p.uuid)}
                      className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                    <button
                    onClick={() => (window.location.href = `/pacientes/${p.uuid}`)}
                    className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Ver Historial
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Animación del sidebar */}
      <style jsx global>{`
        @keyframes slide-in {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
