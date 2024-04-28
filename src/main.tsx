import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-material.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { StoreProvider } from '@app/store';

import App from './App.tsx';
import theme from './theme.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>,
);
