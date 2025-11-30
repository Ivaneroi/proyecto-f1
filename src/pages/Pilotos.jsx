import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { obtenerPilotos } from "../services/apiService";

export default function Pilotos() {
  const [pilotos, setPilotos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarPilotos = async () => {
      setCargando(true);
      const datos = await obtenerPilotos();
      setPilotos(datos);
      setCargando(false);
    };

    cargarPilotos();
  }, []);

  return (
    <div className="pilotos-page bg-black">
      <Menu />

      {cargando ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500 mb-4"></div>
          <p className="text-2xl f1-light text-gray-400">Cargando pilotos...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 p-6">
          {pilotos.map((p) => (
            <Link
              key={p.id}
              to={`/pilotos/${p.slug}`}
              className="border rounded-lg flex flex-col items-center justify-center p-4 bg-[#15151E] cursor-pointer border-black hover:scale-105 transition-transform duration-300"
            >
              <img
                src={p.foto}
                alt={p.nombre_completo}
                className="object-contain mb-2 w-48 h-48 rounded-lg"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/Imagenes/f1.png";
                }}
              />
              <h2 className="text-3xl text-white f1-bold text-center">
                {p.nombre_completo}
              </h2>
            </Link>
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
}