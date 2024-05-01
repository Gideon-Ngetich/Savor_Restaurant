import express from "express"
import mongoose from 'mongoose'
import cors from 'cors'
import { PORT, mongoDBURL } from './Config.js'
import { Reservation, Category, Food, User, Gallery, Cart, Payment } from "./Models/Schema.js"
import bodyParser from "body-parser"
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from "cookie-parser"
import authRoute from "./Routes/auth.js"
import cryptoRandomString from 'crypto-random-string'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import multer from "multer"
import axios from "axios"
// import path from 'path'
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';



const app = express();
const JWT_SECRET_KEY = cryptoRandomString({ length: 32, type: 'base64' });
// const wss = new WebSocket.Server({server})

//middleware
// app.use(cors({credentials:true, origin:'https://promise-website.onrender.com'}));
app.use(cors({
    credentials: true,
    // origin: 'https://savor-restaurant.vercel.app',
    origin: 'http://localhost:5173'
}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use("/auth", authRoute)


app.listen(PORT, () => {
    console.log(`app running on ${PORT}`);
})

app.get('/', (request, response) => {
    // console.log(request);
    return response.status(234).send("Welcome to my app");
})

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
    })
    .catch((error) => {
        console.log(error);
    })


app.post('/api/reserve-table', async (req, res) => {
    try {
        if (!req.body.name || !req.body.email || !req.body.date || !req.body.phone || !req.body.time || !req.body.people) {
            return res.status(400).send({ message: 'All fields required' });
        }

        const newReservation = new Reservation({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            people: req.body.people,
            time: req.body.time,
            date: req.body.date

        })

        await newReservation.save();
        res.status(201).json({ message: 'Reservaton successful' })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})



app.get('/api/reserve-table', async (req, res) => {
    try {
        const reservations = await Reservation.find()

        res.status(200).json(reservations)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

//Create category and save it to the db
app.post('/api/food-category', async (req, res) => {
    try {
        const category = new Category({ name: req.body.name });
        await category.save();
        res.status(201).json({ message: 'Category creaated successfully', category });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

//Add a food to a category
app.post('/api/food', async (req, res) => {
    try {
        const category = await Category.findById(req.body.categoryId);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        const food = new Food({
            name: req.body.name,
            price: req.body.price,
            category: category._id
        })
        await food.save();

        category.foods.push(food);
        await category.save();

        res.status(201).json({ message: 'Food added successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// Get all categories
app.get('/api/food-category', async (req, res) => {
    try {
        const categories = await Category.find().populate('foods');
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all foods
app.get('/api/food', async (req, res) => {
    try {
        const foods = await Food.find().populate('category');
        res.json(foods);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/users', async (req, res) => {
    try {
        const { userName, email, phone, location, password } = req.body;
        const existingUser = await User.findOne({ email })
        if (existingUser) {

            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ userName, email, phone, location, password: hashedPassword });

        await newUser.save()
        res.status(200).json("User successfully created");
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})



app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User not found" })
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const accessToken = jwt.sign({ userId: user._id, userName: user.userName, location: user.location, phone: user.phone, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
        res.cookie('accessToken', accessToken, { httpOnly: true });

        res.cookie('refreshToken', refreshToken, { httpOnly: true })
        res.status(200).json({ message: 'login successful', accessToken, userId: user._id, user: { userName: user.userName, email: user.email, location: user.location, phone: user.phone } })
        // res.status(200).json({
        //     message: 'Login successful',
        //     accessToken,
        //     userId: user._id,
        //     user: {
        //         userName: user.userName,
        //         email: user.email,
        //         location: user.location,
        //         phone: user.phone
        //     }
        // });
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
})

app.get('/api/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId); // Find user by ID in the database
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Return user profile data
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.put('/api/user/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const updates = req.body;
        
      console.log(updates)
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if the provided email is different from the current email
      if (updates.email && updates.email !== user.email) {
        // Check if the new email already exists in the database
        const existingUser = await User.findOne({ email: updates.email });
        if (existingUser && existingUser._id.toString() !== userId) {
          return res.status(400).json({ message: "Email already exists" });
        }
      }
      // Check if the new password is provided
      if (updates.newPassword) {
        // Verify if the old password matches the stored hashed password
        const isMatch = await bcrypt.compare(updates.oldPassword, user.password);
        console.log(updates.oldPassword)
        if (!isMatch) {
          return res.status(400).json({ message: "Old password is incorrect" });
        }
  
        // Hash the new password using bcrypt
        const hashedPassword = await bcrypt.hash(updates.newPassword, 10);
        // Update the password in the updates object
        updates.password = hashedPassword;
      }
  
      // Remove the old password and new password from updates
    //   delete updates.oldPassword;
    //   delete updates.newPassword;
  
      // Update the user document in the database
      const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
  
      res.status(200).json({ message: 'User information updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user information', error: error.message });
    }
  });

  app.post('/api/user/validate-password', async (req, res) => {
    try {
      const { userId, password } = req.body;
  
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Verify if the provided password matches the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch)
      res.json({ valid: isMatch });
    } catch (error) {
      res.status(500).json({ message: 'Error validating password', error: error.message });
    }
  });
const verifyToken = (req, res, next) => {
    const accessToken = req.cookies.accessToken

    if (!accessToken) {
        return res.status(403).json({ message: 'Access token is missing' });
    }
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid access token' });

        }
        req.userId = decoded.userId;
        next()
    })
}

app.post('/api/refreshToken', (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(403).json({ message: 'Refresh token is missing' })
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
    })

})
// app.get('/api/userinfo', async (req, res) => {
//     try {
//       const userId = req.user.id; // Assuming you're using authentication middleware to attach the user to the request object

//       // Fetch user details from the database
//       const user = await User.findById(userId);

//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }

//       // Extract username and email from the user object
//       const { username, email } = user;

//       res.status(200).json({ username, email });
//     } catch (error) {
//       console.error('Error fetching user info:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });




// app.get('/api/protected', verifyToken, (req, res) => {
//     // const accessToken = req.cookies.accessToken.
//     res.json({ message: 'Access granted', userId: req.userId });
// });
app.get('/api/protected', verifyToken, (req, res) => {
    res.json({ message: 'Access granted', userId: req.userId, accessToken: req.cookies.accessToken });
});


const blacklist = new Set();
app.post('/api/logout', (req, res) => {
    const token = req.cookies.accessToken;

    if (token) {
        blacklist.add(token);
    }
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(200).json({ message: 'Logged out successfully' });
});

app.get('/cart', verifyToken, (req, res) => {
    const { userId, userName, phone, email } = req.user
    res.render('cart', { userId, userName, phone, email })
})

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Set up the route for image upload
app.post('/api/Gallery', upload.single('image'), async (req, res) => {
    try {
        // Get the category and file details from the request
        const { category } = req.body;

        // Ensure that category and file buffer are present
        if (!category || !req.file.buffer) {
            return res.status(400).send('Category and image are required');
        }

        // Create a new image instance
        const newImage = new Gallery({
            category,
            data: req.file.buffer, // Corrected from image to data
        });

        // Save the image to the database
        await newImage.save();

        res.status(201).send('Image uploaded successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


// app.get('/api/Gallery', async (req, res) => {
//     try {
//         const images = await retrieveAllImagesFromDatabase();
//         res.json(images);
//     } catch (error) {
//         console.error('Error fetching images:', error);
//         res.status(500).json({ error: 'An error occurred while fetching images' });
//     }

// });

// async function retrieveImagesFromDatabase(category) {
//     let query = {};

//     if (category !== 'All Photos') {
//       query.category = category;
//     }

//     const images = await ImageModel.find(query);

//     return images.map((image) => ({
//       category: image.category,
//       data: image.data ? image.data.toString('base64') : null,
//     }));
// }

//Endpoint for fetching images by category
app.get('/api/Gallery', async (req, res) => {
    try {
        const category = req.params.category;
        const images = await retrieveImagesFromDatabase(category);
        res.json(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ error: 'An error occurred while fetching images' });
    }
});

//Function to retrieve images from the database based on the category
async function retrieveImagesFromDatabase(category) {
    try {
        let query = {};
        if (category && category !== 'All Photos') {
            query.category = category;
        }
        const images = await Gallery.find(query);

        return images.map((image) => ({
            category: image.category,
            src: image.data ? `data:image/jpeg;base64,${image.data.toString('base64')}` : null,
        }));
    } catch (error) {
        console.error('Error retrieving images from database:', error);
        return [];
    }
}

app.post('/api/cart/add', async (req, res) => {
    try {
        const { userId, foodName, price, quantity } = req.body;

        const cartItem = new Cart({
            userId,
            foodName,
            quantity,
            price
        })

        await cartItem.save();
        res.status(201).json({ message: 'Item added successfully' })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error' })
    }
})

// POST request to update item quantity in the cart
app.post('/api/cart/updateQuantity', async (req, res) => {
    try {
        const { userId, foodName, quantity } = req.body;

        // Find the cart item for the given userId and foodName
        let cartItem = await Cart.findOne({ userId, foodName });

        if (!cartItem) {
            return res.status(404).json({ message: 'Item not found in the cart' });
        }

        // Update the quantity of the cart item
        cartItem.quantity = quantity;
        await cartItem.save();

        res.json({ message: 'Item quantity updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/api/cart/:userId', async (req, res) => {
    try {
        const userId = req.params.userId

        const cartItems = await Cart.find({ userId });
        res.json(cartItems)
        // res.status(201).json({message: 'Cart items retrieved successfully'})
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
})

app.post('/api/cart/Quantity', async (req, res) => {
    try {
        const { itemId, quantity } = req.body;

        // Find the cart item by its ID and update its quantity
        const updatedCartItem = await Cart.findByIdAndUpdate(itemId, { quantity }, { new: true });

        if (!updatedCartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        res.status(200).json({ message: "Cart item quantity updated successfully", updatedCartItem });
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.delete('/api/cart/removeItem/:itemId', async (req, res) => {
    try {
        const itemId = req.params.itemId;

        // Find the cart item by its ID and remove it from the database
        const deletedCartItem = await Cart.findByIdAndDelete(itemId);

        if (!deletedCartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        res.status(200).json({ message: "Cart item removed successfully" });
    } catch (error) {
        console.error('Error removing cart item:', error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post('/api/cart/removeDuplicates', async (req, res) => {
    try {
        const { userId } = req.body;

        // Find all cart items for the user
        const cartItems = await Cart.find({ userId });

        // Create a map to track unique items and their quantities
        const itemMap = new Map();

        // Iterate through cart items to remove duplicates and update quantities
        cartItems.forEach(item => {
            if (itemMap.has(item.foodName)) {
                // Increment quantity for existing item
                itemMap.get(item.foodName).quantity += item.quantity;
            } else {
                // Add new item to map
                itemMap.set(item.foodName, {
                    quantity: item.quantity,
                    price: item.price
                });
            }
        });

        // Clear existing cart items for the user
        await Cart.deleteMany({ userId });

        // Insert updated cart items into the database
        const updatedCartItems = [];
        for (const [foodName, { quantity, price }] of itemMap.entries()) {
            updatedCartItems.push({
                userId,
                foodName,
                quantity,
                price
            });
        }
        await Cart.insertMany(updatedCartItems);

        res.status(200).json({ message: 'Duplicates removed and quantities updated successfully' });
    } catch (error) {
        console.error('Error removing duplicates and updating quantity:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const generateToken = async (req, res, next) => {
    const secret = process.env.MPESA_SECRET_KEY;
    const consumer = process.env.MPESA_CONSUMER_KEY;

    const auth = Buffer.from(`${consumer}:${secret}`).toString('base64');
    try {
        const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
            headers: {
                'Authorization': `Basic ${auth}`
            }
        });

        // console.log(response.data.access_token);
        console.log(response.data.access_token)
        return response.data.access_token; // Pass token to the next middleware
        // res.status(200),json({token: response.data.access_token})
        // next();
    } catch (error) {
        console.error(error.message);
        // res.status(400).json({ error: error.message });
    }
};

app.get('/api/token', (req, res) => {
    generateToken()
})
app.post('/api/stk', async (req, res) => {
    const phone = req.body.phone.substring(1);
    const amount = req.body.amount;
    const token = await generateToken() // Retrieve token from the request object
    const shortcode = process.env.MPESA_TILL;
    const passkey = process.env.MPESA_PASSKEY;
    const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"

    const date = new Date();
    const timestamp = date.getFullYear() +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        ("0" + date.getDate()).slice(-2) +
        ("0" + date.getHours()).slice(-2) +
        ("0" + date.getMinutes()).slice(-2) +
        ("0" + date.getSeconds()).slice(-2);



    const password = Buffer.from(shortcode + passkey + timestamp).toString("base64");

    const data = {
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: `254${phone}`,
        PartyB: shortcode,
        PhoneNumber: `254${phone}`,
        CallBackURL: "https://7b18-102-211-145-33.ngrok-free.app/api/callback",
        AccountReference: `paid 254${phone}`,
        TransactionDesc: "Test"
    }

    await axios.post(url, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((data) => {
        // console.log(data)
        res.status(200).json(data.data)
    }).catch((err) => {
        console.log(err.message)
        res.status(400).json(err.message)
    })
});


app.post('/api/callback', (req, res) => {
    const callbackData = req.body;

    console.log(callbackData); // Log the entire callback data for debugging

    if (!callbackData || !callbackData.Body || !callbackData.Body.stkCallback) {
        console.log("Invalid callback data format");
        return res.json("ok");
    }

    const stkCallbackData = callbackData.Body.stkCallback;

    // Check if the result code is 0 (success)
    if (stkCallbackData.ResultCode === 0) {
        console.log("STK push succeeded");

        // Extract relevant data from stkCallbackData
        const metadata = stkCallbackData.CallbackMetadata.Item;

        // Extracting values from the callback metadata
        const amountIndex = metadata.findIndex(item => item.Name === 'Amount');
        const receiptNoIndex = metadata.findIndex(item => item.Name === 'MpesaReceiptNumber');
        const dateIndex = metadata.findIndex(item => item.Name === 'TransactionDate');
        const phoneIndex = metadata.findIndex(item => item.Name === 'PhoneNumber');

        if (amountIndex === -1 || receiptNoIndex === -1 || dateIndex === -1 || phoneIndex === -1) {
            console.log("Required metadata not found in callback data");
            return res.json("ok");
        }

        const amount = metadata[amountIndex].Value;
        const receiptNo = metadata[receiptNoIndex].Value;
        const date = metadata[dateIndex].Value;
        const phone = metadata[phoneIndex].Value;

        // Creating a new Payment instance and saving it to the database
        const payment = new Payment({
            receiptNo: receiptNo,
            number: phone,
            amount: amount,
            date: date
        });

        payment.save().then((data) => {
            console.log(payment);
            console.log({ message: 'Data sent successfully' });
        }).catch((err) => {
            console.log(err.message);
        });
    } else {
        console.log("STK push failed");
    }

    res.json("ok");
});


export default JWT_SECRET_KEY