"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "pacient", // 👈 default paciente
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    alert(data.msg || data.error);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-pink-100 to-purple-200">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">
            Registro de Usuario 🌺
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre */}
            <input
              type="text"
              name="name"
              placeholder="Nombre completo"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-pink-400"
              required
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-pink-400"
              required
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-pink-400"
              required
            />

            {/* Role */}
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-pink-400"
            >
              <option value="pacient">Paciente</option>
              <option value="secretary">Secretaria</option>
              <option value="admin">Administrador</option>
            </select>

            {/* Botón */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold py-3 rounded-lg shadow-md hover:opacity-90 transition"
            >
              Crear cuenta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
