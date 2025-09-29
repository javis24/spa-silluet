"use client";
import { useState, useEffect } from "react";

export default function CitaForm({ pacienteUuid, onClose, onSave, initialData }) {
  const [form, setForm] = useState({
    fecha: "",
    hora: "",
    servicio: "",
    comentario: ""
  });

  // Cargar datos si es edición
  useEffect(() => {
    if (initialData) {
      setForm({
        fecha: initialData.fecha || "",
        hora: initialData.hora || "",
        servicio: initialData.servicio || "",
        comentario: initialData.comentario || ""
      });
    }
  }, [initialData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await onSave("citas", { ...form, pacienteUuid }, initialData?.id || null);
  };

  return (
    <Modal title={initialData ? "Editar Cita" : "Agregar Cita"} onClose={onClose} onSave={handleSubmit}>
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-pink-600 mb-1">Fecha</label>
        <input
          type="date"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2 text-pink-600 focus:ring-2 focus:ring-pink-400"
        />

        <label className="text-sm font-semibold text-pink-600 mb-1">Hora</label>
        <input
          type="time"
          name="hora"
          value={form.hora}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2 text-pink-600 focus:ring-2 focus:ring-pink-400"
        />

        <label className="text-sm font-semibold text-pink-600 mb-1">Servicio</label>
        <input
          type="text"
          name="servicio"
          placeholder="Ej. Masaje relajante"
          value={form.servicio}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2 text-pink-600 focus:ring-2 focus:ring-pink-400"
        />

        <label className="text-sm font-semibold text-pink-600 mb-1">Comentario</label>
        <textarea
          name="comentario"
          placeholder="Notas adicionales..."
          value={form.comentario}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2 text-pink-600 focus:ring-2 focus:ring-pink-400"
        />
      </div>
    </Modal>
  );
}

// 🔹 Modal genérico reutilizable
function Modal({ title, children, onClose, onSave }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-2xl w-full max-w-lg shadow-lg">
        <h3 className="text-xl font-bold text-pink-600 mb-4">{title}</h3>
        <div className="space-y-3 max-h-[70vh] overflow-y-auto">{children}</div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
