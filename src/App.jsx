import { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css'
import Signup  from './components/Signup';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AuthProvider>
   <Signup/>
   </AuthProvider>
     </>
  )
}

export default App
