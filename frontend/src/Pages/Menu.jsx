import React, { useEffect, useState } from 'react'
import TopNav from '../Components/Navbar'
import bgImage from '../assets/image-1.jpg'
import Footer from '../Components/Footer.jsx'
import { FaCartPlus } from "react-icons/fa";
import axios from 'axios'
import Loader from '../Components/Loader.jsx';
import AddToCartButton from '../Components/addToCart.jsx'
import {useIsLoggedIn} from '../hooks/verification.jsx'

import { useSnackbar } from 'notistack';
import {useNavigate} from 'react-router-dom'
// import dotenv from 'dotenv'
// dotenv.config();


// const variable = process.env

// const backendURL = process.env.BACKEND_URL || 'https://promise-website.onrender.com/'

const Menu = () => {

  const [categories, setCategories] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([])
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('u')

  
  const {enqueSnackbar} = useSnackbar();
  // const backendURL = import.meta.env.BACKEND_URL

  useEffect(() => {
    // axios.get('https://promise-website.onrender.com/api/food-category')
    // axios.get('http://localhost:5500/api/food-category')
    axios.get('https://savor-restaurant-1.onrender.com/api/food-category')
      .then(response => {
        const filteredCategories = response.data.filter(category => category.name !== 'Lunch');
        const lunchCategory = response.data.filter(category => category.name === 'Lunch');
        const dinnerCategory = response.data.filter(category => category.name === 'Dinner')
        setCategories(filteredCategories);
        setLunch(lunchCategory)
        setDinner(dinnerCategory);
      })
      .catch(error => {
        // enqueSnackbar('Error fetching categories', {variant: 'error'})
        console.error('Error fetching categories:', error);
      });
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3300)
  }, [])
  if (loading) {
    return <Loader />
  }


  const langingBackground = bgImage;


  return (
    <>
      <TopNav />

      <div className='bg-cover bg-fixed h-96 w-screen  flex justify-center items-center' style={{ backgroundImage: `url(${langingBackground})` }}>
        <p className='text-7xl font-extrabold text-white'>Savor Menu</p>
      </div>
      <div className='hidden bg-cover bg-fixed h-96 w-full lg:flex justify-center items-center' style={{ backgroundImage: `url('https://www.tastingtable.com/img/gallery/how-long-should-you-cook-beef-stew/l-intro-1658523369.jpg')` }}>
      <p className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white">
            Savor Menu
          </p>
      </div>
      <div className='lg:hidden bg-cover bg-fixed h-96 w-full flex justify-center items-center' style={{ backgroundImage: `url('https://media.istockphoto.com/id/1165399909/photo/delicious-meal-on-a-black-plate-top-view-copy-space.jpg?s=612x612&w=0&k=20&c=vrMzS4pY_QjiDtCzpVE3ClKqbU636fb4CKH0nlsduC4=')` }}>
      <p className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white">
            Savor Menu
          </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 justify-between p-2 lg:p-7 gap-10'>
        {categories.map(category => (
          <div key={category._id}>
            <h2 className='text-2xl lg:text-4xl md:text-3xl text-yellow-500 font-bold'>{category.name}</h2>
            {category.foods.map(food => (
              <div key={food._id} className='flex justify-between items-center gap-1 text-xl'>
                <span className='text-lg xl:text-xl lg:text-xl md:text-xl text-white'>{food.name}</span>
                <span>.......................................</span>
                <span className='text-white text-lg lg:text-xl'>KSH {food.price}</span>
                {/* <button onClick={handleAddToCart} className='w-9 h-9 flex justify-center items-center text-center'>
                <span className='text-lg xl:text-xl lg:text-xl md:text-xl text-white'>KSH {food.price}</span>
                <button className='w-9 h-9 flex justify-center items-center text-center'>
                  <FaCartPlus className='text-2xl text-center text-yellow-500 hover:text-yellow-600 ease-in-out duration-500' />
                </button> */}
                <AddToCartButton 
                  userId={userId}
                  foodName={food.name}
                  price={food.price}
                  quantity={food.quantity}
                  withIcon={true}
                  />
              </div>
            ))}
          </div>
        ))}



      </div>

      <div className='bg-cover bg-fixed h-96 w-full flex justify-center items-center' style={{ backgroundImage: `url('https://www.tullysgoodtimes.com/wp-content/uploads/CTT_WoodPanels-1.jpg')` }}>
      <p className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white">
            Lunch
          </p>
      </div>

      <div className='p-1 my-5 lg:p-7 xl:p-7 gap-10'>
        {lunch.map(category => (
          <span key={category._id} className='grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 xl:grid-cols-2 gap-10'>
            {category.foods.map(food => (
              <div className='flex flex-col justify-center items-center border-[1px solid rgb(177,171,174)] mx-5 my-3 shadow-md p-5 rounded-md'>
                <span className='flex flex-col lg:flex-row xl:flex-row gap-5'>
                  <span className='flex items-center justify-center'>
                    <img className='w-36 h-36 rounded-md' src={langingBackground} alt="" />
                  </span>
                  <span className='flex justify-between items-center gap-4 w-full my-4 lg:w-3/4 xl:w-3/4 p-1 lg:p-0 xl:p-0'>
                    <span className='text-white text-lg'>{food.name}</span>
                    <span>......................................</span>
                    <span className='text-white text-lg'>KSH {food.price}</span>
                  </span>

                </span>
                <span className='flex justify-center items-center'>
                <AddToCartButton 
                  userId={userId}
                  foodName={food.name}
                  price={food.price}
                  quantity={1}
                  withIcon={false}
                  />
                </span>
              </div>


            ))}

          </span>
        ))}
      </div>

      <div className='bg-cover bg-fixed h-96 lg:w-full w-screen flex justify-center items-center' style={{ backgroundImage: `url('https://www.tullysgoodtimes.com/wp-content/uploads/CTT_WoodPanels-1.jpg')` }}>
      <p className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white">
            Dinner
          </p>
      </div>

      <div className='p-1 my-5 lg:p-7 xl:p-7 gap-10'>
        {dinner.map(category => (
          <span key={category._id} className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10'>
            {category.foods.map(food => (
              <div className='flex flex-col justify-center items-center border-[1px solid rgb(177,171,174)] mx-5 my-3 shadow-md p-5 rounded-md'>
                <span className='flex flex-col lg:flex-row xl:flex-row gap-5'>
                  <span className='flex items-center justify-center'>
                    <img className='w-36 h-36 rounded-md' src={langingBackground} alt="" />
                  </span>
                  <span className='flex justify-between items-center gap-4 w-full my-4 lg:w-3/4 xl:w-3/4 p-1 lg:p-0 xl:p-0'>
                    <span className='text-white text-lg'>{food.name}</span>
                    <span>......................................</span>
                    <span className='text-white text-lg'>KSH {food.price}</span>
                  </span>

                </span>
                <span className='flex justify-center items-center'>
                <AddToCartButton 
                  userId={userId}
                  foodName={food.name}
                  price={food.price}
                  quantity={1}
                  withIcon={false}
                  />
                </span>
              </div>


            ))}

          </span>
        ))}
      </div>


      <div>
        <Footer />
      </div>
    </>

  )
}


export default Menu