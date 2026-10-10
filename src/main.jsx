import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext';
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <script type="application/ld+json">{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SystemDesign.ai",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web",
  "description": "AI tool that generates interactive system architecture diagrams.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
})}</script>
    <BrowserRouter>
     <AuthProvider>
      <App />
      </AuthProvider>
    </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
