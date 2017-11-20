import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { remote } from 'electron';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './template/app.global.css';
import HomePage from './render/pages/HomePage';
import ExcelPick from './render/pages/ExcelPick';
import ClassStatics from './render/components/ClassStatics';
import DetailTeacherStatic from './render/components/DetailTeacherStatic';


window.client = remote.getCurrentWindow().client;
const promisify = (fn, receiver) => (...args) => new Promise((resolve, reject) => {
  fn.apply(receiver, [...args, (err, res) => err ? reject(err) : resolve(res)]);
});

window.client.invoke_promise = promisify(window.client.invoke);
//window.client.invoke_promise('emptyTables').then(error => (console.log(error)));

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <Router>
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route path="/excel" component={ExcelPick} />
        <Route path="/static" component={ClassStatics} />
        <Route path="/teacher" component={DetailTeacherStatic} />
        <Route path="/" component={DetailTeacherStatic} />
      </Switch>
    </Router>
  </MuiThemeProvider>
    , document.getElementById('root')
);

