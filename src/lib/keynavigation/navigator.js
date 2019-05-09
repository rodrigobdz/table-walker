import Cell from '../spreadsheet/cell';
import KEY_CODES from '../../const/key-codes';
import CellIndexCalculator from './cell-index-calculator';
import Coordinates from './coordinates';
import ArrowKey from './arrow-keys';

export default class SpreadsheetNavigator {
	constructor(instance) {
		this.keyNavigation = instance;

		this.cellIndexCalculator = new CellIndexCalculator(this.keyNavigation.spreadsheet.table);
	}

	keyDownHandler(event) {
		event.stopImmediatePropagation();

		const currentCell = this.keyNavigation.spreadsheet.firstHighlightedCell;
		if (!SpreadsheetNavigator.shouldNavigate(event.keyCode, currentCell)) {
			return;
		}

		// Scrollen mit Pfeiltasten deaktivieren
		if (SpreadsheetNavigator.shouldDisableScroll(event.keyCode)) {
			event.preventDefault();
		}

		// FIXME: Markierung in Randfällen nicht entfernen
		this.keyNavigation.spreadsheet.unhighlightCells();
		const nextCellCoords = this.navigate(event.keyCode, currentCell);

		let nextCell = currentCell;
		if (Coordinates.validate(nextCellCoords)) {
			nextCell = this.keyNavigation.spreadsheet.cellAtCoordinates(nextCellCoords);
		}

		Cell.highlight(nextCell);
	}

	static shouldDisableScroll(keyCode) {
		return Object.values(KEY_CODES.ARROWS).includes(keyCode);
	}

	static shouldNavigate(keyCode, currentCell) {
		// Nichts machen, falls keine Pfeiltaste gedrückt wurde oder es keine markierte Zelle gibt
		if (!currentCell || !ArrowKey.validate(keyCode) || (Cell.isEditable(currentCell) && ArrowKey.leftRight(keyCode))) {
			return false;
		}

		return true;
	}

	navigate(direction, currentCell) {
		switch (direction) {
			case KEY_CODES.ARROWS.UP:
			case KEY_CODES.ARROWS.DOWN:
				return this.locateVerticalNeighbor(currentCell, direction);
			case KEY_CODES.ARROWS.LEFT:
			case KEY_CODES.ARROWS.RIGHT:
				return this.locateHorizontalNeighbor(currentCell, direction);
			default:
				return currentCell;
		}
	}

	locateVerticalNeighbor(cell, direction) {
		const calculate = direction === KEY_CODES.ARROWS.DOWN ? Coordinates.increaseRowIndex : Coordinates.decreaseRowIndex;

		// Console.log(this.cellIndexCalculator.lookup)
		// Iterate rows
		for (let rowIndex = 1; rowIndex < this.keyNavigation.spreadsheet.numberOfRows; rowIndex++) {
			const nextCellCoords = calculate(cell, rowIndex);

			// Console.log(`current ${Coordinates.get(cell)} next ${nextCellCoords}`)
			// console.log(`lookup[${nextCellCoords}] ${this.cellIndexCalculator.lookup[nextCellCoords]}`)

			if (this.cellIndexCalculator.lookup[nextCellCoords] === undefined) {
				// Console.warn('N O L O O K U P')
				continue;
			}

			const reverseLookup = this.cellIndexCalculator.reverseLookup(
				Coordinates.getRow(nextCellCoords),
				this.cellIndexCalculator.computedCellIndex(cell)
			);

			if (reverseLookup) {
				return reverseLookup;
			}
		}

		return null;
	}

	locateHorizontalNeighbor(cell, direction) {
		let calculate = Coordinates.decreaseColumnIndex;
		if (direction === KEY_CODES.ARROWS.RIGHT) {
			calculate = Coordinates.increaseColumnIndex;
		}

		// Console.log(this.cellIndexCalculator.lookup)
		// Iterate columns
		for (let columnIndex = 1; columnIndex < this.keyNavigation.spreadsheet.numberOfColumns; columnIndex++) {
			const nextCellCoords = calculate(cell, columnIndex);

			// Console.log(`current ${Coordinates.get(cell)} next ${nextCellCoords}`)
			// console.log(`lookup[${nextCellCoords}] ${this.cellIndexCalculator.lookup[nextCellCoords]}`)
			if (this.cellIndexCalculator.lookup[nextCellCoords] === undefined) {
				// Console.warn('N O L O O K U P')
				continue;
			}

			return nextCellCoords;
		}

		return null;
	}
}
