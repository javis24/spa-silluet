"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "pacient",
  });

  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);

  // 🔎 buscador y paginador
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();

    const ordenados = (data.users || []).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    setUsers(ordenados);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/users/${editing}` : "/api/users";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.msg || data.error);

    setForm({ name: "", email: "", password: "", role: "pacient" });
    setEditing(null);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setForm({ ...user, password: "" });
    setEditing(user.id);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    const data = await res.json();
    alert(data.message || data.error);
    fetchUsers();
  };

  // 🔎 filtrar usuarios
  const usersFiltrados = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.role?.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 paginar
  const totalPages = Math.ceil(usersFiltrados.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const usersPaginados = usersFiltrados.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // reset a página 1 cuando se busca algo
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const router = useRouter();

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-pink-100 to-purple-200">
      <div className="flex-1 p-6">
        <button
          onClick={() => router.push("/dashboard")}
          className="mb-4 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-800 text-sm sm:text-base"
        >
          ← Volver al inicio
        </button>

        {/* Formulario */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md ml-0 sm:mx-auto mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-6 text-center">
            {editing ? "Editar Usuario ✏️" : "Registro de Usuario 🌺"}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Nombre completo"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 text-pink-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 text-pink-500"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 text-pink-500"
              required={!editing}
            />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 text-pink-500"
            >
              <option value="pacient">Paciente</option>
              <option value="secretary">Secretaria</option>
              <option value="admin">Administrador</option>
            </select>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold py-3 rounded-lg shadow-md hover:opacity-90 transition"
            >
              {editing ? "Actualizar Usuario" : "Crear Cuenta"}
            </button>
          </form>
        </div>

        {/* Listado */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">
            Lista de Usuarios 👥
          </h2>

          {/* 🔎 Buscador */}
          <div className="mb-4 flex justify-center">
            <input
              type="text"
              placeholder="Buscar por nombre, correo o rol..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 text-pink-800"
            />
          </div>

          {/* Vista móvil */}
          <div className="space-y-4 sm:hidden">
            {usersPaginados.map((u) => (
              <div
                key={u.id}
                className="border rounded-lg p-4 shadow-sm text-pink-600 bg-pink-50"
              >
                <p><strong>👤 Nombre:</strong> {u.name}</p>
                <p><strong>📧 Correo:</strong> {u.email}</p>
                <p><strong>🎭 Rol:</strong> {u.role}</p>
              </div>
            ))}
          </div>

          {/* Vista escritorio */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full border-collapse text-sm sm:text-base">
              <thead>
                <tr className="bg-pink-100 text-left text-pink-600">
                  <th className="p-2">Nombre</th>
                  <th className="p-2">Correo</th>
                  <th className="p-2">Rol</th>
                  <th className="p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usersPaginados.map((u) => (
                  <tr key={u.id} className="border-b text-pink-500">
                    <td className="p-2">{u.name}</td>
                    <td className="p-2">{u.email}</td>
                    <td className="p-2">{u.role}</td>
                    <td className="p-2 space-x-2">
                      <button
                        onClick={() => handleEdit(u)}
                        className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 📄 Paginador */}
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
