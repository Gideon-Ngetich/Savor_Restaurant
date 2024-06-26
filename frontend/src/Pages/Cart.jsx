"use client";
import React from 'react'
import TopNav from '../Components/Navbar'
import { Table } from "flowbite-react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';



const Cart = () => {

    const [cartItems, setCartItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const link = 'https://savor-restaurant-1.onrender.com'
    // const link = 'http://localhost:5500'
    // const navigate = useNavigate()

    // const {enqueSnackbar} = useSnackbar()


    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const userId = localStorage.getItem('UserId');

                const response = await axios.post(`${link}/api/cart/removeDuplicates`, {
                    userId: userId
                });

                // Log response data for debugging
                console.log(response.data);

                // Fetch updated cart items after successful response
                const updatedCartItems = await fetchUpdatedCartItems(userId);
                setCartItems(updatedCartItems);
            } catch (error) {
                console.error('Error removing duplicates and updating quantity:', error);
                // Handle error if needed
            }
        };

        fetchCartItems();
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    const fetchUpdatedCartItems = async (userId) => {
        try {
            // Fetch cart items for the user after updating quantities
            const response = await axios.get(`${link}/api/cart/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching updated cart items:', error);
            return []; // Return empty array in case of error
        }
    };
    const handleDecreaseQuantity = async (itemId, index) => {

        try {
            const updatedCartItems = [...cartItems];
            if (updatedCartItems[index]?.quantity > 1) { // Check if quantity exists before decrementing
                updatedCartItems[index].quantity--;
                setCartItems(updatedCartItems);

                // Make POST request to update quantity in the database
                await axios.post(`${link}/api/cart/Quantity`, {
                    itemId,
                    quantity: updatedCartItems[index].quantity
                });
            }
            // enqueSnackbar('Item added susccessfully', {variant: 'success'})


        } catch (error) {
            console.error('Error decreasing item quantity:', error.message);
        }
    };

    const handleIncreaseQuantity = async (itemId, index) => {
        try {
            const updatedCartItems = [...cartItems];
            updatedCartItems[index].quantity++;
            setCartItems(updatedCartItems);

            // Make POST request to update quantity in the database
            await axios.post(`${link}/api/cart/Quantity`, {
                itemId,
                quantity: updatedCartItems[index].quantity
            });

        } catch (error) {
            console.error('Error increasing item quantity:', error.message);
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            await axios.delete(`${link}/api/cart/removeItem/${itemId}`);
            // Optionally, update the UI to reflect the removal of the item from the cart
            setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));
            console.log("Item removed successfully");
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const CalculateTotal = (price, quantity) => {
        return quantity * price
    }

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + CalculateTotal(item.quantity, item.price), 0);
    };

    const calculateGrandTotal = () => {
        const grandTotal = calculateSubtotal()
        return grandTotal
    }

    useEffect(() => {
        // Calculate total quantity of all items in the cart
        const total = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        setTotalItems(total);
    }, [cartItems]);


    return (
        <>
            <div className='border-b'>
                <TopNav />
            </div>
            <div className='flex lg:flex-row md:flex-col flex-col'>
                <div className='lg:w-3/4 w-full md:w-full p-5'>
                    <div className='m-7'>
                        <h1 className='text-white font-bold font-sans text-xl'>MY CART</h1>
                    </div>
                    <div>
                        {cartItems.length === 0 ? (
                            <div className='overflow-x-auto'>
                                <Table>
                                    <Table.Head>
                                        <Table.HeadCell>Product name</Table.HeadCell>
                                        <Table.HeadCell>Quantity</Table.HeadCell>
                                        <Table.HeadCell>Price</Table.HeadCell>
                                        <Table.HeadCell>Total</Table.HeadCell>
                                        <Table.HeadCell>
                                            <span className="sr-only">Edit</span>
                                        </Table.HeadCell>
                                    </Table.Head>
                                </Table>
                                <div className='flex justify-center items-center p-10 text-xl font-bold'>
                                    Cart is Empty
                                </div>
                                <div>
                                    <Link to={'/menu'} className='flex justify-center items-center p-10'>
                                        <button className='w-3/4 px-10 py-3 bg-blue-500 text-white lg:w-1/2'>Menu</button>
                                    </Link>
                                </div>
                            </div>



                        ) : (
                            <div className='overflow-x-auto'>
                                <Table className='bg-slate-900'>
                                    <Table.Head>
                                        <Table.HeadCell>Product name</Table.HeadCell>
                                        <Table.HeadCell>Quantity</Table.HeadCell>
                                        <Table.HeadCell>Price</Table.HeadCell>
                                        <Table.HeadCell>Total</Table.HeadCell>
                                        <Table.HeadCell>
                                            <span className="sr-only">Edit</span>
                                        </Table.HeadCell>
                                    </Table.Head>
                                    <Table.Body className="divide-y bg-slate-500">
                                        {cartItems.map((item, index) => (
                                            <Table.Row key={item._id} className="bg-slate-600 text-white dark:border-gray-700 dark:bg-gray-800">
                                                <Table.Cell className="whitespace-nowrap font-medium text-lg text-gray-900 dark:text-white">
                                                    {item.foodName}
                                                </Table.Cell>
                                                <Table.Cell className='flex justify-start w-auto items-center py-2 px-1 m-0'>
                                                    {/* <input type="number" value={item.quantity} className='w-12 p-1 outline-none' /> */}
                                                    <span className='w-10 flex gap-0 p-0 m-0' >
                                                        <button onClick={() => handleDecreaseQuantity(item._id, index)} className='bg-slate-300 outline-non text-black text-xl py-2 px-3 hover:bg-slate-600 duration-100 ease-in'>-</button>
                                                        <input type="text" className='w-9 bg-white p-1 text-center text-black' value={item.quantity} readOnly />
                                                        <button onClick={() => handleIncreaseQuantity(item._id, index)} className='bg-slate-300 text-black text-xl py-2 px-3 hover:bg-slate-600 duration-100 ease-in'>+</button>
                                                    </span>
                                                </Table.Cell>
                                                <Table.Cell>KES {item.price}</Table.Cell>
                                                <Table.Cell>KES {CalculateTotal(item.price, item.quantity)}</Table.Cell>
                                                <Table.Cell className='text-center'>
                                                    <button onClick={() => handleRemoveItem(item._id)} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                                        Remove
                                                    </button>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>
                            </div>
                        )}

                    </div>
                </div>
                <div>

                </div>
                <div className='w-full lg:w-1/4 md:w-full p-5'>
                    <div className='my-7'>
                        <h1 className='text-white font-bold font-sans text-xl border-b'>Summary</h1>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <span className='flex justify-between text-xl text-white'>
                            <span>Item(s)</span>
                            <span>KES {calculateSubtotal()}</span>
                        </span>
                        <span className='flex justify-between text-2xl text-white border-y p-3'>
                            <span>Subtotal Total</span>
                            <span>KES {calculateGrandTotal()}</span>
                        </span>
                        <span className='flex justify-center items-center'>
                            {cartItems.length === 0 ? (
                                <div>

                                </div>
                            ) : (
                                <Link to={'/cart/checkout'}>
                                    <button className='bg-blue-500 w-40 h-10 text-white hover:bg-blue-700 font-bold text-lg duration-100 ease-in'>Checkout</button>
                                </Link>
                            )}

                        </span>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Cart