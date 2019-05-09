import SpreadsheetNavigator from './navigator';
import KeyNavigationEvents from './events';

export default class KeyNavigation {
	constructor(spreadsheet) {
    this.spreadsheet = spreadsheet;

		this.navigator = new SpreadsheetNavigator(this);
		this.events = new KeyNavigationEvents(this);
	}
}
