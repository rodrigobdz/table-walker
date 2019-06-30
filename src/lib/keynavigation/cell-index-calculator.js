import Coordinates from './coordinates';

export default class CellIndexCalculator {
	constructor(table) {
		this.table = table;
		this.lookup = null;
		this.computeTableCellIndexes();
	}

	// Source: https://stackoverflow.com/a/1303404
	// Source: http://www.javascripttoolbox.com/temp/table_cellindex.html
	computeTableCellIndexes() {
		const matrix = [];
		const lookup = {};
		const {rows} = this.table;

		for (let i = 0; i < rows.length; i++) {
			const {cells} = rows[i];

			for (let j = 0; j < cells.length; j++) {
				const cell = cells[j];
				const {rowIndex} = cell.parentNode;
				const cellId = Coordinates.create(rowIndex, cell.cellIndex);
				const rowSpan = cell.rowSpan || 1;
				const colSpan = cell.colSpan || 1;
				let firstAvailableColumn;

				if (typeof matrix[rowIndex] === 'undefined') {
					matrix[rowIndex] = [];
				}

				// Find first available column in the first row
				for (let k = 0; k < matrix[rowIndex].length + 1; k++) {
					if (typeof matrix[rowIndex][k] === 'undefined') {
						firstAvailableColumn = k;
						break;
					}
				}

				lookup[cellId] = firstAvailableColumn;

				for (let k = rowIndex; k < rowIndex + rowSpan; k++) {
					if (typeof matrix[k] === 'undefined') {
						matrix[k] = [];
					}

					const matrixrow = matrix[k];

					for (
						let l = firstAvailableColumn;
						l < firstAvailableColumn + colSpan;
						l++
					) {
						matrixrow[l] = 'x';
					}
				}
			}
		}

		this.lookup = lookup;
	}

	reverseLookup(rowIndex, computedCellIndex) {
		const lookupLocations = Object.keys(this.lookup).filter(str =>
			str.startsWith(rowIndex)
		);

		for (let index = 0; index < lookupLocations.length; index++) {
			const element = lookupLocations[index];
			if (String(this.lookup[element]) === String(computedCellIndex)) {
				return element;
			}
		}

		return null;
	}

	computedCellIndex(cell) {
		if (!cell) {
			console.error('cell argument in computedCellIndex is invalid');
			return null;
		}

		if (!this.lookup) {
			this.computeTableCellIndexes(this.table);
		}

		return this.lookup[Coordinates.get(cell)];
	}
}
