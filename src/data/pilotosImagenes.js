// Mapeo de apellidos de pilotos a sus imágenes
// Esto es necesario porque la API devuelve nombres pero nosotros tenemos las imágenes por apellido

export const pilotosImagenes = {
  // McLaren
  "Norris": "/Imagenes/norris.png",
  "Piastri": "/Imagenes/piastri.png",
  
  // Ferrari
  "Leclerc": "/Imagenes/leclerc.png",
  "Hamilton": "/Imagenes/hamilton.png",
  
  // Red Bull
  "Verstappen": "/Imagenes/verstappen.png",
  "Lawson": "/Imagenes/lawson.png",
  
  // Mercedes
  "Russell": "/Imagenes/russell.png",
  "Antonelli": "/Imagenes/antonelli.png",
  
  // Aston Martin
  "Alonso": "/Imagenes/alonso.png",
  "Stroll": "/Imagenes/stroll.png",
  
  // Alpine
  "Gasly": "/Imagenes/gasly.png",
  "Colapinto": "/Imagenes/colapinto.png",
  "Doohan": "/Imagenes/doohan.png",
  
  // Haas
  "Bearman": "/Imagenes/bearman.png",
  "Ocon": "/Imagenes/ocon.png",
  
  // RB
  "Tsunoda": "/Imagenes/tsunoda.png",
  "Hadjar": "/Imagenes/hadjar.png",
  
  // Williams
  "Albon": "/Imagenes/albon.png",
  "Sainz": "/Imagenes/sainz.png",
  
  // Sauber
  "Hulkenberg": "/Imagenes/hulkenberg.png",
  "Bortoleto": "/Imagenes/bortoleto.png",
};

/**
 * Obtener imagen de un piloto por apellido
 * @param {string} apellido - Apellido del piloto
 * @returns {string} Ruta de la imagen
 */
export const obtenerImagenPiloto = (apellido) => {
  return pilotosImagenes[apellido] || "/Imagenes/f1.png";
};