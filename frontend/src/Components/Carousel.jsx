'use client';

import { Carousel } from 'flowbite-react';
import image12 from '../assets/image-12.jpg'

function ImgCarousel() {
  return (
    <>
      <div className='w-full h-20 bg-yellow-500  flex justify-center items-center text-sm lg:text-xl'>
        <p className='text-white font-bold text-sm py-5'>Exciting Announcement Coming Soon! 🚀 Stay tuned as we prepare to launch our new online ordering feature. Get ready to experience seamless convenience like never before!</p>
      </div>
      <div className="relative h-screen overflow-hidden ">
      <div className="absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
        <span className="text-4xl lg:text-6xl font-bold"><span className='' style={{fontFamily: 'Courgette'}}>Welcome to</span> <br></br> <span className='text-6xl lg:text-7xl w-screen'>Savor Restaurant</span> </span>
      </div>
      <Carousel className='w-screen'>
        <div className="h-full">
          <img src="https://food.fnr.sndimg.com/content/dam/images/food/fullset/2022/08/19/WU3203-ree-drummond-crispy-everything-chicken-cutlets_4x3.jpg.rend.hgtvcom.1280.960.suffix/1660928170362.jpeg" alt="Slide 1" className="w-full h-full object-cover" />
        </div>
        <div className="h-full">
          <img src="https://www.safefood.net/getmedia/94101697-3c3f-4fe1-8ae8-5b595d3814ba/medium-rare-steak.jpg?w=2000&h=1333&ext=.jpg&width=1360&resizemode=force" alt="Slide 2" className="w-full h-full object-cover" />
        </div>
        <div className="h-full bg-opacity-50">
          <img src={image12} alt="Slide 3" className="w-full h-full  object-cover" />
        </div>
      </Carousel>
    </div>
    </>
    
    
  );
}

export default ImgCarousel;
