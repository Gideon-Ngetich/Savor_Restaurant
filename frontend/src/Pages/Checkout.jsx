import { React, useState, useEffect } from 'react'
import { FaPhone } from "react-icons/fa6";
import { FaShieldAlt } from "react-icons/fa";
import { MdDriveFileRenameOutline, MdLocationOn } from "react-icons/md";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Preloader from '../Components/Preloader';
import Error from '../Components/Error';

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [phone, setPhone] = useState()
    const [isLoading,setLoading] = useState(false)
    const [error, setError] = useState(null)
  
    useEffect(() => {
      const fetchUpdatedCartItems = async () => {
        const userId = localStorage.getItem('UserId');
  
        try {
          // Fetch cart items for the user after updating quantities
          const response = await axios.get(`${process.env.BACKEND_URL}/api/cart/${userId}`);
          setCartItems(response.data);
          // Calculate total when cart items are fetched
          const calculatedTotal = calculateTotal(response.data);
          setTotal(calculatedTotal);
        } catch (error) {
          console.error('Error fetching updated cart items:', error);
          setCartItems([]); // Set cart items to empty array in case of error
          setTotal(0); // Set total to 0 in case of error
        }
      };
  
      fetchUpdatedCartItems();
    }, []);
  
    useEffect(() => {
      // Calculate grand total when total is updated
      const calculatedGrandTotal = calculateGrandTotal(total);
      setGrandTotal(calculatedGrandTotal);
    }, [total]);
  
    const calculateTotal = (cartItems) => {
      let total = 0;
      cartItems.forEach((item) => {
        total += item.price * item.quantity;
      });
      return total;
    };
  
    const calculateGrandTotal = (total) => {
      const deliveryFee = 100;
      const customFee = 100;
      return total + deliveryFee + customFee;
    };

    
    const handlePayment =(e) =>{
        e.preventDefault();
        const grandTotal = calculateGrandTotal(total)
        setLoading(true)
        axios.post(`${process.env.BACKEND_URL}/api/stk`, {
            amount: grandTotal,phone
        })
        .then((res) =>{
            console.log(res)
            console.log('Waiting for response')
        }).catch((err) =>{
            console.error(err)
            setError(err.message)
        })
        .finally(() =>{
            setLoading(false)
        })
    }
  
    return (
        <>

            <div className='flex justify-between items-center px-10 h-14 bg-transparent border-b-2'>
                <div className='text-xl text-white font-bold'>
                    Savor Restaurant
                </div>
                <div className='text-white font-bold hidden md:flex lg:flex xl:flex'>
                    Place Your Order
                </div>
                <div className='flex gap-3'>

                    <span className='gap-2 justify-center items-center hidden md:flex lg:flex xl:flex'>
                        <FaPhone className='text-white text-2xl' />
                        <span>
                            <p>Need Help ?</p>
                            <Link to='/contacts' className='text-blue-500 hover:underline'>Contact Us</Link>
                        </span>

                    </span>
                    <span className='gap-2 justify-center items-center hidden md:flex lg:flex xl:flex'>
                        <FaShieldAlt className='text-white text-2xl' />
                        <p>Secure <br /> Payment</p>
                    </span>
                </div>
            </div>
            <div className='flex flex-col lg:flex-row xl:flex-row'>
                <div className='flex flex-col gap-6 w-full lg:w-3/4 xl:w-3/4 p-5 lg:p-10 xl:p-10'>

                    <div className='h-36 bg-slate-600 bg-opacity-10 shadow-md'>
                        <h2 className='w-full h-10 flex justify-start items-center border-b-2 px-5 border-slate-500 text-white font-bold'>Customer Address</h2>
                        <div className='p-5 text-white'>
                            <div className='flex gap-3'>
                                <MdDriveFileRenameOutline />
                                <p>Gideon Ngetich</p>
                            </div>
                            <div className='flex gap-3'>
                                <MdLocationOn />
                                <p>Baraka shop</p>
                            </div>
                            <div className='flex gap-3'>
                                <FaPhone />
                                <p>07223425233</p>
                            </div>
                        </div>
                    </div>
                    <div className='h-auto bg-slate-600 bg-opacity-10 shadow-md text-white'>
                        <h2 className='w-full h-10 flex justify-start items-center border-b-2 px-5 border-slate-500 text-white font-bold'>Items</h2>
                        {cartItems.map((item) => (
                            <div className='flex px-5 py-3 w-1/2 justify-between'>
                                <div>{item.foodName}</div>
                                <div className=''>Qty: {item.quantity}</div>
                            </div>
                        ))}

                    </div>
                    <div>
                        <Link to={'/cart'} className='flex justify-center items-center'>
                            <button className='w-1/2 px-10 py-3 bg-blue-500 text-white'>Modify Cart</button>
                        </Link>

                    </div>

                    <div className='h-36 bg-slate-600 bg-opacity-10 shadow-md'>
                        <h2 className='w-full h-10 flex justify-start items-center border-b-2 px-5 border-slate-500 text-white font-bold'>Payment Method(M-Pesa)</h2>
                        <span className='p-3 flex flex-col gap-3'>
                            <label htmlFor="" className='text-white'>Enter phone Number</label>
                            <input id='phone' type="tel" className='w-52 p-2 outline-none' onChange={(e) => setPhone(e.target.value)}/>
                        </span>
                    </div>
                </div>
                <div className='flex flex-col m-0 lg:m-10 xl:m-10 bg-slate-600 bg-opacity-10 shadow-md w-full lg:w-1/4 xl:w-1/4 h-1/2'>
                    <div>
                        <h2 className='w-full h-10 flex justify-start items-center border-b-2 px-5 border-slate-500 text-white font-bold'>Order Summary</h2>
                    </div>
                    <div className='flex flex-col text-white'>
                        <div className='flex flex-col gap-3 p-5'>

                            <div className='flex w-full justify-between text-xl'>
                                <span>Order Item(s):</span>
                                <span>KES {total}</span>
                            </div>
                            <div className='flex w-full justify-between text-xl'>
                                <span>Delivery Fee:</span>
                                <span>KES 100</span>
                            </div>
                            <div className='flex w-full justify-between rext-xl'>
                                <span>Custom Fee(s):</span>
                                <span>KES 100</span>
                            </div>

                        </div>
                        <div className='flex justify-between gap-3 px-5 border-t-2 border-b-2 border-slate-500 py-3 text-2xl'>

                            <span>Total:</span>
                            <span>KES {grandTotal}</span>

                        </div>
                    </div>
                    <div className='flex flex-col gap-3 p-10'>
                        <button className='px-10 py-3 bg-red-500 text-white' onClick={handlePayment}>Confirm Order</button>
                    </div>
                </div>
            </div>
            <div>
                {isLoading && <Preloader />}
                {error && <Error message={error}/>}
            </div>
        </>
    )
}

export default Checkout