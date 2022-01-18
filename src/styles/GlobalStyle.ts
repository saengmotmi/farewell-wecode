import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import theme from './theme';

const GlobalStyle = createGlobalStyle<{ theme: typeof theme }>`
  ${reset}

  * {
    box-sizing: border-box;
  }

  html, body {
    font-family: 'Lato', sans-serif;
    color: ${({ theme }) => theme.fontWhite};
  }
`;

export default GlobalStyle;
