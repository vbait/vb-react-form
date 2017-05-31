const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const baseConfig = require('./base');

module.exports = () => (
  webpackMerge(baseConfig, {
    entry: {
      'vb-react-form': './src/index.js',
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].js',
      library: 'VBReactForm',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    externals: {
      react: {
        root: 'react',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
      validator: {
        root: 'validator',
        commonjs2: 'validator',
        commonjs: 'validator',
        amd: 'validator'
      },
      lodash: {
        root: '_',
        commonjs2: 'lodash',
        commonjs: 'lodash',
        amd: 'lodash'
      }
    },
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          include: [
            path.resolve(__dirname, '../src'),
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
          })
        }
      ]
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
      })
    ]
  })
);
