import React from "react";
import { useIsLoggedIn } from "../hooks/verification";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { useSnackbar } from "notistack";




const AddToCartButton = ({ userId, foodName, price,quantity = 1, withIcon }) => {
    const isLoggedIn = useIsLoggedIn();
    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar();

    const handleAddToCart = async () => {
        if (!isLoggedIn) {
            console.error("User not logged in")
            navigate('/login');
        }

        try {
            const response = await axios.post('htps://savor-restaurant-1.onrender.com/api/cart/add', {
                userId, foodName, price, quantity
            })
            console.log("Items added successfully")
            enqueueSnackbar('Item added to Cart', {variant: 'success'})

        } catch (err) {
            console.error(err)
        }
    }

    if (withIcon) {
        return (
            <button onClick={handleAddToCart} className='w-9 h-9 flex justify-center items-center text-center'>
                <FaCartPlus className='text-2xl text-center text-yellow-500 hover:text-yellow-600 ease-in-out duration-500' />
            </button>
        )
    }else{
        return(
            <button onClick={handleAddToCart} className='w-28 h-10 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 ease-in duration-300'>Add To Cart</button>
        )
    }
}

export default AddToCartButton