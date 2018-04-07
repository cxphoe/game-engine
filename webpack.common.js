const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const entry = __dirname + '/src/js/main.js'

const devtool = 'source-map'

const rules = [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
    },
    {
        test: /\.(?:png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
            limit: 8192,
        },
    },
    {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: 'true',
                    },
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: 'true',
                    },
                },
            ],
        })
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
    plugins: plugins,
    resolve: {
        extensions: ['.js', '.json'],
    },
    module: {
        rules: rules,
    },
};