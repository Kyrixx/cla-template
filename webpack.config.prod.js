const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        app: `${__dirname}/assets/js/index.tsx`,
    },
    output: {
        path: `${__dirname}/web/dist`,
        filename: '[name].[hash].js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'awesome-typescript-loader'
                },
            },
            {
                test: /\.js$/,
                enforce: "pre",
                exclude: /(node_modules)/,
                use: {
                    loader: 'source-map-loader'
                },
            },
            {
                test: /\.scss/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                            },
                        },
                        {
                            loader: 'sass-loader',
                        },
                    ],
                }),
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                        },
                    },
                ],
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: {
                    loader: 'url-loader?limit=1000'
                },
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'url-loader?limit=10000',
                    'img-loader',
                ],
            },
        ],
    },
    stats: {
        children: false
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].[contenthash].css',
        }),
        new ManifestPlugin({
            basePath: 'dist/',
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            pace: 'pace',
        }),
        new UglifyJSPlugin({
            sourceMap: true,
            cache: true,
            parallel: true,
            uglifyOptions: {
                compress: true,
            },
        }),
    ],
};
