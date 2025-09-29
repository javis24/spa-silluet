"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  Users,
  Calendar,
  UserPlus,
  Heart,
  LogOut,
  Menu,
} from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const menus = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Usuarios", icon: Users, path: "/register" },
    { name: "Pacientes", icon: UserPlus, path: "/pacientes" },
    { name: "Citas", icon: Calendar, path: "/citas" },
    { name: "Tratamientos", icon: Heart, path: "/tratamientos" },
  ];

  const handleLogout = () => {
    document.cookie = "jwt=; Max-Age=0; path=/;"; // eliminar cookie
    router.push("/login");
  };

  return (
    <div
      className={`${
        open ? "w-64" : "w-20"
      } min-h-screen bg-gradient-to-b from-pink-200 to-pink-400 shadow-lg p-5 pt-8 relative duration-300`}
    >
      {/* Botón para abrir/cerrar */}
      <button
        onClick={() => setOpen(!open)}
        className="absolute -right-3 top-9 w-7 h-7 bg-pink-500 rounded-full flex items-center justify-center shadow-md"
      >
        <Menu className="text-white w-4 h-4" />
      </button>

      {/* Logo */}
      <div className="flex items-center gap-x-3">
        <div className="bg-white p-2 rounded-full shadow-md">
          <Heart className="text-pink-500 w-6 h-6" />
        </div>
        {open && (
          <h1 className="text-white text-xl font-bold">Siluette Spa</h1>
        )}
      </div>

      {/* Menú */}
      <ul className="pt-8">
        {menus.map((menu, index) => (
          <li
            key={index}
            onClick={() => router.push(menu.path)}
            className="flex items-center gap-x-4 p-3 text-white hover:bg-pink-500 hover:shadow-lg rounded-md cursor-pointer transition"
          >
            <menu.icon className="w-5 h-5" />
            {open && <span className="text-md font-medium">{menu.name}</span>}
          </li>
        ))}

        {/* Botón de Logout */}
        <li
          onClick={handleLogout}
          className="flex items-center gap-x-4 p-3 text-white hover:bg-red-500 hover:shadow-lg rounded-md cursor-pointer mt-6 transition"
        >
          <LogOut className="w-5 h-5" />
          {open && <span className="text-md font-medium">Salir</span>}
        </li>
      </ul>
    </div>
  );
}
