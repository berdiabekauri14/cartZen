import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router"
import { AuthProvider } from './context/AuthContext.jsx'
import { LaptopProvider } from './context/laptop.context.jsx'
import "index.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LaptopProvider>
          <App />
        </LaptopProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
