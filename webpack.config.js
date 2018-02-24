'use strict'

require('colors')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const packageJson = require('./package.json')

// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
const { CheckerPlugin } = require('awesome-typescript-loader')

const isProduction = process.env.WEBPACK_PRODUCTION === 'true'
const isFileRelease = isProduction || process.env.WEBPACK_RELEASE === 'true'
const doMinify = process.env.WEBPACK_MINIFY === 'true'

if (isProduction) {
    console.info('  Running Production Build.   '.bgGreen.black)
} else {
    console.info('  Running Development Build.  '.bgCyan.black)
}

if (isFileRelease) {
    console.info('  Building to a file.         '.bgGreen.black)
} else {
    console.info('  Running as a dev server.    '.bgCyan.black)
}

const outDir = path.resolve(__dirname, 'dist')
let outFilename = 'index'
let chunkFilename = 'chunk'
let statsFilename = 'stats'
if (doMinify) {
    outFilename += '.min.js'
    chunkFilename += '.min.js'
    statsFilename += '-min.html'
    console.info('  Minifying Build.            '.bgGreen.black)
} else {
    outFilename += '.js'
    chunkFilename += '.js'
    statsFilename += '.html'
    console.info('  Will Not Minify Build.      '.bgCyan.black)
}

// eslint-disable-next-line complexity
module.exports = function getConfig() {
    const config = {
        context: isFileRelease ? path.resolve(__dirname, 'src') : __dirname,
        entry: isFileRelease ? './index.tsx' : './dev/index.tsx',
        module: {
            loaders: [
                {
                    test: /\.ts(x?)$/,
                    exclude: /node_modules/,
                    // atl is faster for dev
                    loader: isFileRelease
                        ? ['babel-loader', 'ts-loader']
                        : 'awesome-typescript-loader?declaration=false',
                },
                {
                    test: /\.css$/,
                    loader: [
                        'style-loader',
                        'css-loader',
                    ],
                },
                {
                    test: /\.(woff(2)?|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'url-loader?limit=10000&mimetype=application/font-woff',
                },
                {
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader',
                },
                {
                    test: /\.json$/,
                    exclude: /node_modules/,
                    loader: 'json-loader',
                },
            ],
        },
        resolve: {
            alias: {
                '~': path.resolve(__dirname, 'src'),
            },
            extensions: ['.ts', '.tsx', '.js'],
        },
        devtool: 'source-map',
        devServer: {
            contentBase: path.resolve(__dirname, 'dev'),
            publicPath: '/',
            hot: true,
        },
        plugins: [
            new webpack.DefinePlugin({
                ENVIRONMENT: JSON.stringify(isProduction ? 'production' : 'development'),
                'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
            }),
            new webpack.IgnorePlugin(
                // ignore the test files
                /__mocks__/, /__tests__/
            ),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                filename: chunkFilename,
                // this assumes your vendor imports exist in the node_modules directory
                minChunks: module => module.context && module.context.indexOf('node_modules') !== -1,
            }),
            // if minify is on then go ham with uglify and obsfucate the ids
            ...(doMinify ? [new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
            })] : []),
            ...(doMinify ? [new webpack.HashedModuleIdsPlugin()] : []),
        ],
    }

    if (isFileRelease) {
        // do a file release
        config.output = {
            path: outDir,
            filename: outFilename,
            chunkFilename,
            libraryTarget: 'umd',
        }
        config.externals = []
    } else {
        // Add react-hot-loader

        config.entry = [
            'react-hot-loader/patch',
            config.entry,
        ]

        config.plugins = [
            new HtmlWebpackPlugin({
                template: 'src/index.html',
                hash: true,
            }),
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new CheckerPlugin(),
        ].concat(config.plugins)
    }

    return config
}
