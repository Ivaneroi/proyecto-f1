import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`bg-black text-white z-50 ${isOpen ? "" : "sticky top-0"}`}>
      <div className="flex items-center justify-between w-full">

        {/* Logo F1 izquierda */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img className="h-48 w-auto" src="/Imagenes/logo-f1.png" alt="Logo F1" />
          </Link>
        </div>

        {/* Menú + Hamburguesa */}
        <div className="flex items-center justify-between flex-1 max-w-[1200px] mx-auto">

          {/* Menú escritorio — ahora solo desde XL */}
          <ul className="hidden xl:flex space-x-10 text-4xl">
            <li className="hover:text-red-700 f1-light"><Link to="/resultados">Resultados</Link></li>
            <li className="hover:text-red-700 f1-light"><Link to="/pilotos">Pilotos</Link></li>
            <li className="hover:text-red-700 f1-light"><Link to="/escuderias">Escuderías</Link></li>
            <li className="hover:text-red-700 f1-light"><Link to="/calendario">Calendario</Link></li>
            <li className="hover:text-red-700 f1-light"><Link to="/guia">Guía Inicial</Link></li>
          </ul>

          {/* Botón hamburguesa ahora visible hasta XL */}
          <div className="xl:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Logo LV derecha — ahora solo desde XL */}
        <div className="hidden xl:flex flex-shrink-0">
          <a href="https://es.louisvuitton.com/esp-es/homepage" target="_blank" rel="noopener noreferrer">
            <img className="h-32 w-auto" src="/Imagenes/logo-lv.jpg" alt="Logo Louis Vuitton" />
          </a>
        </div>
      </div>

      {/* Menú móvil/tablet */}
      {isOpen && (
        <ul className="xl:hidden bg-black px-6 pb-10 pt-6 space-y-6">

          <li className="hover:text-red-700 f1-light text-4xl py-6">
            <Link to="/resultados" onClick={() => setIsOpen(false)}>Resultados</Link>
          </li>

          <li className="hover:text-red-700 f1-light text-4xl py-6">
            <Link to="/pilotos" onClick={() => setIsOpen(false)}>Pilotos</Link>
          </li>

          <li className="hover:text-red-700 f1-light text-4xl py-6">
            <Link to="/escuderias" onClick={() => setIsOpen(false)}>Escuderías</Link>
          </li>

          <li className="hover:text-red-700 f1-light text-4xl py-6">
            <Link to="/calendario" onClick={() => setIsOpen(false)}>Calendario</Link>
          </li>

          <li className="hover:text-red-700 f1-light text-4xl py-6">
            <Link to="/guia" onClick={() => setIsOpen(false)}>Guía de Principiantes</Link>
          </li>

          <li className="flex justify-center pt-4">
            <a href="https://es.louisvuitton.com/esp-es/homepage" target="_blank" rel="noopener noreferrer">
              <img className="h-24 w-auto" src="/Imagenes/logo-lv.jpg" alt="Logo Louis Vuitton" />
            </a>
          </li>
        </ul>
      )}

    </nav>
  );
}
