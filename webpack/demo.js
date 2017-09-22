const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const baseConfig = require('./base');

module.exports = () => (
  webpackMerge(baseConfig, {
    context: path.resolve(__dirname, '../demo'),
    devtool: 'inline-source-map',
    entry: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './index.js',
    ],
    output: {
      filename: '[hash].[name].js',
      path: path.resolve(__dirname, '../demo/dist'),
      publicPath: '/',
    },
    devServer: {
      contentBase: './dist',
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
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          loaders: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development')
        }
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new HtmlWebpackPlugin({ inject: 'body', template: './index.html' }),
    ]
  })
);