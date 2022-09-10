const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: path.resolve("src", "index.js"),
    output: {
        filename: 'index.[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack Build',
            template: path.resolve("src", "index.html")
        }),
        new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: "html-loader"
            },
            {
                test: /\.(sc|sa|c)ss$/i,
                use: [MiniCssExtractPlugin.loader,"css-loader","sass-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: "images/[name][ext]"
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: "fonts/[name][ext]"
                }
            },
        ],
    },
    devtool: 'inline-source-map',
    devServer: {
        port: 8012,
        open: true,
        hot: true
    }
};