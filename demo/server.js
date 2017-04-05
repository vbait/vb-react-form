const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const logger = require('./logger');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const argv = require('minimist')(process.argv.slice(2));
const webpackConfig = require('../scripts/webpack/pages.dev')();
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const App = require('./containers/App');

const ngrok = process.env.ENABLE_TUNNEL || argv.tunnel ? require('ngrok') : false;
const app = express();

const webpackDevConfig = webpackMerge({}, webpackConfig);
webpackDevConfig.entry = [
  'react-hot-loader/patch',
  'webpack-hot-middleware/client',
  './index.js'
];

const compiler = webpack(webpackDevConfig);
const middleware = webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackDevConfig.output.publicPath,
  silent: true,
  // stats: 'errors-only',
  stats: {
    colors: true
  },
});
app.use(middleware);
app.use(webpackHotMiddleware(compiler, {
  log: console.log
}));

const fs = middleware.fileSystem;
app.get('*', (req, res) => {
  fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
    if (err) {
      res.sendStatus(404);
    } else {
      App.propData = {aaa: 1};
      const Root = React.createClass({
        render() {
          return file.toString();
        }
      });
      res.send(ReactDOMServer.renderToString(Root));
    }
  });
});

// Start your app.
const port = 8080;
app.listen(port, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, url);
    });
  } else {
    logger.appStarted(port);
  }
});