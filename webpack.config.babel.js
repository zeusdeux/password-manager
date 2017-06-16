import { resolve } from 'path'

export default {
  entry: './views/app.js',
  output: {
    filename: 'app.bundle.js',
    path: resolve(__dirname, './views/public/'),
    publicPath: 'public/'
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
        use: [ 'style-loader/url', 'file-loader' ]
      }
    ]
  },
  devtool: 'cheap-eval-source-map'
}
