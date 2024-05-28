import * as ReactDOM from 'react-dom/client';
import { App } from './app';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@emotion/react';
import { AppProvider } from './context/useAppContext';
import Client from './services/api';
import { theme } from './theme';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SocketProvider } from './context/useSocketContext';
import { NotificationProvider } from './context/useNotificationsContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <StrictMode>
  <ApolloProvider client={Client}>
    <ThemeProvider theme={theme}>
      <AppProvider>
        <NotificationProvider>
          <ToastContainer />
          <SocketProvider>
            <App />
          </SocketProvider>
        </NotificationProvider>
      </AppProvider>
    </ThemeProvider>
  </ApolloProvider>
  // </StrictMode>
);
