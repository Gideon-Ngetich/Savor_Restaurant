
'use client';

import { useState, useEffect } from 'react';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { IoCartOutline } from "react-icons/io5";
import { useIsLoggedIn } from '../hooks/verification';




function TopNav() {
  const navigate = useNavigate()
  const isLoggedIn = useIsLoggedIn()
  console.log(isLoggedIn)

  const handleCartClick = () => {
    if (isLoggedIn) {
      navigate('/cart')
    } else {
      navigate('/login')
    }
  }



  return (
    <Navbar fluid rounded className='w-full bg-transparent '>
      <Navbar.Brand href="#">
        <span className="self-center whitespace-nowrap text-xl text-white font-semibold ">Savor Restaurant</span>
      </Navbar.Brand>
      <div className="flex md:order-2 gap-2 justify-bottom items-bottom">
        <div>
          <IoCartOutline onClick={handleCartClick} className='w-9 h-9 hover:text-slate-300 duration-100 ease-in' />
        </div>
        <div className='bg-red-500 rounded-full relative -left-4 w-5 text-white h-5 text-sm -top-2 flex justify-center items-center'>1</div>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Profile</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />

      </div>

      <Navbar.Collapse>
        <Navbar.Link href="/" className='text-white'>
          Home
        </Navbar.Link>
        <Navbar.Link href="/menu" className='text-white'>Menu</Navbar.Link>
        <Navbar.Link href="/about" className='text-white'>About</Navbar.Link>
        <Navbar.Link href="/reservation" className='text-white'>Reservation</Navbar.Link>
        <Navbar.Link href="/gallery" className='text-white'>Gallery</Navbar.Link>
        <Navbar.Link href="/contacts" className='text-white'>Contacts</Navbar.Link>

      </Navbar.Collapse>
      <div>

      </div>
    </Navbar>
  );
}

export default TopNav