import { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarItems,
  SidebarItem,
  SidebarItemGroup,
} from "flowbite-react";

import { FaPerson } from "react-icons/fa6";
import { FaUsers, FaChartBar} from "react-icons/fa";
import { FaFlagCheckered } from "react-icons/fa";
import { AiOutlineBarChart } from "react-icons/ai";
import { obtenerPilotoPorSlug } from "../services/apiService";

export default function Sidecard_pilots({ pilot = "albon" }) {
  const [piloto, setPiloto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarPiloto = async () => {
      if (!pilot) return;
      setCargando(true);
      const datos = await obtenerPilotoPorSlug(pilot);
      setPiloto(datos);
      setCargando(false);
    };

    cargarPiloto();
  }, [pilot]);

  if (cargando) {
    return (
      <Sidebar className="fixed w-100 h-[650px]">
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      </Sidebar>
    );
  }

  if (!piloto) {
    return (
      <Sidebar className="fixed w-100 h-[650px]">
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-400">Piloto no encontrado</p>
        </div>
      </Sidebar>
    );
  }

  return (
    <Sidebar
      aria-label={`Sidebar del piloto ${piloto.apellido}`}
      className="fixed w-100 h-[650px]"
    >
      {/* Imagen y nombre del piloto */}
      <div className="flex justify-center items-center pb-5">
        <img
          src={piloto.foto}
          alt={`${piloto.apellido} foto`}
          className="w-60 h-60 object-contain rounded-lg"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/Imagenes/f1.png";
          }}
        />
      </div>

      <div className="text-center mb-4">
        <span className="text-5xl f1-bold">{piloto.apellido}</span>
      </div>

      {/* Menú lateral */}
      <SidebarItems className="pt-4">
        <SidebarItemGroup>
          <SidebarItem
            className="f1-light text-2xl"
            href="#sobre-el"
            icon={FaPerson}
          >
            Sobre él
          </SidebarItem>
          <SidebarItem
            className="f1-light text-2xl"
            href="#equipos"
            icon={FaUsers}
          >
            Equipos
          </SidebarItem>
          <SidebarItem
            className="f1-light text-2xl"
            href="#estadisticas"
            icon={FaFlagCheckered}
          >
            Estadísticas
          </SidebarItem>
          <SidebarItem
            className="f1-light text-2xl"
            href="#ultimos-resultados"
            icon={AiOutlineBarChart}
          >
            Últimos Resultados
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}