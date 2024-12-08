import { StrictMode } from 'react';

import { SnackbarProvider } from 'notistack';
import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';

import App from './App.jsx';

Modal.setAppElement('#root');
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SnackbarProvider >
    <App />
    </SnackbarProvider>
  </StrictMode>,
)
