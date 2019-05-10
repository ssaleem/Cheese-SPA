import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme ({
  palette: {
    primary: {
      light: '#fff350',
      main: '#ffc107',
      dark: '#c79100',
    },
    secondary: {
      light: '#819ca9',
      main: '#546e7a',
      dark: '#29434e',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

export default theme;
