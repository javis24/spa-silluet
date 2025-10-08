"use client";
import { useState, useEffect } from "react";

export default function AbonoForm({ pacienteUuid, onClose, onSave, initialData }) {
  const [form, setForm] = useState({
    monto: "",
    semana: "",
    fechaAbono: "",
  });
  const [totalAbonos, setTotalAbonos] = useState(0);
  const [abonos, setAbonos] = useState([]);

  // 🔹 Cargar datos cuando editamos
  useEffect(() => {
    if (initialData) {
      setForm({
        monto: initialData.monto || "",
        semana: initialData.semana || "",
        fechaAbono: initialData.fechaAbono
          ? new Date(initialData.fechaAbono).toISOString().split("T")[0]
          : "",
      });
    }
  }, [initialData]);

  // 🔹 Obtener todos los abonos del paciente
  useEffect(() => {
    if (pacienteUuid) {
      fetchAbonos();
    }
  }, [pacienteUuid]);

  const fetchAbonos = async () => {
    try {
      const res = await fetch(`/api/abonos?pacienteUuid=${pacienteUuid}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setAbonos(data);
        const total = data.reduce((sum, abono) => sum + Number(abono.monto || 0), 0);
        setTotalAbonos(total);
      } else {
        setAbonos([]);
        setTotalAbonos(0);
      }
    } catch (error) {
      console.error("Error al obtener abonos:", error);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await onSave("abonos", { ...form, pacienteUuid }, initialData?.id);
    fetchAbonos(); // 🔄 actualizar suma después de guardar
  };

  const labels = {
    monto: "Monto del abono ($)",
    semana: "Semana (número)",
    fechaAbono: "Fecha del abono",
  };

  return (
    <Modal
      title={initialData ? "Editar Abono Semanal" : "Agregar Abono Semanal"}
      onClose={onClose}
      onSave={handleSubmit}
    >
      {Object.keys(form).map((key) => (
        <div key={key} className="flex flex-col">
          <label className="text-sm font-semibold text-pink-600 mb-1">
            {labels[key]}
          </label>
          <input
            type={key === "fechaAbono" ? "date" : "text"}
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={labels[key]}
            className="w-full p-2 border rounded mb-2 text-pink-600 focus:ring-2 focus:ring-pink-400"
          />
        </div>
      ))}

      {/* 🔹 Mostrar sumatoria total */}
      <div className="mt-4 bg-pink-50 border border-pink-200 rounded-lg p-3 text-center">
        <p className="text-sm text-pink-600 font-semibold">
          Total abonado hasta ahora:
        </p>
        <p className="text-2xl font-bold text-pink-700">
          ${totalAbonos.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
        </p>
      </div>

      {/* 🔹 Mostrar listado de abonos previos */}
      {abonos.length > 0 && (
        <div className="mt-4 border-t pt-3 max-h-40 overflow-y-auto">
          <p className="text-sm font-semibold text-pink-600 mb-2">Historial de abonos:</p>
          <ul className="text-sm text-pink-700 space-y-1">
            {abonos.map((a) => (
              <li key={a.id} className="flex justify-between border-b pb-1">
                <span>
                  Semana {a.semana} – {a.fechaAbono}
                </span>
                <span className="font-semibold">${a.monto}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Modal>
  );
}

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
