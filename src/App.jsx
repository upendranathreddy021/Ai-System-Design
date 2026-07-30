import { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css'
import AppRoutes from './AppRoutes';
import Login from './components/Login';
import Signup  from './components/Signup';
import { Navigation } from './components/Navigation';
import { ToastContainer } from './components/ToastContainer';

const MainContent=()=>{

  return (
    <div  className="app-shell">
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
