"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Calendar, Heart, Settings, ClipboardList } from "lucide-react";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Cargando...</p>;
  }

  if (!user) {
    return (
      <p className="text-center mt-10 text-red-500">
        No se pudo cargar la información del usuario.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Info del usuario */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 text-center">
        <h1 className="text-3xl font-bold text-pink-600">
          Bienvenida {user.name} 🎉
        </h1>
        <p className="mt-2 text-gray-700">📧 {user.email}</p>
        <p className="mt-1 text-gray-500 italic">Rol: {user.role}</p>
      </div>

      {/* Cards de acceso rápido */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Accesos rápidos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          onClick={() => router.push("/pacientes")}
          className="cursor-pointer bg-gradient-to-r from-pink-200 to-pink-400 text-white rounded-xl shadow-lg p-6 hover:scale-105 transition transform text-center"
        >
          <Users className="w-10 h-10 mb-3 mx-auto" />
          <h3 className="text-lg font-bold">Pacientes</h3>
          <p className="text-sm">Gestión de pacientes</p>
        </div>

        <div
          onClick={() => router.push("/citas")}
          className="cursor-pointer bg-gradient-to-r from-purple-200 to-purple-400 text-white rounded-xl shadow-lg p-6 hover:scale-105 transition transform text-center"
        >
          <Calendar className="w-10 h-10 mb-3 mx-auto" />
          <h3 className="text-lg font-bold">Citas</h3>
          <p className="text-sm">Agenda y control de citas</p>
        </div>

        <div
          onClick={() => router.push("/tratamientos")}
          className="cursor-pointer bg-gradient-to-r from-rose-200 to-rose-400 text-white rounded-xl shadow-lg p-6 hover:scale-105 transition transform text-center"
        >
          <Heart className="w-10 h-10 mb-3 mx-auto" />
          <h3 className="text-lg font-bold">Tratamientos</h3>
          <p className="text-sm">Lista de servicios y tratamientos</p>
        </div>

        {/* 🔹 Usuarios */}
        <div
          onClick={() => router.push("/register")}
          className="cursor-pointer bg-gradient-to-r from-green-200 to-green-400 text-white rounded-xl shadow-lg p-6 hover:scale-105 transition transform text-center"
        >
          <Users className="w-10 h-10 mb-3 mx-auto" />
          <h3 className="text-lg font-bold">Usuarios</h3>
          <p className="text-sm">Gestión de usuarios</p>
        </div>

        {/* 🔹 Asistencia */}
        <div
          onClick={() => router.push("/dashboard/asistencia")}
          className="cursor-pointer bg-gradient-to-r from-blue-200 to-blue-400 text-white rounded-xl shadow-lg p-6 hover:scale-105 transition transform text-center"
        >
          <ClipboardList className="w-10 h-10 mb-3 mx-auto" />
          <h3 className="text-lg font-bold">Asistencia</h3>
          <p className="text-sm">Control de asistencia</p>
        </div>

        <div
          onClick={() => router.push("/configuracion")}
          className="cursor-pointer bg-gradient-to-r from-pink-300 to-pink-500 text-white rounded-xl shadow-lg p-6 hover:scale-105 transition transform text-center"
        >
          <Settings className="w-10 h-10 mb-3 mx-auto" />
          <h3 className="text-lg font-bold">Configuración</h3>
          <p className="text-sm">Ajustes de la cuenta</p>
        </div>
      </div>
    </div>
  );
}
