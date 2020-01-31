const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    app: './dist/index.js',
  },
  externals: {
    '@tensorflow/tfjs-core': 'tf',
  },
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack sample app',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.wasm$/i,
        type: 'javascript/auto',
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
};
