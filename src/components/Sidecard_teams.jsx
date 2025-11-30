import { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarItems,
  SidebarItem,
  SidebarItemGroup,
} from "flowbite-react";

import { BsFillInfoCircleFill } from "react-icons/bs";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { FaBook } from "react-icons/fa";
import { GiF1Car } from "react-icons/gi";
import { FaTableList } from "react-icons/fa6";
import { obtenerEscuderiaPorSlug } from "../services/apiService";

export default function Sidecard_teams({ team = "alpine" }) {
  const [escuderia, setEscuderia] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarEscuderia = async () => {
      if (!team) return;
      setCargando(true);
      const datos = await obtenerEscuderiaPorSlug(team);
      setEscuderia(datos);
      setCargando(false);
    };

    cargarEscuderia();
  }, [team]);

  if (cargando) {
    return (
      <Sidebar className="fixed w-100 h-[650px]">
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      </Sidebar>
    );
  }

  if (!escuderia) {
    return (
      <Sidebar className="fixed w-100 h-[650px]">
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-400">Escudería no encontrada</p>
        </div>
      </Sidebar>
    );
  }

  return (
    <Sidebar
      aria-label={`Sidebar del equipo ${escuderia.nombre}`}
      className="fixed w-100 h-[650px]"
    >
      {/* Header con logo */}
      <div className="flex justify-center items-center pb-5">
        <img
          src={escuderia.logo}
          alt={`${escuderia.nombre} logo`}
          className="w-60 h-60 object-contain"
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src = "/Imagenes/f1.png"; 
          }}
        />
      </div>

      <div className="text-center mb-4">
        <span className="text-5xl f1-bold">{escuderia.nombre}</span>
      </div>

      <SidebarItems className="pt-4">
        <SidebarItemGroup>
          <SidebarItem 
            className="f1-light text-2xl" 
            href="#info-general" 
            icon={BsFillInfoCircleFill}
          >
            Información General
          </SidebarItem>
          <SidebarItem 
            className="f1-light text-2xl" 
            href="#pilotos" 
            icon={GiFullMotorcycleHelmet}
          >
            Pilotos
          </SidebarItem>
          <SidebarItem 
            className="f1-light text-2xl" 
            href="#historia" 
            icon={FaBook}
          >
            Historia
          </SidebarItem>
          <SidebarItem 
            className="f1-light text-2xl" 
            href="#coche" 
            icon={GiF1Car}
          >
            Coche y Motor
          </SidebarItem>
          <SidebarItem 
            className="f1-light text-2xl" 
            href="#resultados" 
            icon={FaTableList}
          >
            Resultados Históricos
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}