"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

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

    const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchPacientes();
    fetchUsers();
  }, []);

  useEffect(() => {
  setCurrentPage(1);
}, [search]);


const fetchPacientes = async () => {
  const res = await fetch("/api/pacientes");
  const data = await res.json();

  // 🔹 ordenar para que los últimos aparezcan primero
  const ordenados = Array.isArray(data)
    ? data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  setPacientes(ordenados);
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

    const pacientesFiltrados = pacientes.filter(
    (p) =>
      p.address?.toLowerCase().includes(search.toLowerCase()) ||
      p.email?.toLowerCase().includes(search.toLowerCase()) ||
      p.phoneNumber?.toLowerCase().includes(search.toLowerCase())
  );

    const totalPages = Math.ceil(pacientesFiltrados.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pacientesPaginados = pacientesFiltrados.slice(
    startIndex,
    startIndex + itemsPerPage
  );


const router = useRouter();
  return (
    <div className="min-h-screen flex bg-gradient-to-r from-pink-100 to-purple-200">
      <div className="flex-1 p-4 sm:p-6 relative">
        <button
                onClick={() => router.push("/dashboard")}
                className="mb-4 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-800 text-sm sm:text-base"
              >
                ← Volver a inicio
              </button>

        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg mb-8 w-full max-w-md sm:max-w-2xl mx-auto">
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


         <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg sm:text-2xl font-bold text-pink-600 mb-4 text-center">
            Lista de Pacientes
          </h2>

          {/* 🔎 Buscador */}
          <div className="mb-4 flex justify-center">
            <input
              type="text"
              placeholder="Buscar por dirección, correo o teléfono..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 text-pink-800"
            />
          </div>

          {/* 📱 Mobile → Cards */}
          <div className="block sm:hidden space-y-3">
            {pacientesPaginados.map((p) => (
              <div
                key={p.uuid}
                className="border rounded-lg p-4 shadow-sm text-pink-700"
              >
                <p><strong>Dirección:</strong> {p.address}</p>
                <p><strong>Correo:</strong> {p.email}</p>
                <p><strong>Edad:</strong> {p.age}</p>
                <p><strong>Teléfono:</strong> {p.phoneNumber}</p>
              </div>
            ))}
          </div>

          {/* 💻 Desktop → Tabla */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full min-w-[500px] border-collapse text-sm sm:text-base">
              <thead>
                <tr className="bg-pink-100 text-left text-pink-500">
                  <th className="p-2">Dirección</th>
                  <th className="p-2">Correo</th>
                  <th className="p-2">Edad</th>
                  <th className="p-2">Teléfono</th>
                </tr>
              </thead>
              <tbody>
                {pacientesPaginados.map((p) => (
                  <tr key={p.uuid} className="border-b text-pink-500">
                    <td className="p-2">{p.address}</td>
                    <td className="p-2">{p.email}</td>
                    <td className="p-2">{p.age}</td>
                    <td className="p-2">{p.phoneNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 📄 Paginado */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-pink-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
