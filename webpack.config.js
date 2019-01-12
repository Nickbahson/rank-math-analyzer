const { resolve } = require( 'path' )
const HtmlWebPackPlugin = require( 'html-webpack-plugin' )
const UglifyJSPlugin = require( 'uglifyjs-webpack-plugin' )
const LodashPlugin = require( 'lodash-webpack-plugin' )

module.exports = {
	entry: {
		app: './src/index.js'
	},
	output: {
		path: resolve( __dirname, './dist' ),
		filename: '[name].js'
	},
	devServer: {
		contentBase: './dist',
		port: 3000
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.html$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'html-loader',
						options: { minimize: true }
					}
				]
			}
		]
	},
	externals: {
		jquery: 'jQuery'
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: resolve( __dirname, './public/index.html' ),
			filename: resolve( __dirname, './dist/index.html' )
		}),

		new LodashPlugin({
			collections: true,
			shorthands: true,
			currying: true,
			placeholders: true
		}),

		// Adding our UglifyJS plugin
		new UglifyJSPlugin({
			uglifyOptions: {
				mangle: true,
				compress: {
					warnings: false, // Suppress uglification warnings
					pure_getters: true,
					unsafe: true,
					unsafe_comps: true,
					conditionals: true,
					unused: true,
					comparisons: true,
					sequences: true,
					dead_code: true,
					evaluate: true,
					if_return: true,
					join_vars: true
				},
				output: {
					beautify: false,
					comments: false
				}
			}
		})
	]
}
