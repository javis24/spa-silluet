"use client";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gradient-to-r from-pink-600 to-pink-400 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Nuestros Servicios</h3>
          <p>
            Tratamientos faciales y corporales que realzan tu belleza natural.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Cursos de Belleza</h3>
          <p>
            Capacítate con certificaciones oficiales en estética y salud.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Nuestro Equipo</h3>
          <p>
            Profesionales en estética, masajes y rejuvenecimiento facial.
          </p>
        </div>
      </div>
      <div className="container mx-auto text-center mt-8 px-6">
        <p>© {year} SiluettePlus JC - Belleza y Salud. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
