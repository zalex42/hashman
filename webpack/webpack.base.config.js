import Config from 'webpack-config';
import path from 'path';
import HTMLPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

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
                test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
                loader: 'file-loader?name=[name].[ext]',
                exclude: /node_modules/
            },
            { 
                test: /\.css$/, 
                loader: ['style-loader', 'postcss-loader'] 
            },
        ]
    },
    plugins: [
        new HTMLPlugin({
            template: path.resolve(__dirname, '..', 'src', 'index.html'),
            inject: 'body'
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '..', 'src/assets'),
            to: path.resolve(__dirname, '..', 'dist/assets'),
            toType: 'dir'
        }])
    ],
    optimization: {
        minimizer: [
          new UglifyJsPlugin()
        ]
    }
});