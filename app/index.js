import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { remote } from 'electron';
import createBrowserHistory from 'history/createBrowserHistory';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './template/app.global.css';
import HomePage from './render/pages/HomePage';
import ExcelPick from './render/pages/ExcelPick';
import ClassStatics from './render/components/ClassStatics';


window.client = remote.getCurrentWindow().client;
const promisify = (fn, receiver) => (...args) => new Promise((resolve, reject) => {
  fn.apply(receiver, [...args, (err, res) => err ? reject(err) : resolve(res)]);
});

window.client.invoke_promise = promisify(window.client.invoke);

const history = createBrowserHistory({
  hashType: 'slash'
});

window.history_api = history;

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <Router history={history} >
      <div>
        <Route path="/home" component={HomePage} />
        <Route path="/excel" component={ExcelPick} />
        <Route path="/static" component={ClassStatics} />
        <Route path="/" component={ExcelPick} />
      </div>
    </Router>
  </MuiThemeProvider>
    , document.getElementById('root')
);

