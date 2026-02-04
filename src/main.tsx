import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { HireLinkProvider } from './contexts/index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HireLinkProvider>
      <App />
    </HireLinkProvider>
  </StrictMode>,
);
