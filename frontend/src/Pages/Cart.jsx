"use client";
import React from 'react'
import TopNav from '../Components/Navbar'
import { Table } from "flowbite-react";

const Cart = () => {
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
                                <Table.Row className="bg-slate-600 text-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-lg text-gray-900 dark:text-white">
                                        Chapati djkcjdsncdlkcsdlckmsd
                                    </Table.Cell>
                                    <Table.Cell>
                                        <input type="number" value={1} className='w-12 p-1 outline-none' />
                                    </Table.Cell>
                                    <Table.Cell>KES 25</Table.Cell>
                                    <Table.Cell>KES 50</Table.Cell>
                                    <Table.Cell>
                                        <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                            Remove
                                        </a>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row className="bg-slate-600 text-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        Chapati
                                    </Table.Cell>
                                    <Table.Cell>
                                        <input type="number" value={1} className='w-12 p-1 outline-none' />
                                    </Table.Cell>
                                    <Table.Cell>KES 25</Table.Cell>
                                    <Table.Cell>KES 50</Table.Cell>
                                    <Table.Cell>
                                        <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                            Remove
                                        </a>
                                    </Table.Cell>
                                </Table.Row>

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