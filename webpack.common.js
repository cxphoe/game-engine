const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const entry = __dirname + '/src/js/main.js'

const devtool = 'source-map'

const loaders = [
    {
        test: /\.(json)$/,
        exclude: /node_modules/,
        loader: 'json',
    },
    {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel!eslint-loader',
    },
    {
        test: /\.(?:png|jpg|gif)$/,
        loader: 'url?limit=8192', //小于8k,内嵌;大于8k生成文件
    },
    {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
    },
]

const plugins = [
    // HTML 模板
    new HtmlWebpackPlugin({
        template: __dirname + '/src/html/index.html',
    }),
]

module.exports = {
    entry: entry,
    devtool: devtool,
    loaders: loaders,
    plugins: plugins,
    module: {
        loaders: loaders,
    },
};