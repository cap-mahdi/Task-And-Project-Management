import * as ReactDOM from 'react-dom/client';
import { App } from './app';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@emotion/react';
import { AppProvider } from './context/useAppContext';
import Client from './services/api';
import { theme } from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <StrictMode>
  <ApolloProvider client={Client}>
    <ThemeProvider theme={theme}>
      <AppProvider>
        <App />
      </AppProvider>
    </ThemeProvider>
  </ApolloProvider>
  // </StrictMode>
);
