const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const defaultConfig = require('./webpack.conf.js');
const UglifyjsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const pkg = require('../package.json');

const {
    resolve,
    join,
    STATIC_PATH,
    TEMPLATE_PATH,
    ROOT_PATH,
} = require('./common');

module.exports = merge(defaultConfig, {
    mode: 'production',
    devtool: '#source-map',
    optimization: {
        minimizer: [
            new UglifyjsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                uglifyOptions: {
                    ie8: true,
                },
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                include: /[\\/]src[\\/]/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ],
            },
        ],
    },
    plugins: [
        // erase packaged files
        new CleanWebpackPlugin([path.basename(ROOT_PATH)], {
            dry: false,
            // exclude: [ 'shared.js' ],
            root: path.dirname(ROOT_PATH),
            verbose: true,
        }),
        // page entry
        new HtmlWebpackPlugin({
            filename: join(TEMPLATE_PATH, 'index.html'),
            chunks: ['tetris'],
            template: resolve('../src/html/index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: false,
            },
        }),
        new HtmlWebpackPlugin({
            filename: join(TEMPLATE_PATH, 'bird.html'),
            chunks: ['bird'],
            template: resolve('../src/html/bird.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: false,
            },
        }),
        // extract css
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: join(STATIC_PATH, `css/[name]-${pkg.version}.css`),
            chunkFilename: join(STATIC_PATH, `css/[name]-${pkg.version}.css`),
        }),
        // optimize css files
        new OptimizeCSSAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true,
        }),
    ],
});
