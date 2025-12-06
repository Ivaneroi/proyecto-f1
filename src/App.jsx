  import { useState } from 'react'
  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import reactLogo from './assets/react.svg'
  import viteLogo from '/vite.svg'
  import Inicio from "./pages/Inicio";
  import Resultados from "./pages/Resultados";
  import Pilotos from "./pages/Pilotos";
  import Escuderias from "./pages/Escuderias";
  import Calendario from "./pages/Calendario";
  import Guia from "./pages/Guia";
  import 'flowbite' 
  import './App.css'

  // Importar JSX de cada equipo
  import RedBull from "./pages/equipos/RedBull";
  import Ferrari from "./pages/equipos/Ferrari";
  import Mercedes from "./pages/equipos/Mercedes";
  import McLaren from "./pages/equipos/McLaren";
  import Alpine from "./pages/equipos/Alpine";
  import Aston from "./pages/equipos/Aston";
  import Sauber from "./pages/equipos/Sauber";
  import Haas from "./pages/equipos/Haas";
  import Williams from "./pages/equipos/Williams";
  import Rb from "./pages/equipos/Rb";

  // Importar JSX de cada piloto (solo apellido)
  import Norris from "./pages/pilotos/Norris";
  import Piastri from "./pages/pilotos/Piastri";
  import Leclerc from "./pages/pilotos/Leclerc";
  import Hamilton from "./pages/pilotos/Hamilton";
  import Verstappen from "./pages/pilotos/Verstappen";
  import Tsunoda from "./pages/pilotos/Tsunoda";
  import Russell from "./pages/pilotos/Russell";
  import Antonelli from "./pages/pilotos/Antonelli";
  import Alonso from "./pages/pilotos/Alonso";
  import Stroll from "./pages/pilotos/Stroll";
  import Gasly from "./pages/pilotos/Gasly";
  import Colapinto from "./pages/pilotos/Colapinto";
  import Bearman from "./pages/pilotos/Bearman";
  import Ocon from "./pages/pilotos/Ocon";
  import Lawson from "./pages/pilotos/Lawson";
  import Hadjar from "./pages/pilotos/Hadjar";
  import Albon from "./pages/pilotos/Albon";
  import Sainz from "./pages/pilotos/Sainz";
  import Hulkenberg from "./pages/pilotos/Hulkenberg";
  import Bortoleto from "./pages/pilotos/Bortoleto";

  // Importar JSX de cada circuito
  import CircuitoResultado from "./pages/circuitos/CircuitoResultado";
  import Australia from "./pages/circuitos/Australia";


  function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/resultados" element={<Resultados />} />
          <Route path="/pilotos" element={<Pilotos />} />
          <Route path="/escuderias" element={<Escuderias />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/guia" element={<Guia />} />

          {/* Rutas de cada escudería - ACTUALIZADAS con slugs de la BD */}
          <Route path="/equipos/red-bull" element={<RedBull />} />
          <Route path="/equipos/ferrari" element={<Ferrari />} />
          <Route path="/equipos/mercedes" element={<Mercedes />} />
          <Route path="/equipos/mclaren" element={<McLaren />} />
          <Route path="/equipos/alpine" element={<Alpine />} />
          <Route path="/equipos/aston-martin" element={<Aston />} />
          <Route path="/equipos/kick-sauber" element={<Sauber />} />
          <Route path="/equipos/haas" element={<Haas />} />
          <Route path="/equipos/williams" element={<Williams />} />
          <Route path="/equipos/racing-bulls" element={<Rb />} />

          {/* Rutas de cada piloto - Ya usan los slugs correctos de la BD */}
          <Route path="/pilotos/norris" element={<Norris />} />
          <Route path="/pilotos/piastri" element={<Piastri />} />
          <Route path="/pilotos/leclerc" element={<Leclerc />} />
          <Route path="/pilotos/hamilton" element={<Hamilton />} />
          <Route path="/pilotos/verstappen" element={<Verstappen />} />
          <Route path="/pilotos/tsunoda" element={<Tsunoda />} />
          <Route path="/pilotos/russell" element={<Russell />} />
          <Route path="/pilotos/antonelli" element={<Antonelli />} />
          <Route path="/pilotos/alonso" element={<Alonso />} />
          <Route path="/pilotos/stroll" element={<Stroll />} />
          <Route path="/pilotos/gasly" element={<Gasly />} />
          <Route path="/pilotos/colapinto" element={<Colapinto />} />
          <Route path="/pilotos/bearman" element={<Bearman />} />
          <Route path="/pilotos/ocon" element={<Ocon />} />
          <Route path="/pilotos/lawson" element={<Lawson />} />
          <Route path="/pilotos/hadjar" element={<Hadjar />} />
          <Route path="/pilotos/albon" element={<Albon />} />
          <Route path="/pilotos/sainz" element={<Sainz />} />
          <Route path="/pilotos/hulkenberg" element={<Hulkenberg />} />
          <Route path="/pilotos/bortoleto" element={<Bortoleto />} />

          {/* Rutas de cada circuito */}
          {/* IMPORTANTE: La ruta dinámica va ANTES de las rutas fijas */}
          <Route path="/resultados/:circuitoNombre" element={<CircuitoResultado />} />
          <Route path="/australia" element={<Australia />} />

        </Routes>
      </BrowserRouter>
    );
  }

  export default App;