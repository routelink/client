import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';

import { StoreProvider } from '@app/store';

import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <CssBaseline enableColorScheme />
        <App />
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>,
);
