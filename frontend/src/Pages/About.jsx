import React, { useEffect, useRef, useState } from "react";
import TopNav from "../Components/Navbar";
import video from '../assets/video-1.mp4'
import Footer from '../Components/Footer'
import image12 from '../assets/image-12.jpg'
import interor2 from '../assets/interior2.jpg'
import receipe from '../assets/receipe.jpg'
import Loader from "../Components/Loader"


const About = () => {
  const navRef = useRef(null);
  const bottomRef = useRef(null);
  const videoRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const handleScroll = () => {
      const navBottom = navRef.current.getBoundingClientRect().bottom;
      const bottomTop = bottomRef.current.getBoundingClientRect().top;
      const videoTop = videoRef.current.getBoundingClientRect().top;

      if (window.scrollY > navBottom) {
        document.body.classList.add("scrolled");
      } else {
        document.body.classList.remove("scrolled");
      }

      if (bottomTop <= window.innerHeight / 2) {
        bottomRef.current.classList.add("extended");
      } else {
        bottomRef.current.classList.remove("extended");
      }

      if (videoTop <= window.innerHeight && videoTop >= 0) {
        setShowVideo(true);
      } else {
        setShowVideo(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3300)
  }, [])
  if (loading) {
    return <Loader />
  }

  const bgImg =
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D";


  return (
    <>
      <TopNav />
      <div className="w-full">
        <div
          className="bg-cover bg-fixed h-80 md:h-96 lg:h-120 xl:h-160 w-full flex justify-center items-center"
          style={{ backgroundImage: `url(${bgImg})` }}
        >
          <p className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white">
            ABOUT US
          </p>
        </div>

        <div className="flex flex-col justify-center items-center text-center py-10">
          <span
            style={{ fontFamily: "satisfy" }}
            className="text-xl md:text-3xl lg:text-4xl xl:text-5xl text-yellow-500"
          >
            African Restaurant
          </span>
          <span
            style={{ fontFamily: "oswald" }}
            className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl py-3"
          >
            OUR STORY
          </span>
          <p className="px-2 md:px-10 lg:px-20 xl:px-40 py-5 md:py-10 text-sm md:text-base lg:text-lg xl:text-xl">
            Fusce at risus eget mi auctor pulvinar. Suspendisse maximus
            venenatis pretium. Orci varius natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus. Aliquam purus purus,
            lacinia a scelerisque in, luctus vel felis. Donec odio diam,
            dignissim a efficitur at, efficitur et est. Pellentesque semper est
            ut pulvinar ullamcorper. Class aptent taciti sociosqu ad litora
            torquent per conubia nostra, per inceptos himenaeos. Nulla et leo
            accumsan, egestas velit ac, fringilla tortor. Sed varius justo sed
            luctus mattis.
          </p>
        </div>

        <div className='h-auto overflow-hidden'>
          <span className='flex flex-col justify-center items-center mt-10 mb-5'>
            <h2 style={{ fontFamily: 'Courgette' }} className='text-5xl text-yellow-500'>Savor</h2>
            <h1 className='text-4xl text-white font-bold tracking-2'>OUR VIDEO</h1>
          </span>
          <div className="flex justify-center items-center">
            <div className="w-[800px] h-full lg:h-[800px] flex justify-center overflow-hidden">
              <video src={video} controls className="w-full h-full object-cover"></video>
            </div>
          </div>
        </div>


        <div className="my-20">
          <div className="flex flex-col-reverse lg:flex-row justify-center items-center gap-5 w-full text-center p-10">
            <div className="flex justify-center items-center w-full lg:w-1/2">
              <img src={interor2} alt="" className="w-full lg:w-3/4 rounded-md" />
            </div>
            <div className="flex flex-col w-full lg:w-1/2">
              <span style={{ fontFamily: 'satisfy' }} className="text-yellow-500 text-3xl lg:text-4xl xl:text-5xl">Romantic</span>
              <span style={{ fontFamily: 'oswald' }} className="text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Restaurant</span>
              <p className="m-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta rerum corporis tempora, nulla, iure tempore blanditiis alias itaque harum voluptas minima nostrum illum? Nam obcaecati aut veritatis debitis id, quod, recusandae commodi neque reiciendis maiores similique ipsam unde ratione modi?</p>
            </div>
          </div>

          <div className="flex flex-col-reverse lg:flex-row-reverse justify-center items-center gap-5 w-full text-center p-10">
            <div className="flex justify-center items-center w-full lg:w-1/2">
              <img src={receipe} alt="" className="w-full lg:w-3/4 rounded-md" />
            </div>
            <div className="flex flex-col w-full lg:w-1/2">
              <span style={{ fontFamily: 'satisfy' }} className="text-yellow-500 text-3xl lg:text-4xl xl:text-5xl">Delicious</span>
              <span style={{ fontFamily: 'oswald' }} className="text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Recipes</span>
              <p className="m-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta rerum corporis tempora, nulla, iure tempore blanditiis alias itaque harum voluptas minima nostrum illum? Nam obcaecati aut veritatis debitis id, quod, recusandae commodi neque reiciendis maiores similique ipsam unde ratione modi?</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-screen h-[600px] overflow-hidden">
        <img src={image12} alt="" srcset="" className="w-full h-full" />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default About;