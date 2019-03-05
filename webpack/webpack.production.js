const path = require('path');
const os = require('os');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackPro = {
    mode: 'production',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                parallel: os.cpus().length,
                cache: true,
                sourceMap: true,
                uglifyOptions: {
                    compress: {
                        warnings: false,
                        drop_console: true,
                        collapse_vars: true,
                        reduce_vars: true,
                    },
                    output: {
                        beautify: false,
                        comments: false,
                    }
                }
            }),
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                // chunks: "async",
                // minSize: 30000,
                // minChunks: 1,
                // maxAsyncRequests: 5,
                // maxInitialRequests: 3,
                // automaticNameDelimiter: '~',
                // name: true,
                vendors: {
                    chunks: 'all',
                    test: /antd/,
                    priority: 100,
                    name: 'vendors',
                },
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2,
                    priority: 2
                },
            }
        },
    },
    plugins: [
            new CleanWebpackPlugin(['dist'], {
                root: path.resolve(__dirname,'../'),
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[hash].css',
                chunkFilename: '[id].[hash].css',
            }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }],
                },
                canPrint: true
            })
        ]
};

module.exports = webpackPro;
