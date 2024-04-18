
'use client';

import { useState, useEffect } from 'react';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'



function TopNav() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const CustomNavbar = () => {


    useEffect(() => {
      // Check if user is logged in
      axios.get('/api/protected')
        .then(response => {
          if (response.data.loggedIn) {
            setIsLoggedIn(true);
            navigate('/cart');
          }
        })
        .catch(error => {
          console.error('Error checking login status:', error);
        });
    }, []);
  }
  const handleLogout = () => {
    // Perform logout actions
    // For example, clear session, remove tokens, etc.
    // Then redirect to the login page
    history.push('/login');
  };


  return (
    <Navbar fluid rounded className='w-full bg-transparent '>
      <Navbar.Brand href="#">
        <span className="self-center whitespace-nowrap text-xl text-white font-semibold ">Savor Restaurant</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
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
          {isLoggedIn && (
            
              <Dropdown.Item onClick={CustomNavbar}>Cart</Dropdown.Item>
            
          )}
          <Dropdown.Item>Profile</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
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
    </Navbar>
  );
}

export default TopNav