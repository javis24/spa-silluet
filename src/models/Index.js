import Users from "./User.js";
import Paciente from "./Paciente.js";
import TratamientosEsteticos from "./TratamientosEsteticos.js";
import MetricasSalud from "./MetricasSalud.js";
import RegistroAsistencia from "./RegistroAsistencia.js";
import Cita from "./Cita.js";
import AbonoSemanal from "./AbonoSemanal.js";

// Creamos una función para asegurar que las asociaciones solo se apliquen una vez
let associationsApplied = false;

function applyAssociations() {
  if (associationsApplied) return;

  // Users — Paciente
  Users.hasMany(Paciente, { foreignKey: "userId", as: "pacientes" });
  Paciente.belongsTo(Users, { foreignKey: "userId", as: "usuarioAsignado" });

  // Paciente — TratamientosEsteticos
  TratamientosEsteticos.belongsTo(Paciente, { foreignKey: "pacienteUuid", as: "paciente" });
  Paciente.hasMany(TratamientosEsteticos, { foreignKey: "pacienteUuid", as: "tratamientos" });

  // Paciente — MetricasSalud
  MetricasSalud.belongsTo(Paciente, { foreignKey: "pacienteUuid", as: "paciente" });
  Paciente.hasMany(MetricasSalud, { foreignKey: "pacienteUuid", as: "metricas" });

  // Users — RegistroAsistencia
  RegistroAsistencia.belongsTo(Users, { foreignKey: "userId", as: "usuario" });
  Users.hasMany(RegistroAsistencia, { foreignKey: "userId", as: "asistencias" });

  // Paciente — Cita
  Cita.belongsTo(Paciente, { foreignKey: "pacienteUuid", as: "paciente" });
  Paciente.hasMany(Cita, { foreignKey: "pacienteUuid", as: "citas" });

  // Paciente — AbonoSemanal
  AbonoSemanal.belongsTo(Paciente, { foreignKey: "pacienteUuid", as: "paciente" });
  Paciente.hasMany(AbonoSemanal, { foreignKey: "pacienteUuid", as: "abono_semanal" });

  associationsApplied = true;
}

// Ejecutamos las asociaciones
applyAssociations();

export {
  Users,
  Paciente,
  TratamientosEsteticos,
  MetricasSalud,
  RegistroAsistencia,
  Cita,
  AbonoSemanal,
};