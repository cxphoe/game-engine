const merge = require('webpack-merge')
const common = require('./webpack.common.js')

const webpack = require('webpack')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const plugins =  [
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
    // 允许错误不打断程序, 仅开发模式需要
    new webpack.NoErrorsPlugin(),
    // 打开浏览器页面
    new OpenBrowserPlugin({
        url: 'http://127.0.0.1:8080/'
    }),
    // css打包
    new ExtractTextPlugin('css.css', {
        allChunks: true
    }),
]

const devServer = {
    contentBase: './server',
    colors: true,
    historyApiFallback: false,
    port: 8080, // defaults to "8080"
    hot: true, // Hot Module Replacement
    inline: true, // Livereload
    host: '0.0.0.0',
}

module.exports = merge(common, {
    plugins: plugins,
    devServer: devServer,
    output: {
        path: __dirname + '/server',
        filename: 'app.js',
    },
})