import 'antd/dist/antd.less';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from '@/App';
import { store } from '@/store/store';

const container = document.getElementById('root')!;
const root = createRoot(container);

const client = new ApolloClient({
  uri: '/query',
  cache: new InMemoryCache(),
});

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
);
