const path = require('path');
const webpack = require('webpack');




module.exports = {
  mode: 'development',
  entry: './client/src/index.js',

  output: {
    path: path.resolve(__dirname, 'client/public')
  },

  plugins: [new webpack.ProgressPlugin()],

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: [path.resolve(__dirname, 'client/src')],
      loader: 'babel-loader'
    }, {
      test: /.css$/,

      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader",

        options: {
          sourceMap: true
        }
      }]
    }]
  }
}