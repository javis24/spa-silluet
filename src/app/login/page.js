// src/app/login/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Asegúrate de que es de 'next/navigation'

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        // Elimina el setTimeout
        router.push("/dashboard");
        router.refresh(); // Forzar una revalidación del router, puede ayudar con el middleware
      } else {
        setError(data.msg || "Error en login");
      }
    } catch (err) {
      console.error("Error en login:", err);
      setError("Error en el servidor");
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-pink-300 p-6">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-md p-8 border border-pink-300">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
          Iniciar Sesión
        </h2>
        {error && (
          <p className="text-red-500 text-center font-semibold mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full p-3 border-2 rounded-lg outline-none
                         border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-300
                         valid:border-green-500 invalid:border-red-500 transition-all text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-3 border-2 rounded-lg outline-none
                         border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-300
                         valid:border-green-500 invalid:border-red-500 transition-all text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold shadow-md transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}