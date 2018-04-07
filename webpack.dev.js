const merge = require('webpack-merge')
const common = require('./webpack.common.js')

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const plugins =  [
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
    // 允许错误不打断程序, 仅开发模式需要
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin('css.css', {
        allChunks: true,
    })
]

const devServer = {
    clientLogLevel: 'warning',
    contentBase: false,
    compress: true,
    host: 'localhost',
    port: 8080, // defaults to "8080"
    hot: true, // Hot Module Replacement
    open: true, // auto open browser
    overlay: {
        warnings: false,
        errors: true,
    },
}

module.exports = merge(common, {
    plugins: plugins,
    devtool: 'cheap-module-eval-source-map',
    devServer: devServer,
    output: {
        path: __dirname + '/server',
        filename: 'app.js',
    },
})