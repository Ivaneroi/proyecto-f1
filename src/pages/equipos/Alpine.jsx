import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import Sidecard_teams from "../../components/Sidecard_teams";
import { obtenerEscuderiaPorSlug } from "../../services/apiService";

export default function Alpine() {
  const { equipoSlug } = useParams(); // Si usas ruta dinámica
  const slug = equipoSlug || "alpine"; // Fallback para ruta estática
  
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
    <div className="cont-alpine bg-black text-white scroll-smooth">
      <Menu />

      <div className="flex">
        <div className="cont-sidecard">
          <Sidecard_teams team={escuderia.slug} />
        </div>

        <div className="cont-general text-left p-8 rounded-md shadow-lg">
          <header className="pb-10">
            <h1 className="text-6xl text-center f1-title" style={{ color: escuderia.color_principal }}>
              {escuderia.nombre_completo || escuderia.nombre}
            </h1>
          </header>

          <div className="flex lg:flex-row xl:pl-2 text-center">
            <div className="lg:w-5/6">
              <div className="cont-text pl-[450px]">
                {/* INFORMACIÓN GENERAL */}
                <section id="info-general" className="mb-10">
                  <h2 className="text-4xl f1-bold">1. Información General</h2>
                  <br />
                  <div 
                    className="text-2xl leading-relaxed f1-light text-justify"
                    dangerouslySetInnerHTML={{ __html: escuderia.info_general?.replace(/\n/g, '<br />') }}
                  />
                </section>

                {/* PILOTOS */}
                <section id="pilotos" className="mb-10">
                  <h2 className="text-4xl f1-bold">2. Pilotos</h2>
                  <br />
                  <div 
                    className="text-2xl leading-relaxed f1-light text-justify"
                    dangerouslySetInnerHTML={{ __html: escuderia.pilotos_actuales?.replace(/\n/g, '<br />') }}
                  />
                </section>

                {/* HISTORIA */}
                <section id="historia" className="mb-10">
                  <h2 className="text-4xl f1-bold">3. Historia</h2>
                  <br />
                  <div 
                    className="text-2xl leading-relaxed f1-light text-justify"
                    dangerouslySetInnerHTML={{ __html: escuderia.historia?.replace(/\n/g, '<br />') }}
                  />
                </section>

                {/* COCHE Y MOTOR */}
                <section id="coche" className="mb-10">
                  <h2 className="text-4xl f1-bold">4. Coche y Motor</h2>
                  <br />
                  <h3 className="text-2xl underline f1-bold">{escuderia.coche_actual}</h3>
                  <br />
                  <div 
                    className="text-2xl leading-relaxed f1-light text-justify"
                    dangerouslySetInnerHTML={{ __html: escuderia.info_tecnica?.replace(/\n/g, '<br />') }}
                  />
                </section>

                {/* RESULTADOS */}
                <section id="resultados" className="mb-10">
                  <h2 className="text-4xl f1-bold">5. Resultados Históricos</h2>
                  <br />
                  <ul className="list-disc list-inside text-2xl f1-light text-justify">
                    <li><strong>Campeonatos de Constructores:</strong> {escuderia.campeonatos_constructores}</li>
                    <li><strong>Campeonatos de Pilotos:</strong> {escuderia.campeonatos_pilotos}</li>
                    <li><strong>Victorias totales:</strong> {escuderia.victorias_totales}</li>
                    <li><strong>Podios totales:</strong> {escuderia.podios_totales}</li>
                  </ul>
                  <br />
                  <div 
                    className="text-2xl f1-light text-justify"
                    dangerouslySetInnerHTML={{ __html: escuderia.resultados_historicos?.replace(/\n/g, '<br />') }}
                  />
                </section>
              </div>
            </div>

            {/* Columna de imágenes */}
            <aside className="lg:w-1/6 flex justify-end">
              <div className="cont-images-alpine space-y-8">
                <div className="flex flex-col gap-4">
                  <img
                    src={escuderia.logo}
                    alt={escuderia.nombre}
                    className="w-72 h-72 rounded-lg shadow-md object-cover"
                    onError={(e) => { e.currentTarget.src = "/Imagenes/f1.png"; }}
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}