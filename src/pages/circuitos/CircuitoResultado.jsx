import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import { circuitos } from "../../data/circuitos";
import { obtenerDatosSesionBackend } from "../../services/apiService";
import { obtenerImagenPiloto } from "../../data/pilotosImagenes";

export default function CircuitoResultado() {
  const { circuitoNombre } = useParams();
  
  // Estados
  const [sesionActual, setSesionActual] = useState("Race");
  const [datosCarrera, setDatosCarrera] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Lista de pilotos con "problemas" que deben mostrarse más anchos
  const problematicPilots = [
    "verstappen",
    "russell",
    "albon",
    "antonelli",
    "hulkenberg",
    "leclerc",
    "hamilton",
    "ocon",
    "bearman",
    "bortoleto",
    "alonso",
  ];

  // Buscar el circuito en el array local
  const circuito = circuitos.find((c) => {
    const nombre = c.nombre
      .toLowerCase()
      .replace("gran premio de ", "")
      .replace(/\s+/g, "-")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return nombre === circuitoNombre;
  });

  // --- MAPA DE PUNTOS SPRINT (solo top8) ---
  const sprintPointsMap = {
    1: 8,
    2: 7,
    3: 6,
    4: 5,
    5: 4,
    6: 3,
    7: 2,
    8: 1,
  };

  // Tipos de sesiones
  const sesiones = circuito?.esSprint
    ? [
        { id: "Practice 1", nombre: "Libres 1", corto: "FP1" },
        { id: "Sprint Qualifying", nombre: "Clasificación Sprint", corto: "SQ" },
        { id: "Sprint", nombre: "Sprint", corto: "Sprint" },
        { id: "Qualifying", nombre: "Clasificación", corto: "Q" },
        { id: "Race", nombre: "Carrera", corto: "R" },
      ]
    : [
        { id: "Practice 1", nombre: "Libres 1", corto: "FP1" },
        { id: "Practice 2", nombre: "Libres 2", corto: "FP2" },
        { id: "Practice 3", nombre: "Libres 3", corto: "FP3" },
        { id: "Qualifying", nombre: "Clasificación", corto: "Q" },
        { id: "Race", nombre: "Carrera", corto: "R" },
      ];

  // Inicializar sesionActual si circuito cambia y la sesión actual no está en el array
  useEffect(() => {
    if (sesiones && sesiones.length > 0 && !sesiones.find(s => s.id === sesionActual)) {
      setSesionActual(sesiones[0].id);
    }
  }, [circuito]);

  // Cargar datos cuando cambia la sesión
  useEffect(() => {
    const cargarDatos = async () => {
      if (!circuito || !circuito.disputado) {
        setCargando(false);
        return;
      }

      try {
        setCargando(true);
        setError(null);
        
        // Obtener datos desde el backend
        const datos = await obtenerDatosSesionBackend(circuito.pais, sesionActual, 2025);
        
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
  }, [circuito, sesionActual]);

  // Si no se encuentra el circuito
  if (!circuito) {
    return (
      <div className="bg-black text-white min-h-screen">
        <Menu />
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <h1 className="text-6xl f1-bold mb-4">404</h1>
          <p className="text-2xl f1-light">Circuito no encontrado</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Mostrar podio solo en Carrera, Qualy y Sprint
  const mostrarPodio = (sesionActual === "Race" || sesionActual === "Qualifying" || sesionActual === "Sprint") &&
                       datosCarrera &&
                       datosCarrera.resultados &&
                       datosCarrera.resultados.length >= 3;

  // Helper para comprobar si un piloto está en la lista problemática
  function isProblematic(apellido) {
    if (!apellido) return false;
    return problematicPilots.includes(String(apellido).toLowerCase());
  }

  // Helper: devolver lo que hay que mostrar en la columna derecha (puntos o intervalo)
  function mostrarValorFila(p) {
    const pos = Number(p.posicion);
    if (sesionActual === "Race") {
      return p.puntos ?? 0;
    }
    if (sesionActual === "Sprint") {
      return sprintPointsMap[pos] || 0;
    }
    return p.intervalo ?? "---";
  }

  // Texto header
  function headerLabel() {
    if (sesionActual === "Race") return "Puntos";
    if (sesionActual === "Sprint") return "Puntos (Sprint)";
    return "Tiempo/Intervalo";
  }

  return (
    <div className="circuito-resultado-page bg-black text-white min-h-screen">
      <Menu />

      {/* Nombre del Gran Premio */}
      <div className="cont-grand-prix-name h-[200px] w-full pt-10">
        <h1 className="title-gp f1-title text-6xl text-white text-center">
          {circuito.nombre.toUpperCase()} <span className="red-strong">2025</span>
        </h1>
        <p className="text-3xl f1-light text-gray-400 text-center mt-2">
          {circuito.circuito} • {circuito.ciudad}, {circuito.pais}
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
        ) : !circuito.disputado ? (
          <div className="text-center py-20">
            <h2 className="text-5xl f1-bold mb-4">PRÓXIMAMENTE</h2>
            <p className="text-2xl f1-light text-gray-400">Este Gran Premio aún no se ha disputado.</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <h2 className="text-4xl f1-bold text-red-500 mb-4">⚠️ Error</h2>
            <p className="text-2xl f1-light text-gray-400">{error}</p>
          </div>
        ) : datosCarrera && datosCarrera.resultados ? (
          <>
            {/* Podio */}
            {mostrarPodio && (
              <div className="container-podium h-[700px] w-full pt-15 flex justify-center mb-10">
                {/* 2º */}
                <div className="place2 p-12 flex justify-center flex-col h-[600px] w-[300px]">
                  <img
                    className="w-full h-auto"
                    src={obtenerImagenPiloto(datosCarrera.resultados[1].apellido)}
                    alt={datosCarrera.resultados[1].nombreCompleto}
                    onError={(e) => { e.currentTarget.src = "/Imagenes/f1.png"; }}
                  />
                  <img className="step2 h-[300px] w-[300px]" src="/Imagenes/podium2.png" alt="Podium 2" />
                  <p className="text-white f1-light text-2xl text-center">
                    {(sesionActual === "Race" || sesionActual === "Sprint")
                      ? `+${mostrarValorFila(datosCarrera.resultados[1])} PUNTOS`
                      : "P2"}
                  </p>
                </div>

                {/* 1º */}
                <div className="place1 flex-col justify-center h-[600px] w-[300px]">
                  <img
                    className="w-full h-auto"
                    src={obtenerImagenPiloto(datosCarrera.resultados[0].apellido)}
                    alt={datosCarrera.resultados[0].nombreCompleto}
                    onError={(e) => { e.currentTarget.src = "/Imagenes/f1.png"; }}
                  />
                  <img className="step1 h-[300px] w-[270px] pl-6" src="/Imagenes/podium1.png" alt="Podium 1" />
                  <p className="text-white f1-light text-3xl text-center">
                    {(sesionActual === "Race" || sesionActual === "Sprint")
                      ? `+${mostrarValorFila(datosCarrera.resultados[0])} PUNTOS`
                      : "P1"}
                  </p>
                </div>

                {/* 3º */}
                <div className="place3 p-12 flex-col h-[600px] w-[300px]">
                  <img
                    className=""
                    src={obtenerImagenPiloto(datosCarrera.resultados[2].apellido)}
                    alt={datosCarrera.resultados[2].nombreCompleto}
                    onError={(e) => { e.currentTarget.src = "/Imagenes/f1.png"; }}
                  />
                  <img className="step3 h-[300px] w-[300px]" src="/Imagenes/podium3.png" alt="Podium 3" />
                  <p className="text-white f1-light text-xl text-center">
                    {(sesionActual === "Race" || sesionActual === "Sprint")
                      ? `+${mostrarValorFila(datosCarrera.resultados[2])} PUNTOS`
                      : "P3"}
                  </p>
                </div>
              </div>
            )}

            {/* Tabla de clasificación */}
            <div className="clasification-cont border-l border-r border-gray-400 mt-10 max-w-6xl mx-auto">
              <div className="cont-clasification-pilots p-4">
                <h2 className="f1-bold text-white text-4xl mb-2 text-center">CLASIFICACIÓN</h2>
                <div className="grid grid-cols-3 text-center">
                  <div className="f1-bold text-white border-b border-gray-300 p-4 text-2xl">Pos</div>
                  <div className="f1-bold text-white border-b border-gray-300 p-4 text-2xl">Piloto</div>
                  <div className="f1-bold text-white border-b border-gray-300 p-4 text-2xl">{headerLabel()}</div>

                  {datosCarrera.resultados.map((p) => {
                    const apellido = String(p.apellido || "").toLowerCase();
                    const isProblem = isProblematic(apellido);

                    const imgClass = isProblem
                      ? "photo-pilot1 h-[80px] w-[110px] object-cover rounded"
                      : "photo-pilot1 h-[80px] w-[80px] object-cover rounded";

                    return (
                      <React.Fragment key={p.numeroPiloto}>
                        <div className="p-4 f1-light text-white text-2xl">{p.posicion}</div>

                        <div className="photo-and-name-pilot flex pl-24 items-center">
                          <div className="cont-photo-pilot pb-5">
                            <img
                              className={imgClass}
                              src={obtenerImagenPiloto(p.apellido)}
                              alt={p.nombreCompleto}
                              onError={(e) => { e.currentTarget.src = "/Imagenes/f1.png"; }}
                            />
                          </div>

                          <p className="p-4 f1-light text-white text-2xl">{p.nombreCompleto}</p>
                        </div>

                        <div className="p-4 f1-light text-white text-2xl">
                          {sesionActual === "Race" || sesionActual === "Sprint"
                            ? mostrarValorFila(p)
                            : p.intervalo}
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Información adicional */}
            <div className="mt-8 text-center text-gray-500 f1-light">
              <p>Datos proporcionados por OpenF1 API</p>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-4xl f1-bold mb-4">No hay datos disponibles</h2>
            <p className="text-2xl f1-light text-gray-400">No se pudieron cargar los resultados de esta sesión.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}