import React from 'react'
import Home from './Pages/Home'
import {Routes, Route} from 'react-router-dom'
import Login from './Pages/Login'
import Menu from './Pages/Menu'
import About from './Pages/About'
import Reservation from './Pages/Reservation'
import Contacts from './Pages/Contacts'
import Signup from './Pages/Signup'
import Gallery from './Pages/Gallery'
import Cart from './Pages/Cart'
import Admin from './Pages/Admin'
import userProfile from './Pages/userProfile'

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/login' Component={Login}/>
        <Route path='/signup' Component={Signup}/>
        <Route path='/about' Component={About} />
        <Route path='/gallery' Component={Gallery}/>
        <Route path='/menu' Component={Menu}/>
        <Route path='/reservation' Component={Reservation}/>
        <Route path='/contacts' Component={Contacts}/>
        <Route path='/cart' Component={Cart}/>
        <Route path='/admin' Component={Admin}/>
        <Route path='/profile' Component={userProfile}/>
      </Routes>
    </>
  )
}

export default App
