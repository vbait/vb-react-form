import React from 'react';
import ReactDOM from 'react-dom';
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

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route component={App}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);