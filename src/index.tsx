import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  ApolloProvider
} from "@apollo/client"
import { client } from './lib/GraphhqlClient'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TypePad from './components/TypePad'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path=":userName" element={<TypePad />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
