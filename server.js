const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const MONGODB_URL = process.env.MONGO_URL;
const app = express();

// MiddleWares
app.use(cors());
app.use(express.json());
mongoose.connect(MONGODB_URL);

const db = mongoose.connection;
db.on("error", (err) => {
    console.error("Mongodb connnection error", err);
});
db.once("open", () => {
    console.log("Mongodb is connected");
});


// Model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
    },
    age: {
        type: String,
        required: [true, 'Age is required'],
    },
    fees: {
        type: String,
        required: [true, 'Role is required'],
    },
    slot: {
        type: String,
        required: [true, 'Role is required'],
    }
})

const User = mongoose.model('User', userSchema);

// Routes
app.post('/register', async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            gender: req.body.gender,
            age: req.body.age,
            fees: req.body.fees,
            slot: req.body.slot
        });

        const savedUser = await newUser.save()
        return res.status(201).send({
            message: 'User Registered in Yoga class',
            success: true,
            savedUser
        })
    } catch (error) {
        console.log('Error during registeration', error);
        res.status(500).send({
            message: 'Error during registration',
            success: false,
            error
        })
    }
})

// PORT
const PORT = 8080;

app.listen(PORT, (req, res) => {
    console.log(`Server Running at port ${PORT} successfully!!`);
})
