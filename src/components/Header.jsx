import React from 'react';
import { Carousel } from "flowbite-react";

export default function Header() {
  return (
    <div className='header-cont'>
      <Carousel slideInterval={6000} className="h-[700px] md:h-[700px] w-[full]"
      
          leftControl={ //Flecha izquierda //
  <button className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group">
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
      <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
      </svg>
      <span className="sr-only">Previous</span>
    </span>
  </button>
}

        rightControl={ //Flecha derecha //
          <button className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
              <svg className="w-4 h-4 text-white rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        }
      >

        {/*Imagen 1 */}
        <img
          src="/Imagenes/presentation-f1.png"
          alt="Foto 1"
          className="w-full h-full object-cover"
        />
        
        {/*Imagen 2 */}
        <img
          src="/Imagenes/presentation-f1-copia.png"
          alt="Foto 2"
          className="w-full h-full object-cover"
        />

        {/*Imagen 3 */}

        <img
          src="/Imagenes/gif-presentation.gif"
          alt="Foto 3"
          className="w-full h-full object-cover"
        />
      </Carousel>
    </div>
  );
}