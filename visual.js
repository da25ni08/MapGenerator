import * as utils from "./utils.js"
/**
 * Genera dentro del div mapa los divs para cada casilla
 * @param {number} anchoMapa ancho del mapa
 * @param {HTMLDivElement} divMapa Div del mapa
 */
export function generarBase(anchoMapa, divMapa) {
  while (divMapa.hasChildNodes()) {
    divMapa.removeChild(divMapa.firstChild);
  }
  for (let i = 0; i < anchoMapa; i++) {
    let idi = String(i);

    for (let j = 0; j < anchoMapa; j++) {
      let idj = String(j);
      let casilla = document.createElement("div");
      let id = idi + "|" + idj;
      casilla.setAttribute("id", id);
      casilla.setAttribute("class", "casilla");
      divMapa.appendChild(casilla);
    }
  }
}



/**
 * Pinta el mapa en base a las casillas de cada zona con sus respectivo numero de zona el ellos (los id de las zonas se aumentan en 1 al pintarse)
 * @param {classList} zonas Datos de las zonas 
 * @param {Array} casillasGrupos Casillas de cada zona
 * @returns {boolean} Devuelve true si todo va bien
 */
export function pintarMapa(zonas, casillasGrupos) {
  zonas.forEach((element) => {
    let idZona = element.id;
    let tipoZona = element.tipo;
    casillasGrupos[idZona].forEach((element) => {
      let casilla = document.getElementById(utils.convertirCoordAId(element));
      let textoCasilla = document.createTextNode(idZona + 1);
      casilla.appendChild(textoCasilla);
      casilla.setAttribute("class", "casilla " + tipoZona);
    });
  });
  return true;
}