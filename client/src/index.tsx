import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { Provider } from './context/globa-context';
import { AUTH_TOKE } from './consts';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKE);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});
const GRAPHQL_URI = process.env.GRAPHQL_URI || 'http://localhost:8080'
const link = createHttpLink({ uri: GRAPHQL_URI});
const client = new ApolloClient({ link: authLink.concat(link), cache: new InMemoryCache() });

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
