import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { AiFillTwitterCircle, AiFillInstagram, AiFillFacebook } from "react-icons/ai";
import validator from 'validator';
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
    const history = useNavigate()

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
        try {
            if (password !== confirmPassword) {
                setPasswordMatch(false);
                enqueueSnackbar('Passwords do not match', { variant: 'error' });
                return;
            }

            const response = await axios.post('https://savor-restaurant-1.onrender.com/api/users', { userName, email, phone, location, password });

            if (!response.ok) {
                const data = await response.json();
                console.log(response.code)
                if (response.code === "ERR_BAD_REQUEST") {
                    enqueueSnackbar('User already exist', { variant: 'error' });
                } else {
                    enqueueSnackbar('Error Creating User');
                }
            } else {
                console.log('Account successfully created');
                enqueueSnackbar('Signup Successful', { variant: 'success' })
                history('/login')
            }
        } catch(err) {
            console.log({message: err})
        }
    };


    return (
        <div className="flex flex-col md:flex-row items-center min-h-screen lg:flex-row xl:flex-row flex-1 justify-center w-full lg:bg-cover sm:h-screen"  >

            <div className="flex h-screen w-full md:w-full bg-cover bg-center  md:block" style={{ backgroundImage: "url(https://img.freepik.com/free-photo/top-view-meals-tasty-yummy-different-pastries-dishes-brown-surface_140725-14554.jpg)" }}>
                <div className="text-center item-center flex flex-col justify-center items-center h-full">
                    <span className="text-courgette text-5xl lg:text-6xl font-bold text-white">Welcome to Savor Restaurant</span><br />
                    <span className="text-courgette text-2xl lg:text-4xl italic font-medium text-yellow-200">Where serenity meets culinary artistry</span>
                </div>

            </div>

            {/* Signup Form */}
            <div className="bg-white p-5 rounded shadow-md md:max-w-md w-full lg:h-screen lg:flex lg:items-center lg:justify-center sm:h-screen" style={{ backgroundImage: "url(your-background-image-url.jpg)" }}>
                <div className="flex justify-center items-center w-full h-full"
                >
                    <div className=" md:w-full lg:w-full xl:full bg-white p-8 rounded shadow-md max-w-md w-full">
                        <h1 className="text-3xl mb-6 text-center text-black font-extrabold">
                            Hi there!
                            <br />
                            <p>Let's Get You Started</p>
                        </h1>
                        <form className="w-full">
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Full Name"
                                className="bg-white text-black p-2 rounded-md w-full border border-gray-300 mb-4"
                                required
                            />
                            {/* Add similar input elements for Last Name, Email, and Phone Number */}
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                className="bg-white text-black p-2 rounded-md w-full border border-gray-300 mb-4"
                                require
                            />
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Phone Number"
                                className="bg-white text-black p-2 rounded-md w-full border border-gray-300 mb-4"
                                required
                            />
                            <select name="" value={location} onChange={handleChange} className="bg-white text-black w-full p-2 mb-4 border border-gray-300 rounded-md">
                                <option value="Kabarak">Kabarak</option>
                                <option value="Chapchap">ChapChap</option>
                                <option value="OBT">OBT</option>
                                <option value="Baraka Shop">Baraka Shop</option>
                                <option value="Elevate">Elevate</option>
                                <option value="Stage One">Stage One</option>
                                <option value="Oloika">Oloika</option>
                            </select>

                            <div className="border border-gray-300 text-black rounded-md w-full relative mb-4">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter your Password"
                                    className="mt-1 p-2 w-full border rounded-md bg-white border-none"
                                />
                                <div
                                    className="absolute right-2 top-2 cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </div>

                            </div>
                            <div className="border border-gray-300 text-black rounded-md w-full relative mb-4">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    placeholder="Confirm your Password"
                                    className="mt-1 p-2 w-full border rounded-md bg-white border-none"
                                />
                                <div
                                    className="absolute right-2 top-2 cursor-pointer"
                                    onClick={togglePasswordVisibility2}
                                >
                                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
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

                        <div className="mt-4 text-center text-gray-600">
                            <p>Already have an account? <a href="/login" className="text-blue-500">Login</a></p>
                        </div>

                        <div className="mt-6 text-sm text-gray-600 text-center">
                            or sign up with
                        </div>

                        <div className="mt-2 flex justify-center">
                            <AiFillTwitterCircle className="text-blue-500 text-2xl mr-4 cursor-pointer" />
                            <AiFillInstagram className="text-pink-500 text-2xl mr-4 cursor-pointer" />
                            <AiFillFacebook className="text-blue-600 text-2xl cursor-pointer" />

                            {/* Additional Content */}
                        </div>
                    </div>
                </div>

                {/* Background Image for small screens */}
                <div className="w-full bg-cover bg-center md:hidden" style={{ backgroundImage: "url(https://img.freepik.com/free-photo/top-view-meals-tasty-yummy-different-pastries-dishes-brown-surface_140725-14554.jpg)" }}></div>
            </div>
        </div>

    );
};

export default Signup;