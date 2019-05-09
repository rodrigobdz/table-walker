import Cell from '../spreadsheet/cell';

export default class Coordinates {
	static get divider() {
		return '-';
	}

	static join(row, column) {
		return `${row}${Coordinates.divider}${column}`;
	}

	static split(coords) {
		return coords.split(Coordinates.divider);
	}

	static getRow(coords) {
		return Coordinates.split(coords)[0];
	}

	static getColumn(coords) {
		return Coordinates.split(coords)[1];
	}

	static validate(coords) {
		if (typeof coords !== 'string') {
			return false;
		}

		let coordinateFormat = false;
		try {
			coordinateFormat = Boolean(Coordinates.split(coords));
		} catch (error) {}

		return coordinateFormat;
	}

	/**
   * Gibt die Zeilen- und Spaltenindizes einer Zelle in der
   * folgenden Form zurück: rowIndex-cellIndex
   * Beispiel:
   *  coordinates(el) returns 3-4
   * @param {Element} el
   */
	static get(el) {
		return Coordinates.join(Cell.rowIndex(el), el.cellIndex);
	}

	static create(row, column) {
		return Coordinates.join(row, column);
	}

	static increaseRowIndex(el, n = 1) {
		return Coordinates.join(Cell.rowIndex(el) + n, el.cellIndex);
	}

	static decreaseRowIndex(el, n = 1) {
		return Coordinates.join(Cell.rowIndex(el) - n, el.cellIndex);
	}

	static increaseColumnIndex(el, n = 1) {
		return Coordinates.join(Cell.rowIndex(el), el.cellIndex + n);
	}

	static decreaseColumnIndex(el, n = 1) {
		return Coordinates.join(Cell.rowIndex(el), el.cellIndex - n);
	}
}
