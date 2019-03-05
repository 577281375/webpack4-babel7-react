const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FirendlyErrorePlugin = require('friendly-errors-webpack-plugin');

const dllConfig = {
    mode: 'production',
    resolve: {
        extensions: [".js", ".jsx"]
    },
    entry: {
        vendor: [
            'react', 'react-dom', 'react-router', 'react-redux', 'react-router-redux', 'redux-saga',
        ],
    },
    output: {
        path: path.resolve(__dirname, '../public/vendor'),
        filename: '[name].dll.js',
        library: '[name]_dll_lib'
    },
    plugins: [
        new CleanWebpackPlugin(['public'], {
            root: path.resolve(__dirname, '../'),
        }),
        new FirendlyErrorePlugin(),
        new webpack.DllPlugin({
            path: path.join(__dirname, '../public', 'vendor', '[name].manifest.json'),
        })
    ],
    performance: {
        hints: false,
        maxEntrypointSize: 50000000,
        maxAssetSize: 30000000
    }
}

module.exports = dllConfig;