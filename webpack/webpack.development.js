const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const webpackDev = {
    devtool: 'source-map',
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        })
    ]
}

module.exports = webpackDev;
