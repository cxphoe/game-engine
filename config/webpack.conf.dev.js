const merge = require('webpack-merge');
const htmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHotPlugin = require('html-webpack-hot-plugin');
const htmlHotPlugin = new HtmlWebpackHotPlugin();
const defaultConfig = require('./webpack.conf.js');

const {
    resolve,
    ROOT_PATH,
} = require('./common');

module.exports = merge(defaultConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            },
        ],
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            chunks: ['tetris'],
            template: resolve('../src/html/index.html'),
        }),
        new htmlWebpackPlugin({
            filename: 'bird.html',
            chunks: ['bird'],
            template: resolve('../src/html/bird.html'),
        }),
        htmlHotPlugin,
    ],
    devServer: {
        contentBase: ROOT_PATH,
        host: '127.0.0.1',
        compress: true,
        port: 8000,
        open: true,
        openPage: 'index.html',
        before(app, server) {
            htmlHotPlugin.setDevServer(server);
        },
    },
});
