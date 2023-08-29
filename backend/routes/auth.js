const express = require("express");
const router = express.Router();
// importing the User Model 
const User = require("../models/User");
require("express-validator")
// Getting the express Validator
const { body, validationResult } = require('express-validator');
// Getting bcryptJs for hiding the password
const bcrypt = require('bcrypt');
// Using Jwt for creating a token for a user
var jwt = require('jsonwebtoken');
const jwt_secKey = "pushkarNamberdar"

const fetchUser = require("../middleware/fetchUser")

// Creating a New user
router.post("/createUser", [body('name').isLength({ min: 5 }),
body('email').isEmail(),
body("password").isLength({ min: 5 })],
    async (req, res) => {

        // getting User details from body and saving it using our scheema
        try {
            let success = false
            // Checking if data is valid enough to send to server or not
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success, errors: errors.array() })
            }
            // Checking if the email already present in DB or not
            if (await User.findOne({ email: req.body.email })) {
                return res.status(401).json({ success, error: "this email already exist" })
            }

            // Generating the code of password using bcrypt
            const salt = await bcrypt.genSalt(10);
            const securePassword = await bcrypt.hash(req.body.password, salt)

            // creating the user if every detail is ok
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securePassword
            })

            const data = {
                user: {
                    id: user.id
                }
            }

            const authtoken = jwt.sign(data, jwt_secKey)
            success = true
            // console.log(us)

            res.status(200).json({ success, authtoken })
        } catch (error) {
            console.log(error)
            res.status(500).send("invalid connection")
        }
    })


// LOGIN a user
router.post("/login", [body('email').isEmail(),
body("password").isLength({ min: 5 })],
    async (req, res) => {
        let success = false
        // Checking if data is valid enough to send to server or not
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() })
        }
        const { email, password } = req.body
        try {
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ success, error: "User not Found!!" })

            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ success, error: "Invalid credentials" })
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, jwt_secKey)
            success = true
            // console.log(us)
            res.json({ success, authtoken })
            // console.log(user)
        } catch (error) {
            console.log(error.message)
            res.status(500).send("invalid connection")
        }
    })


// Getting the correct user by using a middleware
router.post("/getUser", fetchUser, async (req, res) => {
    try {
        const id = req.user.id
        const userRecieved = await User.findById(id);
        if (!userRecieved) {
            res.status(401).json("No User Found, Would you like to SignUp?")
        }
        res.status(200).json(userRecieved)
    } catch (error) {
        res.status(401).json("Please Login with Valid Credentials")

    }
})

module.exports = router;