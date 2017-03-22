const path = require('path');
const webpack = require('webpack');

const demoSrc = path.resolve(__dirname, '../../demo/src');
const demoDist = path.resolve(__dirname, '../../demo/dist');

const baseConfig = require('./pages');
const webpackMerge = require('webpack-merge');

module.exports = () => (
  webpackMerge({
    entry: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
    ],
    devtool: 'inline-source-map',
    context: demoSrc,
    devServer: {
      contentBase: demoDist,
      historyApiFallback: true,
      hot: true,
      publicPath: '/',
      inline: true,
      watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 300,
      },
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
    ],
  }, baseConfig())
);
