import { React, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "tailwindcss/tailwind.css";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Loader from "../Components/Loader";
import { useSnackbar } from "notistack";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  // const link = 'https://savor-restaurant-1.onrender.com'
  const link = 'http://localhost:5500'


  const { enqueueSnackbar } = useSnackbar();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 3300)
  }, [])
  if (loading) {
    return <Loader />
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === '' && password === '') {
      enqueueSnackbar('Please enter email and password', { variant: 'error' })
    } else if (email === '') {
      enqueueSnackbar('Email required', { variant: 'error' })
    } else if (password === '') {
      enqueueSnackbar('Password required', { variant: 'error' })
    } else {
      try {
        const response = await axios.post(`${link}/api/login`, { email, password }, { withCredentials: true });


        if (response.status === 200) {
          enqueueSnackbar("Login Successful", { variant: 'success' })
          const { accessToken, userId } = response.data;
          localStorage.setItem('accessToken', accessToken)
          localStorage.setItem('UserId', userId);
          console.log(response.data)
          // localStorage.setItem('UserName', userName)
          // localStorage.setItem('userName', userName)
          localStorage.getItem('email', email)
          console.log(email)

          setEmail('')
          setPassword('')
          navigateTo('/')
        }
      } catch (error) {
        console.error('Error logging in:', error);
        if (error.response && error.response.status === 401) {
          enqueueSnackbar('Incorrect Email or Password', { variant: 'error' })
        } else {
          enqueueSnackbar('Error logging in. Please try again later.', { variant: 'error' });
        }
      }
    }
  };

  const formStyle = {
    height: "auto",
    width: "100%",
    maxWidth: "340px",
  };

  const backgroundStyle = {
    backgroundColor: "rgba(255, 0, 0, 0.3)",
    backgroundImage:
      "url(https://img.freepik.com/free-photo/top-view-meals-tasty-yummy-different-pastries-dishes-brown-surface_140725-14554.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  return (
    <div className="flex flex-col lg:flex-row xl:flex-row w-full">
      <div className="flex flex-col text-center justify-center items-center bg-cover h-[500px] lg:h-screen xl:h-screen w-full lg:w-1/2 xl:w-1/2" style={backgroundStyle}>
        <div className=" ">
          <span className="text-courgette text-5xl lg:text-6xl font-bold text-white">Welcome to Savor Restaurant</span><br />
          <span className="text-courgette text-2xl lg:text-4xl italic font-medium text-yellow-200">Where serenity meets culinary artistry</span>
        </div>

      </div>
      <div className="w-full flex justify-center items-center lg:w-1/2 xl:w-1/2 py-10 bg-white">
        <div className="flex flex-col justify-center items-center bg-white rounded w-full" style={formStyle}>
          <h1 className="text-3xl mb-6 text-center text-black font-extrabold">
            Hi there!
            <br />
            <p>Let's Get You In</p>
          </h1>
          <form className="w-full bg-white p-3">
            <div className="mb-4 flex items-start flex-col ">
              <label htmlFor="email" className="block text-sm font-medium text-black">
                Email Address
              </label>
              <span className="flex justify-center items-center w-full outline-none bg-grey-300">

                <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} placeholder="Email"
                  class="peer h-full text-black w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
              </span>
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
            <div className="mb-4 gap-3 flex flex-col items-start justify-between">
              <div className="flex items-center">

                <input type="checkbox" id="rememberMe" className="mr-2" />
                <label htmlFor="rememberMe" className="text-sm text-gray-600">
                  Remember me
                </label>


              </div>
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600"
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-sm text-gray-600 text-center">
            or login with
          </div>
          <div className="mt-2 flex justify-center">
            <FcGoogle className="text-3xl hover:scale-75 duration-100 ease-in" />
          </div>
          <div className="mt-4 text-center text-gray-600">
            <p>Don't have an account? <a href="/signup" className="text-blue-500">Signup</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;