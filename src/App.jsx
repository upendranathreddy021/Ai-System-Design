import { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css'
import AppRoutes from './AppRoutes';
import Login from './components/Login';
import Signup  from './components/Signup';
import { Navigation } from './components/Navigation';
import { ToastContainer } from './components/ToastContainer';

import { Toaster } from 'react-hot-toast';

const MainContent=()=>{

  return (
    <div  className="app-shell">
      <Toaster
  position="top-right"
  toastOptions={{
    duration: 4000, // global default, was defaulting to 3000/2000
    style: {
      background: '#6e6458',
      color: '#f0f0f7',
      boxShadow: '8px 8px 16px #A3B1C6, -8px -8px 16px #FFFFFF',
      borderRadius: '14px',
      padding: '16px 20px',      // bigger box
      fontSize: '0.95rem',       // bigger text
      minWidth: '280px',
      maxWidth: '420px',
    },
    success: {
      duration: 4000,
      iconTheme: { primary: '#6366F1', secondary: '#E0E5EC' },
    },
    error: {
      duration: 5000, // errors stay longer, common UX pattern
      iconTheme: { primary: '#EF4444', secondary: '#E0E5EC' },
    },
  }}
  reverseOrder={false}
/>
    <Navigation/>
     <main className="main-content-area">
      <AppRoutes />
     </main>
    </div>
  )
}


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <AuthProvider>
    <MainContent />
      <ToastContainer />
    </AuthProvider>
     </>
  )
}

export default App
