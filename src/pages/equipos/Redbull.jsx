import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import Sidecard_teams from "../../components/Sidecard_teams";
import { obtenerEscuderiaPorSlug } from "../../services/apiService";

export default function Redbull() {
  const { equipoSlug } = useParams();
  const slug = equipoSlug || "red-bull";

  const [escuderia, setEscuderia] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarEscuderia = async () => {
      setCargando(true);
      const datos = await obtenerEscuderiaPorSlug(slug);
      setEscuderia(datos);
      setCargando(false);
    };

    cargarEscuderia();
  }, [slug]);

  if (cargando) {
    return (
      <div className="bg-black text-white min-h-screen">
        <Menu />
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500 mb-4"></div>
          <p className="text-2xl f1-light text-gray-400">Cargando escudería...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!escuderia) {
    return (
      <div className="bg-black text-white min-h-screen">
        <Menu />
        <div className="text-center py-20">
          <h2 className="text-5xl f1-bold mb-4">Escudería no encontrada</h2>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="cont-redbull bg-black text-white scroll-smooth">
      <Menu />

      {/* CONTENEDOR RESPONSIVE - Arreglado para iPad Pro */}
      <div className="flex flex-col xl:flex-row max-w-[100vw] overflow-x-hidden">
        {/* SIDECARD — SOLO EN PANTALLAS MUY GRANDES (1280px+) */}
        <div className="hidden xl:block xl:w-1/4 p-4 flex-shrink-0">
          <Sidecard_teams team={escuderia.slug} />
        </div>

        {/* CONTENIDO — 100% EN MÓVIL/TABLET/IPAD PRO */}
        <div className="w-full xl:w-3/4 p-4 sm:p-6 md:p-8 text-left">
          <header className="pb-10 text-center">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl f1-title"
              style={{ color: escuderia.color_principal }}
            >
              {escuderia.nombre_completo || escuderia.nombre}
            </h1>
          </header>

          <div className="space-y-16 text-justify">
            {/* INFORMACIÓN GENERAL */}
            <section id="info-general">
              <h2 className="text-3xl md:text-4xl f1-bold">1. Información General</h2>
              <br />
              <div
                className="text-xl md:text-2xl leading-relaxed f1-light"
                dangerouslySetInnerHTML={{
                  __html: escuderia.info_general?.replace(/\n/g, "<br />"),
                }}
              />
            </section>

            {/* PILOTOS */}
            <section id="pilotos">
              <h2 className="text-3xl md:text-4xl f1-bold">2. Pilotos</h2>
              <br />
              <div
                className="text-xl md:text-2xl leading-relaxed f1-light"
                dangerouslySetInnerHTML={{
                  __html: escuderia.pilotos_actuales?.replace(/\n/g, "<br />"),
                }}
              />
            </section>

            {/* HISTORIA */}
            <section id="historia">
              <h2 className="text-3xl md:text-4xl f1-bold">3. Historia</h2>
              <br />
              <div
                className="text-xl md:text-2xl leading-relaxed f1-light"
                dangerouslySetInnerHTML={{
                  __html: escuderia.historia?.replace(/\n/g, "<br />"),
                }}
              />
            </section>

            {/* COCHE Y MOTOR */}
            <section id="coche">
              <h2 className="text-3xl md:text-4xl f1-bold">4. Coche y Motor</h2>
              <br />
              <h3 className="text-xl md:text-2xl underline f1-bold">
                {escuderia.coche_actual}
              </h3>
              <br />
              <div
                className="text-xl md:text-2xl leading-relaxed f1-light"
                dangerouslySetInnerHTML={{
                  __html: escuderia.info_tecnica?.replace(/\n/g, "<br />"),
                }}
              />
            </section>

            {/* RESULTADOS */}
            <section id="resultados">
              <h2 className="text-3xl md:text-4xl f1-bold">5. Resultados Históricos</h2>
              <br />
              <ul className="list-disc list-inside text-xl md:text-2xl f1-light">
                <li>
                  <strong>Campeonatos de Constructores:</strong>{" "}
                  {escuderia.campeonatos_constructores}
                </li>
                <li>
                  <strong>Campeonatos de Pilotos:</strong>{" "}
                  {escuderia.campeonatos_pilotos}
                </li>
                <li>
                  <strong>Victorias totales:</strong> {escuderia.victorias_totales}
                </li>
                <li>
                  <strong>Podios totales:</strong> {escuderia.podios_totales}
                </li>
              </ul>
              <br />
              <div
                className="text-xl md:text-2xl f1-light"
                dangerouslySetInnerHTML={{
                  __html: escuderia.resultados_historicos?.replace(/\n/g, "<br />"),
                }}
              />
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}