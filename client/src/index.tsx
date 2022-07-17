import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import './index.scss';

const container = document.getElementById('root')!;
const root = createRoot(container);

const client = new ApolloClient({
  // uri: 'http://localhost:3001/graphql',
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
        </ApolloProvider>
      </Provider>
    </BrowserRouter>  
  </React.StrictMode>
);


