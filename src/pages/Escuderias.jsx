import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { obtenerEscuderias } from "../services/apiService";

export default function Escuderias() {
  const [escuderias, setEscuderias] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarEscuderias = async () => {
      setCargando(true);
      const datos = await obtenerEscuderias();
      setEscuderias(datos);
      setCargando(false);
    };

    cargarEscuderias();
  }, []);

  return (
    <div className="escuderias-page bg-black">
      <Menu />

      {cargando ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500 mb-4"></div>
          <p className="text-2xl f1-light text-gray-400">Cargando escuderías...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 p-6">
          {escuderias.map((e) => (
            <Link
              key={e.id}
              to={`/equipos/${e.slug}`}
              className="border rounded-lg flex flex-col items-center justify-center p-4 bg-[#15151E] cursor-pointer border-black hover:scale-105 transition-transform duration-300"
            >
              <img
                src={e.logo}
                alt={e.nombre}
                className="object-contain mb-2"
              />
              <h2 className="title-team text-3xl text-white f1-bold text-center">
                {e.nombre}
              </h2>
            </Link>
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
}