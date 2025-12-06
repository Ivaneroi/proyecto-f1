import React, { useState, useEffect } from "react";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import { obtenerDatosSesionBackend } from "../../services/apiService";
import { obtenerImagenPiloto } from "../../data/pilotosImagenes";

export default function Australia() {
  // Estados
  const [sesionActual, setSesionActual] = useState("Race");
  const [datosCarrera, setDatosCarrera] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Información del GP (hardcoded para Australia)
  const gpInfo = {
    nombre: "Gran Premio de Australia",
    circuito: "Albert Park Circuit",
    ciudad: "Melbourne",
    pais: "Australia",
    fecha: "2025-03-16",
    imagen: "/Imagenes/circuitos/australia.jpg",
    disputado: true,
    esSprint: false,
  };

  // Tipos de sesiones disponibles
  const sesiones = [
    { id: "Practice 1", nombre: "Libres 1", corto: "FP1" },
    { id: "Practice 2", nombre: "Libres 2", corto: "FP2" },
    { id: "Practice 3", nombre: "Libres 3", corto: "FP3" },
    { id: "Qualifying", nombre: "Clasificación", corto: "Q" },
    { id: "Race", nombre: "Carrera", corto: "R" },
  ];

  // Cargar datos cuando cambia la sesión
  useEffect(() => {
    const cargarDatos = async () => {
      if (!gpInfo.disputado) {
        setCargando(false);
        return;
      }

      try {
        setCargando(true);
        setError(null);
        
        const datos = await obtenerDatosSesionBackend(gpInfo.pais, sesionActual, 2025);
        
        if (datos.error) {
          setError(datos.error);
          setDatosCarrera(null);
        } else {
          setDatosCarrera(datos);
        }
      } catch (err) {
        setError('Error al cargar los datos');
        console.error(err);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, [sesionActual]);

  // Mostrar podio solo en Carrera y Qualy
  const mostrarPodio = (sesionActual === "Race" || sesionActual === "Qualifying") && 
                       datosCarrera && 
                       datosCarrera.resultados && 
                       datosCarrera.resultados.length >= 3;

  return (
    <div className="australia-page bg-black text-white min-h-screen">
      <Menu />

      {/* Nombre del Gran Premio - FIJO EN SU SITIO */}
      <div className="w-full pt-8 pb-6 px-4">
        <h1 className="f1-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white text-center mb-3">
          {gpInfo.nombre.toUpperCase()} <span className="red-strong">2025</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl f1-light text-gray-400 text-center">
          {gpInfo.circuito} • {gpInfo.ciudad}, {gpInfo.pais}
        </p>
      </div>

      {/* Botones de sesiones - SIN OVERFLOW */}
      <div className="w-full px-4 mb-6">
        <div className="max-w-4xl mx-auto grid grid-cols-5 gap-2">
          {sesiones.map((sesion) => (
            <button
              key={sesion.id}
              onClick={() => setSesionActual(sesion.id)}
              className={`py-2 px-1 rounded-lg f1-bold text-xs sm:text-sm md:text-base lg:text-lg transition-all duration-300 ${
                sesionActual === sesion.id
                  ? "bg-red-600 text-white"
                  : "bg-[#15151E] text-gray-400 hover:bg-[#1a1a24] hover:text-white"
              }`}
            >
              {sesion.corto}
            </button>
          ))}
        </div>
      </div>

      {/* Nombre de la sesión actual - FIJO */}
      <div className="w-full text-center mb-8 px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl f1-bold text-white">
          {sesiones.find(s => s.id === sesionActual)?.nombre.toUpperCase()}
        </h2>
      </div>

      {/* Contenido */}
      <div className="w-full max-w-7xl mx-auto px-4 pb-10">
        {cargando ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500 mb-4"></div>
            <p className="text-lg md:text-2xl f1-light text-gray-400">Cargando resultados...</p>
          </div>
        ) : !gpInfo.disputado ? (
          <div className="text-center py-20">
            <h2 className="text-3xl md:text-5xl f1-bold mb-4">PRÓXIMAMENTE</h2>
            <p className="text-lg md:text-2xl f1-light text-gray-400">
              Este Gran Premio aún no se ha disputado.
            </p>
            <p className="text-base md:text-xl f1-light text-gray-500 mt-4">
              📅 {new Date(gpInfo.fecha).toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <h2 className="text-2xl md:text-4xl f1-bold text-red-500 mb-4">⚠️ Error</h2>
            <p className="text-lg md:text-2xl f1-light text-gray-400">{error}</p>
            <p className="text-sm md:text-lg f1-light text-gray-500 mt-4">
              Puede que esta sesión aún no esté disponible en la API.
            </p>
          </div>
        ) : datosCarrera && datosCarrera.resultados ? (
          <>
            {/* Podio */}
            {mostrarPodio && (
              <div className="w-full py-8 mb-8">
                {/* MÓVIL/TABLET: Vertical (orden 1-2-3) */}
                <div className="flex flex-col items-center gap-6 lg:hidden">
                  {/* 1º Puesto */}
                  <div className="flex flex-col items-center w-full max-w-[280px]">
                    <img
                      className="w-full h-auto max-h-[200px] object-contain"
                      src={obtenerImagenPiloto(datosCarrera.resultados[0].apellido)}
                      alt={datosCarrera.resultados[0].nombreCompleto}
                      onError={(e) => { e.currentTarget.src = "/Imagenes/f1.png"; }}
                    />
                    <img className="h-[200px] w-[200px]" src="/Imagenes/podium1.png" alt="Podium 1" />
                    <p className="text-white f1-light text-lg sm:text-xl text-center mt-2">
                      {sesionActual === "Race" ? `+${datosCarrera.resultados[0].puntos} PUNTOS` : "P1"}
                    </p>
                  </div>

                  {/* 2º Puesto */}
                  <div className="flex flex-col items-center w-full max-w-[280px]">
                    <img
                      className="w-full h-auto max-h-[200px] object-contain"
                      src={obtenerImagenPiloto(datosCarrera.resultados[1].apellido)}
                      alt={datosCarrera.resultados[1].nombreCompleto}
                      onError={(e) => { e.currentTarget.src = "/Imagenes/f1.png"; }}
                    />
                    <img className="h-[200px] w-[200px]" src="/Imagenes/podium2.png" alt="Podium 2" />
                    <p className="text-white f1-light text-base sm:text-lg text-center mt-2">
                      {sesionActual === "Race" ? `+${datosCarrera.resultados[1].puntos} PUNTOS` : "P2"}
                    </p>
                  </div>

                  {/* 3º Puesto */}
                  <div className="flex flex-col items-center w-full max-w-[280px]">
                    <img
                      className="w-full h-auto max-h-[200px] object-contain"
                      src={obtenerImagenPiloto(datosCarrera.resultados[2].apellido)}
                      alt={datosCarrera.resultados[2].nombreCompleto}
                      onError={(e) => { e.currentTarget.src = "/Imagenes/f1.png"; }}
                    />
                    <img className="h-[200px] w-[200px]" src="/Imagenes/podium3.png" alt="Podium 3" />
                    <p className="text-white f1-light text-sm sm:text-base text-center mt-2">
                      {sesionActual === "Race" ? `+${datosCarrera.resultados[2].puntos} PUNTOS` : "P3"}
                    </p>
                  </div>
                </div>

                {/* ESCRITORIO: Horizontal (orden 2-1-3) */}
                <div className="hidden lg:flex justify-center items-end gap-4">
                  {/* 2º Puesto */}
                  <div className="flex flex-col items-center w-[300px]">
                    <img
                      className="w-full h-auto max-h-[250px] object-contain"
                      src={obtenerImagenPiloto(datosCarrera.resultados[1].apellido)}
                      alt={datosCarrera.resultados[1].nombreCompleto}
                      onError={(e) => { e.currentTarget.src = "/Imagenes/f1.png"; }}
                    />
                    <img className="h-[250px] w-[250px]" src="/Imagenes/podium2.png" alt="Podium 2" />
                    <p className="text-white f1-light text-xl text-center mt-2">
                      {sesionActual === "Race" ? `+${datosCarrera.resultados[1].puntos} PUNTOS` : "P2"}
                    </p>
                  </div>

                  {/* 1º Puesto */}
                  <div className="flex flex-col items-center w-[300px]">
                    <img
                      className="w-full h-auto max-h-[280px] object-contain"
                      src={obtenerImagenPiloto(datosCarrera.resultados[0].apellido)}
                      alt={datosCarrera.resultados[0].nombreCompleto}
                      onError={(e) => { e.currentTarget.src = "/Imagenes/f1.png"; }}
                    />
                    <img className="h-[280px] w-[280px]" src="/Imagenes/podium1.png" alt="Podium 1" />
                    <p className="text-white f1-light text-2xl text-center mt-2">
                      {sesionActual === "Race" ? `+${datosCarrera.resultados[0].puntos} PUNTOS` : "P1"}
                    </p>
                  </div>

                  {/* 3º Puesto */}
                  <div className="flex flex-col items-center w-[300px]">
                    <img
                      className="w-full h-auto max-h-[220px] object-contain"
                      src={obtenerImagenPiloto(datosCarrera.resultados[2].apellido)}
                      alt={datosCarrera.resultados[2].nombreCompleto}
                      onError={(e) => { e.currentTarget.src = "/Imagenes/f1.png"; }}
                    />
                    <img className="h-[220px] w-[220px]" src="/Imagenes/podium3.png" alt="Podium 3" />
                    <p className="text-white f1-light text-lg text-center mt-2">
                      {sesionActual === "Race" ? `+${datosCarrera.resultados[2].puntos} PUNTOS` : "P3"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tabla de clasificación - RESPONSIVE LIMPIA */}
            <div className="w-full border-l border-r border-gray-400 mt-8">
              <div className="p-4">
                <h2 className="f1-bold text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-6 text-center">
                  CLASIFICACIÓN
                </h2>
                
                {/* MÓVIL: Cards apiladas */}
                <div className="block md:hidden space-y-3">
                  {datosCarrera.resultados.map((p) => (
                    <div 
                      key={p.numeroPiloto} 
                      className="bg-[#15151E] rounded-lg p-3 flex items-center gap-3"
                    >
                      <div className="f1-bold text-white text-xl w-8 text-center flex-shrink-0">
                        {p.posicion}
                      </div>
                      
                      <img
                        className="h-14 w-14 object-cover rounded flex-shrink-0"
                        src={obtenerImagenPiloto(p.apellido)}
                        alt={p.nombreCompleto}
                        onError={(e) => { e.currentTarget.src = "/Imagenes/f1.png"; }}
                      />
                      
                      <div className="flex-1 min-w-0">
                        <p className="f1-light text-white text-sm truncate">
                          {p.nombreCompleto}
                        </p>
                        <p className="f1-light text-gray-400 text-xs mt-1">
                          {sesionActual === "Race" 
                            ? `${p.puntos} pts` 
                            : p.intervalo}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* TABLET Y ESCRITORIO: Tabla */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="f1-bold text-white p-3 text-base lg:text-xl text-center">
                          Pos
                        </th>
                        <th className="f1-bold text-white p-3 text-base lg:text-xl text-left">
                          Piloto
                        </th>
                        <th className="f1-bold text-white p-3 text-base lg:text-xl text-center">
                          {sesionActual === "Race" ? "Puntos" : "Tiempo"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {datosCarrera.resultados.map((p, index) => (
                        <tr 
                          key={p.numeroPiloto}
                          className={`${index % 2 === 0 ? "bg-[#15151E]" : ""} hover:bg-[#1a1a24] transition-colors`}
                        >
                          <td className="p-3 f1-light text-white text-sm lg:text-lg text-center">
                            {p.posicion}
                          </td>
                          
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <img
                                className="h-12 w-12 lg:h-16 lg:w-16 object-cover rounded flex-shrink-0"
                                src={obtenerImagenPiloto(p.apellido)}
                                alt={p.nombreCompleto}
                                onError={(e) => { e.currentTarget.src = "/Imagenes/f1.png"; }}
                              />
                              <p className="f1-light text-white text-sm lg:text-lg">
                                {p.nombreCompleto}
                              </p>
                            </div>
                          </td>
                          
                          <td className="p-3 f1-light text-white text-sm lg:text-lg text-center">
                            {sesionActual === "Race" ? p.puntos : p.intervalo}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Información adicional */}
            <div className="mt-8 text-center text-gray-500 f1-light">
              <p className="text-xs sm:text-sm">Datos proporcionados por OpenF1 API</p>
              <p className="text-xs">Gran Premio de Australia 2025</p>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl md:text-4xl f1-bold mb-4">No hay datos disponibles</h2>
            <p className="text-lg md:text-2xl f1-light text-gray-400">
              No se pudieron cargar los resultados de esta sesión.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}