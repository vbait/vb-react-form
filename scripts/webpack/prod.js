/*
 This is production only.
 */

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = () => {
  const srcDir = path.resolve(__dirname, '../../src');

  const baseConfig = {
    entry: {
      'b-components': './src/index.js',
    },
    output: {
      path: path.resolve(__dirname, '../../dist'),
      filename: '[name].bundle.js',
      library: 'bComponents',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.css', '.scss', 'png', 'woff', 'woff2', 'eot', 'ttf', 'svg', 'gif', 'jpg'],
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: [
            srcDir,
          ],
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.(scss|css)$/,
          include: [
            srcDir,
            /node_modules/,
          ],
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
          }),
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
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new ExtractTextPlugin({
        filename: '[name].css',
        disable: false,
        allChunks: true,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest'],
        minChunks: module => (module.context && module.context.indexOf('node_modules') !== -1),
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
        include: 'src/**',
      }),
    ],
  };

  const es = {
    output: {
      path: path.resolve(__dirname, '../../es'),
    },
    plugins: [
      new CleanWebpackPlugin(['es'], {
        root: path.resolve(__dirname, '../../'),
        verbose: true,
        dry: false,
      }),
    ],
  };

  const umd = {
    output: {
      path: path.resolve(__dirname, '../../umd'),
      libraryTarget: 'umd',
    },
    plugins: [
      new CleanWebpackPlugin(['umd'], {
        root: path.resolve(__dirname, '../../'),
        verbose: true,
        dry: false,
      }),
    ],
  };

  return [es, umd].map(target => (webpackMerge(baseConfig, target)));
};
