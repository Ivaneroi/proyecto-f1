import React, { useRef, useEffect } from "react";
import confetti from "canvas-confetti";

const pilotos = [
  //Array con el nombre e imagen de los pilotos
  { pos: 1, nombre: "Verstappen", puntos: 400, img: "/Imagenes/verstappen.png" },
  { pos: 2, nombre: "Hamilton", puntos: 350, img: "/Imagenes/hamilton.png" },
  { pos: 3, nombre: "Leclerc", puntos: 340, img: "/Imagenes/leclerc.png" },
  { pos: 4, nombre: "Norris", puntos: 320, img: "/Imagenes/norris.png" },
  { pos: 5, nombre: "Sainz", puntos: 310, img: "/Imagenes/sainz.png" },
  { pos: 6, nombre: "Alonso", puntos: 300, img: "/Imagenes/alonso.png" },
  { pos: 7, nombre: "Russell", puntos: 290, img: "/Imagenes/russell.png" },
  { pos: 8, nombre: "Lawson", puntos: 280, img: "/Imagenes/lawson.png" },
  { pos: 9, nombre: "Piastri", puntos: 270, img: "/Imagenes/piastri.png" },
  { pos: 10, nombre: "Stroll", puntos: 260, img: "/Imagenes/stroll.png" },
  { pos: 11, nombre: "Gasly", puntos: 250, img: "/Imagenes/gasly.png" },
  { pos: 12, nombre: "Ocon", puntos: 240, img: "/Imagenes/ocon.png" },
  { pos: 13, nombre: "Tsunoda", puntos: 230, img: "/Imagenes/tsunoda.png" },
  { pos: 14, nombre: "Albon", puntos: 220, img: "/Imagenes/albon.png" },
  { pos: 15, nombre: "Hadjar", puntos: 210, img: "/Imagenes/hadjar.png" },
  { pos: 16, nombre: "Hulkenberg", puntos: 200, img: "/Imagenes/hulkenberg.png" },
  { pos: 17, nombre: "Colapinto", puntos: 190, img: "/Imagenes/colapinto.png" },
  { pos: 18, nombre: "Bearman", puntos: 180, img: "/Imagenes/bearman.png" },
  { pos: 19, nombre: "Antonelli", puntos: 170, img: "/Imagenes/antonelli.png" },
  { pos: 20, nombre: "Bortoleto", puntos: 160, img: "/Imagenes/bortoleto.png" },
];
//Array con los equipos de F1
const equipos = [
  { pos: 1, nombre: "Red Bull", puntos: 650, img: "/Imagenes/redbull.png" },
  { pos: 2, nombre: "Mercedes", puntos: 600, img: "/Imagenes/mercedes.png" },
  { pos: 3, nombre: "Ferrari", puntos: 580, img: "/Imagenes/ferrari.png" },
  { pos: 4, nombre: "McLaren", puntos: 540, img: "/Imagenes/mclaren.png" },
  { pos: 5, nombre: "Aston Martin", puntos: 500, img: "/Imagenes/astonmartin.png" },
  { pos: 6, nombre: "Alpine", puntos: 420, img: "/Imagenes/alpine.png" },
  { pos: 7, nombre: "Williams", puntos: 350, img: "/Imagenes/williams.png" },
  { pos: 8, nombre: "RB", puntos: 320, img: "/Imagenes/rb.png" },
  { pos: 9, nombre: "Sauber", puntos: 300, img: "/Imagenes/sauber.png" },
  { pos: 10, nombre: "Haas", puntos: 280, img: "/Imagenes/haas.png" },
];

export default function Content() {
  const canvasRef = useRef(null);
  const firstImgRef = useRef(null);

  useEffect(() => {
    const img = firstImgRef.current;
    const onLoad = () => fireConfetti();
    // Si la imagen no está cargada, esperamos al load; si ya lo está, disparamos ya.
    if (img && !img.complete) {
      img.addEventListener("load", onLoad);
      return () => img.removeEventListener("load", onLoad);
    } else {
      fireConfetti();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fireConfetti() { //Animación de confeti
    if (typeof window === "undefined") return; // seguridad SSR

    const canvas = canvasRef.current;
    const first = firstImgRef.current;
    if (!canvas || !first) return;

    // instancia ligada al canvas, se ajusta al tamaño del viewport
    const myConfetti = confetti.create(canvas, { resize: true, useWorker: true });

    // posición del elemento en la ventana (viewport)
    const rect = first.getBoundingClientRect();
    const originX = (rect.left + rect.width / 2) / window.innerWidth;
    const originY = ((rect.top + rect.height / 2) / window.innerHeight) + 0.3;

    // disparo principal
    myConfetti({
      particleCount: 140,
      spread: 70,
      startVelocity: 50,
      ticks: 400,
      origin: { x: originX, y: originY },
    });

    // puff extra para más efecto
    setTimeout(() => {
      myConfetti({
        particleCount: 60,
        spread: 100,
        scalar: 0.9,
        origin: { x: originX, y: Math.max(0, originY - 0.05) },
      });
    }, 300);
  }

  return (
    <div className="principal-content bg-black">
      {/* Canvas en primer plano para el confeti */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50"
        style={{ width: "100%", height: "100%" }}
      />

      {/*Nombre del GRAN PREMIO */}
      <div className="cont-grand-prix-name h-[200px] w-full pt-10">
        <h1 className="title-gp f1-title text-6xl text-white">
          GRAN PREMIO DE AZERBAIYAN <span className="red-strong">2025</span>
        </h1>
      </div>

      {/*Podio*/}
      <div className="container-podium h-[700px] w-full pt-15 flex justify-center">
        <div className="place2 p-12 flex justify-center flex-col h-[600px] w-[300px]">
          <img
            className="w-full h-auto"
            id="second-place"
            src="/Imagenes/alonso.png"
            alt="Alonso"
          />
          <img
            className="step2  h-[300px] w-[300px]"
            id="second-step"
            src="/Imagenes/podium2.png"
            alt="Podium 2"
          />
          <p className="text-white f1-light text-2xl">+18 PUNTOS</p>
        </div>

        <div className="place1 flex-col justify-center  h-[600px] w-[300px]">
          <img
            className="w-full h-auto cursor-pointer"
            id="first-place"
            src="/Imagenes/verstappen.png"
            alt="Verstappen"
            ref={firstImgRef}
            onClick={fireConfetti} // click para repetir el confeti sin añadir botones
          />
          <img
            className="step1  h-[300px] w-[270px] pl-6"
            id="first-step"
            src="/Imagenes/podium1.png"
            alt="Podium 1"
          />
          <p className="text-white f1-light text-3xl">+25 PUNTOS</p>
        </div>

        <div className="place3 p-12 flex-col  h-[600px] w-[300px]">
          <img
            className=""
            id="third-place"
            src="/Imagenes/leclerc.png"
            alt="Leclerc"
          />
          <img
            className="step3  h-[300px] w-[300px]"
            id="third-step"
            src="/Imagenes/podium3.png"
            alt="Podium 3"
          />
          <p className="text-white f1-light text-xl">+15 PUNTOS</p>
        </div>
      </div>

      {/* Clasificación Pilotos + Equipos */}
      <div className="clasification-cont grid grid-cols-2 gap-0 border-l border-r border-gray-400 mt-10">
        <div className="cont-clasification-pilots border-r border-gray-400 p-4">
          <h2 className="f1-bold text-white text-4xl mb-2">Pilotos</h2>
          <div className="grid grid-cols-3 text-center">
            <div className="f1-bold text-white border-b border-gray-300 p-4 text-2xl">
              Pos
            </div>
            <div className="f1-bold text-white border-b border-gray-300 p-4 text-2xl">
              Nombre
            </div>
            <div className="f1-bold text-white border-b border-gray-300 p-4 text-2xl">
              Puntos
            </div>
            {pilotos.map((p) => (
              <React.Fragment key={p.pos}>
                <div className="p-4 f1-light text-white text-2xl">{p.pos}</div>
                <div className="photo-and-name-pilot flex  pl-24">
                  <div className="cont-photo-pilot pb-5">
                    <img
                      className="photo-pilot1 h-[80px] w-[80px]"
                      src={p.img}
                      alt={p.nombre}
                    />
                  </div>
                  <p className="p-4  f1-light text-white text-2xl f1-light">{p.nombre}</p>
                </div>
                <div className="p-4 f1-light text-white text-2xl">
                  {p.puntos}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Clasificación Equipos */}
        <div className="cont-clasification-teams p-4">
          <h2 className="f1-bold text-white text-4xl mb-2">Equipos</h2>
          <div className="grid grid-cols-3 text-center">
            <div className="f1-bold text-white border-b border-gray-300 p-4 text-2xl">
              Pos
            </div>
            <div className="f1-bold text-white border-b border-gray-300 p-4 text-2xl">
              Equipo
            </div>
            <div className="f1-bold text-white border-b border-gray-300 p-4 text-2xl">
              Puntos
            </div>
            {equipos.map((e) => (
              <React.Fragment key={e.pos}>
                <div className="p-4 f1-light text-white text-2xl">{e.pos}</div>
                <div className="photo-and-name-team flex pl-9">
                  <div className="cont-photo-team pb-5">
                    <img
                      className="photo-team h-[80px] w-[80px]"
                      src={e.img}
                      alt={e.nombre}
                    />
                  </div>
                  <p className="p-4 f1-light text-white text-2xl">{e.nombre}</p>
                </div>
                <div className="p-4 f1-light text-white text-2xl">
                  {e.puntos}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
