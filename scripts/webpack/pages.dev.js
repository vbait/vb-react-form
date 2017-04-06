const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const webpack = require('webpack');
const pkg = require(path.resolve(__dirname, '../../package.json'));

const demoSrc = path.resolve(__dirname, '../../demo');
const demoDist = path.resolve(__dirname, '../../demo/dist');
const srcDir = path.resolve(__dirname, '../../src');

const baseConfig = require('./pages');
const webpackMerge = require('webpack-merge');

// const pkgDependencies = pkg.dependencies;
// const dllPath = 'node_modules/vb-react-form-dlls';
// const manifestPath = path.resolve(dllPath, 'vbReactFormDeps.json');
// if (!fs.existsSync(manifestPath)) {
//   console.error(chalk.red('The DLL manifest is missing. Please run `npm run build:dll`'));
//   // process.exit(0);
// }
//
// return [
//   new webpack.DllReferencePlugin({
//     context: process.cwd(),
//     manifest: require(manifestPath), // eslint-disable-line global-require
//   }),
// ];

module.exports = () => (
  webpackMerge({
    entry: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
    ],
    devtool: 'inline-source-map',
    context: demoSrc,
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          include: [
            srcDir,
            demoSrc,
            /node_modules/,
          ],
          loaders: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ]
    },
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
console.log(module.exports());