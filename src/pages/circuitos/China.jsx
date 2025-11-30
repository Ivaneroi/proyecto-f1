import React, { useState, useEffect } from "react";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import { obtenerDatosSesionBackend } from "../../services/apiService";
import { obtenerImagenPiloto } from "../../data/pilotosImagenes";

export default function China() {
  // Estados
  const [sesionActual, setSesionActual] = useState("Race");
  const [datosCarrera, setDatosCarrera] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Información del GP (hardcoded para China)
  const gpInfo = {
    nombre: "Gran Premio de China",
    circuito: "Shanghai International Circuit",
    pais: "China",
    ciudad: "Shanghai",
    fecha: "2025-03-23",
    imagen: "/Imagenes/circuitos/china.jpg",
    disputado: true,
    esSprint: true,
  };

  // Tipos de sesiones disponibles
  const sesiones = [
    { id: "Practice 1", nombre: "Libres 1", corto: "FP1" },
    { id: "Sprint Qualifying", nombre: "Clasificación Sprint", corto: "SQ" },
    { id: "Sprint", nombre: "Sprint", corto: "Sprint" },
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
        
        // Obtener datos desde el backend
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

  // Mostrar podio solo en Carrera, Qualy y Sprint
  const mostrarPodio = (sesionActual === "Race" || sesionActual === "Qualifying" || sesionActual === "Sprint") && 
                     datosCarrera && 
                     datosCarrera.resultados && 
                     datosCarrera.resultados.length >= 3;

  return (
    <div className="china-page bg-black text-white min-h-screen">
      <Menu />

      {/* Nombre del Gran Premio */}
      <div className="cont-grand-prix-name h-[200px] w-full pt-10">
        <h1 className="title-gp f1-title text-6xl text-white text-center">
          {gpInfo.nombre.toUpperCase()} <span className="red-strong">2025</span>
        </h1>
        <p className="text-3xl f1-light text-gray-400 text-center mt-2">
          {gpInfo.circuito} • {gpInfo.ciudad}, {gpInfo.pais}
        </p>
      </div>

      {/* Botones de sesiones */}
      <div className="flex justify-center gap-2 mb-8 px-4">
        {sesiones.map((sesion) => (
          <button
            key={sesion.id}
            onClick={() => setSesionActual(sesion.id)}
            className={`px-6 py-3 rounded-lg f1-bold text-xl transition-all duration-300 ${
              sesionActual === sesion.id
                ? "bg-red-600 text-white scale-105"
                : "bg-[#15151E] text-gray-400 hover:bg-[#1a1a24] hover:text-white"
            }`}
          >
            {sesion.corto}
          </button>
        ))}
      </div>

      {/* Nombre de la sesión actual */}
      <div className="text-center mb-6">
        <h2 className="text-4xl f1-bold text-white">
          {sesiones.find(s => s.id === sesionActual)?.nombre.toUpperCase()}
        </h2>
      </div>

      {/* Contenido */}
      <div className="container mx-auto px-4 pb-10">
        {cargando ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500 mb-4"></div>
            <p className="text-2xl f1-light text-gray-400">Cargando resultados...</p>
          </div>
        ) : !gpInfo.disputado ? (
          <div className="text-center py-20">
            <h2 className="text-5xl f1-bold mb-4">PRÓXIMAMENTE</h2>
            <p className="text-2xl f1-light text-gray-400">
              Este Gran Premio aún no se ha disputado.
            </p>
            <p className="text-xl f1-light text-gray-500 mt-4">
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
            <h2 className="text-4xl f1-bold text-red-500 mb-4">⚠️ Error</h2>
            <p className="text-2xl f1-light text-gray-400">{error}</p>
            <p className="text-lg f1-light text-gray-500 mt-4">
              Puede que esta sesión aún no esté disponible en la API.
            </p>
          </div>
        ) : datosCarrera && datosCarrera.resultados ? (
          <>
            {mostrarPodio && (
              <div className="container-podium h-[700px] w-full pt-15 flex justify-center mb-10">
                <div className="place2 p-12 flex justify-center flex-col h-[600px] w-[300px]">
                  <img
                    className="w-full h-auto"
                    src={obtenerImagenPiloto(datosCarrera.resultados[1].apellido)}
                    alt={datosCarrera.resultados[1].nombreCompleto}
                    onError={(e) => { e.currentTarget.src = "/Imagenes/f1.png"; }}
                  />
                  <img className="step2 h-[300px] w-[300px]" src="/Imagenes/podium2.png" alt="Podium 2" />
                  <p className="text-white f1-light text-2xl text-center">
                    {sesionActual === "Race" ? `+${datosCarrera.resultados[1].puntos} PUNTOS` : "P2"}
                  </p>
                </div>

                <div className="place1 flex-col justify-center h-[600px] w-[300px]">
                  <img
                    className="w-full h-auto"
                    src={obtenerImagenPiloto(datosCarrera.resultados[0].apellido)}
                    alt={datosCarrera.resultados[0].nombreCompleto}
                    onError={(e) => { e.currentTarget.src = "/Imagenes/f1.png"; }}
                  />
                  <img className="step1 h-[300px] w-[270px] pl-6" src="/Imagenes/podium1.png" alt="Podium 1" />
                  <p className="text-white f1-light text-3xl text-center">
                    {sesionActual === "Race" ? `+${datosCarrera.resultados[0].puntos} PUNTOS` : "P1"}
                  </p>
                </div>

                <div className="place3 p-12 flex-col h-[600px] w-[300px]">
                  <img
                    className=""
                    src={obtenerImagenPiloto(datosCarrera.resultados[2].apellido)}
                    alt={datosCarrera.resultados[2].nombreCompleto}
                    onError={(e) => { e.currentTarget.src = "/Imagenes/f1.png"; }}
                  />
                  <img className="step3 h-[300px] w-[300px]" src="/Imagenes/podium3.png" alt="Podium 3" />
                  <p className="text-white f1-light text-xl text-center">
                    {sesionActual === "Race" ? `+${datosCarrera.resultados[2].puntos} PUNTOS` : "P3"}
                  </p>
                </div>
              </div>
            )}

            <div className="clasification-cont border-l border-r border-gray-400 mt-10 max-w-6xl mx-auto">
              <div className="cont-clasification-pilots p-4">
                <h2 className="f1-bold text-white text-4xl mb-2 text-center">CLASIFICACIÓN</h2>
                <div className="grid grid-cols-3 text-center">
                  <div className="f1-bold text-white border-b border-gray-300 p-4 text-2xl">Pos</div>
                  <div className="f1-bold text-white border-b border-gray-300 p-4 text-2xl">Piloto</div>
                  <div className="f1-bold text-white border-b border-gray-300 p-4 text-2xl">
                    {sesionActual === "Race" ? "Puntos" : "Tiempo/Intervalo"}
                  </div>
                  
                  {datosCarrera.resultados.map((p) => (
                    <React.Fragment key={p.numeroPiloto}>
                      <div className="p-4 f1-light text-white text-2xl">{p.posicion}</div>
                      <div className="photo-and-name-pilot flex pl-24">
                        <div className="cont-photo-pilot pb-5">
                          <img
                            className="photo-pilot1 h-96 w-96"
                            src={obtenerImagenPiloto(p.apellido)}
                            alt={p.nombreCompleto}
                            onError={(e) => { e.currentTarget.src = "/Imagenes/f1.png"; }}
                          />
                        </div>
                        <p className="p-4 f1-light text-white text-2xl">{p.nombreCompleto}</p>
                      </div>
                      <div className="p-4 f1-light text-white text-2xl">
                        {sesionActual === "Race" ? p.puntos : p.intervalo}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 text-center text-gray-500 f1-light">
              <p>Datos proporcionados por OpenF1 API</p>
              <p className="text-sm">Gran Premio de China 2025</p>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-4xl f1-bold mb-4">No hay datos disponibles</h2>
            <p className="text-2xl f1-light text-gray-400">
              No se pudieron cargar los resultados de esta sesión.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}