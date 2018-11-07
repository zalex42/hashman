import Config from 'webpack-config';
import webpack from 'webpack';

export default new Config().extend('webpack/webpack.base.config.js').merge({
    mode: 'production',
    output: { filename: 'bundle.min.js' },
	plugins: [
		new webpack.DefinePlugin({
			'process.env': { 'NODE_ENV': '"production"' },
		}),
	],
});