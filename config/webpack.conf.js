const copyWebpackPlugin = require('copy-webpack-plugin');
const pkg = require('../package.json')

const {
    resolve,
    join,
    ROOT_PATH,
    STATIC_PATH,
} = require('./common');

module.exports = {
    entry: resolve('../src/js/main.js'),
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /[\\/]node_modules[\\/]/,
                use: [
                    'babel-loader?cacheDirectory=true',
                    'ts-loader',
                ],
            },
            {
                test: /\.tsx/,
                exclude: /[\\/]node_modules[\\/]/,
                use: [
                    'babel-loader?cacheDirectory=true',
                    'ts-loader',
                ],
            },
            {
                test: /\.js$/,
                include: /[\\/]src[\\/]/,
                use: 'babel-loader?cacheDirectory=true',
            },
            {
                test: /\.(png|jpg|gif|ico)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src'],
                            removeComments: true,
                            minifyJS: true,
                            minifyCSS: true,
                        },
                    },
                ],
            },
        ],
    },
    output: {
        chunkFilename: join(STATIC_PATH, `js/[name]-${pkg.version}.js`),
        filename: join(STATIC_PATH, `js/[name]-${pkg.version}.js`),
        path: ROOT_PATH,
    },
    plugins: [
        // copy static files
        // new copyWebpackPlugin([
        //     { from: resolve('../src/static'), to: join(ROOT_PATH, STATIC_PATH) },
        // ]),
    ],
    resolve: {
        alias: {
            '@components': resolve('../src/components'),
            '@common': resolve('../src/common'),
            '@utils': resolve('../src/utils'),
            '@': resolve('../src'),
        },
        extensions: ['.tsx', '.jsx', '.ts', '.js'],
    },
};
