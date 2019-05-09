import Cell from '../spreadsheet/cell';

export default class KeyNavigationEvents {
	constructor(instance) {
		this.keyNavigation = instance;
		this.cellIndexCalculator = this.keyNavigation.navigator.cellIndexCalculator;

		this.bindEvents();
		this.bindMutationObservers();
	}

	bindEvents() {
		document.addEventListener('focusin', e => this.focusInEvent(e));
		document.addEventListener('keydown', e => this.keyNavigation.navigator.keyDownHandler(e));
	}

	bindMutationObservers() {
		this.mutationObserver = new MutationObserver(() => {
			this.cellIndexCalculator.computeTableCellIndexes();
		});

		this.mutationObserver.observe(this.keyNavigation.spreadsheet.table, {childList: true, subtree: true});
	}

	focusInEvent(e) {
		e.stopImmediatePropagation();
		const cell = Cell.getCellFromChild(e.target);
		if (!cell || Cell.isHighlighted(cell)) {
			return;
		}

		this.keyNavigation.spreadsheet.unhighlightCells();
		Cell.highlight(cell);
	}
}
