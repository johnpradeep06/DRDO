import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/theme-provider.tsx'
import { RecoilRoot } from "recoil"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <ThemeProvider defaultTheme='dark' storageKey="sih-ui-theme">
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </StrictMode>,
)
