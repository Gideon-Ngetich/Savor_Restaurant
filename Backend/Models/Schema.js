import mongoose, { mongo } from "mongoose";
import bcrypt from 'bcrypt'

//Reservation Schema
const reservationSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        people: {
            type: Number,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        }
    },
    {
        timestamp: true,
    }
)



export const Reservation = mongoose.model('Reservatioin', reservationSchema);

//Food Category Schema
const foodCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    foods: [{type: mongoose.Schema.Types.ObjectId, ref: 'Food'}]
});

export const Category = mongoose.model('Food Category', foodCategorySchema);

//Food Schema
const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    category: {type: mongoose.Schema.Types.ObjectId, ref:'Category'}
})

export const Food = mongoose.model('Food', foodSchema);

const signupSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Your name is required"]
    },
    email: {
        type: String,
        required: [true, "Your email address is required"]
    },
    phone: {
        type: Number,
        required: [true, "Your phone number is required"]
    },
    location: {
        type: String,
        required: [true, "Your location is requires"]
    },
    password: {
        type: String,
        required: [true, "Your password is required"]
    },
    createdAt: {
        type: Date,
        default: new Date()
    }

})

export const User = mongoose.model('Users', signupSchema);

const gallerySchema = new mongoose.Schema({
  data:{
    type: Buffer,
    required: true
  },
  category: {
    type: String,
    required: true
  }
})

export const Gallery = mongoose.model('Gallery', gallerySchema);

const cartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    foodName:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

export const Cart = mongoose.model('CartItems', cartSchema)