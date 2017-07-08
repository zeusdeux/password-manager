/**
 * This config handles jsx compilation, es6 compilation
 * and css handling.
 *
 * JS & JSX:
 * --------
 * babel-loader is used in conjuction with the setup in
 * .babelrc to transpile JS and transform JSX into calls
 * that utilize `h` from preact instead of what React
 * provides.
 *
 * CSS:
 * ---
 * style-loader/url is used to convert import './style.css'
 * into a url that is injected into the page that uses the module
 * that had imported the style.css file.
 * file-loader is used to emit the required object as file and to
 * return its public url. publicPath helps form the public url
 * and maps it to the where the bundle is written (output.path)
 */

import { resolve } from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
  entry: './views/app.js',
  output: {
    filename: 'app.[chunkhash].bundle.js',
    path: resolve(__dirname, './views/public/')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'app.[contenthash].css',
      disable: false,
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: 'views/index.template.html',
      filename: 'index.html',
      showErrors: true,
      inject: true
    })
  ],
  devtool: 'inline-source-map',
  target: 'electron'
}
