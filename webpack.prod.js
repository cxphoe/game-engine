const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const version = require('./package.json').version
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const plugins = [
    // 定义生产环境
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
    }),
    // JS压缩
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    // css打包
    new ExtractTextPlugin('css-' + version + '.css', {
        allChunks: true
    }),
]

module.exports = merge(common, {
    plugins: plugins,
    output: {
        path: __dirname + '/build',
        filename: 'app-' + version + '.js',
    }
})