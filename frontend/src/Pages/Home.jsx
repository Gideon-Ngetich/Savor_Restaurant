import { React, useEffect, useState } from 'react'
import TopNav from '../Components/Navbar'
import ImgCarousel from '../Components/Carousel'
import CustomerReview from '../Components/CustomerReview'
import { MdOutlineArrowRightAlt } from "react-icons/md";
import axios from 'axios';
import video from '../assets/video.mp4'
import Footer from '../Components/Footer'
import image6 from '../assets/image-6.jpg'
import image7 from '../assets/image-7.jpg'
import image8 from '../assets/image-8.jpg'
import image9 from '../assets/image-9.jpg'
import image10 from '../assets/image-10.jpg'
import image11 from '../assets/image-11.jpg'
import video1 from '../assets/video-1.mp4'
import ReservationTable from '../Components/ReservationTable';
import Loader from '../Components/Loader'


const Home = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 3300)
    }, [])
    if (loading) {
        return <Loader />
    }

    const bgImgURL = 'https://cdn-jfbij.nitrocdn.com/dqNqJXflBdWeKBEcxejIfJBoyWdMBCQM/assets/images/optimized/rev-9ed14d9/totalfood.com/wp-content/uploads/2013/07/restaurant-floor-plan-design-2.jpg'
    const gridImg1 = 'https://rakskitchen.net/wp-content/uploads/2013/11/10867983783_854a7fec8f_o.jpg'
    const gridImg2 = 'https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    const gridImg3 = 'https://cdn.shopify.com/s/files/1/0108/5757/8558/files/Fizzy_Drinks_impact_on_skin_1024x1024.png?v=1614167247'
    const gridImg4 = 'https://media.istockphoto.com/id/868408746/photo/assorted-indian-dish.jpg?s=612x612&w=0&k=20&c=XLsAk571Z2kEe_x6TnXWSzsG95-2agp-TcYswQrKHuo='
    const gridImg5 = 'https://i.pinimg.com/736x/f0/4f/51/f04f51de57631fd10a51eb7ceaa18cb9.jpg'
    const gridImg6 = 'https://t3.ftcdn.net/jpg/01/76/33/14/360_F_176331484_nLHY9EoW0ETwPZaS9OBXPGbCJhT70GZe.jpg'

    const buttonLabels = ['Dinner', 'Starter', 'Lunch', 'Drinks', 'Dessert', 'Happy Hour'];

    return (
        <>
            {/* <Loader /> */}
            <TopNav />
            <ImgCarousel />

            <div className='flex flex-col gap-10 justify-center items-center lg:flex-row mx-5 my-10 overflow-hidden'>
                <div className='flex flex-col w-full lg:w-1/2 justify-center items-center md:items-center'>
                    <p className='w-full text-center text-3xl lg:text-5xl text-yellow-500' style={{ fontFamily: 'satisfy' }}>African Restaurant</p>
                    <h1 className='text-white' style={{ fontFamily: 'oswald', fontSize: '50px' }}>WELCOME</h1>
                    <span className='flex flex-col justify-center items-center my-4 lg:w-3/4 xl:w-1/2 p-5'>
                        <p style={{ fontFamily: 'Signika', fontSize: '20px' }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate sapiente harum sunt deleniti sequi sed maiores ipsum consequatur quisquam tempore, alias dicta quo quos facere fugit deserunt voluptates! Nesciunt, suscipit corporis fugiat quas voluptas magnam quisquam dignissimos ut doloribus cumque consequatur fugit facere cupiditate illum molestiae, dolorem modi eveniet molestias.</p>
                        <span className='flex flex-row justify-center p-5  items-center text-blue-500 hover:text-blue-900 transition-all'>
                            <a className='text-xl' href="">Our Story</a>
                            <MdOutlineArrowRightAlt className='text-3xl' />
                        </span>
                    </span>
                </div>
                <div className='flex justify-center items-center rounded-md'>
                    <img className='w-full h-full rounded-md hover:scroll-m-1' src="https://cdn.pixabay.com/photo/2021/10/10/17/57/african-cuisine-6697867_640.jpg" alt="" />
                </div>
            </div>

            <div style={{ backgroundImage: `url(${image6})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className='flex flex-col justify-center items-center w-full  h-96 bg-blue-600 overflow-hidden'>
                <span style={{ fontFamily: 'Courgette', fontSize: '40px' }} className='text-white'>Discover</span>
                <span style={{ fontWeight: '800' }} className='text-3xl text-white'>SAVOR RESTAURANT</span>
            </div>

            <div className='flex flex-col lg:flex-row md:flex-col gap-8 my-10 mx-5 lg:m-20 xl:m-20 overflow-hidden'>
                <div>
                    <span className='flex justify-center items-center'>
                        <img className='w-full h-60 rounded-md md:w-3/4 lg:h-52 lg:w-full' src={image6} alt="" />
                    </span>
                    <span>
                        <span>
                            <h1 className='text-2xl w-full lg:text-xl md:text-2xl xl:text-2xl text-center font-semibold text-white my-6'>ROMANTIC RESTAURANT</h1>
                        </span>
                        <span>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi nulla praesentium itaque reprehenderit, iusto beatae mollitia, porro quae aspernatur temporibus enim deserunt corrupti odit ipsam, velit eius eum. Ipsa, facilis!</p>
                        </span>
                        <span className='flex justify-center items-center gap-3 m-10 hover:text-blue-500'>
                            <a href="">LEARN MORE</a>
                            <MdOutlineArrowRightAlt className='text-xl' />
                        </span>
                    </span>
                </div>


                <div className='overflow-hidden'>
                    <span className='flex justify-center items-center'>
                        <img className='w-screen h-60 rounded-md md:w-3/4 lg:h-52 lg:w-full' src={image11} alt="" />
                    </span>
                    <span>
                        <span>
                            <h1 className='text-2xl w-full lg:text-xl md:text-2xl xl:text-2xl  text-center font-semibold text-white my-6'>DELICIOUS FOOD</h1>
                        </span>
                        <span>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi nulla praesentium itaque reprehenderit, iusto beatae mollitia, porro quae aspernatur temporibus enim deserunt corrupti odit ipsam, velit eius eum. Ipsa, facilis!</p>
                        </span>
                        <span className='flex justify-center items-center gap-3 m-10 hover:text-blue-500'>
                            <a href="">LEARN MORE</a>
                            <MdOutlineArrowRightAlt className='text-xl' />
                        </span>
                    </span>
                </div>

                <div>
                    <span className='flex justify-center items-center'>
                        <img className='w-screen h-60 rounded-md md:w-3/4 lg:h-52 lg:w-full' src={image10} alt="" />
                    </span>
                    <span>
                        <span>
                            <h1 className='text-2xl w-full lg:text-xl md:text-2xl xl:text-2xl  text-center font-semibold text-white my-6'>PIZZA YOU LOVE</h1>
                        </span>
                        <span>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi nulla praesentium itaque reprehenderit, iusto beatae mollitia, porro quae aspernatur temporibus enim deserunt corrupti odit ipsam, velit eius eum. Ipsa, facilis!</p>
                        </span>
                        <span className='flex justify-center items-center gap-3 m-10 hover:text-blue-500'>
                            <a href="">LEARN MORE</a>
                            <MdOutlineArrowRightAlt className='text-xl' />
                        </span>
                    </span>
                </div>



            </div >

            < div >
                <div className="flex flex-col lg:grid grid-cols-3 grid-rows-2 gap-4 m-10 overflow-hidden">
                    <div className="row-span-2 overflow-hidden flex justify-center items-center relative">
                        <img className='h-full w-full transform transition-transform duration-500 hover:scale-110' src={image8} alt="" />
                        <a className='absolute bg-gray-200 p-5 text-black text-xl font-semibold rounded-md transition-transform duration-1000 ease-in-out hover:bg-red-600' href="" style={{ zIndex: 10 }}>LUNCH</a>

                    </div>
                    <div className="row-span-2 overflow-hidden flex justify-center items-center relative">
                        <img className='h-full w-full transform transition-transform duration-500 hover:scale-110' src='https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt="" />
                        <a className='absolute bg-gray-200 p-5 text-black text-xl font-semibold rounded-md transition-transform duration-1000 ease-in-out hover:bg-red-600' href="" style={{ zIndex: 10 }}>FRESH JUICE</a>
                    </div>


                    <div className="overflow-hidden flex justify-center items-center relative">
                        <img className='h-full w-full transform transition-transform duration-500 hover:scale-110' src='https://www.bigbasket.com/media/uploads/recipe/w-l/2663_1_1.jpg' alt="" />
                        <a className='absolute bg-gray-200 p-5 text-black text-xl font-semibold rounded-md transition-transform duration-1000 ease-in-out hover:bg-red-600' href="" style={{ zIndex: 10 }}>HOT DRINKS</a>
                    </div>

                    <div className="col-span-2 col-start-1 row-start-3 overflow-hidden flex justify-center items-center relative">
                        <img className='h-full w-full transform transition-transform duration-500 hover:scale-110' src='https://media.istockphoto.com/id/868408746/photo/assorted-indian-dish.jpg?s=612x612&w=0&k=20&c=XLsAk571Z2kEe_x6TnXWSzsG95-2agp-TcYswQrKHuo=' alt="" />
                        <a className='absolute bg-gray-200 p-5 text-black text-xl font-semibold rounded-md transition-transform duration-1000 ease-in-out hover:bg-red-600' href="" style={{ zIndex: 10 }}>DINNER</a>
                    </div>

                    <div className="col-start-3 row-start-3 overflow-hidden flex justify-center items-center relative">
                        <img className='h-full w-full transform transition-transform duration-500 hover:scale-110' src='https://images.herzindagi.info/image/2020/Jun/chocolate-parle-g-ice-cream.jpg' alt="" />
                        <a className='absolute bg-gray-200 p-5 text-black text-xl font-semibold rounded-md transition-transform duration-1000 ease-in-out hover:bg-red-600' href="" style={{ zIndex: 10 }}>ICE CREAM</a>
                    </div>

                    <div className="col-start-3 row-start-2 overflow-hidden flex justify-center items-center relative">
                        <img className='h-full w-full transform transition-transform duration-500 hover:scale-110' src={image10} alt="" />
                        <a className='absolute bg-gray-200 p-5 text-black text-xl font-semibold rounded-md transition-transform duration-1000 ease-in-out hover:bg-red-600' href="" style={{ zIndex: 10 }}>FRIED PIZZA</a>
                    </div>

                </div>
            </div >





            <div className='flex flex-col lg:flex-row xl:flex-row justify-center items-center gap-5 m-0 w-screen lg:p-5 bg-slate-600 overflow-hidden'>
                <span className='w-full flex flex-col justify-center items-center lg:w-[700px] md:w-[900px]'>
                    <span className='flex flex-col justify-center items-center mb-10'>
                        <h2 style={{ fontFamily: 'Courgette' }} className='text-5xl text-yellow-500'>Discover</h2>
                        <h1 className='text-4xl text-white font-bold tracking-2'>Book Table</h1>
                    </span>
                    <span className='flex justify-start items-start py-10'>
                        <ReservationTable />
                    </span>
                </span>
                <span className='flex w-[500px] mb-5'>
                    <img className='w-[700px] h-full rounded-md' src="https://www.yummytoddlerfood.com/wp-content/uploads/2022/04/Homemade-Lunch-1-horiz.jpg" alt="" />
                </span>


            </div>

            <div>
                <span className='flex flex-col justify-center items-center mt-10 mb-5 overflow-hidden'>
                    <h2 style={{ fontFamily: 'Courgette' }} className='text-5xl text-yellow-500'>Customers Say</h2>
                    <h1 className='text-4xl text-white font-bold tracking-2'>REVIEW</h1>
                </span>
                <span>
                    <CustomerReview />
                </span>
            </div>

            <div className='h-auto overflow-hidden'>
                <span className='flex flex-col justify-center items-center mt-10 mb-5'>
                    <h2 style={{ fontFamily: 'Courgette' }} className='text-5xl text-yellow-500'>Savor</h2>
                    <h1 className='text-4xl text-white font-bold tracking-2'>OUR VIDEO</h1>
                </span>
                <div className="flex justify-center items-center">
                    <div className="w-[800px] h-full lg:h-[800px] flex justify-center overflow-hidden">
                        <video src={video1} controls className="w-full h-full object-cover"></video>
                    </div>
                </div>
            </div>

            <div className='h-auto'>
                <Footer />
            </div>
        </>
    )
}

export default Home