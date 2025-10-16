

import Header from "@/components/Header";
import Banner from "@/components/Banner";
import ServiceSection from "@/components/ServiceSection";
import TeamMembers from "@/components/TeamMembers";
import TeamBenefits from "@/components/TeamBenefits";
import CoursesSection from "@/components/CoursesSection";
import Footer from "@/components/Footer";


export const metadata = {
  title: "SiluettePlus | Clínica de Tratamientos Estéticos en Gómez Palacio",
  description:
    "Descubre los mejores tratamientos faciales, corporales y reductivos en SiluettePlus. Expertos en bienestar y belleza en Gómez Palacio, Durango.",
    icons: {
      icon: "/silluet_logo.ico",
    },
  keywords:
    "spa, tratamientos estéticos, facial, corporal, cavitación, radiofrecuencia, SiluettePlus, Gómez Palacio, belleza, salud",
  authors: [{ name: "SiluettePlus" }],
  openGraph: {
    title: "SiluettePlus | Clínica de Belleza y Bienestar",
    description:
      "Transforma tu cuerpo y mente con nuestros tratamientos personalizados. Agenda tu cita hoy.",
    url: "https://siluetteplus.com",
    siteName: "SiluettePlus",
    images: [
      {
        url: "/img/silluet_logo.png",
        width: 1200,
        height: 630,
        alt: "Tratamientos estéticos SiluettePlus",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SiluettePlus | Clínica de Tratamientos Estéticos",
    description: "Agenda tu cita en SiluettePlus y luce espectacular.",
    images: ["/img/silluet_logo.png"],
  },
};

const teamMembersData = [
  {
    name: "Nutrióloga Jackeline Corral",
    role: "Dermatóloga Estética",
    description: "Especialista en terapias alternativas, aparatologia profesional y masajes Reductivos.",
    image: "./img/jackeline.png",
  },
  {
    name: "Oriandi",
    role: "Terapeuta",
    description: "Terapeuta en terapias alternativas, masajes reductivos  y aparatologia profesional",
    image: "./img/01-oriandi.png",
  },
   {
    name: "Sill|uettePlus",
    role: "Spa de Belleza y Bienestar",
    description: "SilluettePlus es una clínica especializada en tratamientos estéticos faciales y corporales, dedicada a realzar tu belleza y bienestar.",
    image: "./img/silluet_letras.png",
  }
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Banner />
        <ServiceSection />
        <TeamMembers members={teamMembersData} />
        <TeamBenefits />
        <CoursesSection />
      </main>
      <Footer />
      <a
          href="https://wa.me/528713330566?text=Hola!%20Estoy%20interesado%20en%20los%20tratamientos%20de%20SiluettePlus."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-green-600 transition"
        >
          💬 Consultar por WhatsApp
        </a>

    </div>
  );
}
