import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Image from './fetchData.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Image />
  </StrictMode>,
)
