import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/highlight.js/styles/dark.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/solarized.css';
import './style.scss';
import App from './containers/App';

// var metadata = require('react-component-metadata');
// var fs = require('fs');
// var result = metadata(fs.readFileSync('./containers/App', 'utf8'));

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter>
        <Switch>
          <Route component={App}/>
        </Switch>
      </BrowserRouter>
    </AppContainer>,
    document.getElementById('root'));
};

render();
// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    render();
  });
}