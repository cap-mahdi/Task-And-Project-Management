import * as ReactDOM from 'react-dom/client';
import { App } from './app';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});
root.render(
  // <StrictMode>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  // </StrictMode>
);
