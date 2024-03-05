import { Coordenadas } from "./coordenadas.js";

export class Mapa {
  constructor(ancho) {
    this.ancho = ancho;
    this._matriz = this.inicializarMapa();
  }

  inicializarMapa() {
    const matriz = [];
    for (let i = 0; i < this.ancho; i++) {
      const fila = Array(this.ancho).fill(-1);
      matriz.push(fila);
    }
    return matriz;
  }

  // Imprime el mapa en la consola
  getMapa() {
    return this._matriz;
  }

  getAncho() {
    return this.ancho;
  }

  /**
   * Devuelve el valor de las coordenadas 
   * @param {number} x 
   * @param {number} y 
   * @returns {number}
   */
  getValue(x, y) {
    return this._matriz[x][y];
  }

  /**
   * 
   * @param {Coordenadas} coordenada 
   */
  getValue(coordenada) {
    let prueba = this._matriz[coordenada._x][coordenada._y]
    return prueba
  }

  /**
   * Establece un valor en las coordenadas x y ofrecidas
   * @param {number} x 
   * @param {number} y 
   * @param {number} valor 
   */
  setCoordenada(x, y, valor) {
    this._matriz[x][y] = valor;
  }

  /**
   * Establrece un valor en la matriz
   * @param {Coordenadas} coordenadas 
   * @param {number} valor 
   */
  setCoordenada(coordenada, valor) {
    this._matriz[coordenada._x][coordenada._y] = valor;
  }

  /**
   * 
   * @param {Coordenadas} coordenada 
   * @returns {boolean}
   */
  isSet(coordenada) {
    return (this._matriz[coordenada._x][coordenada._y] != -1);
  }
}