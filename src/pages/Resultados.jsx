import React from "react";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { circuitos } from "../data/circuitos";

export default function Resultados() {
  // prefijo para rutas estáticas (soporta base diferentes en despliegue)
  const base = import.meta.env.BASE_URL || "/";

  return (
    <div className="resultados-page bg-black min-h-screen">
      <Menu />

      {/* Título de la página */}
      <div className="cont-title-resultados pt-10 pb-8">
        <h1 className="text-7xl text-white f1-title text-center">
          RESULTADOS TEMPORADA <span className="red-strong">2025</span>
        </h1>
      </div>

      {/* Grid de circuitos */}
      <div className="grid grid-cols-2 gap-6 p-6">
        {circuitos.map((c) => {
          // Generar ruta: /resultados/australia, /resultados/china, etc.
          const ruta = c.nombre
            .toLowerCase()
            .replace("gran premio de ", "")
            .replace(/\s+/g, "-")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""); // Quita acentos

          // nombre de archivo esperado: ruta + .jpg (simple)
          const filename = `${ruta}.jpg`;

          // ruta directa y simple a la imagen en public (tus imágenes locales .jpg)
          const srcCandidate = `${base}Imagenes/Circuitos-img/${filename}`;

          return (
            <Link
              key={c.id}
              to={`/resultados/${ruta}`}
              className="border rounded-lg flex flex-col items-center justify-center p-6 bg-[#15151E] cursor-pointer border-black hover:scale-105 transition-transform duration-300 relative overflow-hidden"
            >
            
              <img
                src={srcCandidate}
                alt={c.circuito}
                className="w-full h-[425px] object-cover rounded-lg mb-4"
                loading="lazy"
                onError={(e) => {
                  // fallback a imagen genérica si falla
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `${base}Imagenes/f1.jpg`;
                  e.currentTarget.classList.remove("object-cover");
                  e.currentTarget.classList.add("object-contain");
                }}
              />

              {/* Badge de estado: Disputado o Próximo */}
              <div className="absolute top-4 right-4">
                {c.disputado ? (
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm f1-bold">
                    ✓ COMPLETADO
                  </span>
                ) : (
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm f1-bold">
                    PRÓXIMO
                  </span>
                )}
              </div>

              {/* Información del GP */}
              <div className="text-center">
                <h2 className="text-3xl text-white f1-bold mb-2">
                  {c.nombre.toUpperCase()}
                </h2>
                <p className="text-xl text-gray-300 f1-light mb-1">
                  {c.circuito}
                </p>
                <p className="text-lg text-gray-400 f1-light mb-1">
                  📍 {c.ciudad}, {c.pais}
                </p>
                <p className="text-lg text-red-500 f1-bold">
                  📅{" "}
                  {new Date(c.fecha).toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}
