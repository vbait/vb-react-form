const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./base');

module.exports = () => (
  webpackMerge(baseConfig, {
    context: path.resolve(__dirname, '../demo'),
    devtool: 'source-map',
    entry: [
      './index.js'
    ],
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, '../docs'),
      publicPath: '/vb-react-form',
    },
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  sourceMap: true,
                  importLoaders: 1,
                  localIdentName: '[local]',
                },
              }, 'sass-loader',
            ],
            fallback: 'style-loader',
          })
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development')
        }
      }),
      new ExtractTextPlugin({
        filename: 'styles.css',
        disable: false,
        allChunks: true,
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new HtmlWebpackPlugin({ inject: 'body', template: './index.html' }),
    ]
  })
);