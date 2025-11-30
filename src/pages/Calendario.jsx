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


 
    <div className="cont-page-calendar bg-black p-4">

    <>
     <Menu />
    </>
    <div className="h-screen w-auto  text-white">
      
    
    <h1 className="title-calendar text-7xl f1-title">Horario de los GRANDES Premios</h1>


     <FullCalendar
  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
  initialView="dayGridMonth"
  locale={esLocale}
  events={eventos}  // <- aquí van tus eventos
  headerToolbar={{
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  }}
  height="80%"
   
  // Para las horas en la vista semanal o diaria
  slotLabelFormat={{
    hour: '2-digit',
    minute: '2-digit',
    hour12: false // usa formato 24h
  }}
  
  // Para mostrar la hora de los eventos
  eventTimeFormat={{
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }}
/>

    </div>
          <Footer />

 </div>
  );
}
