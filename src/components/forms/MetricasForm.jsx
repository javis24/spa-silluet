"use client";
import { useState, useEffect } from "react";

export default function MetricasForm({ pacienteUuid, onClose, onSave, initialData }) {
  const [form, setForm] = useState({
    weight: "", fatPercentage: "", muscleKg: "", bodyWater: "",
    phy: "", muscle: "", metabolicAge: "", heartRate: "",
    boneKg: "", visceralFat: "", bmi: "", hip: "", arms: "",
    thighs: "", calves: "", chest: "", waist: "", abdomen: "", kcla: ""
  });

  // 🔹 Si estamos editando, precarga los datos en el formulario
  useEffect(() => {
    if (initialData) {
      setForm({
        weight: initialData.weight || "",
        fatPercentage: initialData.fatPercentage || "",
        muscleKg: initialData.muscleKg || "",
        bodyWater: initialData.bodyWater || "",
        phy: initialData.phy || "",
        muscle: initialData.muscle || "",
        metabolicAge: initialData.metabolicAge || "",
        heartRate: initialData.heartRate || "",
        boneKg: initialData.boneKg || "",
        visceralFat: initialData.visceralFat || "",
        bmi: initialData.bmi || "",
        hip: initialData.hip || "",
        arms: initialData.arms || "",
        thighs: initialData.thighs || "",
        calves: initialData.calves || "",
        chest: initialData.chest || "",
        waist: initialData.waist || "",
        abdomen: initialData.abdomen || "",
        kcla: initialData.kcla || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await onSave("metricas", { ...form, pacienteUuid }, initialData?.id);
  };

  // Diccionario de traducción
  const labels = {
    weight: "Peso (kg)",
    fatPercentage: "Porcentaje de grasa (%)",
    muscleKg: "Masa muscular (kg)",
    bodyWater: "Agua corporal (%)",
    phy: "Índice físico (PHY)",
    muscle: "Músculo (%)",
    metabolicAge: "Edad metabólica",
    heartRate: "Frecuencia cardíaca (bpm)",
    boneKg: "Masa ósea (kg)",
    visceralFat: "Grasa visceral",
    bmi: "Índice de masa corporal (IMC)",
    hip: "Cadera (cm)",
    arms: "Brazos (cm)",
    thighs: "Muslos (cm)",
    calves: "Pantorrillas (cm)",
    chest: "Pecho (cm)",
    waist: "Cintura (cm)",
    abdomen: "Abdomen (cm)",
    kcla: "Kcal diarias estimadas"
  };

  return (
    <Modal
      title={initialData ? "Editar Métricas de Salud" : "Agregar Métricas de Salud"}
      onClose={onClose}
      onSave={handleSubmit}
    >
      {Object.keys(form).map((key) => (
        <div key={key} className="flex flex-col">
          <label className="text-sm font-semibold text-pink-600 mb-1">
            {labels[key]}
          </label>
          <input
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={labels[key]}
            className="w-full p-2 border rounded mb-2 text-pink-600 focus:ring-2 focus:ring-pink-400"
          />
        </div>
      ))}
    </Modal>
  );
}

// 🔹 Modal base reutilizable
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
