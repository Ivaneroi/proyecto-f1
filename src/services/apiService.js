  // Servicio para conectar con el backend Laravel
  const API_BASE_URL = 'http://localhost:8000/api';

  /**
   * Obtener todos los pilotos
   */
  export const obtenerPilotos = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/pilotos`);
      if (!response.ok) throw new Error('Error al obtener pilotos');
      return await response.json();
    } catch (error) {
      console.error('Error en obtenerPilotos:', error);
      return [];
    }
  };

  /**
   * Obtener un piloto específico por slug
   */
  export const obtenerPilotoPorSlug = async (slug) => {
    try {
      const response = await fetch(`${API_BASE_URL}/pilotos/${slug}`);
      if (!response.ok) throw new Error('Error al obtener piloto');
      return await response.json();
    } catch (error) {
      console.error('Error en obtenerPilotoPorSlug:', error);
      return null;
    }
  };

  /**
   * Obtener todas las escuderías
   */
  export const obtenerEscuderias = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/escuderias`);
      if (!response.ok) throw new Error('Error al obtener escuderías');
      return await response.json();
    } catch (error) {
      console.error('Error en obtenerEscuderias:', error);
      return [];
    }
  };

  /**
   * Obtener una escudería específica por slug
   */
  export const obtenerEscuderiaPorSlug = async (slug) => {
    try {
      const response = await fetch(`${API_BASE_URL}/escuderias/${slug}`);
      if (!response.ok) throw new Error('Error al obtener escudería');
      return await response.json();
    } catch (error) {
      console.error('Error en obtenerEscuderiaPorSlug:', error);
      return null;
    }
  };

  /**
   * Obtener datos de una sesión desde el backend
   */
  export const obtenerDatosSesionBackend = async (country, session, year = 2025) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/resultados/sesion?country=${encodeURIComponent(country)}&session=${encodeURIComponent(session)}&year=${year}`
      );
      if (!response.ok) throw new Error('Error al obtener datos de la sesión');
      return await response.json();
    } catch (error) {
      console.error('Error en obtenerDatosSesionBackend:', error);
      return { error: 'Error al cargar los datos' };
    }
  };

  /**
   * Obtener la última carrera disputada con su podio
   */
  export const obtenerUltimaCarreraInicio = async (year = 2025) => {
    try {
      const response = await fetch(`${API_BASE_URL}/resultados/ultima-carrera?year=${year}`);
      if (!response.ok) throw new Error('Error al obtener última carrera');
      return await response.json();
    } catch (error) {
      console.error('Error en obtenerUltimaCarrera:', error);
      return { error: 'Error al cargar la última carrera' };
    }
  };

  /**
   * Obtener clasificación general de pilotos
   */
  export const obtenerClasificacionPilotosInicio = async (year = 2025) => {
    try {
      const response = await fetch(`${API_BASE_URL}/clasificacion/pilotos?year=${year}`);
      if (!response.ok) throw new Error('Error al obtener clasificación de pilotos');
      return await response.json();
    } catch (error) {
      console.error('Error en obtenerClasificacionPilotos:', error);
      return [];
    }
  };

  /**
   * Obtener clasificación general de equipos
   */
  export const obtenerClasificacionEquiposInicio = async (year = 2025) => {
    try {
      const response = await fetch(`${API_BASE_URL}/clasificacion/equipos?year=${year}`);
      if (!response.ok) throw new Error('Error al obtener clasificación de equipos');
      return await response.json();
    } catch (error) {
      console.error('Error en obtenerClasificacionEquipos:', error);
      return [];
    }
  };