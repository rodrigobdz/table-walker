import Coordinates from '../keynavigation/coordinates'
import KeyNavigation from '../keynavigation/index'
import Cell from './cell'

/* eslint-disable-next-line no-unused-vars */
export default class Spreadsheet {
  constructor(selector) {
    this.table = document.querySelector(selector || 'table')
    this.tbody = this.table.querySelector('tbody')
    this.bindEvents()

    new KeyNavigation(this)
  }

  bindEvents() {
    // Event highlight onClick hinzufügen
    this.cells.forEach((el) => {
      Cell.addHighlightEventListener(el, this)
    })
  }

  /**
   * Anzahl Spalten berechnen anhand der ersten Zeile
   * @returns {Number}
   */
  get numberOfColumns() {
    const cellsInFirstRow = this.table.rows[0].cells
    let count = 0
    // FIXME: Nach Alternativen gucken
    /* eslint-disable no-restricted-syntax */
    for (const cell of cellsInFirstRow) {
      count += cell.colSpan
    }
    /* eslint-enable no-restricted-syntax */
    return count
  }

  get numberOfRows() {
    return this.table.rows.length
  }

  get cells() {
    return this.table.querySelectorAll('td')
  }

  /**
   * Gibt markierte Zellen in Form eines "Arrays" zurück
   * @returns {NodeList}
   */
  get highlightedCells() {
    return this.table.querySelectorAll(`td.${Cell.higlightClassName}`)
  }

  /**
   * Gibt die erste markierte Zelle zurück
   * @returns {NodeList}
   */
  get firstHighlightedCell() {
    return this.highlightedCells[0]
  }

  /**
   * Markierungen in Zellen entfernen
   */
  unhighlightCells() {
    // FIXME: Markierte Zellen merken und gezielt entfernen (Performance)
    this.highlightedCells.forEach(Cell.unhighlight)
  }

  cellAtCoordinates(coords) {
    const [row, column] = Coordinates.split(coords)
    return this.table.rows[row].cells[column]
  }
}
