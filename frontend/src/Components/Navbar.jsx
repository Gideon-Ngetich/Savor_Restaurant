
'use client';

import { useState, useEffect } from 'react';
import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import { IoCartOutline } from "react-icons/io5";
import { useIsLoggedIn } from '../hooks/verification';
import { useSnackbar } from 'notistack';




function TopNav() {
  const navigate = useNavigate()
  const isLoggedIn = useIsLoggedIn()
  const { enqueueSnackbar } = useSnackbar()
  const link = 'https://savor-restaurant-1.onrender.com'
  // const link = 'http://localhost:5500'

  const [user, setUser] = useState(null)

  const handleCartClick = () => {
    if (isLoggedIn) {
      navigate('/cart')
    } else {
      navigate('/login')
    }
  }

  const [totalItems, setTotalItems] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const fetchTotalItems = async () => {
      try {
        // Check if the user is logged in
        const userId = localStorage.getItem('UserId');
        if (!userId) return; // Exit early if user is not logged in

        // Fetch total items for the logged-in user
        const response = await axios.get(`${link}/api/cart/${userId}`);

        // Calculate total quantity of all items in the cart
        const total = response.data.reduce((acc, item) => acc + item.quantity, 0);
        setTotalItems(total);
      } catch (error) {
        console.error('Error fetching total items:', error);
      }
    };

    // Fetch total items initially
    fetchTotalItems();

    // Poll for updates every 5 seconds
    const intervalId = setInterval(fetchTotalItems, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = localStorage.getItem('UserId')
        const response = await axios.get(`${link}/api/user/${userId}`)
        setUser(response.data)
      } catch (err) {
        console.log(err.message)
      }
    }
    fetchUserInfo()
  }, [])

  const handleSignOut = async () => {
    try {
      await axios.post(`${link}/api/logout`);

      localStorage.clear();
      enqueueSnackbar('Log out successful', { variant: 'success' })
      window.location.reload()
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };



  // useEffect(() => {
  //   const fetchUserInfo = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5500/api/userinfo', { withCredentials: true });

  //       if (response.status === 200) {
  //         const { username, email } = response.data;
  //         setUserInfo({ username, email });
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user info:', error);
  //     }
  //   };

  //   fetchUserInfo();
  // }, []);

  return (
    <Navbar fluid rounded className=''>
      <Navbar.Brand href="#">
        <span className="self-center whitespace-nowrap text-sm lg:text-xl xl:text-xl md:text-xl text-black font-semibold ">Savor Restaurant</span>
      </Navbar.Brand>
      <div className="flex md:order-2 gap-1 justify-bottom items-bottom">
        <div>
          <IoCartOutline onClick={handleCartClick} className='w-8 h-8 lg:w-9 lg:h-9 md:w-9 md:h-9 xl:w-9 xl:h-9  hover:text-slate-300 duration-100 ease-in' />
        </div>
        <div className='bg-red-500 rounded-full relative -left-4 w-5 text-black h-5 text-sm -top-2 flex justify-center items-center'>{totalItems}</div>
        {isLoggedIn ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkoyUQaux4PEUmEPGc7PodeN8XbgC4aOBsug&usqp=CAUhttps://upload.wikimedia.org/wikipedia/commons/a/af/Default_avatar_profile.jpg" rounded />
            }
          >
            {user && (
              <Dropdown.Header>

                <span className="block text-sm">{user.userName}</span>
                <span className="block truncate text-sm font-medium">{user.email}</span>

              </Dropdown.Header>
            )}
            <Dropdown.Item>Account</Dropdown.Item>
            <Dropdown.Item>Orders</Dropdown.Item>
            <Dropdown.Item>Saved</Dropdown.Item>
            <Dropdown.Item>Favourites</Dropdown.Item>
            <Dropdown.Item>Review</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : <Link to='/login' className='px-5 bg-blue-800 text-black rounded-md font-bold text-center flex justify-center items-center hover:bg-blue-900 duration-100 ease-in'>Login</Link>}
        <Navbar.Toggle />

      </div>

      <Navbar.Collapse className=''>
        <Navbar.Link href="/" className='text-white'>
          Home
        </Navbar.Link>
        <Navbar.Link href="/menu" className='text-black'>Menu</Navbar.Link>
        <Navbar.Link href="/about" className='text-black'>About</Navbar.Link>
        <Navbar.Link href="/reservation" className='text-black'>Reservation</Navbar.Link>
        <Navbar.Link href="/gallery" className='text-black'>Gallery</Navbar.Link>
        <Navbar.Link href="/contacts" className='text-black'>Contacts</Navbar.Link>

      </Navbar.Collapse>
    </Navbar>
  );
}

export default TopNav
