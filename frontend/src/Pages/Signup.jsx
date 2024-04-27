import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { AiFillTwitterCircle, AiFillInstagram, AiFillFacebook } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Loader from "../Components/Loader";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [userName, setUsername] = useState('');
    const [location, setLocation] = useState('');
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => setLoading(false), 3300)
    }, [])
    if (loading) {
        return <Loader />
    }


    //    const handleLocationChange = (event) => {
    //         setLocation(event.target.value);
    //     }

    const handleChange = event => {
        setLocation(event.target.value);
    }

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);

    };

    const togglePasswordVisibility2 = () => {
        setShowConfirmPassword((prevShowPassword) => !prevShowPassword);

    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordMatch(true);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        setPasswordMatch(true);

    };



    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (userName === '' && email === '' && phone === '' && password === '') {
            enqueueSnackbar("All fields required", { variant: 'error' })
        } else if (userName === '') {
            enqueueSnackbar("Full Name required", { variant: 'error' })
        } else if (phone === '') {
            enqueueSnackbar("Phone Number required", { variant: 'error' })
        } else if (password === '') {
            enqueueSnackbar("Password required", { variant: 'error' })
        } else if (email === '') {
            enqueueSnackbar("Email required", { variant: 'error' })
        } else {
            try {


                if (password !== confirmPassword) {
                    setPasswordMatch(false);
                    enqueueSnackbar('Passwords do not match', { variant: 'error' });
                    return;
                }

                const response = await axios.post(`${process.env.BACKEND_URL}/api/users` || 'https://savor-restaurant-1.onrender.com/api/users', { userName, email, phone, location, password });

                console.log('Response:', response);

                if (response.status === 200) { // Assuming status 200 indicates successful user creation
                    console.log('Account successfully created');
                    enqueueSnackbar('Signup Successful', { variant: 'success' });
                    navigate('/login');
                }
            } catch (err) {
                console.error('Error:', err);
                if (err.response && err.response.status === 409) {
                    enqueueSnackbar('User already exists', { variant: 'error' });
                } else {
                    enqueueSnackbar('Error Creating User', { variant: 'error' });
                }
            }
        }
    };



    return (
        <div className="flex flex-col lg:flex-row xl:flex-row w-full"  >

            <div className="flex flex-col text-center justify-center items-center bg-center bg-repeat-x bg-auto h-[500px] lg:h-screen xl:h-screen w-full lg:w-1/2 xl:w-1/2" style={{ backgroundImage: "url(https://img.freepik.com/free-photo/top-view-meals-tasty-yummy-different-pastries-dishes-brown-surface_140725-14554.jpg)" }}>
                <div className=" ">
                    <span className="text-courgette text-5xl lg:text-6xl font-bold text-white">Welcome to Savor Restaurant</span><br />
                    <span className="text-courgette text-2xl lg:text-4xl italic font-medium text-yellow-200">Where serenity meets culinary artistry</span>
                </div>

            </div>

            <div className="w-full lg:w-1/2 xl:w-1/2 py-3 bg-white" style={{ backgroundImage: "url(your-background-image-url.jpg)" }}>
                <div className="flex justify-center items-center w-full h-full"
                >
                    <div className="bg-white">
                        <h1 className="text-3xl mb-6 text-center text-black font-extrabold">
                            Hi there!
                            <br />
                            <p>Let's Get You Started</p>
                        </h1>
                        <form className="w-full bg-white p-3">

                            <div className="flex gap-5">
                                <div className="mb-2 flex items-start flex-col ">
                                    <label htmlFor="email" className="block text-sm font-medium text-black">
                                        Full Name
                                    </label>
                                    <span className="flex justify-center items-center w-full outline-none bg-grey-300">

                                        <input type="text" value={userName} onChange={(e) => setUsername(e.target.value)} placeholder="Full Name" required
                                            class="peer h-full text-black w-full border-b border-blue-gray-200 bg-transparent pt-2 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                                    </span>
                                </div>
                                <div className="mb-4 flex items-start flex-col ">
                                    <label htmlFor="email" className="block text-sm font-medium text-black">
                                        Email Address
                                    </label>
                                    <span className="flex justify-center items-center w-full outline-none bg-grey-300">

                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" required
                                            class="peer h-full text-black w-full border-b border-blue-gray-200 bg-transparent pt-2 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-5">
                                <div className="mb-4 flex items-start flex-col w-1/2">
                                    <label htmlFor="email" className="block text-sm font-medium text-black">
                                        Phone Number
                                    </label>
                                    <span className="flex justify-center items-center w-full outline-none bg-grey-300">

                                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" required
                                            class="peer h-full text-black w-full border-b border-blue-gray-200 bg-transparent pt-2 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                                    </span>
                                </div>
                                <div className="flex items-start flex-col w-1/2">
                                    <label htmlFor="email" className="block text-sm font-medium text-black">
                                        Location
                                    </label>
                                    <select name="" value={location} onChange={handleChange} className="bg-white text-black w-full p-2 mb-4 border border-gray-300 rounded-md">
                                        <option value="Kabarak">Choose Location</option>
                                        <option value="Kabarak">Kabarak</option>
                                        <option value="Chapchap">ChapChap</option>
                                        <option value="OBT">OBT</option>
                                        <option value="Baraka Shop">Baraka Shop</option>
                                        <option value="Elevate">Elevate</option>
                                        <option value="Stage One">Stage One</option>
                                        <option value="Oloika">Oloika</option>
                                    </select>
                                </div>
                            </div>

                            <div className="relative mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-black">
                                    Password
                                </label>
                                <input type={showPassword ? "text" : "password"} name="password" value={password} onChange={handlePasswordChange} placeholder="Password"
                                    class="peer h-full text-black w-full border-b border-blue-gray-200 bg-transparent pt-2 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                                <div
                                    className="absolute right-2 top-7 cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaEye className="text-black" /> : <FaEyeSlash className="text-black" />}
                                </div>
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-black">
                                    Confirm Password
                                </label>
                                <input type={showConfirmPassword ? "text" : "password"} name="password" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="Confirm Password"
                                    class="peer h-full text-black w-full border-b border-blue-gray-200 bg-transparent pt-2 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                                <div
                                    className="absolute right-2 top-7 cursor-pointer"
                                    onClick={togglePasswordVisibility2}
                                >
                                    {showPassword ? <FaEye className="text-black" /> : <FaEyeSlash className="text-black" />}
                                </div>
                            </div>

                            <input
                                type="checkbox"
                                id="termsCheckbox"
                                className="mr-2 mb-6"
                                required
                            />
                            <label htmlFor="termsCheckbox" className="text-gray-700">
                                I agree to the <a href="/terms" className="text-blue-500">Terms and Conditions</a>
                            </label>
                            <div className="bg-blue-500 text-white p-2 rounded-md w-full md:w-auto hover:bg-blue-600 text-center">
                                <button onClick={handleFormSubmit}>Sign Up</button>
                            </div>
                        </form>

                        <div className="mt-1 text-center text-gray-600">
                            <p>Already have an account? <a href="/login" className="text-blue-500">Login</a></p>
                        </div>

                        <div className="mt-2 text-sm text-gray-600 text-center">
                            or sign up with
                        </div>

                        <div className="mt-2 flex justify-center">
                            <FcGoogle className="text-3xl hover:scale-75 duration-100 ease-in" />
                        </div>
                    </div>
                </div>

                <div className="w-full bg-cover bg-center md:hidden" style={{ backgroundImage: "url(https://img.freepik.com/free-photo/top-view-meals-tasty-yummy-different-pastries-dishes-brown-surface_140725-14554.jpg)" }}></div>
            </div>
        </div>

    );
};

export default Signup;