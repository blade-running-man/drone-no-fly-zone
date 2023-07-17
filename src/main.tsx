import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import AppShell from '@/components/AppShell';
import App from '@/App';

import 'normalize.css';
import '@/styles/global.css';
import '@/styles/theme.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <AppShell>
      <App />
    </AppShell>
  </StrictMode>
);
