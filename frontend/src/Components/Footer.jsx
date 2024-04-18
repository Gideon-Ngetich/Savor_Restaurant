import React from 'react'
import { CiLocationOn } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";




const Footer = () => {
    return (
        <>
            <div className='flex flex-col justify-center items-center lg:flex-row lg:justify-around lg:items-start border-t-2 p-5 lg:p-10 mt-10 bg-blue-400 bg-opacity-10'>
                <div className='border-none lg:border-r-2 p-5 lg:p-10 justify-center items-center'>
                    <h1 className='text-2xl text-white font-bold text-center lg:text-left'>Contact Us</h1>
                    <span className='flex justify-center lg:justify-start items-center gap-2 text-xl m-5'>
                        <CiLocationOn />
                        <p>Near Kabarak University</p>
                    </span>
                    <span className='flex justify-start items-center gap-2 text-xl m-5'>
                        <FaPhoneAlt />
                        <p>+254 785 020 603</p>
                    </span>
                    <span className='flex justify-start items-center gap-2 text-xl m-5'>
                        <CiMail />
                        <p>savor@restaurant.com</p>
                    </span>
                </div>
                <div className='py-5 lg:py-10 justify-start'>
                    <div>
                        <h1 className='text-2xl text-white font-bold text-center lg:text-left'>Opening Hours</h1>
                        <p className='text-xl m-5'>7.00AM - 10PM <br /> Everyday</p>
                    </div>

                </div>
                <div className='border-none lg:border-l-2 h-full p-5 lg:p-10'>
                    <h1 className='text-2xl text-white font-bold text-center lg:text-left'>Follow Us</h1>
                    <a href="" target='_blank'>
                        <span className='flex justify-start items-center gap-2 text-xl m-5  hover:text-blue-500 ease-in duration-300'>
                            <FaFacebook className='text-blue-600' />
                            <p>Facebook</p>
                        </span>
                    </a>
                    <a href="https://www.instagram.com/savor.restaurant?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target='_blank'>
                        <span className='flex justify-start items-center gap-2 text-xl m-5  hover:text-pink-400 ease-in duration-300'>
                            <FaInstagram className='text-pink-500' />
                            <p>Instagram</p>
                        </span>
                    </a>
                    <a href="" target='_blank'>
                        <span className='flex justify-start items-center gap-2 text-xl m-5 hover:text-blue-500 ease-in duration-300'>
                            <FaTwitter className='text-blue-400' />
                            <p>Twitter</p>
                        </span>
                    </a>

                </div>
            </div>
            <div>
                <div className='flex flex-col lg:flex-row justify-center items-center bg-black p-5 gap-2 lg:gap-5'>
                    <p className='text-white text-lg'>© 2021 Savor Restaurant. All rights reserved.</p>
                    {/* <p className='float-right'><a href="">Superme Developers</a></p> */}
                </div>
            </div>

        </>
    )
}

export default Footer