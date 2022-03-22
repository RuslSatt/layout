const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
   context: path.resolve(__dirname, 'src'),
   mode: 'development',
   entry: {
      main: './js/index.js',
   },
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].[contenthash].js',
      assetModuleFilename: './assets/images/[contenthash][ext][query]',
      clean: true,
   },
   resolve: {
      extensions: ['.js', '.json',],
   },
   target: ['web', 'es5'],
   devtool: 'inline-source-map',
   devServer: {
      static: {
         directory: path.resolve(__dirname, 'dist'),
         watch: true,
      },
      open: true,
      hot: false,
   },
   plugins: [
      new HtmlWebpackPlugin({
         filename: "index.html",
         template: path.resolve(__dirname, 'src', 'index.html'),
      }),
      new MiniCssExtractPlugin({
         filename: 'css/style.[contenthash].css',
      }),
   ],
   module: {
      rules: [
         {
            test: /\.html$/i,
            loader: "html-loader",
         },
         {
            test: /\.s?css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
         },
         {
            test: /\.(png|jpg|svg)$/,
            type: 'asset/resource',
         },
         {
            test: /\.(xml|csv)$/,
            type: 'asset/resource',
            generator: {
               filename: 'static/[contenthash][ext][query]'
            }
         },
         {
            test: /\.(ttf|woff|woff2)$/,
            type: 'asset/resource',
            generator: {
               filename: 'fonts/[contenthash][ext][query]'
            }
         },
         {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
               loader: "babel-loader",
               options: {
                  presets: ['@babel/preset-env']
               }
            }
         },
      ]
   },
   optimization: {
      minimizer: [
         new TerserWebpackPlugin(),
         new CssMinimizerWebpackPlugin(),
      ]
   }
};