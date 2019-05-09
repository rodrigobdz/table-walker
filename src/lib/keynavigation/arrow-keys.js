import KEY_CODES from '../../const/key-codes';

export default class ArrowKey {
	static leftRight(keyCode) {
		return keyCode === KEY_CODES.ARROWS.LEFT || keyCode === KEY_CODES.ARROWS.RIGHT;
	}

	static validate(keyCode) {
		return Object.values(KEY_CODES.ARROWS).includes(keyCode);
	}
}
