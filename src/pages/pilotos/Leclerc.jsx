import React, { useState, useEffect } from "react";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import Sidecard_pilots from "../../components/Sidecard_pilots";
import { obtenerPilotoPorSlug } from "../../services/apiService";

export default function Leclerc() {
  const slug = "leclerc"; // Solo cambiar esto en cada archivo
  
  const [piloto, setPiloto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarPiloto = async () => {
      setCargando(true);
      const datos = await obtenerPilotoPorSlug(slug);
      setPiloto(datos);
      setCargando(false);
    };

    cargarPiloto();
  }, []);

  if (cargando) {
    return (
      <div className="bg-black text-white min-h-screen">
        <Menu />
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500 mb-4"></div>
          <p className="text-2xl f1-light text-gray-400">Cargando piloto...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!piloto) {
    return (
      <div className="bg-black text-white min-h-screen">
        <Menu />
        <div className="text-center py-20">
          <h2 className="text-5xl f1-bold mb-4">Piloto no encontrado</h2>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="cont-leclerc bg-black text-white scroll-smooth">
      <Menu />

      {/* CONTENEDOR RESPONSIVE */}
      <div className="flex flex-col xl:flex-row max-w-[100vw] overflow-x-hidden">

        {/* SIDECARD — SOLO EN PANTALLAS MUY GRANDES */}
        <div className="hidden xl:block xl:w-1/4 p-4 flex-shrink-0">
          <Sidecard_pilots pilot={piloto.slug} />
        </div>

        {/* CONTENIDO — 100% EN MÓVIL/TABLET/IPAD PRO */}
        <div className="w-full xl:w-3/4 p-4 sm:p-6 md:p-8 text-left">
          <header className="pb-10 text-center">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl f1-title text-[#CC0000]">
              {piloto.nombre_completo}
            </h1>
          </header>

          <div className="space-y-16 text-justify">

            {/* SOBRE ÉL */}
            <section id="sobre-el">
              <h2 className="text-3xl md:text-4xl f1-bold">1. SOBRE ÉL</h2>
              <br />
              <div 
                className="text-xl md:text-2xl leading-relaxed f1-light"
                dangerouslySetInnerHTML={{ __html: piloto.biografia?.replace(/\n/g, '<br />') }}
              />
            </section>

            {/* EQUIPOS */}
            <section id="equipos">
              <h2 className="text-3xl md:text-4xl f1-bold">2. EQUIPOS</h2>
              <br />
              <div 
                className="text-xl md:text-2xl leading-relaxed f1-light"
                dangerouslySetInnerHTML={{ __html: piloto.historial_equipos?.replace(/\n/g, '<br />') }}
              />
            </section>

            {/* ESTADÍSTICAS */}
            <section id="estadisticas">
              <h2 className="text-3xl md:text-4xl f1-bold">3. ESTADÍSTICAS</h2>
              <br />
              <ul className="list-disc list-inside text-xl md:text-2xl f1-light">
                <li><strong>Debut en F1:</strong> {piloto.debut}</li>
                <li><strong>Victorias:</strong> {piloto.victorias}</li>
                <li><strong>Podios:</strong> {piloto.podios}</li>
                <li><strong>Puntos totales:</strong> {piloto.puntos_totales}</li>
                <li><strong>Vueltas rápidas:</strong> {piloto.vueltas_rapidas}</li>
                <li><strong>Mejor posición final en el Campeonato:</strong> {piloto.mejor_posicion_campeonato}</li>
                <li><strong>Equipo actual:</strong> {piloto.equipo_actual}</li>
              </ul>
            </section>

            {/* ÚLTIMOS RESULTADOS */}
            <section id="ultimos-resultados">
              <h2 className="text-3xl md:text-4xl f1-bold">4. ÚLTIMOS RESULTADOS</h2>
              <br />
              <div 
                className="text-xl md:text-2xl leading-relaxed f1-light"
                dangerouslySetInnerHTML={{ __html: piloto.ultimos_resultados?.replace(/\n/g, '<br />') }}
              />
            </section>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
