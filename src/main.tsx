import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppVer2 from './AppVer2.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppVer2 />
  </StrictMode>,
)
