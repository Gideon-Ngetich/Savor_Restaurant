"use client";
import React from 'react'
import TopNav from '../Components/Navbar'
import { Table } from "flowbite-react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';



const Cart = () => {

    const [cartItems, setCartItems] = useState([]);
    const {enqueSnackbar} = useSnackbar()


    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const userId = localStorage.getItem('u');
                if (!userId) {
                    throw new Error('User Id not found in local storage');
                }
                const response = await axios.get(`http://localhost:5500/api/cart/${userId}`);
                setCartItems(response.data); // Ensure cartItems is initialized with an empty array if undefined
            } catch (error) {
                console.error('Error fetching cart items:', error.message);
            }
        };

        fetchCartItems();
    }, []);

    const handleDecreaseQuantity = async (itemId, index) => {
        
        try {
            const updatedCartItems = [...cartItems];
            if (updatedCartItems[index]?.quantity > 1) { // Check if quantity exists before decrementing
                updatedCartItems[index].quantity--;
                setCartItems(updatedCartItems);

                // Make POST request to update quantity in the database
                await axios.post('http://localhost:5500/api/cart/Quantity', {
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
            await axios.post('http://localhost:5500/api/cart/Quantity', {
                itemId,
                quantity: updatedCartItems[index].quantity
            });

        } catch (error) {
            console.error('Error increasing item quantity:', error.message);
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            await axios.delete(`http://localhost:5500/api/cart/removeItem/${itemId}`);
            // Optionally, update the UI to reflect the removal of the item from the cart
            setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));
            console.log("Item removed successfully");
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };
    

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
                    <div className="overflow-x-auto">
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
                                        <Table.Cell>
                                            {/* <input type="number" value={item.quantity} className='w-12 p-1 outline-none' /> */}
                                            <span className='w-24 flex gap-4' >
                                                <button onClick={() => handleDecreaseQuantity(item._id, index)} className='bg-slate-300 rounded-md outline-non text-black text-xl px-5 hover:bg-slate-600 duration-100 ease-in'>-</button>
                                                <input type="text" className='w-12 bg-white p-1 text-center text-black' value={item.quantity} readOnly/>
                                                <button onClick={() => handleIncreaseQuantity(item._id, index)} className='bg-slate-300 text-black text-xl px-5 hover:bg-slate-600 duration-100 ease-in'>+</button>
                                            </span>
                                        </Table.Cell>
                                        <Table.Cell>KES {item.price}</Table.Cell>
                                        <Table.Cell>KES {item.total}</Table.Cell>
                                        <Table.Cell>
                                            <button onClick={() => handleRemoveItem(item._id)} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                                Remove
                                            </button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
                <div className='w-full lg:w-1/4 md:w-full p-5'>
                    <div className='my-7'>
                        <h1 className='text-white font-bold font-sans text-xl border-b'>Summary</h1>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <span className='flex justify-between text-xl text-white'>
                            <span>Subtotal</span>
                            <span>KES 200</span>
                        </span>
                        <span className='flex justify-between text-lg'>
                            <span>Shipping Fee</span>
                            <span>KES 50</span>
                        </span>
                        <span className='flex justify-between text-2xl text-white border-y p-3'>
                            <span>Grand Total</span>
                            <span>KES 250</span>
                        </span>
                        <span className='flex justify-center items-center'>
                            <button className='bg-blue-500 w-40 h-10 text-black hover:bg-blue-700 font-bold text-lg duration-100 ease-in'>Checkout</button>
                        </span>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Cart