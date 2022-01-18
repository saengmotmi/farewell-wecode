import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import Router from './Router';
import theme from 'styles/theme';
import GlobalStyle from 'styles/GlobalStyle';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Router />
  </ThemeProvider>,
  document.getElementById('root')
);
