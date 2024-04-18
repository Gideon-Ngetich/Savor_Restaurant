import { React, useState, useEffect } from 'react'
import TopNav from '../Components/Navbar'
import bgImage from '../assets/image-1.jpg'
import ReservationTable from '../Components/ReservationTable'
import Footer from '../Components/Footer'
import Loader from '../Components/Loader'

const Reservation = () => {

  const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 3300)
    }, [])
    if(loading){
       return <Loader />
    }
  const langingBackground = bgImage;

  return (
    <>
      <TopNav />
      <div className='bg-cover bg-fixed h-80 w-screen flex justify-center items-center overflow-hidden' style={{ backgroundImage: `url(${langingBackground})` }}>
        <p className='text-5xl lg:text-6xl font-extrabold text-white'>RESERVATION</p>
      </div>

      <div className='flex flex-col justify-center items-center p-10 overflow-hidden'>
        <span style={{ fontFamily: 'satisfy' }} className='text-5xl text-yellow-500 text-center'>Reservation</span>
        <span style={{ fontFamily: 'oswald' }} className='font-bold text-5xl lg:text-6xl xl:text-6xl  text-white py-3'>BOOK TABLE</span>
        <span>
          <ReservationTable />
        </span>
      </div>

      <div className='flex flex-col lg:flex-row justify-center items-center text-center gap-10 m-5 p-5 w-full overflow-hidden'>
        <div className='flex flex-col w-full lg:w-1/2 h-auto lg:h-72'>
          <span className='text-yellow-500 text-4xl lg:text-2xl font-bold py-3'>RESERVE BY PHONE</span>
          <span className='text-2xl lg:text-lg text-white text-center'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente, corrupti ipsam eos vero veritatis vel, illum dignissimos laudantium dolorem beatae, doloribus quos voluptates laborum eveniet modi doloremque vitae officia repudiandae?</span>
        </div> 
        <div className='flex flex-col w-full lg:w-1/2 h-auto lg:h-72'>
          <span className='text-yellow-500 text-4xl lg:text-2xl font-bold py-3'>FOR EVENT BOOKING</span>
          <span className='text-white text-2xl lg:text-lg text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam est nemo tenetur impedit necessitatibus quidem aliquam nesciunt, error enim at.</span>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  )
}

export default Reservation