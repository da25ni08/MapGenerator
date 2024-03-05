export class Coordenadas {
  /**
   * @constructor
   * @param {number} x
   * @param {number} y
   */
  constructor(x = 0, y = 0) {
    this._x = x;
    this._y = y;
  }

  // Getters
  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  set x(x) {
    this._x = x;
  }

  set y(y) {
    this._y = y;
  }

  getString() {
    return this._x + "|" + this.y;
  }

  // Setters
  setCoordenada(x, y) {
    this._x = x;
    this._y = y;
  }

  //
  /**
   * Función para generar coordenadas aleatorias dentro de un rango entre 0 y el máximo otorgado siendo siempre entero
   * @param {number} maxX Numero entero
   * @param {number} maxY Numero entero
   */
  aleatorizar(maxX, maxY) {
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    this._x = randomX;
    this._y = randomY;
  }

  /**
   * Añade unas coordenadas a esta sumandolas
   * @param {Coordenadas} coordenada2
   */
  addCoord(coordenada2) {
    this._x += coordenada2._x;
    this._y += coordenada2._y;
  }
}
