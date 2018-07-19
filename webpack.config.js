const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: `${__dirname}/assets/js/index.tsx`,
        // stat: `${__dirname}/node_modules/frontend-assets/dist/es5/trackerOn.js`,
    },
    output: {
        path: `${__dirname}/web/dist`,
        filename: `[name].js`
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
                    },
                ],
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: { loader: 'url-loader?limit=1000' },
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
            filename: `[name].css`,
        }),
        new ManifestPlugin({
            basePath: 'dist/',
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            pace: 'pace',
        }),
        new LiveReloadPlugin({
            hostname: 'http://crm.wizbii.me:8080'
        })
    ],
};
