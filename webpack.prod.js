const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const version = require('./package.json').version
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const sourceMap = true

const plugins = [
    // 定义生产环境
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
    }),
    // JS压缩
    new UglifyJsPlugin({
        uglifyOptions: {
            compress: {
                warnings: false
            },
        },
        sourceMap: sourceMap,
        parallel: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
        cssProcessorOptions: sourceMap
            ? { safe: true, map: { inline: false } }
            : { safe: true }
    }),
    // css打包
    new ExtractTextPlugin('css-' + version + '.css', {
        allChunks: true
    }),
]

module.exports = merge(common, {
    plugins: plugins,
    devtool: 'cheap-module-source-map',
    output: {
        path: __dirname + '/build',
        filename: 'app-' + version + '.js',
    }
})
