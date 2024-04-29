import React from 'react'
import { Routes, Route } from "react-router-dom";
import User from '../Components/User';

const NavPage = () => {
  return (
    <React.Fragment>
        <section>
            <Routes>
                <Route path='/user' element={<User/>}/>
            </Routes>
        </section>
    </React.Fragment>
  )
}

export default NavPage