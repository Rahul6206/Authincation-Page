import React from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import SignIn from './Pages/SingIn'
import SignUp from './Pages/SingUP'
const App = () => {
  return (
    
      <Routes>
        <Route path='/' element={<Navigate to='/singup'/>} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/singup' element={<SignUp />} />
        <Route path='/home' element={<Home />} />

        {/* <Route path='/' element={} /> */}
      </Routes>
    
  )
}

export default App