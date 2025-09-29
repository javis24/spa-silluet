"use client";

export default function Header() {
  return (
    <header className="header-top w-full">
      {/* Top Bar */}
      <div className="top-bar flex flex-col md:flex-row items-center md:items-start justify-between bg-[#dfd299] p-2 text-[#cbaa3d]">
        <div className="contact-info flex flex-col md:flex-row items-center text-center md:text-left space-y-2 md:space-y-0 md:space-x-4">
          <span><i className="fas fa-envelope"></i> cursos@siluetteplusjc.com</span>
          <span><i className="fas fa-map-marker-alt"></i> Dirección Col. Villa Jardin, Calle. Flor De Durazno #1011</span>
          <span><i className="fas fa-phone-alt"></i> Teléfono 871 333 0566</span>
        </div>
        <div className="social-icons flex justify-center space-x-2 text-xl mt-2 md:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
        </div>
      </div>

      {/* Main Bar */}
      <div className="main-bar flex flex-col md:flex-row justify-between items-center h-auto md:h-24 bg-white p-4">
        <div className="logo mb-2 md:mb-0">
          <img
            src="/img/silluet_logo.png"
            alt="Logo SiluettePlus JC - Belleza y Salud"
            width="100"
            height="100"
            loading="lazy"
          />
        </div>
        <div className="text-center md:text-left text-[#cbaa3d] text-xl font-great-vibes italic">
          <p>Siluette Plus JC</p>
          <span className="text-[#9b5ab7] font-fira-sans italic font-semibold">beauty and health</span>
        </div>
        <div className="info mt-2 md:mt-0">
          <button className="quote-btn bg-[#9b5ab7] text-white px-4 py-2 rounded-md uppercase">body tanda max</button>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar flex justify-center bg-[#cbaa3d] p-2 rounded-lg shadow-md">
        <ul className="navbar-list flex flex-col md:flex-row md:space-x-4 text-white text-lg font-semibold">
          <li className="mb-2 md:mb-0"><a href="#home">Home</a></li>
          <li className="mb-2 md:mb-0"><a href="#cursos">Cursos</a></li>
          <li className="mb-2 md:mb-0"><a href="#servicios">Servicios</a></li>
          <li><a href="/login">Iniciar Sesión</a></li>
        </ul>
      </nav>
    </header>
  );
}
