"use client";

export default function CoursesSection() {
  return (
    <section className="text-pink-600 py-16 px-6 bg-pink-200">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="flex-shrink-0">
          <img
            src="/img/curso_img.png"
            alt="Curso profesional de estética en SiluettePlus JC"
            width="300"
            height="300"
            className="rounded-lg shadow-lg"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col space-y-4 max-w-2xl">
          <h1 className="text-3xl font-bold">Inscríbete a nuestros cursos</h1>
          <p className="text-gray-800 leading-relaxed">
            Aprende técnicas personalizadas y certificadas para tratamientos estéticos avanzados.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-pink-800 rounded-lg p-4">
              <h2 className="text-2xl font-bold text-white">5</h2>
              <p className="text-sm text-gray-400">Certificaciones avaladas</p>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <a
              href="https://pago.clip.mx/suscripcion/83481f39-bede-46d5-8f84-37244f332805"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold flex flex-col items-center"
            >
              <img
                src="https://cdn.prod.website-files.com/62588b32d8d6105ab7aa9721/63bf568610f3fdf437235192_Preview.svg"
                alt="Pago seguro con Clip"
                width="128"
                height="40"
                className="mb-2"
              />
              Accede a nuestros cursos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
