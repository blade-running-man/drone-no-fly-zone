import { ReactNode } from 'react';
import { HashRouter } from 'react-router-dom';

export interface AppShellProps {
  children: ReactNode;
}

function AppShell({ children }: AppShellProps) {
  return <HashRouter>{children}</HashRouter>;
}

export default AppShell;
