const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const demoDir = path.resolve(__dirname, '../../demo');
const demoDist = path.resolve(demoDir, 'dist');
const srcDir = path.resolve(__dirname, '../../src');

module.exports = () => ({
  entry: ['./index.js'],
  output: {
    filename: '[hash].[name].js',
    path: demoDist,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
  },
  context: demoDir,
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      // },
      {
        test: /\.(js|jsx)$/,
        include: [
          srcDir,
          demoDir,
        ],
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ inject: 'body', template: path.resolve(demoDir, 'index.html') }),
  ],
});
