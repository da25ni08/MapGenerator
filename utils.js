import { Mapa } from "./Mapa.js";
import { Coordenadas } from "./coordenadas.js";

/**
 * Genera las casillas iniciales de cada zona de un tipo de zona al completo
 * @param {number} numero Numero de zonas a crear
 * @param {number} idInicial Id de la primera de las zonas
 * @param {array} datosGeneralesZona Datos de las zonas en general 
 * @param {number} anchoMapa Ancho del mapa
 * @param {Mapa} mapa 
 * @returns {Array} Devuelve dos arrays en los que el primero es la información de las zonas y el segundo las casillas de cada zona, ambos en formato array
 */
export function crearGermenesIniciales(
  numero,
  idInicial,
  datosGeneralesZona,
  anchoMapa,
  mapa
) {
  let idZonaSiguiente = idInicial;
  let datosZonas = [];
  let zonasNaturaleza = [];
  for (let i = 0; i < numero; i++) {
    //Datos Zona
    let datosZona = { id: idZonaSiguiente, tipo: datosGeneralesZona.nombre, casillasPintadas: 1, size: datosGeneralesZona.size };
    datosZonas.push(datosZona);

    //Casilla inicial de Zona
    let coordenadas = new Coordenadas();
    do {
      coordenadas.aleatorizar(anchoMapa, anchoMapa);
    } while (mapa.isSet(coordenadas));
    mapa.setCoordenada(coordenadas, datosZona.id);

    let zonaNaturaleza = [coordenadas];
    zonasNaturaleza.push(zonaNaturaleza);
    idZonaSiguiente++;
  }
  return [datosZonas, zonasNaturaleza];
}

/**
 * Obtiene los valores del formulario de la zona y los devuelve en una array
 * @param {string} nombreZona Nombre a la zona de la que se quiere obtener datos
 * @returns {Array} Un array con los datos de las zonas con fomrato [minimoZonas, MaximoZonas, TamañoMaxZona, TamañoMaxTotal]
 */
export function getDatosZona(nombreZona) {
  let minZonas = document.getElementById("min-zonas-" + nombreZona).value;
  let maxZonas = document.getElementById("max-zonas-" + nombreZona).value;
  let maxSizeZona = document.getElementById(
    "max-size-zone-" + nombreZona
  ).value;
  let maxSizeTotal = document.getElementById(
    "max-size-total-" + nombreZona
  ).value;
  let datosZona = {nombre: nombreZona, min: minZonas, max: maxZonas, size: maxSizeZona, total: maxSizeTotal};
  return datosZona;
}

/**
 * Convierte unas coordenadas en el id necesario para el mapa visual en formato "X|X"
 * @param {Coordenadas} coordenadas
 * @returns {string}
 */
export function convertirCoordAId(coordenadas) {
  let id = coordenadas._x + "|" + coordenadas._y;
  return id;
}

/**
 * Hace crecer la zona en el mapa de manera aleatoria una casilla. Si se encuentra con el final del mapa o con otra casilla
 * @param {Mapa} mapa
 * @param {Array<Coordenadas>} casillasZona
 * @param {number} idZona
 */
export function crecerZona(mapa, casillasZona, idZona) {
  let direccionAleatoria
  do {
    let direccionAleatoriaX = Math.round(Math.random() * 2) - 1;
  let direccionAleatoriaY = Math.round(Math.random() * 2) - 1;
  direccionAleatoria = new Coordenadas(
    direccionAleatoriaX,
    direccionAleatoriaY
  );
  } while (direccionAleatoria._x == 0 && direccionAleatoria._y == 0);
  
  
  let casillaCrecimientoNumero = Math.floor(
    Math.random() * casillasZona.length
  );
  let casillaCrecimiento = new Coordenadas(casillasZona[casillaCrecimientoNumero]._x, casillasZona[casillaCrecimientoNumero]._y);
  let exit = false;
  while (!exit) {
    casillaCrecimiento.addCoord(direccionAleatoria);
    if (casillaCrecimiento._x >= mapa.ancho || casillaCrecimiento._x < 0 || casillaCrecimiento._y >= mapa.ancho || casillaCrecimiento._y < 0) {
      exit = true 
      casillaCrecimiento = null;
    }else{
      let valorEnMapa = mapa.getValue(casillaCrecimiento);
      if (valorEnMapa == -1) {
        mapa.setCoordenada(casillaCrecimiento, idZona);
        exit = true;
      }else if (valorEnMapa != idZona) {
        exit = true;
      }
    }
  }
  return casillaCrecimiento;
}
