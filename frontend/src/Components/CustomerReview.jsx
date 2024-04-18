'use client';

import { Carousel, Avatar } from 'flowbite-react';
import { FaStar } from "react-icons/fa6";


function CustomerReview() {
    return (
        <div className="w-full h-96 ">
            <Carousel>
                <span className='w-full h-full overflow-hidden'>
                    <span className='w-full flex justify-center m-5'>
                        <img className='w-28 h-28 rounded-full border-4 border-red-500' src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="" />
                    </span>
                    <span>
                        <p className='text-center text-xl p-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam non provident quia magni sunt. Dolores odio beatae accusamus eveniet corporis minus quod reprehenderit nemo animi recusandae molestias inventore, laborum deleniti.</p>
                    </span>
                    <span className='flex justify-center items-center text-xl m-5'>
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                    </span>
                    <span className='flex justify-center items-center'>
                        <p>John Doe</p>
                    </span>
                </span>

                <span className='w-full h-full'>
                    <span className='w-full flex justify-center m-5'>
                        <img className='w-28 h-28 rounded-full border-4 border-red-500' src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="" />
                    </span>
                    <span>
                        <p className='text-center text-xl p-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam non provident quia magni sunt. Dolores odio beatae accusamus eveniet corporis minus quod reprehenderit nemo animi recusandae molestias inventore, laborum deleniti.</p>
                    </span>
                    <span className='flex justify-center items-center text-xl m-5'>
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                    </span>
                    <span className='flex justify-center items-center'>
                        <p>John Doe</p>
                    </span>
                </span>
                <span className='w-full h-full'>
                    <span className='w-full flex justify-center m-5'>
                        <img className='w-28 h-28 rounded-full border-4 border-red-500' src="https://flowbite.com/docs/images/people/profile-picture-1.jpg" alt="" />
                    </span>
                    <span>
                        <p className='text-center text-xl p-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam non provident quia magni sunt. Dolores odio beatae accusamus eveniet corporis minus quod reprehenderit nemo animi recusandae molestias inventore, laborum deleniti.</p>
                    </span>
                    <span className='flex justify-center items-center text-xl m-5'>
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                    </span>
                    <span className='flex justify-center items-center'>
                        <p>John Doe</p>
                    </span>
                </span>
                
                
            </Carousel>
        </div>
    );
}

export default CustomerReview;
