import * as utils from "./utils.js";
import { Mapa } from "./Mapa.js";
import * as visual from "./visual.js"

let form = document.forms[0];
form.onsubmit = function (e) {
  e.preventDefault();
  let mapaVisual = document.getElementById("mapa");
  let anchoMapa = parseInt(document.getElementById("map-size").value);
  visual.generarBase(anchoMapa, mapaVisual);
  let anchoMapaStyle = anchoMapa * 10 * 1.2; //La parte de anchoMapa * 1.2 es para depurar ya que los bordes cambian el tamaño de las celdas, si se quitan los bordes se quita esa parte también
  mapaVisual.style.width = anchoMapaStyle + "px";

  //Crear array con coordenadas
  let mapa = new Mapa(anchoMapa);

  //Recolección Datos Zonas
  let datosNaturaleza = utils.getDatosZona("naturaleza");
  let datosUrbanizacion = utils.getDatosZona("urbanizacion");
  let datosComercial = utils.getDatosZona("comercial");

  //Definición de numero de zonas
  let minZonaNaturaleza = parseInt(datosNaturaleza.min);
  let maxZonaNaturaleza = parseInt(datosNaturaleza.max);
  let numzonasNaturaleza =
    Math.floor(Math.random() * (maxZonaNaturaleza - minZonaNaturaleza + 1)) +
    minZonaNaturaleza;

  let minZonaUrbanizacion = parseInt(datosUrbanizacion.min);
  let maxZonaUrbanizacion = parseInt(datosUrbanizacion.max);
  let numzonasUrbanizacion =
    Math.floor(
      Math.random() * (maxZonaUrbanizacion - minZonaUrbanizacion + 1)
    ) + minZonaUrbanizacion;

  let minZonacomercial = parseInt(datosComercial.min);
  let maxZonacomercial = parseInt(datosComercial.max);
  let numzonasComercial =
    Math.floor(Math.random() * (maxZonacomercial - minZonacomercial + 1)) +
    minZonacomercial;

  //Generar germenes con las zonas
  let idZonaSiguiente = 0;

  //Naturaleza
  let auxiliar = utils.crearGermenesIniciales(
    numzonasNaturaleza,
    idZonaSiguiente,
    datosNaturaleza,
    anchoMapa,
    mapa
  );

  //Datos zonas para guardar datos de cada una de las zonas
  let datosZonas = auxiliar[0];

  //Casillas de cada una de las zonas
  let casillasZonas = auxiliar[1];

  idZonaSiguiente += numzonasNaturaleza;

  //Urbanización
  auxiliar = utils.crearGermenesIniciales(
    numzonasUrbanizacion,
    idZonaSiguiente,
    datosUrbanizacion,
    anchoMapa,
    mapa
  );
  auxiliar[0].forEach((element) => {
    datosZonas.push(element);
  });
  auxiliar[1].forEach((element) => {
    casillasZonas.push(element);
  });

  idZonaSiguiente += numzonasUrbanizacion;

  //Comercial
  auxiliar = utils.crearGermenesIniciales(
    numzonasComercial,
    idZonaSiguiente,
    datosComercial,
    anchoMapa,
    mapa
  );
  auxiliar[0].forEach((element) => {
    datosZonas.push(element);
  });
  auxiliar[1].forEach((element) => {
    casillasZonas.push(element);
  });

  let zonasEnCrecimiento = [];
  datosZonas.forEach((element) => {
    zonasEnCrecimiento.push(element.id);
  });

  //Crecimiento de las semillas
  let exit = false;
  let casillasTotalPintadas = 0;
  let porcentajeMaximoTotal =
    document.getElementById("max-ocupado").value / 100;
  let casillasMaximasTotales = Math.pow(anchoMapa, 2) * porcentajeMaximoTotal;
  let intentosFallidos = 0;

  while (!exit) {
    for (let i = 0; i < zonasEnCrecimiento.length; i++) {
      let idZona = zonasEnCrecimiento[i];
      let casillaCrecida = utils.crecerZona(
        mapa,
        casillasZonas[idZona],
        idZona
      );

      //Si la casilla devuelta es nula o pertenece a otra zona no hace nada
      if (casillaCrecida != null && mapa.getValue(casillaCrecida) == idZona) {
        casillasZonas[idZona].push(casillaCrecida);
        intentosFallidos = 0;
        datosZonas[idZona].casillasPintadas++;
        casillasTotalPintadas++;

        if (datosZonas[idZona].casillasPintadas >= datosZonas[idZona].size) {
          zonasEnCrecimiento.splice(i, 1);
          if (zonasEnCrecimiento.length == 0) {
            exit = true;
          }
        }
      } else {
        intentosFallidos++;
      }
      if (casillasTotalPintadas >= casillasMaximasTotales) {
        exit = true;
      }
    }
    if (intentosFallidos > casillasMaximasTotales) {
      exit = true;
    }
  }


  //Pintado del mapa
  visual.pintarMapa(datosZonas, casillasZonas);
};

