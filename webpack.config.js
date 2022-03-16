/**
 * Webpack configuration file
 */

const path = require( 'path' )

module.exports = {
	entry: {
		main: [
			'core-js/stable',
			path.resolve( __dirname, './src/scripts.js' ),
		],
	},
	mode: 'production',
	output: {
		path: path.resolve( __dirname, './dist/' ),
		filename: '[name].min.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader'
				}
			},
		]
	}
}
