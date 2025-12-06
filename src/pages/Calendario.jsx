import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { eventos } from "../data/eventos";
import Menu from "../components/Menu";
import Footer from "../components/Footer";

export default function MiCalendario() {

  return (
    <div className="cont-page-calendar bg-black p-4 overflow-x-hidden">

      <Menu />

      <div className="text-white w-full max-w-full overflow-x-hidden">

        {/* Título RESPONSIVE para que NO desborde */}
        <h1 className="
          title-calendar 
          f1-title 
          text-center 
          mx-auto
          text-4xl 
          sm:text-5xl 
          md:text-6xl 
          lg:text-7xl
          px-2
          break-words
          max-w-[95vw]
        ">
          Horario de los GRANDES Premios
        </h1>

        {/* CONTENEDOR SEGURO para evitar desbordes */}
        <div className="w-full max-w-full mt-6 overflow-x-hidden">

          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale={esLocale}
            events={eventos}
            height="auto"

            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay"
            }}

            slotLabelFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false
            }}

            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false
            }}

            /* --- AJUSTES RESPONSIVE --- */
            contentHeight="auto"
            handleWindowResize={true}
            windowResize={() => {}}
          />

        </div>
      </div>

      <Footer />

    </div>
  );
}
