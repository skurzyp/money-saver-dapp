import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthPage from './pages/AuthPage.tsx';
import { solana, solanaDevnet, solanaTestnet } from '@reown/appkit/networks';
import { projectId, solanaWeb3JsAdapter } from './lib/wallet.ts';
import { createAppKit } from '@reown/appkit';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Documentation from './pages/Documentation.tsx';

createAppKit({
  adapters: [solanaWeb3JsAdapter],
  projectId,
  networks: [solana, solanaTestnet, solanaDevnet],
  features: {
    analytics: true,
    email: true,
    socials: ['google', 'x', 'github', 'discord', 'farcaster'],
    emailShowWallets: true
  },
  themeMode: 'dark'
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/docs" element={<Documentation/>} />
      </Routes>
    </Router>
  </StrictMode>
);
