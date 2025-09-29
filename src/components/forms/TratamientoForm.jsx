"use client";
import { useState, useEffect } from "react";

export default function TratamientoForm({ pacienteUuid, onClose, onSave, initialData }) {
  const [form, setForm] = useState({
    cavitation: "", radioFrequency: "", lipoLaser: "", vacuum: "",
    gluteCups: "", woodTherapy: "", lymphaticDrainage: "", detox: "",
    mesotherapy: "", passiveGym: ""
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        cavitation: initialData.cavitation ?? "",
        radioFrequency: initialData.radioFrequency ?? "",
        lipoLaser: initialData.lipoLaser ?? "",
        vacuum: initialData.vacuum ?? "",
        gluteCups: initialData.gluteCups ?? "",
        woodTherapy: initialData.woodTherapy ?? "",
        lymphaticDrainage: initialData.lymphaticDrainage ?? "",
        detox: initialData.detox ?? "",
        mesotherapy: initialData.mesotherapy ?? "",
        passiveGym: initialData.passiveGym ?? "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async () => await onSave("tratamientos-esteticos", { ...form, pacienteUuid }, initialData?.id);

  const labels = {
    cavitation: "Cavitación",
    radioFrequency: "Radiofrecuencia",
    lipoLaser: "Lipo Láser",
    vacuum: "Vacuum (succión)",
    gluteCups: "Copas de glúteos",
    woodTherapy: "Maderoterapia",
    lymphaticDrainage: "Drenaje linfático",
    detox: "Detox",
    mesotherapy: "Mesoterapia",
    passiveGym: "Gimnasia pasiva"
  };

  return (
    <Modal title={initialData ? "Editar Tratamiento" : "Agregar Tratamiento"} onClose={onClose} onSave={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.keys(form).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm font-semibold text-pink-600 mb-1">{labels[key]}</label>
            <input
              type="number"
              name={key}
              value={form[key]}
              onChange={handleChange}
              placeholder={labels[key]}
              className="w-full p-2 border rounded text-pink-600 focus:ring-2 focus:ring-pink-400"
            />
          </div>
        ))}
      </div>
    </Modal>
  );
}

// 🔹 Componente Modal
function Modal({ title, children, onClose, onSave }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-2xl w-full max-w-4xl shadow-lg">
        <h3 className="text-xl font-bold text-pink-600 mb-4">{title}</h3>
        <div className="max-h-[70vh] overflow-y-auto">{children}</div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-pink-500 text-white rounded"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
