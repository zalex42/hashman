import Config from 'webpack-config';
import path from 'path';
import HTMLPlugin from 'html-webpack-plugin';

export default new Config().merge({
    entry: [ 'babel-polyfill', path.resolve(__dirname, '..', 'src', 'index.js') ],
    output: { path: path.resolve(__dirname, '..', 'dist'), publicPath: '/' },
    resolve: {
        extensions: ['.jsx', '.js'],
        alias: {
            '~': path.resolve(__dirname, '..', 'src'),
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|jpeg|svg|png|gif)/,
                use: 'url-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HTMLPlugin({
            template: path.resolve(__dirname, '..', 'src', 'index.html'),
            inject: 'body'
        }),
    ]
});