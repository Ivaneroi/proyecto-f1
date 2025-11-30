import React from "react";

export default function Footer() {
  return (
    <div className="foot bg-black text-white h-auto w-full">
      {/*Lista de patrocinadores*/}
      <div className="partners pt-14 pb-10">
        <h1 className="f1-title text-6xl text-center mb-12">Nuestros Patrocinadores</h1>
        
        <div className="socials-media w-[96%] mx-auto">
          
          {/*Fila 1 de patrocinadores */}
          <div className="grid grid-cols-6 gap-4 mb-4">
            <div className="flex items-center justify-center">
              <a href="https://es.louisvuitton.com/esp-es/homepage" target="_blank" rel="noopener noreferrer">
                <img className="max-w-full max-h-56 object-contain cursor-pointer" id="logo-lv" src="/Imagenes/logo-lv.jpg" alt="Logo de Louis Vuitton"/>
              </a>
            </div>
            <div className="flex items-center justify-center">
              <a href="https://www.pirelli.com" target="_blank" rel="noopener noreferrer">
                <img className="max-w-full max-h-44 object-contain cursor-pointer" id="logo-pirelli" src="/Imagenes/pirelli.svg" alt="Logo de Pirelli"/>
              </a>
            </div>
            <div className="flex items-center justify-center">
              <a href="https://www.aramco.com" target="_blank" rel="noopener noreferrer">
                <img className="max-w-full max-h-44 object-contain cursor-pointer" id="logo-aramco" src="/Imagenes/aramco.svg" alt="Logo de Aramco"/>
              </a>
            </div>
            <div className="flex items-center justify-center">
              <a href="https://www.heineken.com" target="_blank" rel="noopener noreferrer">
                <img className="max-w-72 object-contain cursor-pointer" id="logo-heineken" src="/Imagenes/heineken.png" alt="Logo de Heineken"/>
              </a>
            </div>
            <div className="flex items-center justify-center">
              <a href="https://aws.amazon.com" target="_blank" rel="noopener noreferrer">
                <img className="max-w-full max-h-32 object-contain cursor-pointer" id="logo-aws" src="/Imagenes/aws.png" alt="Logo de aws"/>
              </a>
            </div>
            <div className="flex items-center justify-center">
              <a href="https://www.lenovo.com" target="_blank" rel="noopener noreferrer">
                <img className="max-w-full max-h-32 object-contain cursor-pointer" id="logo-lenovo" src="/Imagenes/lenovo.svg" alt="Logo de Lenovo"/>
              </a>
            </div>
          </div>
          
          {/*Fila 2 de patrocinadores */}
          <div className="grid grid-cols-6 gap-4 mb-10">
            <div className="flex items-center justify-center">
              <a href="https://www.dhl.com" target="_blank" rel="noopener noreferrer">
                <img className="max-w-full max-h-36 object-contain cursor-pointer" id="logo-dhl" src="/Imagenes/dhl.svg" alt="Logo de DHL"/>
              </a>
            </div>
   <div className="flex items-center justify-center">
  <a href="https://www.qatarairways.com" target="_blank" rel="noopener noreferrer">
    <img className="w-full h-24 object-contain cursor-pointer" id="logo-qa" src="/Imagenes/qa_prueba.svg" alt="Logo de Qatar Airways"/>
  </a>
</div>
            <div className="flex items-center justify-center">
              <a href="https://crypto.com" target="_blank" rel="noopener noreferrer">
                <img className="max-w-full max-h-32 object-contain cursor-pointer" id="logo-crypto" src="/Imagenes/crypto-com.svg" alt="Logo de Crypto.com"/>
              </a>
            </div>
            <div className="flex items-center justify-center">
              <a href="https://www.salesforce.com" target="_blank" rel="noopener noreferrer">
                <img className="max-w-full max-h-44 object-contain cursor-pointer" id="logo-salesforce" src="/Imagenes/salesforce.svg" alt="Logo de SalesForce"/>
              </a>
            </div>
            <div className="flex items-center justify-center">
              <a href="https://www.tagheuer.com" target="_blank" rel="noopener noreferrer">
                <img className="max-w-full max-h-40 object-contain cursor-pointer" id="logo-tag-heuer" src="/Imagenes/tag-heuer.svg" alt="Logo de Tag Heuer"/>
              </a>
            </div>
            <div className="flex items-center justify-center">
              <a href="https://www.moet.com" target="_blank" rel="noopener noreferrer">
                <img className="max-w-full max-h-44 object-contain cursor-pointer" id="logo-moet" src="/Imagenes/moet.png" alt="Logo de Moet Chandon"/>
              </a>
            </div>
          </div>
          
          {/*Fila 3 de patrocinadores */}
          <div className="grid grid-cols-6 gap-4">
            <div className="flex items-center justify-center">
              <a href="https://www.americanexpress.com" target="_blank" rel="noopener noreferrer">
                <img className="max-w-full max-h-44 object-contain cursor-pointer" id="logo-ae" src="/Imagenes/american-express.svg" alt="Logo de American Express"/>
              </a>
            </div>
            <div className="flex items-center justify-center">
              <a href="https://www.santander.com" target="_blank" rel="noopener noreferrer">
                <img className="max-w-full max-h-44 object-contain cursor-pointer" id="logo-santander" src="/Imagenes/banco-santander.svg" alt="Logo de banco Santander"/>
              </a>
            </div>
            <div className="flex items-center justify-center">
              <a href="https://www.mcdonalds.com" target="_blank" rel="noopener noreferrer">
                <img className="max-w-full max-h-32 object-contain cursor-pointer" id="logo-mcdonalds" src="/Imagenes/mcdonalds.svg" alt="Logo de McDonalds"/>
              </a>
            </div>
            <div className="flex items-center justify-center">
              <a href="https://www.pepsico.com" target="_blank" rel="noopener noreferrer">
                <img className="max-w-full max-h-32 object-contain cursor-pointer" id="logo-pepsico" src="/Imagenes/pepsico.svg" alt="Logo de Pepsico"/>
              </a>
            </div>
            <div className="flex items-center justify-center">
              <a href="https://www.puma.com" target="_blank" rel="noopener noreferrer">
                <img className="max-w-full max-h-32 object-contain cursor-pointer" id="logo-puma" src="/Imagenes/puma.svg" alt="Logo de Puma"/>
              </a>
            </div>
            <div className="flex items-center justify-center">
              <a href="https://www.liqui-moly.com" target="_blank" rel="noopener noreferrer">
                <img className="max-w-full max-h-32 object-contain cursor-pointer" id="logo-liqui-moly" src="/Imagenes/liqui-moly.svg" alt="Logo de Liqui Moly"/>
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}