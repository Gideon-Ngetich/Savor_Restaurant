import { React, useState, useEffect } from 'react'
import TopNav from '../Components/Navbar'
import { MdEdit } from "react-icons/md";
import axios from 'axios'
import { useSnackbar } from 'notistack';
import { useNavigate, Link } from 'react-router-dom';



const Profile = () => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    // const link = 'https://savor-restaurant-1.onrender.com'
    const link = 'http://localhost:5500'


    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userId = localStorage.getItem('UserId')
                const response = await axios.get(`${link}/api/user/${userId}`)
                setLoading(false)
                setUser(response.data)
            } catch (err) {
                console.log(err.message)
            }
        }

        fetchUserInfo()
    }, [])

    // useEffect(() => {
    //     setTimeout(() => {

    //         // setUser(userData)
    //         setLoading(false)
    //     }, 5000)
    // }, [])

    const handleSignOut = async () => {
        try {
            await axios.post(`${link}/api/logout`);

            localStorage.clear();
            enqueueSnackbar('Log out successful', { variant: 'success' })
            navigate('/');
            window.location.reload()

        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div>
            <TopNav />
            <div>
                <div className='bg-slate-600 bg-opacity-10 shadow-md m-10 h-auto pt-5 pb-10'>
                    <div className='w-full h-10 flex justify-between items-center border-b-2 px-6 border-slate-500 text-white font-bold text-xl'>
                        <h2 className='text-xl'>Account Overview</h2>
                        <Link to='/profile/updateinfo' className='p-2 rounded-full hover:bg-slate-700 duration-75 ease-in'>
                            <MdEdit />
                        </Link>
                    </div>
                    <div className='flex flex-col lg:flex-row md:flex-row xl:flex-row w-full p-5 lg:p-0 md:p-0 xl:p-0 justify-center items-center'>

                    <div className='w-full lg:w-1/2 md:w-1/2 xl:w-1/2 h-auto lg:h-48 md:h-48 xl:h-48 bg-slate-600 bg-opacity-10 shadow-md m-5 lg:m-10 border border-slate-600'>
                            <h2 className='w-full h-10 flex justify-start items-center border-b-2 px-5 border-slate-500 text-white font-bold text-lg lg:text-xl '>ACCOUNT SUMMARY</h2>

                            <div>
                                {loading ? (
                                    <div className='flex w-full p-14 justify-center items-center text-white animate-pulse text-xl'>
                                        Loading....
                                    </div>
                                ) : (
                                    <div>
                                        {/* <h2 className='w-full h-10 flex justify-start items-center border-b-2 px-5 border-slate-500 text-white font-bold text-xl'>ADDRESS BOOK</h2> */}
                                        {user && (
                                            <div className='p-5 text-white'>
                                                <h2 className='text-xl pb-5'>Your delivery address:</h2>
                                                <div className='flex gap-3'>

                                                    <p>{user.userName}</p>
                                                </div>
                                                
                                                <div className='flex gap-3'>
                                                    <p>0{user.email}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                            </div>

                        </div>

                        <div className='w-full lg:w-1/2 md:w-1/2 xl:w-1/2 h-auto lg:h-48 md:h-48 xl:h-48 bg-slate-600 bg-opacity-10 shadow-md m-5 lg:m-10 border border-slate-600'>
                            <h2 className='w-full h-10 flex justify-start items-center border-b-2 px-5 border-slate-500 text-white font-bold text-xl'>ACCOUNT DETAILS</h2>

                            <div>
                                {loading ? (
                                    <div className='flex w-full p-14 justify-center items-center text-white animate-pulse text-lg lg:text-xl '>
                                        <p>Loading....</p>
                                    </div>
                                ) : (
                                    <div>
                                        {/* <h2 className='w-full h-10 flex justify-start items-center border-b-2 px-5 border-slate-500 text-white font-bold text-xl'>ADDRESS BOOK</h2> */}
                                        {user && (
                                            <div className='p-5 text-white'>
                                                <h2 className='text-xl pb-5'>Your delivery address:</h2>
                                                <div className='flex gap-3'>

                                                    <p>{user.userName}</p>
                                                </div>
                                                <div className='flex gap-3'>
                                                    <p>{user.location}</p>
                                                </div>
                                                <div className='flex gap-3'>
                                                    <p>0{user.phone}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                            </div>

                        </div>
                    </div>
                    <div>
                        <div to={'/cart'} className='flex justify-center items-center'>
                            <button className='w-44 px-10 py-3 bg-blue-500 text-white lg:w-48' onClick={handleSignOut}>Log out</button>
                        </div>

                    </div>
                </div>
            </div >
        </div >
    )
}

export default Profile