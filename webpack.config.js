/**
 * Created by ling on 2017/7/10.
 */
var path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Create multiple instances
const extractCSS = new ExtractTextPlugin('css/[name]-one.css');
const extractSASS = new ExtractTextPlugin('css/[name].css');
const extractLESS = new ExtractTextPlugin('css/[name].css');
const webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].js',
        // publicPath:"/wechat-suntrue/dist/"
    },
    devServer: {
        contentBase: "./dist",  //以dist为根目录提供文件
        historyApiFallback: true,
        inline: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015',"stage-0",'react'],
                    plugins: ["transform-decorators-legacy"]

                }
            },
            {
                test: /\.css$/,
                use: extractCSS.extract([ 'css-loader', 'postcss-loader' ])
            },
            {
                test: /\.less$/i,
                use: extractLESS.extract([ 'css-loader', 'less-loader' ])
            },{
                test: /\.scss$/i,
                use: extractLESS.extract(['css-loader', 'sass-loader'])
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader?limit=8192&name=media/[name].[ext]',
                    }
                ]
            }
        ]
    },
    plugins:[
        // new HtmlWebpackPlugin({
        //     name:"demo.html",
        //     filename:"demo.html",
        //     title:"demo"
        // }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,  // remove all comments
            },
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        extractCSS,
        extractSASS,
        extractLESS,
    ],
};