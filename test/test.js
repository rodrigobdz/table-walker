import test from 'ava';
import tableWalker from '.';

test('title', t => {
	const err = t.throws(() => {
		tableWalker(123);
	}, TypeError);
	t.is(err.message, 'Expected a string, got number');

	t.is(tableWalker('unicorns'), 'unicorns & rainbows');
});
