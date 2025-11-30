import Menu from "../components/Menu";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useRef, useEffect } from "react";

export default function () {
  // Estados para controlar qué secciones están abiertas
  const [openSections, setOpenSections] = useState({
    section1: false,
    section2: false,
    section3: false,
    section4: false,
    section5: false,
    section6: false,
    section7: false,
    section8: false,
    section9: false,
    section10: false,
    section11: false,
    section12: false,

  });

  // Referencias a cada sección, coge la referencia de cada div
  const refSection1 = useRef(null);
  const refSection2 = useRef(null);
  const refSection3 = useRef(null);
  const refSection4 = useRef(null);
  const refSection5 = useRef(null);
  const refSection6 = useRef(null);
  const refSection7 = useRef(null);
  const refSection8 = useRef(null);
  const refSection9 = useRef(null);
  const refSection10 = useRef(null);
  const refSection11 = useRef(null);
  const refSection12 = useRef(null);


  // Estado para guardar la altura dinámica de cada sección
    //Guardamos en cada sección el alto de cada sección, de forma individual, para posteriormente aplicar esa altura y que no sobre ni falte margen, y siempre haya el mismo margen en todas las secciones
  const [heights, setHeights] = useState({
    section1: "0px",
    section2: "0px",
    section3: "0px",
    section4: "0px",
    section5: "0px",
    section6: "0px",
    section7: "0px",
    section8: "0px",
    section9: "0px",
    section10: "0px",
    section11: "0px",
    section12: "0px",

  });

  useEffect(() => {
    setHeights({
      section1: openSections.section1 ? `${refSection1.current.scrollHeight}px` : "0px", 
      section2: openSections.section2 ? `${refSection2.current.scrollHeight}px` : "0px",
      section3: openSections.section3 ? `${refSection3.current.scrollHeight}px` : "0px",
      section4: openSections.section4 ? `${refSection4.current.scrollHeight}px` : "0px",
      section5: openSections.section5 ? `${refSection5.current.scrollHeight}px` : "0px",
      section6: openSections.section6 ? `${refSection6.current.scrollHeight}px` : "0px",
      section7: openSections.section7 ? `${refSection7.current.scrollHeight}px` : "0px",
      section8: openSections.section8 ? `${refSection8.current.scrollHeight}px` : "0px",
      section9: openSections.section9 ? `${refSection9.current.scrollHeight}px` : "0px",
      section10: openSections.section10 ? `${refSection10.current.scrollHeight}px` : "0px",
      section11: openSections.section11 ? `${refSection11.current.scrollHeight}px` : "0px",
      section12: openSections.section12 ? `${refSection12.current.scrollHeight}px` : "0px",

    });
  }, [openSections]);

  return (
    <div className="cont-guia bg-black text-white">
      <Menu />

      {/* Sección 1 */}
      <button
        onClick={() =>
          setOpenSections({ ...openSections, section1: !openSections.section1 })
        }
        className="w-full bg-red-700 text-white p-3 rounded-md flex justify-center text-6xl f1-bold"
      >
        1. ¿Qué es la F1?
        <span
          className={`transform transition-transform ${ //Aplicamos una animación a la fecha de 180º cada vez que hacemos click en el botón
            openSections.section1 ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      <section
        ref={refSection1}
        style={{ height: heights.section1 }}
        className="section1 overflow-hidden transition-height duration-700 ease-in-out"
      >
        <p>La Fórmula 1, o F1, es la categoría más alta del automovilismo de velocidad. Se trata de un campeonato mundial en el que pilotos y equipos compiten en carreras llamadas Grandes Premios, que se celebran en circuitos de todo el mundo. Cada carrera consiste en varias vueltas a un circuito cerrado, donde gana quien complete la distancia en el menor tiempo.</p>
        <br>
        </br> 
        <img className="image-section1 w-96 h-auto mx-auto" src="/Imagenes/seccion1-guia.jpeg" alt="coches de f1 corriendo en pista"/>
        <p>En la F1 no solo importa la velocidad del piloto, sino también la del coche, la estrategia del equipo y la coordinación en boxes para repostar y cambiar neumáticos rápidamente. Cada temporada, los pilotos acumulan puntos según su posición en cada carrera, y al final del año se premian al campeón de pilotos y al campeón de constructores (el equipo que más puntos ha sumado).</p> <p>La F1 combina tecnología, habilidad, emoción y estrategia, y es conocida por sus coches rápidos, sus adelantamientos espectaculares y la pasión que genera entre los aficionados</p>
      </section>

      {/* Sección 2 */}
      <button
        onClick={() =>
          setOpenSections({ ...openSections, section2: !openSections.section2 })
        }
        className="w-full bg-red-700 text-white p-3 rounded-md flex justify-center text-6xl f1-bold"
      >
        2. ¿Qué es un Gran Premio?
        <span
          className={`transform transition-transform ${
            openSections.section2 ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      <section
        ref={refSection2}
        style={{ height: heights.section2 }}
        className="section2 overflow-hidden transition-height duration-700 ease-in-out"
      >
        <p>Un Gran Premio es el nombre que recibe cada carrera de Fórmula 1. Durante una temporada se celebran varios, en distintos países y circuitos, y cada uno reparte puntos que cuentan para el campeonato. Un fin de semana de Gran Premio no es solo la carrera del domingo. Normalmente incluye:</p><br></br>

  <ul>
<li className="points">Entrenamientos libres (viernes y sábado): los pilotos prueban el coche y preparan la estrategia.</li>

<li className="points">Clasificación (sábado): se decide el orden de salida de la carrera, según los tiempos más rápidos.</li>
<li className="points">Carrera (domingo): la prueba principal, donde los pilotos compiten por llegar a la meta en la mejor posición posible.</li>
</ul>
<br></br>
<p>Al final, el ganador es quien cruza primero la línea de meta tras completar la distancia establecida. Pero incluso los que no ganan pueden sumar puntos según en qué posición terminen, lo que hace que cada puesto sea importante.</p>
        <img
          className="image-section1 w-96 h-auto mx-auto"
          src="/Imagenes/seccion2-guia.jpeg"
          alt="coche de f1 llegando a la meta"
        />
      </section>

       {/* Sección 3 */}
      <button
        onClick={() =>
          setOpenSections({ ...openSections, section3: !openSections.section3 })
        }
        className="w-full bg-red-700 text-white p-3 rounded-md flex justify-center text-6xl f1-bold"
      >
        3. ¿Qué es un finde Sprint?
        <span
          className={`transform transition-transform ${ //Aplicamos una animación a la fecha de 180º cada vez que hacemos click en el botón
            openSections.section3 ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      <section
        ref={refSection3}
        style={{ height: heights.section3 }}
        className="section3 overflow-hidden transition-height duration-700 ease-in-out"
      >
        <p>Un fin de semana Sprint es una variación especial del calendario de Fórmula 1 en la que, además de la carrera del domingo, se celebra una carrera más corta llamada Sprint. El objetivo es dar más acción a los aficionados y repartir puntos extra.

El formato actual es el siguiente:</p><br></br>

<p>Viernes:</p>

<ul>
<li className="points">Entrenamientos libres 1 (los pilotos prueban el coche).</li>
<li className="points">Clasificación Sprint (decide el orden de salida de la carrera Sprint).</li>
</ul>
<br></br>
<p>Sábado:</p>
<ul>
<li className="points">Carrera Sprint (aprox. 100 km, sin paradas obligatorias).</li>
<li className="points">Clasificación principal (decide la parrilla para la carrera del domingo).</li>
</ul>
<br></br>
<p>Domingo:</p>
<ul>
<li className="points">Carrera larga (el Gran Premio habitual, con puntos completos).</li>
</ul>
<br></br>
<p>En la Sprint se reparten menos puntos que en la carrera principal, pero pueden ser decisivos en el campeonato.</p>
      </section>

{/* Sección 4 */}
      <button
        onClick={() =>
          setOpenSections({ ...openSections, section4: !openSections.section4 })
        }
        className="w-full bg-red-700 text-white p-3 rounded-md flex justify-center text-6xl f1-bold"
      >
        4. Puntos y campeonatos (pilotos y constructores)
        <span
          className={`transform transition-transform ${ //Aplicamos una animación a la fecha de 180º cada vez que hacemos click en el botón
            openSections.section4 ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      <section
        ref={refSection4}
        style={{ height: heights.section4 }}
        className="section4 overflow-hidden transition-height duration-700 ease-in-out"
      >
        <p>En la carrera del domingo (Gran Premio) se reparten puntos a los 10 primeros:</p><br></br>
         <ul>
    <li>1º → 25 pts</li>
    <li>2º → 18 pts</li>
    <li>3º → 15 pts</li>
    <li>4º → 12 pts</li>
    <li>5º → 10 pts</li>
    <li>6º → 8 pts</li>
    <li>7º → 6 pts</li>
    <li>8º → 4 pts</li>
    <li>9º → 2 pts</li>
    <li>10º → 1 pt</li>
  </ul>

  <br></br>
<p>En las carreras Sprint, se reparten menos puntos, solo a los 8 primeros:</p><br></br>
  <ul>
    <li>1º → 8 pts</li>
    <li>2º → 7 pts</li>
    <li>3º → 6 pts</li>
    <li>4º → 5 pts</li>
    <li>5º → 4 pts</li>
    <li>6º → 3 pts</li>
    <li>7º → 2 pts</li>
    <li>8º → 1 pt</li>
  </ul><br></br>
  <p>Al final de la temporada se suman todos los puntos de cada piloto y cada equipo (constructores) para decidir a los campeones.</p>
      </section>

{/* Sección 5 */}
      <button
        onClick={() =>
          setOpenSections({ ...openSections, section5: !openSections.section5 })
        }
        className="w-full bg-red-700 text-white p-3 rounded-md flex justify-center text-6xl f1-bold"
      >
        5. Diferencias entre equipos
        <span
          className={`transform transition-transform ${ //Aplicamos una animación a la fecha de 180º cada vez que hacemos click en el botón
            openSections.section5 ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      <section
        ref={refSection5}
        style={{ height: heights.section5 }}
        className="section5 overflow-hidden transition-height duration-700 ease-in-out"
      >
       <p>
    En la Fórmula 1, todos los equipos corren bajo el mismo reglamento, pero cada uno diseña y fabrica su propio coche (al menos las piezas principales). 
    Esto hace que existan diferencias importantes:
  </p><br></br>
  <ul>
    <li className="points"><strong>Presupuesto y recursos</strong>: equipos grandes como Ferrari, Mercedes o Red Bull tienen más dinero y personal para desarrollar el coche, mientras que los equipos pequeños tienen que ser más creativos con menos medios.</li>
    <li className="points"><strong>Diseño del coche</strong>: aunque siguen reglas comunes, cada equipo encuentra soluciones técnicas distintas en aerodinámica, motor o suspensiones. Eso explica por qué algunos coches son más rápidos que otros.</li>
    <li className="points"><strong>Estrategia y organización</strong>: no todo es el coche; también influyen las decisiones en carrera, la rapidez de las paradas en boxes y la coordinación del equipo.</li>
    <li className="points"><strong>Pilotos</strong>: algunos equipos tienen pilotos con más experiencia o talento, lo que marca la diferencia en los resultados.</li>
  </ul><br></br>
  <img
          className="image-section5 w-96 h-auto mx-auto"
          src="/Imagenes/seccion5-guia.jpeg"
          alt="Celebración de Fernando Alonso en el podio del GP Canadá 2023"
        />
  <p>
    Por eso en la parrilla vemos diferencias de rendimiento: algunos luchan por ganar, otros por entrar en los puntos, y algunos por simplemente acabar la carrera.
  </p>
      </section>

  {/* Sección 6 */}
      <button
        onClick={() =>
          setOpenSections({ ...openSections, section6: !openSections.section6 })
        }
        className="w-full bg-red-700 text-white p-3 rounded-md flex justify-center text-6xl f1-bold"
      >
        6. Clasificación (Qualy)
        <span
          className={`transform transition-transform ${ //Aplicamos una animación a la fecha de 180º cada vez que hacemos click en el botón
            openSections.section6 ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      <section
        ref={refSection6}
        style={{ height: heights.section6 }}
        className="section6 overflow-hidden transition-height duration-700 ease-in-out"
      >
        <p>
  La <strong>clasificación</strong> (también llamada <em>qualifying</em>) es la sesión que se hace antes de la carrera principal para decidir el <strong>orden de salida</strong> en la parrilla.
</p>

<ul>
  <li className="points">Los pilotos salen a pista e intentan marcar su <strong>vuelta más rápida</strong>.</li>
  <li className="points">Cuanto mejor sea el tiempo, más adelante saldrá el coche el domingo.</li>
  <li className="points">El primero consigue la <strong>pole position</strong>, que es salir en primera fila y tener la mejor oportunidad de liderar al inicio.</li>
</ul>

<p>En un fin de semana normal se divide en tres fases:</p>

<ol>
  <li className="points"><strong>Q1</strong> → todos los pilotos corren, y los más lentos quedan eliminados.</li>
  <li className="points"><strong>Q2</strong> → vuelven a correr los que pasaron, y de nuevo se eliminan los más lentos.</li>
  <li className="points"><strong>Q3</strong> → los 10 más rápidos luchan por la pole.</li>
</ol>

<p>
  En resumen, la clasificación es como una “carrera contra el reloj” que ordena a los pilotos para el día de la carrera.
</p>
      </section>

{/* Sección 7 */}
      <button
        onClick={() =>
          setOpenSections({ ...openSections, section7: !openSections.section7 })
        }
        className="w-full bg-red-700 text-white p-3 rounded-md flex justify-center text-6xl f1-bold"
      >
        7. La carrera: Adelantamientos, Paradas en boxes y Estrategias de neumáticos
        <span
          className={`transform transition-transform ${ //Aplicamos una animación a la fecha de 180º cada vez que hacemos click en el botón
            openSections.section7 ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      <section
        ref={refSection7}
        style={{ height: heights.section7 }}
        className="section7 overflow-hidden transition-height duration-700 ease-in-out"
      >
        <p>
  Durante la <strong>carrera</strong>, los pilotos no solo necesitan velocidad, sino también <strong>estrategia y control</strong>. 
  Adelantar a otros coches requiere paciencia y saber cuándo arriesgarse para no perder posiciones ni cometer errores.
</p>

<p>
  Una parte fundamental es la <strong>parada en boxes</strong>: los pilotos entran a cambiar neumáticos, y, a veces, ajustar pequeños detalles del coche. Estas paradas suelen durar entre 2 y 4 segundos, pero bien ejecutadas pueden ganar varias posiciones.
</p><br></br>

<p>
  Los <strong>neumáticos</strong> son quizá la pieza más importante para la estrategia de carrera:
</p><br></br>

<ul>
  <li className="points"><strong>Blandos (Soft)</strong> → más rápidos y con mayor agarre, ideales para pocas vueltas, pero se desgastan muy rápido.</li>
  <li className="points"><strong>Medios (Medium)</strong> → equilibrados: duran más que los blandos y ofrecen buen rendimiento, suelen usarse para tramos largos de la carrera.</li>
  <li className="points"><strong>Duros (Hard)</strong> → muy resistentes, duran muchas vueltas, pero ofrecen menos velocidad y agarre.</li>
  <li className="points"><strong>Intermedios (Intermediate)</strong> → diseñados para pista mojada pero sin charcos profundos, ofrecen agarre extra y seguridad en condiciones variables.</li>
  <li className="points"><strong>Lluvia (Wet o Full Wet)</strong> → específicos para pista muy mojada, con surcos profundos que evacúan agua y evitan aquaplaning, pero son más lentos en seco.</li>
</ul>


<img
          className="image-section7 w-[650px] h-auto mx-auto"
          src="/Imagenes/seccion7-guia.jpg"
          alt="Los 5 tipos de neumáticos de la F1 y su funcionalidad"
        />
<p>
  Elegir el neumático correcto en cada momento es clave: un mal cálculo puede hacer que un piloto pierda tiempo en pista o tenga que hacer paradas extra. 
  Por eso los equipos estudian cada vuelta y cada curva para decidir la <strong>mejor estrategia de neumáticos</strong>.
</p>

      </section>

{/* Sección 8 */}
      <button
        onClick={() =>
          setOpenSections({ ...openSections, section8: !openSections.section8 })
        }
        className="w-full bg-red-700 text-white p-3 rounded-md flex justify-center text-6xl f1-bold"
      >
        8. Bandera Azul, Amarilla, Roja y Safety Car
        <span
          className={`transform transition-transform ${ //Aplicamos una animación a la fecha de 180º cada vez que hacemos click en el botón
            openSections.section8 ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      <section
        ref={refSection8}
        style={{ height: heights.section8 }}
        className="section8 overflow-hidden transition-height duration-700 ease-in-out"
      >
        <p>En la F1, los pilotos deben <strong>seguir señales visuales importantes</strong> para garantizar la seguridad y el correcto desarrollo de la carrera:</p><br></br>

<ul>
  <li className="points"><strong>Bandera azul</strong> → indica a un piloto que un coche más rápido lo va a adelantar. Debe cederle el paso.</li>
  <li className="points"><strong>Bandera amarilla</strong> → alerta de peligro en la pista (accidente, coche parado, escombros). Los pilotos deben reducir la velocidad y no adelantar.</li>
  <li className="points"><strong>Bandera roja</strong> → la carrera se detiene inmediatamente por un peligro grave, como un accidente grande o lluvia intensa.</li>
</ul><br></br>

<img
          className="image-section8.1 w-96 h-auto mx-auto"
          src="/Imagenes/seccion8.1-guia.jpg"
          alt="Trabajador de F1 en Mónaco agitando una bandera roja en pista"
        />

<p>Otro elemento de seguridad muy importante es el <strong>Safety Car</strong>:</p>

<ul>
  <li>Sale a la pista cuando hay un accidente o condiciones peligrosas.</li>
  <li>Su función es <strong>reducir la velocidad de todos los coches</strong> y mantenerlos detrás mientras se limpia la pista o se resuelve el incidente.</li>
  <li>Durante su presencia, no se pueden hacer adelantamientos y los pilotos deben mantener su posición hasta que la carrera se reanude.</li>
</ul><br></br>

<p>En conjunto, estas señales y medidas permiten que las carreras sean emocionantes pero seguras para pilotos, equipos y comisarios.</p>

<img
          className="image-section8 w-96 h-auto mx-auto"
          src="/Imagenes/seccion8-guia.jpg"
          alt="Un safety car en pista en un GP de f1"
        />
      </section>

 {/* Sección 9 */}
      <button
        onClick={() =>
          setOpenSections({ ...openSections, section9: !openSections.section9 })
        }
        className="w-full bg-red-700 text-white p-3 rounded-md flex justify-center text-6xl f1-bold"
      >
        9. Penalizaciones en F1
        <span
          className={`transform transition-transform ${ //Aplicamos una animación a la fecha de 180º cada vez que hacemos click en el botón
            openSections.section9 ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      <section
        ref={refSection9}
        style={{ height: heights.section9 }}
        className="section9 overflow-hidden transition-height duration-700 ease-in-out"
      >
         <p>
    En la F1, los pilotos pueden recibir <strong>penalizaciones</strong> si cometen infracciones durante la carrera o en la clasificación. Algunas de las más habituales son:</p><br></br>
  <ul>
    <li className="points"><strong>Drive Through</strong> → el piloto debe pasar por el pit lane sin detenerse. Pierde tiempo y posiciones.</li>
    <li className="points"><strong>Stop & Go</strong> → el piloto entra a boxes y se detiene un tiempo fijo (por ejemplo, 10 segundos) antes de volver a la pista. Es más severa que un drive through.</li>
    <li className="points"><strong>Tiempo añadido</strong> → se suma un tiempo determinado a su vuelta final, lo que puede hacerle perder posiciones.</li>
    <li className="points"><strong>Retroceso de posiciones</strong> → el piloto pierde puestos en la parrilla de salida de la próxima carrera o en la clasificación actual.</li>
    <li className="points"><strong>Puntos en la superlicencia</strong> → acumular demasiadas infracciones puede derivar en suspensión de carreras.</li>
  </ul><br></br>
  <p>
    Estas sanciones buscan <strong>mantener la seguridad y la equidad</strong> en pista. Por ejemplo, adelantar con bandera amarilla, causar un accidente o exceder los límites de pista puede acarrear estas penalizaciones.
  </p>
      </section>

{/* Sección 10 */}
      <button
        onClick={() =>
          setOpenSections({ ...openSections, section10: !openSections.section10 })
        }
        className="w-full bg-red-700 text-white p-3 rounded-md flex justify-center text-6xl f1-bold"
      >
        10. Sectores del circuito y zonas DRS
        <span
          className={`transform transition-transform ${ //Aplicamos una animación a la fecha de 180º cada vez que hacemos click en el botón
            openSections.section10 ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      <section
        ref={refSection10}
        style={{ height: heights.section10 }}
        className="section10 overflow-hidden transition-height duration-700 ease-in-out"
      >
         <p>Cada circuito de Fórmula 1 se divide en <strong>3 sectores</strong>:</p><br></br>
  <ul>
    <li className="points">Cada sector es una parte del circuito donde se mide el tiempo de los pilotos de forma independiente.</li>
    <li className="points">Analizar los tiempos por sectores ayuda a los equipos a entender en qué parte del circuito van más rápidos o lentos y ajustar la estrategia.</li>
  </ul><br></br>

  <img
          className="image-section10 w-200 h-auto mx-auto"
          src="/Imagenes/seccion10-guia.png"
          alt="Mapa de un circuito de F1"
        />

  <p>Cada circuito tiene <strong>características únicas</strong>:</p><br></br>
  <ul>
    <li className="points">Algunos tienen muchas curvas, otros pocas.</li>
    <li className="points">Las curvas pueden ser cerradas, medias o rápidas, lo que afecta la velocidad y la forma de conducir.</li>
    <li className="points">La combinación de curvas y rectas hace que cada circuito sea diferente y desafiante para los pilotos.</li>
  </ul><br></br>

  <p>Además, están las <strong>zonas DRS (Drag Reduction System)</strong>:</p><br></br>
  <ul>
    <li className="points">Son áreas de recta donde los pilotos pueden activar un alerón trasero especial que reduce la resistencia al aire, aumentando la velocidad y facilitando adelantamientos.</li>
    <li className="points">Solo se puede usar bajo ciertas condiciones, como estar a menos de un segundo del coche que se quiere superar.</li>
  </ul>
      </section>


      <Footer />
    </div>
  );
}
