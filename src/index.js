import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
import {MuiThemeProvider} from '@material-ui/core/styles';
import theme from './theme';
import './index.css';
import App from './App';

ReactDOM.render (
  <HashRouter basename={process.env.PUBLIC_URL}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </HashRouter>,
  document.getElementById ('root')
);
