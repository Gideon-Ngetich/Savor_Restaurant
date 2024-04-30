import { React, useState, useEffect } from 'react'
import TopNav from '../Components/Navbar'
import axios from 'axios';
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const UpdateInfo = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [updatedUser, setUpdatedUser] = useState({}); // State for updated user data
  const [location, setLocation] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // const link = 'https://savor-restaurant-1.onrender.com'
  const link = 'http://localhost:5500'

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = localStorage.getItem('UserId');
        const response = await axios.get(`${link}/api/user/${userId}`);
        setLoading(false);
        setUser(response.data);
        setLocation(response.data.location)
        console.log(setLocation(response.data.location))
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'location') {
      setLocation(value);
    } else if (name === 'oldPassword') {
      setOldPassword(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    } else {
      setUpdatedUser(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    const userId = localStorage.getItem('UserId');
    e.preventDefault();
    try {
      const response = await axios.get(`${link}/api/user/${userId}`);
      const email = response.data.email
      console.log(email)
      const validate = await axios.post(`${link}/api/login`, { email, password }, { withCredentials: true });
      if (oldPassword === validate.data.password) {
        if(newPassword !== confirmPassword){
          alert('password do not match')
        }
        // Old password matches, update the password
        await axios.put(`${link}/api/user/${userId}`, { ...updatedUser, password: newPassword });
        alert('Password updated successfully!');
        // Optionally, you can redirect the user or perform other actions after updating
      } else if (user.password === newPassword) {
        alert("New password cannot be the same as old password")
      } else {
        alert('Old password does not match!');
      }
    } catch (error) {
      console.error('Error updating user info:', error);
      alert('Failed to update user information');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);

  };

  const togglePasswordVisibility3 = () => {
    setShowNewPassword((prevShowPassword) => !prevShowPassword);

  };

  const togglePasswordVisibility2 = () => {
    setShowConfirmPassword((prevShowPassword) => !prevShowPassword);

  };
  

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordMatch(true);

  };

  return (
    <>
      <TopNav />
      <div className='w-full flex flex-col bg-slate-600 bg-opacity-10 shadow-md p-10 h-full pt-5 pb-10'>
        <h2 className='w-full h-10 flex justify-between items-center border-b-2 px-6 border-slate-500 text-white font-bold text-xl'>Edit Info</h2>
        {loading ? (
          <div className='flex w-full p-14 justify-center items-center text-white animate-pulse text-xl'>
            Loading...
          </div>
        ) : (
          <div className='p-5'>
            <form className="w-full p-3">
              {user && (

                <div>
                  <div className="flex gap-5 justify-between items-center">
                    <div className="w-1/2 mb-2 flex items-start flex-col ">
                      <label htmlFor="email" className="block text-sm font-medium text-white">
                        Full Name
                      </label>
                      <span className="flex justify-center items-center w-full outline-none bg-grey-300">

                        <input type="text" defaultValue={user.userName || ''} placeholder="Full Name" onChange={handleChange} required
                          class="peer h-full text-white w-full border-b border-blue-gray-200 bg-transparent pt-2 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                      </span>
                    </div>
                    <div className="w-1/2 mb-4 flex items-start flex-col ">
                      <label htmlFor="email" className="block text-sm font-medium text-white">
                        Email Address
                      </label>
                      <span className="flex justify-center items-center w-full outline-none bg-grey-300">

                        <input type="email" defaultValue={user.email || ''} placeholder="Email address" required
                          class="peer h-full text-white w-full border-b border-blue-gray-200 bg-transparent pt-2 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="mb-4 flex items-start flex-col w-1/2">
                      <label htmlFor="email" className="block text-sm font-medium text-white">
                        Phone Number
                      </label>
                      <span className="flex justify-center items-center w-full outline-none bg-grey-300">

                        <input type="tel" defaultValue={user.phone || ''} placeholder="Phone Number" onChange={handleChange} required
                          class="peer h-full text-white w-full border-b border-blue-gray-200 bg-transparent pt-2 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                      </span>
                    </div>
                    <div className="flex items-start flex-col w-1/2">
                      <label htmlFor="email" className="block text-sm font-medium text-white">
                        Location
                      </label>
                      <select name="" defaultValue={user.location} onChange={handleChange} className="bg-white text-black w-full p-2 mb-4 border border-gray-300 rounded-md">
                        <option value=''>{user.location}</option>
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

                </div>
              )}

              <div className="relative mb-4">
                <label htmlFor="" className="block text-sm font-medium text-white">
                  Old Password
                </label>
                <input type={showPassword ? "text" : "password"} name="oldPassword" value={oldPassword} onChange={handleChange} placeholder="Enter old Password"
                  class="peer h-full text-white w-full border-b border-blue-gray-200 bg-transparent pt-2 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                <div
                  className="absolute right-2 top-7 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEye className="text-black" /> : <FaEyeSlash className="text-black" />}
                </div>
              </div>
              <div className="relative mb-4">
                <label htmlFor="" className="block text-sm font-medium text-white">
                  New Password
                </label>
                <input type={showNewPassword ? "text" : "password"} name="newPassword" value={newPassword} onChange={handleChange} placeholder="Enter new Password"
                  class="peer h-full text-white w-full border-b border-blue-gray-200 bg-transparent pt-2 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                <div
                  className="absolute right-2 top-7 cursor-pointer"
                  onClick={togglePasswordVisibility3}
                >
                  {showPassword ? <FaEye className="text-black" /> : <FaEyeSlash className="text-black" />}
                </div>
              </div>
              <div className="relative mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-white">
                  Confirm Password
                </label>
                <input type={showConfirmPassword ? "text" : "password"} name="password" onChange={handleChange} placeholder="Confirm Password"
                  class="peer h-full text-white w-full border-b border-blue-gray-200 bg-transparent pt-2 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                <div
                  className="absolute right-2 top-7 cursor-pointer"
                  onClick={togglePasswordVisibility2}
                >
                  {showPassword ? <FaEye className="text-black" /> : <FaEyeSlash className="text-black" />}
                </div>
              </div>


              <div className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 text-center">
                <button onClick={handleSubmit} className='w-28'>Submit</button>
              </div>
            </form>
          </div>
        )}

      </div>

    </>

  )
}

export default UpdateInfo