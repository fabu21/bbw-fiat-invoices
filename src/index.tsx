import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client"
import { client } from './lib/GraphhqlClient'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TypePad from './components/TypePad'
import SetReceiver from './components/SetReceiver'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="paypoc" element={<App />}>
            <Route path=":userName" element={<TypePad />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
