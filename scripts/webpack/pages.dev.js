const path = require('path');
const webpack = require('webpack');

const demoSrc = path.resolve(__dirname, '../../demo/src');
const demoDist = path.resolve(__dirname, '../../demo/dist');

const baseConfig = require('./pages');
const webpackMerge = require('webpack-merge');

module.exports = () => (
  webpackMerge({
    entry: 'demo/index.js',
    devtool: 'inline-source-map',
    context: demoSrc,
    devServer: {
      contentBase: demoDist,
      historyApiFallback: true,
      hot: false,
      publicPath: '/',
      inline: false,
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
    ],
  }, baseConfig())
);
