export default class Cell {
	static get editableClassName() {
		return 'cell-editable';
	}

	static get noHighlightClassName() {
		return 'disable-highlight';
	}

	static get higlightClassName() {
		return 'cell-highlight';
	}

	/**
   * Highlight cell
   * @param {Element} el Cell
   */
	static highlight(el) {
		el.classList.add(Cell.higlightClassName);
	}

	/**
   * Remove highlight class and focus from cell
   * @param {Element} el Cell
   */
	static unhighlight(el) {
		el.blur();
		el.classList.remove(Cell.higlightClassName);
	}

	/**
   * Checks if cell is highlighted
   * @param {Element} el Cell
   */
	static isHighlighted(el) {
		return el.classList.contains(Cell.higlightClassName);
	}

	/**
   * Überprüft, ob die Zelle ein Form-Element enthält
   * @param {Element} el
   */
	static isEditable(el) {
		return el.classList.contains(Cell.editableClassName);
	}

	/**
	 * Add highlightOnClick event
	 * @param {Element} el Cell
	 * @param {Spreadshett} spreadsheet
	 */
	static addHighlightEventListener(el, spreadsheet) {
		if (el.classList.contains(Cell.noHighlightClassName)) {
			return;
		}

		el.addEventListener('click', e => {
			e.stopImmediatePropagation();
			if (!el || Cell.isHighlighted(el)) {
				return;
			}

			// Markierungen in allen Zellen entfernen
			spreadsheet.unhighlightCells();
			Cell.highlight(el);
		});
	}

	/**
   * Zeilenindex, wo sich die Zelle befindet
   * @param {Element} el Zelle
   * @returns {Number} Zeilenindex
   */
	static rowIndex(el) {
		return Cell.row(el).rowIndex;
	}

	static getCellFromChild(el) {
		switch (el.tagName) {
			case 'TD':
			case 'TH':
				return el;
			case 'DIV':
			case 'SELECT':
			case 'INPUT':
			case 'P':
			case 'SUMMARY':
			case 'DETAILS':
				return this.getCellFromChild(el.parentElement);
			default:
				return null;
		}
	}

	static row(cell) {
		return cell.parentElement;
	}
}
