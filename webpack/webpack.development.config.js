import Config from 'webpack-config';
import webpack from 'webpack';
import path from 'path';

export default new Config().extend('webpack/webpack.base.config.js').merge({
    mode: 'development',
    entry: [ 'react-hot-loader/patch' ],
    output: { filename: 'bundle.js' },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '..', 'dist'),
        host: '0.0.0.0',
        port: 1000,
        proxy: {
            '/api/react': {
                target: 'http://hdev.intelicom.ru/api/react',
                pathRewrite: { '^/api/react': '' },
                secure: false,
                changeOrigin: true
            }
        },
        historyApiFallback: true,
        hot: true,
        inline: true,
        noInfo: true,
        progress: true,
        disableHostCheck: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"development"'
            }
        })
    ]
});