import {React, useState, useEffect} from 'react'
import TopNav from '../Components/Navbar'
import bgImage from '../assets/image-1.jpg'
import MapView from '../Components/Map.jsx'
import Footer from '../Components/Footer.jsx'
import Loader from '../Components/Loader.jsx'

const Contacts = () => {
  const langingBackground = bgImage;

  const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 3300)
    }, [])
    if(loading){
       return <Loader />
    }

  return (
    <>
      <TopNav />
      <div className='bg-cover bg-fixed h-96 w-screen flex justify-center items-center overflow-hidden' style={{ backgroundImage: `url(${langingBackground})` }}>
        <p className='text-5xl lg:text-6xl font-extrabold text-white'>CONTACT</p>
      </div>

      <div className='py-20 px-30'>
        <div className='flex justify-center items-center'>
          <MapView />
        </div>

      </div>

      <div>
        <span className='flex flex-col justify-center items-center m-5'>
          <h2 style={{ fontFamily: 'Courgette' }} className='text-5xl text-yellow-500'>Let's talk</h2>
          <h2 style={{ fontFamily: 'oswald' }} className='text-4xl font-bold text-white'>SEND US A MESSAGE</h2>
        </span>
        <form action="" method="post" className='flex flex-col gap-5 justify-center items-center '>
          <div className='block lg:grid grid-cols-3 gap-5'>
            <span className='flex flex-col lg:justify-center lg:items-center lg:flex-row m-5'>
              <label htmlFor="" className='text-white'>Name</label>
              <input className='p-2 w-50 m-0 lg:m-4 rounded-md' type="text" name="" id="" />
            </span>
            <span className='flex flex-col lg:justify-center lg:items-center lg:flex-row m-5'>
              <label htmlFor="" className='text-white'>Email</label>
              <input className='p-2 w-50 m-0 lg:m-4 rounded-md' type="email" name="" id="" />
            </span>
            <span className='flex flex-col lg:justify-center lg:items-center lg:flex-row m-5'>
              <label htmlFor="" className='text-white'>Phone</label>
              <input className='p-2 w-50 m-0 lg:m-4 rounded-md' type="tel" name="" id="" />
            </span>
            <span className='col-span-3 m-5'>
              <label htmlFor="" className='text-white'>Message</label>
              <textarea className='p-2 w-full m-5 my-1 rounded-md' name="" id="" rows="10" placeholder='Type your text here...'></textarea>
            </span>
          </div>
        </form>
      </div>

      <div>
        <Footer />
      </div>
    </>
  )
}

export default Contacts