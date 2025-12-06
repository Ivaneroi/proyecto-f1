import React, { useRef, useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { obtenerUltimaCarreraInicio, obtenerClasificacionPilotosInicio, obtenerClasificacionEquiposInicio } from "../services/apiService";
import { obtenerImagenPiloto } from "../data/pilotosImagenes";

// --- MAPEADOR DE LOGOS DE EQUIPOS ---
function getTeamLogoPath(teamName) {
  if (!teamName) return "/Imagenes/team-default.png";

  const normalize = (s) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const name = normalize(teamName);

  const map = {
    "alpine": "/Imagenes/alpine.png",
    "aston": "/Imagenes/astonmartin.png",
    "astonmartin": "/Imagenes/astonmartin.png",
    "ferrari": "/Imagenes/ferrari.png",
    "mclaren": "/Imagenes/mclaren.png", 
    "mercedes": "/Imagenes/mercedes.png",
    "red bull": "/Imagenes/redbull.png",
    "racing bulls": "/Imagenes/racing-bulls.png",
    "vcb racing bulls": "/Imagenes/racing-bulls.png",
    "kick sauber": "/Imagenes/sauber.png",
    "sauber": "/Imagenes/sauber.png",
    "stake f1 team kick sauber": "/Imagenes/sauber.png",
    "williams": "/Imagenes/williams.png",
    "haas": "/Imagenes/haas.png",
    "haas f1 team": "/Imagenes/haas.png"
  };

  if (map[name]) return map[name];

  for (const key of Object.keys(map)) {
    if (name.includes(key)) return map[key];
  }

  return "/Imagenes/team-default.png";
}

// --- MAPEADOR DE NOMBRES CORTOS DE EQUIPOS ---
function getShortTeamName(teamName) {
  if (!teamName) return teamName;

  const normalize = (s) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const name = normalize(teamName);

  const shortNames = {
    "alpine": "Alpine",
    "aston": "Aston",
    "astonmartin": "Aston",
    "aston martin": "Aston",
    "ferrari": "Ferrari",
    "mclaren": "Mclaren",
    "mercedes": "Mercedes",
    "red bull": "Redbull",
    "redbull": "Redbull",
    "racing bulls": "RB",
    "vcb racing bulls": "RB",
    "kick sauber": "Sauber",
    "sauber": "Sauber",
    "stake f1 team kick sauber": "Sauber",
    "williams": "Williams",
    "haas": "Haas",
    "haas f1 team": "Haas"
  };

  if (shortNames[name]) return shortNames[name];

  for (const key of Object.keys(shortNames)) {
    if (name.includes(key)) return shortNames[key];
  }

  return teamName;
}

export default function Content() {
  const canvasRef = useRef(null);
  const firstImgRef = useRef(null);
  
  const [ultimaCarrera, setUltimaCarrera] = useState(null);
  const [pilotos, setPilotos] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        
        const [carreraData, pilotosData, equiposData] = await Promise.all([
          obtenerUltimaCarreraInicio(2025),
          obtenerClasificacionPilotosInicio(2025),
          obtenerClasificacionEquiposInicio(2025),
        ]);

        if (!carreraData.error) {
          setUltimaCarrera(carreraData);
        }
        
        setPilotos(pilotosData);
        setEquipos(equiposData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  useEffect(() => {
    if (!cargando && ultimaCarrera) {
      const img = firstImgRef.current;
      const onLoad = () => fireConfetti();
      if (img && !img.complete) {
        img.addEventListener("load", onLoad);
        return () => img.removeEventListener("load", onLoad);
      } else {
        fireConfetti();
      }
    }
  }, [cargando, ultimaCarrera]);

  function fireConfetti() {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    const first = firstImgRef.current;
    if (!canvas || !first) return;

    const myConfetti = confetti.create(canvas, { resize: true, useWorker: true });

    const rect = first.getBoundingClientRect();
    const originX = (rect.left + rect.width / 2) / window.innerWidth;
    const originY = ((rect.top + rect.height / 2) / window.innerHeight) + 0.3;

    myConfetti({
      particleCount: 140,
      spread: 70,
      startVelocity: 50,
      ticks: 400,
      origin: { x: originX, y: originY },
    });

    setTimeout(() => {
      myConfetti({
        particleCount: 60,
        spread: 100,
        scalar: 0.9,
        origin: { x: originX, y: Math.max(0, originY - 0.05) },
      });
    }, 300);
  }

  if (cargando) {
    return (
      <div className="principal-content bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500 mb-4"></div>
          <p className="text-2xl f1-light text-gray-400">Cargando resultados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="principal-content bg-black overflow-x-hidden">
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Nombre del GRAN PREMIO - Responsive */}
      <div className="cont-grand-prix-name min-h-[150px] md:h-[200px] w-full pt-6 md:pt-10 px-4">
        <h1 className="title-gp f1-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white text-center">
          {ultimaCarrera ? ultimaCarrera.carrera.nombre.toUpperCase() : "TEMPORADA"} <span className="red-strong">2025</span>
        </h1>
        {ultimaCarrera && (
          <p className="text-lg sm:text-xl md:text-2xl f1-light text-gray-400 text-center mt-2">
            {ultimaCarrera.carrera.circuito} • {ultimaCarrera.carrera.pais}
          </p>
        )}
      </div>

      {/* Podio - Vertical en móvil, Horizontal en escritorio */}
      {ultimaCarrera && ultimaCarrera.podio && ultimaCarrera.podio.length >= 3 && (
        <div className="container-podium w-full py-8 px-4">
          {/* MÓVIL/TABLET: Vertical (orden 1-2-3) */}
          <div className="flex flex-col items-center gap-6 lg:hidden">
            {/* 1º Puesto */}
            <div className="place1 flex flex-col items-center w-full max-w-[300px]">
              <img
                className="w-full h-auto cursor-pointer"
                src={obtenerImagenPiloto(ultimaCarrera.podio[0].apellido)}
                alt={ultimaCarrera.podio[0].nombreCompleto}
                ref={firstImgRef}
                onClick={fireConfetti}
                onError={(e) => { e.currentTarget.src = "/Imagenes/f1.png"; }}
              />
              <img className="h-[250px] w-[250px]" src="/Imagenes/podium1.png" alt="Podium 1" />
              <p className="text-white f1-light text-2xl text-center">+{ultimaCarrera.podio[0].puntos} PUNTOS</p>
            </div>

            {/* 2º Puesto */}
            <div className="place2 flex flex-col items-center w-full max-w-[300px]">
              <img
                className="w-full h-auto"
                src={obtenerImagenPiloto(ultimaCarrera.podio[1].apellido)}
                alt={ultimaCarrera.podio[1].nombreCompleto}
                onError={(e) => { e.currentTarget.src = "/Imagenes/f1.png"; }}
              />
              <img className="h-[250px] w-[250px]" src="/Imagenes/podium2.png" alt="Podium 2" />
              <p className="text-white f1-light text-xl text-center">+{ultimaCarrera.podio[1].puntos} PUNTOS</p>
            </div>

            {/* 3º Puesto */}
            <div className="place3 flex flex-col items-center w-full max-w-[300px]">
              <img
                className="w-full h-auto"
                src={obtenerImagenPiloto(ultimaCarrera.podio[2].apellido)}
                alt={ultimaCarrera.podio[2].nombreCompleto}
                onError={(e) => { e.currentTarget.src = "/Imagenes/f1.png"; }}
              />
              <img className="h-[250px] w-[250px]" src="/Imagenes/podium3.png" alt="Podium 3" />
              <p className="text-white f1-light text-lg text-center">+{ultimaCarrera.podio[2].puntos} PUNTOS</p>
            </div>
          </div>

          {/* ESCRITORIO: Horizontal (orden 2-1-3) */}
          <div className="hidden lg:flex justify-center h-[700px]">
            {/* 2º Puesto */}
            <div className="place2 p-12 flex justify-center flex-col h-[600px] w-[300px]">
              <img
                className="w-full h-auto"
                src={obtenerImagenPiloto(ultimaCarrera.podio[1].apellido)}
                alt={ultimaCarrera.podio[1].nombreCompleto}
                onError={(e) => { e.currentTarget.src = "/Imagenes/f1.png"; }}
              />
              <img className="step2 h-[300px] w-[300px]" src="/Imagenes/podium2.png" alt="Podium 2" />
              <p className="text-white f1-light text-2xl text-center">+{ultimaCarrera.podio[1].puntos} PUNTOS</p>
            </div>

            {/* 1º Puesto */}
            <div className="place1 flex-col justify-center h-[600px] w-[300px]">
              <img
                className="w-full h-auto cursor-pointer"
                src={obtenerImagenPiloto(ultimaCarrera.podio[0].apellido)}
                alt={ultimaCarrera.podio[0].nombreCompleto}
                ref={firstImgRef}
                onClick={fireConfetti}
                onError={(e) => { e.currentTarget.src = "/Imagenes/f1.png"; }}
              />
              <img className="step1 h-[300px] w-[270px] pl-6" src="/Imagenes/podium1.png" alt="Podium 1" />
              <p className="text-white f1-light text-3xl text-center">+{ultimaCarrera.podio[0].puntos} PUNTOS</p>
            </div>

            {/* 3º Puesto */}
            <div className="place3 p-12 flex-col h-[600px] w-[300px]">
              <img
                className=""
                src={obtenerImagenPiloto(ultimaCarrera.podio[2].apellido)}
                alt={ultimaCarrera.podio[2].nombreCompleto}
                onError={(e) => { e.currentTarget.src = "/Imagenes/f1.png"; }}
              />
              <img className="step3 h-[300px] w-[300px]" src="/Imagenes/podium3.png" alt="Podium 3" />
              <p className="text-white f1-light text-xl text-center">+{ultimaCarrera.podio[2].puntos} PUNTOS</p>
            </div>
          </div>
        </div>
      )}

      {/* Clasificación Pilotos + Equipos - Vertical en móvil/tablet, Horizontal en escritorio */}
      <div className="clasification-cont grid grid-cols-1 lg:grid-cols-2 gap-0 border-l border-r border-gray-400 mt-10 mx-2 lg:mx-0">
        
        {/* Clasificación Pilotos */}
        <div className="cont-clasification-pilots border-b lg:border-b-0 lg:border-r border-gray-400 p-2 md:p-4">
          <h2 className="f1-bold text-white text-2xl md:text-3xl lg:text-4xl mb-2 text-center">Pilotos</h2>
          
          {/* Tabla responsive */}
          <div className="overflow-x-auto">
            <div className="grid grid-cols-3 text-center">
              <div className="f1-bold text-white border-b border-gray-300 p-2 md:p-4 text-lg md:text-xl lg:text-2xl">Pos</div>
              <div className="f1-bold text-white border-b border-gray-300 p-2 md:p-4 text-lg md:text-xl lg:text-2xl">Nombre</div>
              <div className="f1-bold text-white border-b border-gray-300 p-2 md:p-4 text-lg md:text-xl lg:text-2xl">Puntos</div>
              
              {pilotos.map((p) => (
                <React.Fragment key={p.numeroPiloto}>
                  {/* Posición */}
                  <div className="p-2 md:p-4 f1-light text-white text-base md:text-xl lg:text-2xl flex items-center justify-center">
                    {p.posicion}
                  </div>
                  
                  {/* Foto + Nombre - Centrado y alineado */}
                  <div className="flex items-center p-2 md:p-4 gap-2 md:gap-3 lg:gap-4 lg:ml-28">
                    <div className="flex-shrink-0">
                      <img
                        className="h-[60px] w-[60px] md:h-[80px] md:w-[80px] lg:h-[85px] lg:w-[60px] object-cover rounded"
                        src={obtenerImagenPiloto(p.apellido)}
                        alt={p.nombreCompleto}
                        onError={(e) => { e.currentTarget.src = "/Imagenes/f1.png"; }}
                      />
                    </div>
                    <p className="f1-light text-white text-xs md:text-base lg:text-2xl">{p.apellido}</p>
                  </div>
                  
                  {/* Puntos */}
                  <div className="p-2 md:p-4 f1-light text-white text-base md:text-xl lg:text-2xl flex items-center justify-center">
                    {p.puntos}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Clasificación Equipos */}
        <div className="cont-clasification-teams p-2 md:p-4">
          <h2 className="f1-bold text-white text-2xl md:text-3xl lg:text-4xl mb-2 text-center">Equipos</h2>
          
          {/* Tabla responsive */}
          <div className="overflow-x-auto">
            <div className="grid grid-cols-[100px_1fr_120px] lg:grid-cols-[120px_1fr_150px]">
              <div className="f1-bold text-white border-b border-gray-300 p-2 md:p-4 text-lg md:text-xl lg:text-2xl text-center">Pos</div>
              <div className="f1-bold text-white border-b border-gray-300 p-2 md:p-4 text-lg md:text-xl lg:text-2xl text-center">Equipo</div>
              <div className="f1-bold text-white border-b border-gray-300 p-2 md:p-4 text-lg md:text-xl lg:text-2xl text-center">Puntos</div>

              {equipos.map((e) => (
                <React.Fragment key={e.nombre}>
                  {/* Posición */}
                  <div className="p-2 md:p-4 f1-light text-white text-base md:text-xl lg:text-2xl flex items-center justify-center">
                    {e.posicion}
                  </div>

                  {/* Logo + Nombre - Centrado y alineado */}
                  <div className="flex items-center p-2 md:pl-44 md:p-4 gap-2 md:gap-3 lg:gap-4 lg:pl-96">
                    <div className="flex-shrink-0">
                      <img
                        className="h-[50px] w-[50px] md:h-[60px] md:w-[60px] lg:h-[70px] lg:w-[70px] object-contain"
                        src={getTeamLogoPath(e.nombre)}
                        alt={e.nombre}
                        onError={(ev) => { ev.currentTarget.src = "/Imagenes/team-default.png"; }}
                      />
                    </div>
                    <p className="f1-light text-white text-xs md:text-base lg:text-2xl">{getShortTeamName(e.nombre)}</p>
                  </div>

                  {/* Puntos */}
                  <div className="p-2 md:p-4 f1-light text-white text-base md:text-xl lg:text-2xl flex items-center justify-center">
                    {e.puntos}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}