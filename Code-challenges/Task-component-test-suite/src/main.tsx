import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './index.css'
import './sentry.ts'
import { GlobalErrorBoundry } from './errors/GlobalErrorBoundry.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalErrorBoundry>
      <App/>
    </GlobalErrorBoundry>
  </StrictMode>,
)
