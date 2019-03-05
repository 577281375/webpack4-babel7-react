const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const chalk = require('chalk');
const os = require('os');

const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackBar = require('webpackbar');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });


const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const argv = require('yargs-parser')(process.argv.slice(-3));
const mode = argv.mode || 'development';
const isEslint = argv.eslint;
const isAnalyzer = argv.analyzer;
const mergeConfig = require(`./webpack.${mode}.js`);
const isDev = mode === 'development';
const log = console.log;
const loading = { html: "加载中..." }

const commonConfig = {
    entry: {
        main: path.resolve(__dirname, '../index.js'),
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js',
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    plugins: [
        new HappyPack({
            id:'babel',
            loaders: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: [
                        ['@babel/plugin-proposal-decorators', { "legacy": true }],
                        '@babel/plugin-proposal-class-properties',
                        '@babel/plugin-proposal-export-default-from',
                        '@babel/plugin-transform-runtime',
                        // 'react-hot-loader/babel',
                        // 'dynamic-import-webpack',
                        ['import', {
                            libraryName: 'antd',
                            libraryDirectory: 'es',
                            style: true
                        }]
                    ]
                },
            }],
            threadPool: happyThreadPool,
        }),
        new WebpackBar({
            name: isDev ? 'development' : 'production',
            color: isDev ? '#00953a' : '#f2a900',
        }),
        new WebpackBuildNotifierPlugin({
            title: `My Project Webpack Build`,
            suppressSuccess: true,
        }),
        new FriendlyErrorsWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html'),
            loading,
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../public/vendor/vendor.manifest.json'),
        }),
        new AddAssetHtmlPlugin({
            filepath: require.resolve(path.resolve(__dirname, '../public/vendor/vendor.dll.js')),
            outputPath: 'vendor',
            publicPath: 'vendor'
        }),
        new webpack.HotModuleReplacementPlugin(),
        //  全局变量 currentBranch 后期添加
        // new webpack.DefinePlugin({
        //     SERVICEURL: JSON.stringify(SERVICEURL),
        //     ENVIROMENT: JSON.stringify(ENVIROMENT),
        //     VERSION: JSON.stringify(VERSION),
        // }),
    ],
    devServer: {
        host: 'localhost',
        port: 3000,
        historyApiFallback: true,
        overlay: {
            errors: true
        },
        inline: true,
        open: true,
        hot: true,
    },
    module: {
        rules: [
            {
                // enforce: "pre",
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'happypack/loader?id=babel',
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                            camelCase: true,
                            import: true,
                        }
                    }
                ],
            },
            {
                test: /\.less$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                            camelCase: true,
                            import: true,
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                            sourceMap: true,
                        },
                    }
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: isDev ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
                            outputPath: 'images/',
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
        ],
    },
    performance: {
        hints: false,
        maxEntrypointSize: 50000000,
        maxAssetSize: 30000000
    }
};
if (isEslint) {
    log(chalk.white('eslint: ' + isEslint));
    log(chalk.white('enviroment: ' + mode));
    log(chalk.white('threadPool: ' + os.cpus().length));
    // commonConfig.module.rules.unshift({
    //     test: /\.(js|jsx)$/,
    //     exclude: /node_modules/,
    //     loader: "eslint-loader"
    // })
}

const common = merge(commonConfig, mergeConfig);
module.exports = common;