import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {MuiThemeProvider} from '@material-ui/core/styles';
import theme from './theme';
import './index.css';
import App from './App';

ReactDOM.render (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById ('root')
);
