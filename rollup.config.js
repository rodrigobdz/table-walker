import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

export default [
	// Browser-friendly UMD build
	{
		input: 'src/index.js',
		output: {
			name: 'TableWalker',
			file: pkg.browser,
			format: 'umd'
		},
		plugins: [
			resolve(), // So Rollup can find `ms`
			commonjs() // So Rollup can convert `ms` to an ES module
		]
	}
];
