const HtmlWebPackPlugin = require( 'html-webpack-plugin' )
const UglifyJSPlugin = require( 'uglifyjs-webpack-plugin' )

module.exports = {
	entry: {
		app: './src/index.js'
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
					loader: 'babel-loader',
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader",
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
			template: "./src/index.html",
			filename: "./index.html"
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
