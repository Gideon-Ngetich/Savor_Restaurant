import express from 'express';
import bcrypt from 'bcrypt'
import { User } from "../Models/Schema.js";
import JWT_SECRET_KEY  from '../Server.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// router.post('/api/signup', async (req, res) =>{
//     try{
//         const {userName, email, phone, location, password} = req.body;

//         const existingUser = await User.findOne({email});
//         if(existingUser){
//             return res.status(409).json({message: "User already exist"});
//         }
//         const newUser = new User({userName, email, phone, location, password});
//         await newUser.save();
//         res.status(201).json({message: "User created successfully"});
//     } catch (error){
//         res.status(500).json({message: "Internal server error"});
//     }
// })

// router.post('/api/login', async (req,res) =>{
//     try{
//         const {email, password} = req.body;

//         const user = await User.findOne({email});
//         if(!user){
//             return res.status(401).json({message: "Invalid credentials"})
//         }
//         const isValidPassword = await bcrypt.compare(password, user.password);
//         if(!isValidPassword){
//             return res.status(401).json({message: 'Invalid email or password'});
//         }
//         const token = jwt.sign({userId: user._id}, JWT_SECRET_KEY, {expiresIn: '1h'});
//         res.cookie('token', token, {httpOnly: true});
//         res.json({message: 'login successful'})
//     } catch(error){
//         res.status(500).json({message: ""})
//     }
// })

router.post('/api/logout', async(req, res) =>{
    try{
        res.clearCookie('token');
        res.json({message: 'logout successful'});
    } catch (err){
        res.status(500).json({error: err.message});
    }
})

export default router