/* eslint-disable import/no-dynamic-require */
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('config');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
	template: `${__dirname}/src/assets/index.html`,
	filename: 'index.html',
	inject: 'body',
});

const extractSass = new ExtractTextPlugin({
	filename: '[name].[hash].css',
	disable: process.env.NODE_ENV === 'local',
});

const timeCache = Date.now();

module.exports = {
	entry: {
		app: path.resolve('src/index.js'),
	},
	output: {
		publicPath: '',
		path: path.resolve('www'),
		filename: `[name].${timeCache}.js`,
		pathinfo: process.env.NODE_ENV === 'local',
		sourceMapFilename: '[name].js.map',
		chunkFilename: `[name].bundle.js?v=${timeCache}`,
	},
	devtool: process.env.NODE_ENV !== 'local' ? 'cheap-module-source-map' : 'eval',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.jsx$/,
				include: /src/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.(svg|jpeg|jpg|png|ico|gif|webmanifest)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: 'images/[name].[ext]',
					},
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				loader: 'url-loader?limit=100000',
			},
			{
				test: /\.(scss|css)$/,
				use: extractSass.extract({
					use: [{
						loader: 'css-loader',
					}, {
						loader: 'sass-loader',
					}],
					// use style-loader in development
					fallback: 'style-loader',
				}),
			},
		],
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				default: false,
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'all',
				},
			},
		},
	},
	resolve: {
		modules: [
			'node_modules',
			path.resolve('src'),
		],
		extensions: ['.js', '.jsx', '.json'],
	},
	plugins: [
		new CleanWebpackPlugin(['www']),
		new webpack.DefinePlugin({
			__API_URL__: JSON.stringify(config.api),
			__APP_NETWORK_URL__: JSON.stringify(config.network.url),
			__APP_CONTRACT_LUV_TOKEN__: JSON.stringify(config.contracts.luvToken),
			__APP_CONTRACT_SDC_TOKEN__: JSON.stringify(config.contracts.sdcToken),
			__APP_CONTRACT_SWAP__: JSON.stringify(config.contracts.swap),
			__APP_CONTRACT_ESCROW__: JSON.stringify(config.contracts.escrow),
			__APP_EXPLORER_ADDRESS__: JSON.stringify(config.explorer),
		}),
		HTMLWebpackPluginConfig,
		extractSass,
	],
	performance: {
		hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
	},
};
