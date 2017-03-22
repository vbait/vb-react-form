const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');


const baseConfig = require('./pages');
const webpackMerge = require('webpack-merge');


module.exports = () => (
  webpackMerge(baseConfig(), {
    output: {
      path: path.resolve(__dirname, '../../docs'),
      filename: '[hash].[name].js',
      publicPath: '/react-bizico-components',
    },
    devtool: 'source-map',
    plugins: [
      new CleanWebpackPlugin(['docs'], {
        root: path.resolve(__dirname, '../../'),
        verbose: true,
        dry: false,
        exclude: ['404.html'],
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        mangle: {
          screw_ie8: true,
          keep_fnames: true,
        },
        compress: {
          screw_ie8: true,
        },
        comments: false,
        test: /\.(js|jsx)$/i,
        include: ['src/**', 'demo/src/**'],
      }),
    ],
  })
);
