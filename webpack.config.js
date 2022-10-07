const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: {
        main: path.resolve(__dirname, "src", "pages", "main", "index.js"),
        page: path.resolve(__dirname, "src", "pages", "page", "index.js")
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            title: 'Main - Webpack Build',
            template: path.resolve("src", "pages", "main", "index.html"),
            chunks: ['main'],
        }),
        new HtmlWebpackPlugin({
            filename: "page.html",
            title: "Page - Webpack Build",
            template: path.resolve("src", "pages", "page", "index.html"),
            chunks: ['page'],
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css'
        }),
    ],
    resolve: {
        alias: {
            aliasFields: ['browser'],
            Styles: path.resolve(__dirname, "src", "styles") 
        }
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: "html-loader"
            },
            {
                test: /\.(sc|sa|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader, 
                    { 
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            modules: true
                        }
                    },    
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        } 
                    }
                ],
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