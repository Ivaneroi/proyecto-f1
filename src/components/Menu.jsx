import React from "react";
import { Link } from "react-router-dom";


export default function Header() {
  return (
    <nav className="cont-menu h-[110px] flex items-center pt-5 sticky z-50 top-0 bg-black text-white text-3xl">
      <div className="cont-logo-f1-menu w-2/12 h-[150px] pb-52 flex justify-center">
        <Link to="/">     {/*Cuando clickas en la imagen va al Inicio/Home*/}
        <img className="w-auto h-48" id="id-logo-menu" src="/Imagenes/logo-f1.png" alt="Logo F1"/>
        </Link>
      </div>

      {/* Menú */}
      <ul className="list-menu flex w-9/12 pb-4 justify-center space-x-12">
        <li className="hover:text-red-700 cursor-pointer f1-light"><Link to="/resultados">Resultados</Link></li>
        <li className="hover:text-red-700 cursor-pointer f1-light"><Link to="/pilotos">Pilotos</Link></li>
        <li className="hover:text-red-700 cursor-pointer f1-light"><Link to="/escuderias">Escuderías</Link></li>
        <li className="hover:text-red-700 cursor-pointer f1-light"><Link to="/calendario">Calendario</Link></li>
        <li className="hover:text-red-700 cursor-pointer f1-light"><Link to="/guia">Guía de Principiantes</Link></li>
      </ul>
      <div className="cont-partner-menu w-2/12 pb-6 flex justify-center">
        <a href="https://es.louisvuitton.com/esp-es/homepage" target="_blank" rel="noopener noreferrer">
        <img className="w-auto h-28" id="id-logo-lv" src="/Imagenes/logo-lv.jpg" alt="Logo Louis Vuitton"/>
        </a>
    </div>
    </nav>
  );
}
