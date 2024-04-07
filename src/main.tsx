import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from '@app/store';

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
